const express = require('express');
const {
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  validateCoupon,
} = require('../controllers/couponController');
const router = express.Router();

// Get all coupons
router.get("/", getCoupons);

// Create a new coupon
router.post("/", createCoupon);

// Update an existing coupon
router.put("/:id", updateCoupon);

// Delete a coupon
router.delete("/:id", deleteCoupon);

// Validate a coupon
router.post('/validate', validateCoupon);

module.exports = router;
