import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import cartLogo from '../assets/images/cart-logo.png'; // Ensure the path is correct

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>VisualVista</h1>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/upload">Add item</Link></li>
        <li><Link to="/cart">
          <img src={cartLogo} alt="Cart Logo" className="cart-logo" />
        </Link></li>
        <li><Link to="/about">about</Link></li>
        <li><Link to="/signin">Signin</Link></li>
        <li><Link to="/signup">signup</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css';

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="navbar-brand">
//         <h1>VisualVista</h1>
//       </div>
//       <ul className="navbar-links">
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/upload">Add item</Link></li>
//         <li><Link to="/cart">cart</Link></li>
//         <li><Link to="/about">about</Link></li>
//         <li><Link to="/signin">Signin</Link></li>
//         <li><Link to="/signup">signup</Link></li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
