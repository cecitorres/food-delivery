const { Coupon } = require("../models/coupon");

exports.validateCoupon = async (req, res) => {
    const { code } = req.body;

    try {
        const coupon = await Coupon.findOne({ where: { code } });

        if (!coupon) {
            return res.status(404).json({ message: "Invalid coupon code" });
        }

        const now = new Date();
        if (coupon.expiresAt && coupon.expiresAt < now) {
            return res.status(400).json({ message: "Coupon has expired" });
        }

        res.status(200).json({
            message: "Coupon is valid",
            discountType: coupon.discountType,
            discountValue: coupon.discountValue,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
