import { useState } from "react";
import CartItem from "./CartItem";
import Coupon from "./Coupon";

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
  const [cart] = useState(CART);
  const [discount, setDiscount] = useState({ value: 0, description: "" });

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const total = subtotal + DELIVERY_FEE - discount.value;

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div>
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </div>

      <Coupon subtotal={subtotal} discount={discount} setDiscount={setDiscount} />

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
