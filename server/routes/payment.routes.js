import express from 'express';
import { createPaymentIntent, getPublishableKey } from '../controllers/payment.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/create-payment-intent', protect, createPaymentIntent);
router.get('/config', getPublishableKey);

export default router;
