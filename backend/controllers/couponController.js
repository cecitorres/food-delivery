const { Coupon } = require('../models/coupon');

exports.getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.findAll();
    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createCoupon = async (req, res) => {
  const { code, discountType, discountValue, expiresAt } = req.body;

  try {
    const coupon = await Coupon.create({
      code,
      discountType,
      discountValue,
      expiresAt,
    });
    res.status(201).json(coupon);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error creating coupon', error: error.message });
  }
};

exports.updateCoupon = async (req, res) => {
  const { id } = req.params;
  const { code, discountType, discountValue, expiresAt } = req.body;

  try {
    const coupon = await Coupon.findByPk(id);
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    coupon.code = code || coupon.code;
    coupon.discountType = discountType || coupon.discountType;
    coupon.discountValue = discountValue || coupon.discountValue;
    coupon.expiresAt = expiresAt || coupon.expiresAt;

    await coupon.save();
    res.status(200).json(coupon);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error updating coupon', error: error.message });
  }
};

exports.deleteCoupon = async (req, res) => {
  const { id } = req.params;

  try {
    const coupon = await Coupon.findByPk(id);
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    await coupon.destroy();
    res.status(200).json({ message: 'Coupon deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.validateCoupon = async (req, res) => {
  const { code } = req.body;

  try {
    const coupon = await Coupon.findOne({ where: { code } });

    if (!coupon) {
      return res.status(404).json({ message: 'Invalid coupon code' });
    }

    const now = new Date();
    if (coupon.expiresAt && coupon.expiresAt < now) {
      return res.status(400).json({ message: 'Coupon has expired' });
    }

    res.status(200).json({
      message: 'Coupon is valid',
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
