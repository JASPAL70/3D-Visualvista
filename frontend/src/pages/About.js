import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './About.css';
import { FaHeadphones, FaClock, FaMobileAlt, FaShoppingCart } from 'react-icons/fa';

const About = () => {
  return (
    <div className="about-page">
      <Navbar />
      <div className="about-header">
        <h1>About VisualVista</h1>
      </div>
      <div className="about-content">
        <div className="about-description">
          <p>
            Welcome to <strong>VisualVista</strong>, your premier e-commerce destination for the latest in electronics. Our platform is designed to provide an immersive shopping experience with 3D viewing capabilities for a variety of products, including smartwatches, headphones, earphones, and earbuds.
          </p>
          <p>
            At VisualVista, we believe in the power of visualization. Our 3D viewing feature allows you to explore products from every angle, helping you make informed purchasing decisions. Whether you're looking for the perfect pair of headphones or the latest smartwatch, we have you covered.
          </p>
          <p>
            Our user-friendly platform also offers the ability to add new products, ensuring our catalog is always up-to-date with the latest innovations. Join us at VisualVista and take your shopping experience to the next level.
          </p>
        </div>
        <div className="about-cards">
          <div className="about-card">
            <FaClock size={50} />
            <h3>Smartwatches</h3>
            <p>Explore a range of smartwatches that offer cutting-edge features and stylish designs.</p>
          </div>
          <div className="about-card">
            <FaHeadphones size={50} />
            <h3>Headphones</h3>
            <p>Discover headphones that deliver exceptional sound quality and comfort.</p>
          </div>
          <div className="about-card">
            <FaMobileAlt size={50} />
            <h3>Earphones</h3>
            <p>Find the perfect pair of earphones for your daily commute or workout sessions.</p>
          </div>
          <div className="about-card">
            <FaShoppingCart size={50} />
            <h3>Earbuds</h3>
            <p>Check out our selection of earbuds that combine convenience with top-notch audio performance.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;

// import React from 'react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import './About.css';

// const About = () => {
//   return (
//     <div className="about-page">
//       <Navbar />
//       <div className="about-content">
//         <h1>About VisualVista</h1>
//         <p>
//           Welcome to VisualVista, your premier e-commerce destination for the latest in electronics. Our platform is designed to provide an immersive shopping experience with 3D viewing capabilities for a variety of products, including smartwatches, headphones, earphones, and earbuds.
//         </p>
//         <p>
//           At VisualVista, we believe in the power of visualization. Our 3D viewing feature allows you to explore products from every angle, helping you make informed purchasing decisions. Whether you're looking for the perfect pair of headphones or the latest smartwatch, we have you covered.
//         </p>
//         <p>
//           Our user-friendly platform also offers the ability to add new products, ensuring our catalog is always up-to-date with the latest innovations. Join us at VisualVista and take your shopping experience to the next level.
//         </p>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default About;


