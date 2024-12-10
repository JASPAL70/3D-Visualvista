import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Visualvista</h3>
          <p>VisualVista is eCommerce platform featuring 3D product viewing capabilities.</p>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email:jasub787@gmail.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 Company Name. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
