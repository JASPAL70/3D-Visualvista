import React from 'react';
import './PaymentPage.css';

const PaymentPage = () => {
  return (
    <div className="payment-page">
      <h1>Payment</h1>
      <form className="payment-form">
        <label>
          Card Number:
          <input type="text" name="cardNumber" required />
        </label>
        <label>
          Expiry Date:
          <input type="text" name="expiryDate" required />
        </label>
        <label>
          CVV:
          <input type="text" name="cvv" required />
        </label>
        <label>
          Cardholder Name:
          <input type="text" name="cardholderName" required />
        </label>
        <button type="submit" className="payment-btn">
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
