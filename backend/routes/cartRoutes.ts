import express from 'express';
import { addToCart, getCart } from '../controllers/cartController';

const router = express.Router();

router.post('/add', addToCart); // Add product to cart
router.get('/', getCart); // Retrieve cart

export default router;
