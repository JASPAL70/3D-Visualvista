import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProductCard.css';
import Product3DViewer from './Product3DViewer'; // Ensure correct path

const ProductCard = ({ product, onAddToCart }) => {
  const { name, price, image } = product;
  const imageUrl = image ? `http://localhost:3001${image}` : null;
  const navigate = useNavigate();

  const handleBuyNow = () => {
    const paymentId = `PAY-${Date.now()}`; // Generate a simple unique payment ID
    navigate('/payment', { state: { paymentId, productName: name, productPrice: price } });
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        {imageUrl && <Product3DViewer src={imageUrl} />}
      </div>
      <div className="product-details">
        <h2>{name}</h2>
        <p className="price">₹{price.toLocaleString('en-IN')}</p>
        <div className="add-to-cart-container">
          <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
            +
          </button>
          <button className="buy-now-btn" onClick={handleBuyNow}>
            Buy Now
          </button>
          <Link to="/cart" className="cart-link">
            Go to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;




// import React from 'react';
// import { Link } from 'react-router-dom';
// import './ProductCard.css';
// import Product3DViewer from './Product3DViewer'; // Ensure correct path

// const ProductCard = ({ product, onAddToCart }) => {
//   const { name, price, image } = product;
//   const imageUrl = image ? `http://localhost:3001${image}` : null;

//   return (
//     <div className="product-card">
//       <div className="product-image-container">
//         {imageUrl && <Product3DViewer src={imageUrl} />}
//       </div>
//       <div className="product-details">
//         <h2>{name}</h2>
//         <p className="price">₹{price.toLocaleString('en-IN')}</p>
//         <div className="add-to-cart-container">
//           <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
//             +
//           </button>
//           <button className="buy-now-btn">
//             Buy Now
//           </button>
//           <Link to="/cart" className="cart-link">
//             Go to Cart
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import './ProductCard.css';
// import Product3DViewer from './Product3DViewer';

// const ProductCard = ({ product, onAddToCart }) => {
//   const { name, price, image } = product;
//   const imageUrl = image ? `http://localhost:3001${image}` : null;

//   console.log('Image URL:', imageUrl); // Add this log to verify URL

//   return (
//     <div className="product-card">
//       <div className="product-image-container" style={{ width: '300px', height: '300px' }}>
//         {imageUrl && <img src={imageUrl} alt={name} />}
//       </div>
//       <h2>{name}</h2>
//       <p className="price">₹{price.toLocaleString('en-IN')}</p>
//       <div className="add-to-cart-container">
//         <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
//           +
//         </button>
//         <button className="buy-now-btn">
//           Buy Now
//         </button>
//         <Link to="/cart" className="cart-link">
//           Go to Cart
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './ProductCard.css';
// import Product3DViewer from './Product3DViewer'; // Ensure correct path

// const ProductCard = ({ product, onAddToCart }) => {
//   const { name, price, image, modelSrc } = product;
//   const imageUrl = image ? `http://localhost:3001${image}` : null;
//   const modelUrl = modelSrc ? `http://localhost:3001${modelSrc}` : null;

//   console.log('Image URL:', imageUrl); // Add this log to verify URL
//   console.log('Model URL:', modelUrl); // Add this log to verify URL

//   return (
//     <div className="product-card">
//       <div className="product-image-container" style={{ width: '300px', height: '300px' }}>
//         {modelUrl ? (
//           <Product3DViewer src={modelUrl} isModel={true} />
//         ) : (
//           imageUrl && <img src={imageUrl} alt={name} />
//         )}
//       </div>
//       <h2>{name}</h2>
//       <p className="price">₹{price.toLocaleString('en-IN')}</p>
//       <div className="add-to-cart-container">
//         <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
//           +
//         </button>
//         <button className="buy-now-btn">
//           Buy Now
//         </button>
//         <Link to="/cart" className="cart-link">
//           Go to Cart
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
