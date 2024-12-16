import { useState, useEffect } from "react";
import usePost from "./usePost";

const Coupon = ({ subtotal, discount, setDiscount }) => {
  const [promoCode, setPromoCode] = useState("");
  const { data: couponData, isLoading, error, post } = usePost(
    process.env.REACT_APP_COUPON_API_URL + "/validate"
  );

  useEffect(() => {
    if (couponData) {
      const { discountType, discountValue, message } = couponData;

      let calculatedDiscount = 0;
      if (discountType === "flat") {
        calculatedDiscount = discountValue;
      } else if (discountType === "percentage") {
        calculatedDiscount = subtotal * (discountValue / 100);
      }

      setDiscount({ value: calculatedDiscount, description: message });
    }
  }, [couponData, subtotal]);

  const handleApplyCoupon = () => {
    if (promoCode) {
      post({ code: promoCode });
    }
  };

  const handleRemoveCoupon = () => {
    setDiscount({ value: 0, description: "" });
    setPromoCode("");
  };

  return (
    <div className="flex-column">    
        <div className="promo-code-container">
            <input
                disabled={discount.value > 0}
                type="text"
                placeholder="Promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="promo-code-input"
            />
            <button
                onClick={discount.value ? handleRemoveCoupon : handleApplyCoupon}
                disabled={isLoading}
                className="button"
            >
                {discount.value ? "Remove" : isLoading ? "Applying..." : "Apply"}
            </button>
        </div>

        <div className="promo-messages">
            {discount.description && (
            <span className="coupon-text">{discount.description}</span>
            )}
            {error && <span className="invalid-coupon">{error}</span>}
        </div>
    </div>
  );
};

export default Coupon;
