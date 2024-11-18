import express from 'express';
import { getProductById,getAllProducts, createProduct } from '../controllers/productController';

const router = express.Router();

router.get('/', getAllProducts);

router.post('/', createProduct);

router.get('/:id', getProductById);

export default router;
