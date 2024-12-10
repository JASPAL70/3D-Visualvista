const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String }, // URL to the image
  modelSrc: { type: String } // URL to the GLB model
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
