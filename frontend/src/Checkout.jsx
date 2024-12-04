import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import usePost from "./usePost";

const CART = [
  {
    id: 1,
    name: "Pizza",
    description: "20' peperonni",
    price: 15,
    img: "https://attic.sh/jzdlwkqscqk4lyhehzdqhwbfwuul",
  },
  {
    id: 2,
    name: "Drink",
    description: "soda pop",
    price: 3,
    img: "https://attic.sh/q2mvj3838ejpseebihh3f2qv44wp",
  },
];

const Checkout = () => {
  const [promoCode, setPromoCode] = useState("");
  const [cart, setCart] = useState(CART);
  const [subtotal, setSubtotal] = useState(0);
  const [delivery, setDelivery] = useState(8);
  const [total, setTotal] = useState(0);
  const [prevDiscount, setPrevDiscount] = useState(0);
  const [discount, setDiscount] = useState({});

  const { data: couponData, isLoading, error, post } = usePost(
    "http://localhost:3000/api/coupons/validate"
  );

  useEffect(() => {
    // Calculate subtotal
    const sum = cart.reduce((acc, item) => acc + item.price, 0);
    setSubtotal(sum);
    setTotal(sum + delivery);
  }, []);

  const handleApplyCoupon = () => {
    if (promoCode === "") return;

    post({
      code: promoCode
    });
  };

  useEffect(() => {
    if (couponData && couponData.discountType === "flat") {
      setDiscount({ value: couponData.discountValue, description: couponData.message });
      setPrevDiscount(total);
      setTotal(total - couponData.discountValue);
    } else if (couponData && couponData.discountType === "percentage") {
      const discountValue = total * (couponData.discountValue / 100);
      setDiscount({ value: discountValue, description: couponData.message });
      setPrevDiscount(total);
      setTotal(total - discountValue);
    }

  }, [couponData]);

  const handleRemoveCoupon = () => {
    setTotal(prevDiscount);
    setDiscount({});
    setPrevDiscount(0);
    setPromoCode("");
  };

  return (
    <>
      <div className="checkout-container">
        <h1>Checkout</h1>
        <div>
          {cart.map((item) => (
            <CartItem item={item} key={item.id} />
          ))}
        </div>
        <div class="promo-code-container">
          <input
            disabled={discount.value}
            type="text"
            placeholder="Promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="promo-code-input"
          />

          {!discount.value ? (
            <button
              onClick={handleApplyCoupon}
              disabled={isLoading}
              className="promo-code-button">
              {isLoading ? "Applying..." : "Apply"}
            </button>
          ) : (
            <button onClick={handleRemoveCoupon} className="promo-code-button">Remove</button>
          )}
        </div>

          {/* Move description and error below */}
          <div class="promo-messages">
            {discount.description && (
              <span className="coupon-text">{discount.description}</span>
            )}
            {error && (
              <span className="invalid-coupon">{error}</span>
            )}
          </div>
        <p>
          Subtotal <span className="right">${subtotal}</span>
        </p>
        <p>
          Delivery & Handling <span className="right">${delivery}</span>
        </p>
        {discount.value && (
          <p>
            Discount <span className="right">- ${discount.value}</span>
          </p>
        )}
        <div>
          <hr />
        </div>
        <p>
          Total <span className="right">${total}</span>
        </p>
        <button>Place order</button>
      </div>
    </>
  );
};

export default Checkout;
