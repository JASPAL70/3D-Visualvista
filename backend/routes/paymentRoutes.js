const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Process payment
router.post('/create-checkout-session', paymentController.createCheckoutSession);

module.exports = router;