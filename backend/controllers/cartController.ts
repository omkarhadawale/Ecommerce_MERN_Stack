import { Request, Response } from 'express';
import Cart from '../models/Cart';
import { JwtPayload } from 'jsonwebtoken';

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    const userId = 'default-user'; // Use a default user for now

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const existingProduct = cart.products.find(
      (p) => p.productId.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error });
  }
};

export const getCart = async (req: Request, res: Response) => {
    try {
      const userId = (req.user as JwtPayload).id; // Extract user ID from decoded token
      const cart = await Cart.findOne({ userId }).populate('products.productId');
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      res.status(200).json(cart);
    } catch (error) {
      console.error('Error fetching cart:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
