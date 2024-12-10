import React from 'react';
import { Link } from 'react-router-dom';
import './CartPage.css';

const CartPage = ({ cart }) => {
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h2>{item.name}</h2>
                  <p className="price">₹{item.price.toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h2>Total Amount: ₹{totalAmount.toFixed(2)}</h2>
            <Link to="/payment" className="buy-now-btn">
              Buy Now
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
