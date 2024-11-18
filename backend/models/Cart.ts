import mongoose, { Schema, Document } from 'mongoose';

interface ICart extends Document {
  userId: string; // Default user ID for now
  products: Array<{ productId: string; quantity: number }>;
}

const CartSchema: Schema = new Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
});

export default mongoose.model<ICart>('Cart', CartSchema);
