import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './routes/productRoutes';
import cartRoutes from './routes/cartRoutes';
import authRoutes from './routes/authRoutes'; 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); 

// Register the routes
app.use('/', productRoutes);
app.use('/cart', cartRoutes);
app.use('/', authRoutes)

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

export default app;
