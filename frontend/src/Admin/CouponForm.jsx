import { Form, Input, Select, Button } from "antd";
import { useEffect } from "react";

const CouponForm = ({ initialValues, onSubmit, onCancel }) => {
    const [form] = Form.useForm()

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        } else {
            form.resetFields();
        }
    }, [initialValues]);

    const handleFinish = async (values) => {
        // Call the parent submit function
        await onSubmit(values);
        
        // Reset the form fields after successful submission
        form.resetFields();
    };

    return (
        <Form
            form={form}
            initialValues={initialValues}
            layout="vertical"
            onFinish={handleFinish}
        >
            <Form.Item
                label="Coupon Code"
                name="code"
                rules={[{ required: true, message: 'Please input the coupon code!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
                // rules={[{ required: true, message: 'Please input a description!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Discount Type"
                name="discountType"
                rules={[{ required: true, message: 'Please select the discount type!' }]}
            >
                <Select>
                    <Select.Option value="flat">Flat</Select.Option>
                    <Select.Option value="percentage">Percentage</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="Discount Value"
                name="discountValue"
                rules={[{ required: true, message: 'Please input the discount value!' }]}
            >
                <Input type="number" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {initialValues ? 'Update Coupon' : 'Add Coupon'}
                </Button>
                <Button
                    style={{ marginLeft: 8 }}
                    onClick={onCancel}
                >
                    Cancel
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CouponForm;