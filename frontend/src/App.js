import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CartPage from './pages/CartPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import PaymentPage from './pages/PaymentPage';
import About from './pages/About';
import ProductList from './components/ProductList';
import Product3DViewer from './components/Product3DViewer';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';
import axios from 'axios';
import UploadForm from './components/UploadForm';
import { ProductsProvider } from './contexts/ProductsContext'; // Adjusted import path

const App = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/products');
        setProducts(response.data);
        console.log('Fetched Products:', response.data);  // Log products to verify data
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.name} has been added to your cart!`);
  };

  return (
    <ProductsProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<ProductList products={products} onAddToCart={handleAddToCart} />} />
            <Route path="/cart" element={<CartPage cart={cart} />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/product-viewer" element={<Product3DViewer />} />
            <Route path="/upload" element={<UploadForm />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ProductsProvider>
  );
};

export default App;


// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import CartPage from './pages/CartPage';
// import SignInPage from './pages/SignInPage';
// import SignUpPage from './pages/SignUpPage';
// import PaymentPage from './pages/PaymentPage';
// import About from './pages/About';
// import ProductList from './components/ProductList';
// import Product3DViewer from './components/Product3DViewer';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import './App.css';
// import axios from 'axios';
// import UploadForm from './components/UploadForm';
// import { ProductsProvider } from './contexts/ProductsContext'; // Adjusted import path

// const App = () => {
//   const [cart, setCart] = useState([]);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/api/products');
//         setProducts(response.data);
//         console.log('Fetched Products:', response.data);  // Log products to verify data
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleAddToCart = (product) => {
//     setCart((prevCart) => [...prevCart, product]);
//     alert(`${product.name} has been added to your cart!`);
//   };

//   return (
//     <ProductsProvider>
//       <Router>
//         <div className="app">
//           <Navbar />
//           <Routes>
//             <Route exact path="/" element={<ProductList products={products} onAddToCart={handleAddToCart} />} />
//             <Route path="/cart" element={<CartPage cart={cart} />} />
//             <Route path="/signin" element={<SignInPage />} />
//             <Route path="/signup" element={<SignUpPage />} />
//             <Route path="/payment/:productId" element={<PaymentPage />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/product-viewer" element={<Product3DViewer />} />
//             <Route path="/upload" element={<UploadForm />} />
//           </Routes>
//           <Footer />
//         </div>
//       </Router>
//     </ProductsProvider>
//   );
// };

// export default App;
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import CartPage from './pages/CartPage';
// import SignInPage from './pages/SignInPage';
// import SignUpPage from './pages/SignUpPage';
// import PaymentPage from './pages/PaymentPage';
// import About from './pages/About';
// import ProductList from './components/ProductList';
// import Product3DViewer from './components/Product3DViewer';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import './App.css';
// import axios from 'axios';
// import UploadForm from './components/UploadForm';
// import { ProductsProvider } from './contexts/Products';

// const App = () => {
//   const [cart, setCart] = useState([]);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/api/products');
//         setProducts(response.data);
//         console.log('Fetched Products:', response.data);  // Log products to verify data
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleAddToCart = (product) => {
//     setCart((prevCart) => [...prevCart, product]);
//     alert(`${product.name} has been added to your cart!`);
//   };

//   return (
//     <Router>
//       <div className="app">
//         <Navbar />
//         <Routes>
//           <Route exact path="/" element={<ProductList products={products} onAddToCart={handleAddToCart} />} />
//           <Route path="/cart" element={<CartPage cart={cart} />} />
//           <Route path="/signin" element={<SignInPage />} />
//           <Route path="/signup" element={<SignUpPage />} />
//           <Route path="/payment" element={<PaymentPage />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/product-viewer" element={<Product3DViewer />} />
//           <Route path="/upload" element={<UploadForm />} />
//           <Route path="/payment/:productId" component={PaymentPage} />
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   );
// };

// export default App;


// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
// import CartPage from './pages/CartPage';
// import SignInPage from './pages/SignInPage';
// import SignUpPage from './pages/SignUpPage';
// import PaymentPage from './pages/PaymentPage';
// import ContactUs from './pages/ContactUs';
// import About from './pages/About';
// import ProductList from './components/ProductList';
// import Product3DViewer from './components/Product3DViewer';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import './App.css';
// import axios from 'axios';

// const App = () => {
//   const [cart, setCart] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [modelUrls, setModelUrls] = useState([
//     'http://localhost:3000/file/audio-1840073_640.jpg',
//     'http://localhost:3000/file/headphones-4434215_640.jpg'
//   ]);

//   useEffect(() => {
//     // Fetch products from API
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/api/products');
//         setProducts(response.data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleAddToCart = (product) => {
//     setCart((prevCart) => [...prevCart, product]);
//     alert(`${product.name} has been added to your cart!`);
//   };

//   return (
//     <Router>
//       <div className="app">
//         <Navbar />
//         <Routes>
//           <Route exact path="/" element={<Home onAddToCart={handleAddToCart} />} />
//           <Route path="/cart" element={<CartPage cart={cart} />} />
//           <Route path="/signin" element={<SignInPage />} />
//           <Route path="/signup" element={<SignUpPage />} />
//           <Route path="/payment" element={<PaymentPage />} />
//           <Route path="/contact" element={<ContactUs />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/products" element={<ProductList products={products} onAddToCart={handleAddToCart} />} />
//           <Route path="/product-viewer" element={<Product3DViewer modelUrls={modelUrls} />} />
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   );
// };

// export default App;


// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
// import CartPage from './pages/CartPage';
// import SignInPage from './pages/SignInPage';
// import SignUpPage from './pages/SignUpPage';
// import PaymentPage from './pages/PaymentPage';
// import ContactUs from './pages/ContactUs';
// import About from './pages/About';
// import ProductList from './components/ProductList';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import './App.css';
// import axios from 'axios';

// const App = () => {
//   const [cart, setCart] = useState([]);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     // Fetch products from API
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/api/products');
//         setProducts(response.data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleAddToCart = (product) => {
//     setCart((prevCart) => [...prevCart, product]);
//     alert(`${product.name} has been added to your cart!`);
//   };

//   return (
//     <Router>
//       <div className="app">
//         <Navbar />
//         <Routes>
//           <Route exact path="/" element={<Home onAddToCart={handleAddToCart} />} />
//           <Route path="/cart" element={<CartPage cart={cart} />} />
//           <Route path="/signin" element={<SignInPage />} />
//           <Route path="/signup" element={<SignUpPage />} />
//           <Route path="/payment" element={<PaymentPage />} />
//           <Route path="/contact" element={<ContactUs />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/products" element={<ProductList products={products} onAddToCart={handleAddToCart} />} />
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   );
// };

// export default App;
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
// import CartPage from './pages/CartPage';
// import SignInPage from './pages/SignInPage';
// import SignUpPage from './pages/SignUpPage';
// import PaymentPage from './pages/PaymentPage';
// import ContactUs from './pages/ContactUs';
// import About from './pages/About';
// import ProductList from './components/ProductList';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import './App.css';

// const App = () => {
//   const [cart, setCart] = useState([]);

//   const handleAddToCart = (product) => {
//     setCart((prevCart) => [...prevCart, product]);
//     alert(`${product.name} has been added to your cart!`);
//   };

//   return (
//     <Router>
//       <div className="app">
//         <Navbar />
//         <Routes>
//           <Route exact path="/" element={<Home onAddToCart={handleAddToCart} />} />
//           <Route path="/cart" element={<CartPage cart={cart} />} />
//           <Route path="/signin" element={<SignInPage />} />
//           <Route path="/signup" element={<SignUpPage />} />
//           <Route path="/payment" element={<PaymentPage />} />
//           <Route path="/contact" element={<ContactUs />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/products" element={<ProductList />} />
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   );
// };

// export default App;
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
// import CartPage from './pages/CartPage';
// import SignInPage from './pages/SignInPage';
// import SignUpPage from './pages/SignUpPage';
// import PaymentPage from './pages/PaymentPage';
// import ContactUs from './pages/ContactUs';
// import About from './pages/About';
// import ProductList from './components/ProductList';  // Import the ProductList component
// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route exact path="/" element={<Home />} />
//         <Route path="/cart" element={<CartPage />} />
//         <Route path="/signin" element={<SignInPage />} />
//         <Route path="/signup" element={<SignUpPage />} />
//         <Route path="/payment" element={<PaymentPage />} />
//         <Route path="/contact" element={<ContactUs />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/products" element={<ProductList />} /> {/* Use ProductList here */}
//       </Routes>
//     </Router>
//   );
// };

// export default App;
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
// import CartPage from './pages/CartPage';
// import SignInPage from './pages/SignInPage';
// import SignUpPage from './pages/SignUpPage';
// import PaymentPage from './pages/PaymentPage';
// import ContactUs from './pages/ContactUs';
// import About from './pages/About';
// import ProductList from './components/ProductList';


// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route exact path="/" element={<Home />} />
//         <Route path="/cart" element={<CartPage />} />
//         <Route path="/signin" element={<SignInPage />} />
//         <Route path="/signup" element={<SignUpPage />} />
//         <Route path="/payment" element={<PaymentPage />} />
//         <Route path="/contact" element={<ContactUs />} />
//         <Route path="/about" element={<About />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
// // import React from 'react';
// // import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// // import Home from './pages/Home';
// // import CartPage from './pages/CartPage';
// // import SignInPage from './pages/SignInPage';
// // import SignUpPage from './pages/SignUpPage';
// // import PaymentPage from './pages/PaymentPage';
// // import ContactUs from './pages/ContactUs';
// // import About from './pages/About';

// // const App = () => {
// //   return (
// //     <Router>
// //       <Switch>
// //         <Route exact path="/" component={Home} />
// //         <Route path="/cart" component={CartPage} />
// //         <Route path="/signin" component={SignInPage} />
// //         <Route path="/signup" component={SignUpPage} />
// //         <Route path="/payment" component={PaymentPage} />
// //         <Route path="/contact" component={ContactUs} />
// //         <Route path="/about" component={About} />
// //       </Switch>
// //     </Router>
// //   );
// // };

// // export default App;
