import React from "react";
import { Link } from "react-router-dom";

function Cart({ cart, removeFromCart, placeOrder }) {
  const total = cart.reduce((sum, item) => sum + item.finalPrice, 0);

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h1>🛒 Your Cart is Empty</h1>
        <p>Add some delicious food first!</p>
        <Link to="/foods">Explore Foods</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Your Cart 🛒</h1>

      {cart.map((item, index) => (
        <div className="cart-item" key={index}>
          <img src={item.image} alt={item.name} />

          <div>
            <h2>{item.name}</h2>
            <p>Spice: {item.selectedSpice}</p>
            <p>Price: ₹{item.finalPrice}</p>
            <p>
              Removed:{" "}
              {item.removedIngredients?.join(", ") || "Nothing"}
            </p>

            <button onClick={() => removeFromCart(index)}>
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="cart-summary">
        <h2>Total: ₹{total}</h2>

        <button onClick={placeOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Cart;