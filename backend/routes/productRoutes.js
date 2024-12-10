const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { upload, uploadMultiple, handleError } = require('../config/uploadConfig');

// Route to upload a single image
router.post('/upload-single', (req, res, next) => {
    console.log('POST /api/products/upload-single');
    const singleUpload = upload.single('image'); // Ensure the field name matches exactly
    singleUpload(req, res, (err) => {
        if (err) {
            return handleError(err, req, res, next);
        }
        productController.uploadProductImage(req, res);
    });
});

// Route to upload multiple images
router.post('/upload-multiple', (req, res, next) => {
    console.log('POST /api/products/upload-multiple');
    const multipleUpload = uploadMultiple('images', 5); // Ensure the field name matches exactly
    multipleUpload(req, res, (err) => {
        if (err) {
            return handleError(err, req, res, next);
        }
        productController.uploadMultipleProductImages(req, res);
    });
});

// Route to fetch all products
router.get('/', (req, res) => {
    console.log('GET /api/products');
    productController.getProducts(req, res);
});

// Route to fetch a specific product by ID
router.get('/:id', (req, res) => {
    console.log(`GET /api/products/${req.params.id}`);
    productController.getProductById(req, res);
});

// Route to delete a product by ID
router.delete('/:id', (req, res) => {
    console.log(`DELETE /api/products/${req.params.id}`);
    productController.deleteProductById(req, res);
});

// Route to update a product by ID
router.put('/:id', (req, res, next) => {
    console.log(`PUT /api/products/${req.params.id}`);
    const singleUpload = upload.single('image'); // Ensure the field name matches exactly
    singleUpload(req, res, (err) => {
        if (err) {
            return handleError(err, req, res, next);
        }
        productController.updateProductById(req, res);
    });
});

module.exports = router;
