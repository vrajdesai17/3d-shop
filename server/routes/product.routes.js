import express from 'express';
import { getAllProducts, getProductByType, calculatePrice } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:type', getProductByType);
router.post('/calculate-price', calculatePrice);

export default router;
