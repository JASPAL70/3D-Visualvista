import React from 'react';
import { useLocation } from 'react-router-dom';
import './PaymentPage.css';

const PaymentPage = () => {
  const location = useLocation();
  const { totalAmount, paymentId, productName, productPrice } = location.state || { totalAmount: 0, paymentId: 'N/A' };

  return (
    <div className="payment-page">
      <h1>Payment</h1>
      {productName && productPrice ? (
        <div>
          <h2>Payment for {productName}</h2>
          <p>Price: ₹{productPrice.toLocaleString('en-IN')}</p>
        </div>
      ) : (
        <div>
          <h2>Total Payment Amount: ₹{totalAmount.toFixed(2)}</h2>
        </div>
      )}
      <h3>Payment ID: {paymentId}</h3>
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




// import React from 'react';
// import './PaymentPage.css';

// const PaymentPage = () => {
//   return (
//     <div className="payment-page">
//       <h1>Payment</h1>
//       <form className="payment-form">
//         <label>
//           Card Number:
//           <input type="text" name="cardNumber" required />
//         </label>
//         <label>
//           Expiry Date:
//           <input type="text" name="expiryDate" required />
//         </label>
//         <label>
//           CVV:
//           <input type="text" name="cvv" required />
//         </label>
//         <label>
//           Cardholder Name:
//           <input type="text" name="cardholderName" required />
//         </label>
//         <button type="submit" className="payment-btn">
//           Pay Now
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PaymentPage;
