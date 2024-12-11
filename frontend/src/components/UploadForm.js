import React, { useState } from 'react';
import axios from 'axios';
import './UploadForm.css'; // Import the CSS file

const UploadForm = () => {
  const [products, setProducts] = useState([{ name: '', price: '', file: null }]);

  const handleProductChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      const newProducts = [...products];
      newProducts[index].file = file;
      setProducts(newProducts);
    } else {
      alert('Please upload only JPEG images.');
    }
  };

  const addProduct = () => {
    setProducts([...products, { name: '', price: '', file: null }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    products.forEach((product, index) => {
      formData.append(`name${index}`, product.name);
      formData.append(`price${index}`, product.price);
      formData.append(`file${index}`, product.file);
    });

    console.log('FormData entries:', formData.entries());

    try {
      const response = await axios.post('http://localhost:3001/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(response.data);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Products</h2>
      {products.map((product, index) => (
        <div key={index}>
          <label htmlFor={`name${index}`}>Product Name</label>
          <input
            type="text"
            id={`name${index}`}
            name={`name${index}`}
            value={product.name}
            onChange={(e) => handleProductChange(index, 'name', e.target.value)}
            placeholder="Product Name"
            required
          />
          <label htmlFor={`price${index}`}>Price</label>
          <input
            type="number"
            id={`price${index}`}
            name={`price${index}`}
            value={product.price}
            onChange={(e) => handleProductChange(index, 'price', e.target.value)}
            placeholder="Price"
            required
          />
          <label htmlFor={`file${index}`}>Product Image</label>
          <input
            type="file"
            id={`file${index}`}
            name={`file${index}`}
            accept="image/jpeg, image/jpg"
            onChange={(e) => handleFileChange(index, e)}
            required
          />
        </div>
      ))}
      <button type="button" onClick={addProduct}>Add Another Product</button>
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
// import React, { useState } from 'react';
// import axios from 'axios';
// import './UploadForm.css'; // Import the CSS file

// const UploadForm = () => {
//   const [products, setProducts] = useState([{ name: '', price: '', file: null }]);

//   const handleProductChange = (index, field, value) => {
//     const newProducts = [...products];
//     newProducts[index][field] = value;
//     setProducts(newProducts);
//   };

//   const handleFileChange = (index, e) => {
//     const file = e.target.files[0];
//     if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
//       const newProducts = [...products];
//       newProducts[index].file = file;
//       setProducts(newProducts);
//     } else {
//       alert('Please upload only JPEG images.');
//     }
//   };

//   const addProduct = () => {
//     setProducts([...products, { name: '', price: '', file: null }]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();

//     products.forEach((product, index) => {
//       formData.append(`name${index}`, product.name);
//       formData.append(`price${index}`, product.price);
//       formData.append(`file${index}`, product.file);
//     });

//     console.log('FormData entries:', formData.entries());

//     try {
//       const response = await axios.post('http://localhost:3001/api/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       alert(response.data);
//     } catch (error) {
//       console.error('Error uploading files:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Upload Products</h2>
//       {products.map((product, index) => (
//         <div key={index}>
//           <input
//             type="text"
//             value={product.name}
//             onChange={(e) => handleProductChange(index, 'name', e.target.value)}
//             placeholder="Product Name"
//             required
//           />
//           <input
//             type="number"
//             value={product.price}
//             onChange={(e) => handleProductChange(index, 'price', e.target.value)}
//             placeholder="Price"
//             required
//           />
//           <input
//             type="file"
//             accept="image/jpeg, image/jpg"
//             onChange={(e) => handleFileChange(index, e)}
//             required
//           />
//         </div>
//       ))}
//       <button type="button" onClick={addProduct}>Add Another Product</button>
//       <button type="submit">Upload</button>
//     </form>
//   );
// };

// export default UploadForm;
// import React, { useState } from 'react';
// import axios from 'axios';
// import './UploadForm.css'; // Import the CSS file

// const UploadForm = () => {
//   const [products, setProducts] = useState([{ name: '', price: '', file: null }]);

//   const handleProductChange = (index, field, value) => {
//     const newProducts = [...products];
//     newProducts[index][field] = value;
//     setProducts(newProducts);
//   };

//   const handleFileChange = (index, e) => {
//     const newProducts = [...products];
//     newProducts[index].file = e.target.files[0];
//     setProducts(newProducts);
//   };

//   const addProduct = () => {
//     setProducts([...products, { name: '', price: '', file: null }]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();

//     products.forEach((product, index) => {
//       formData.append(`name${index}`, product.name);
//       formData.append(`price${index}`, product.price);
//       formData.append(`file${index}`, product.file);
//     });

//     console.log('FormData entries:', formData.entries());

//     try {
//       const response = await axios.post('http://localhost:3001/api/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       alert(response.data);
//     } catch (error) {
//       console.error('Error uploading files:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Upload Products</h2>
//       {products.map((product, index) => (
//         <div key={index}>
//           <input
//             type="text"
//             value={product.name}
//             onChange={(e) => handleProductChange(index, 'name', e.target.value)}
//             placeholder="Product Name"
//             required
//           />
//           <input
//             type="number"
//             value={product.price}
//             onChange={(e) => handleProductChange(index, 'price', e.target.value)}
//             placeholder="Price"
//             required
//           />
//           <input
//             type="file"
//             onChange={(e) => handleFileChange(index, e)}
//             required
//           />
//         </div>
//       ))}
//       <button type="button" onClick={addProduct}>Add Another Product</button>
//       <button type="submit">Upload</button>
//     </form>
//   );
// };

// export default UploadForm;
