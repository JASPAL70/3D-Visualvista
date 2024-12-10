const Product = require('../models/Product');

// Upload Product Image (Single) & Save Product to DB
const uploadProductImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const imagePath = `/uploads/${req.file.filename}`;

  try {
    const newProduct = new Product({
      name: req.body.name,
      // description: req.body.description,
      price: req.body.price,
      image: imagePath,
    });

    const savedProduct = await newProduct.save();
    return res.status(200).json({ 
      message: 'Product uploaded successfully', 
      product: savedProduct 
    });
  } catch (error) {
    console.error('Error saving product:', error);
    return res.status(500).json({ message: 'Error saving product', error: error.message });
  }
};

// Upload Multiple Product Images & Save Product to DB
const uploadMultipleProductImages = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }

  const imagePaths = req.files.map(file => `/uploads/${file.filename}`);

  try {
    const newProduct = new Product({
      name: req.body.name,
      // description: req.body.description,
      price: req.body.price,
      images: imagePaths, // Assume the Product model has an "images" field as an array
    });

    const savedProduct = await newProduct.save();
    return res.status(200).json({ 
      message: 'Product with multiple images uploaded successfully', 
      product: savedProduct 
    });
  } catch (error) {
    console.error('Error saving product with multiple images:', error);
    return res.status(500).json({ message: 'Error saving product', error: error.message });
  }
};

// Get All Products
const getProducts = async (req, res) => { console.log('Request received at GET /api/products'); try { const products = await Product.find(); console.log('Products fetched:', products); res.status(200).json(products); } catch (error) { console.error('Error fetching products:', error); res.status(500).json({ message: 'Error fetching products', error: error.message }); }
};

// Get Product By ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

// Delete Product By ID
const deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json({ message: `Product with id ${req.params.id} deleted successfully` });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

// Update Product By ID
const updateProductById = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json({ message: `Product with id ${req.params.id} updated successfully`, product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

module.exports = { 
  uploadProductImage, 
  uploadMultipleProductImages, 
  getProducts,
  getProductById,
  deleteProductById,
  updateProductById 
};
