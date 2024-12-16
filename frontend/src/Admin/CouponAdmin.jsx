import { useState } from 'react';
import { Table, Button, Modal, message, Form } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import CouponForm from './CouponForm';
import useFetch from "../useFetch";
import usePost from "../usePost";
import useDelete from "../useDelete";
import useUpdate from "../useUpdate";

const CouponAdmin = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editCoupon, setEditCoupon] = useState(null);
    const { data: coupons, refetch } = useFetch(
        process.env.REACT_APP_COUPON_API_URL
    );
    const { post } = usePost(
        process.env.REACT_APP_COUPON_API_URL
    );
    const { deleteItem } = useDelete(
        process.env.REACT_APP_COUPON_API_URL
    );
    const { update } = useUpdate(
        process.env.REACT_APP_COUPON_API_URL
    )

    const columns = [
        { title: 'Code', dataIndex: 'code', key: 'code' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Discount Type', dataIndex: 'discountType', key: 'discountType' },
        { title: 'Discount Value', dataIndex: 'discountValue', key: 'discountValue' },
        {
            title: 'Actions', key: 'actions', render: (_, record) => (
                <>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEditCoupon(record)}
                        style={{ marginRight: 8 }}
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteCoupon(record.id)}
                        danger
                    />
                </>
            )
        },
    ];

    const handleAddNewCoupon = () => {
        setIsModalOpen(true);
        setEditCoupon(null);
    };

    const handleEditCoupon = (coupon) => {
        setIsModalOpen(true);
        setEditCoupon(coupon);
    }

    const handleDeleteCoupon = async (id) => {
        await deleteItem(id);
        message.success("Coupon deleted successfully");
        refetch();
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const handleSubmit = async (values) => {
        if (editCoupon) {
            const newCoupon = { ...values, id: editCoupon.id};
            await update(newCoupon)
            message.success("Coupon updated successfully");
        } else {
            const newCoupon = { ...values, };
            // setEditCoupon(newCoupon);
            await post(newCoupon);
            message.success("Coupon added successfully");
        }
        refetch();
        setIsModalOpen(false);
    };

    return (
        <div>
            <h2>Coupon Management</h2>
            <Button
                type="primary"
                onClick={handleAddNewCoupon}
            >
                Add New Coupon
            </Button>
            <Table
                columns={columns}
                dataSource={coupons}
                rowKey="id"
            />
            <Modal
                title={editCoupon ? 'Edit Coupon' : 'Add Coupon'}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <CouponForm
                    // form={form}
                    initialValues={editCoupon}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </Modal>
        </div>
    );
};

export default CouponAdmin;