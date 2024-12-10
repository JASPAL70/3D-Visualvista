import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/products');
        setProducts(response.data);
        console.log('Fetched Products:', response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      {error ? (
        <div className="error-message">Error fetching products: {error}</div>
      ) : (
        products.map(product => (
          <ProductCard key={product._id} product={product} onAddToCart={onAddToCart} />
        ))
      )}
    </div>
  );
};

export default ProductList;

// import React from 'react';
// import ProductCard from './ProductCard'; // Ensure correct path
// import './ProductList.css'; // Import your CSS file

// const ProductList = ({ products, onAddToCart }) => {
//   return (
//     <div className="product-list">
//       {products.map((product) => (
//         <ProductCard key={product._id} product={product} onAddToCart={onAddToCart} />
//       ))}
//     </div>
//   );
// };

// export default ProductList;


// import React, { useEffect, useState } from 'react';
// import ProductCard from './ProductCard';  // Import ProductCard

// const ProductList = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:3001/api/products')
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setProducts(data);
//       })
//       .catch((error) => console.error('Error fetching products:', error));
//   }, []);

//   return (
//     <div className="product-list">
//       {products.map((product) => (
//         <ProductCard key={product._id} product={product} />  // Use ProductCard here
//       ))}
//     </div>
//   );
// };

// export default ProductList;
