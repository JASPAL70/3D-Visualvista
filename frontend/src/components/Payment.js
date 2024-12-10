import React from 'react';
import './Payment.css';

const Payment = () => {
  return (
    <div className="payment">
      <h1>Payment</h1>
      <form>
        <label>Card Number:</label>
        <input type="text" placeholder="1234 5678 9012 3456" />

        <label>Expiry Date:</label>
        <input type="text" placeholder="MM/YY" />

        <label>CVV:</label>
        <input type="text" placeholder="123" />

        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default Payment;
