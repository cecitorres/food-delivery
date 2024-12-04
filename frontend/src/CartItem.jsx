const CartItem = ({ item }) => {
  return (
    <div className="checkout-item">
      <img src={item.img} alt="" className="item-image" />
      <div className="item-details">
        <h4 className="item-title">{item.name}</h4>
        <p className="item-description">{item.description}</p>
      </div>
      <div className="item-price">
        ${item.price}
      </div>
    </div>
  );
};

export default CartItem;