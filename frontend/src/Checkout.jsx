import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import usePost from "./usePost";

const CART = [
  {
    id: 1,
    name: "Pizza",
    description: "20' pepperoni",
    price: 15,
    img: "https://attic.sh/jzdlwkqscqk4lyhehzdqhwbfwuul",
  },
  {
    id: 2,
    name: "Drink",
    description: "Soda pop",
    price: 3,
    img: "https://attic.sh/q2mvj3838ejpseebihh3f2qv44wp",
  },
];

const DELIVERY_FEE = 8;

const Checkout = () => {
  const [promoCode, setPromoCode] = useState("");
  const [cart, setCart] = useState(CART);
  const [discount, setDiscount] = useState({ value: 0, description: "" });

  const { data: couponData, isLoading, error, post } = usePost(
    process.env.REACT_APP_COUPON_API_URL
  );

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const total = subtotal + DELIVERY_FEE - (discount.value || 0);

  const handleApplyCoupon = () => {
    if (promoCode) {
      post({ code: promoCode });
    }
  };

  const handleRemoveCoupon = () => {
    setDiscount({ value: 0, description: "" });
    setPromoCode("");
  };

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

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div>
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </div>

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

      <p>
        Subtotal <span className="right">${subtotal.toFixed(2)}</span>
      </p>
      <p>
        Delivery & Handling <span className="right">${DELIVERY_FEE}</span>
      </p>
      {discount.value > 0 && (
        <p>
          Discount <span className="right">- ${discount.value.toFixed(2)}</span>
        </p>
      )}
      <hr />
      <p>
        Total <span className="right">${total.toFixed(2)}</span>
      </p>
      <button className="button">Place order</button>
    </div>
  );
};

export default Checkout;
