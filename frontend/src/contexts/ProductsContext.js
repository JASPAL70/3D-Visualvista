import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
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
    <ProductsContext.Provider value={{ products, error }}>
      {children}
    </ProductsContext.Provider>
  );
};
