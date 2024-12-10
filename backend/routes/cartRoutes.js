const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Get user cart
router.get('/:userId', cartController.getCart);

// Add item to cart
router.post('/add', cartController.addToCart);

module.exports = router;