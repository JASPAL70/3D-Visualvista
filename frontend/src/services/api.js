import axios from 'axios';

// Use a default value if REACT_APP_API_URL is undefined
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const fetchProducts = async () => { try { const response = await axios.get('http://localhost:3001/api/products'); return response.data; } catch (error) { console.error('Error fetching products:', error); throw error; } };


export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/api/products`, productData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error.response?.data || error.message);
    throw error;
  }
};

export const uploadProductImage = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/api/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading product image:', error.response?.data || error.message);
    throw error;
  }
};

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error.response?.data || error.message);
    throw error;
  }
};

export const signin = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error signing in:', error.response?.data || error.message);
    throw error;
  }
};

export const contactUs = async (messageData) => {
  try {
    const response = await axios.post(`${API_URL}/contact`, messageData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error.response?.data || error.message);
    throw error;
  }
};
