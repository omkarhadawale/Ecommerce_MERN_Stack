import { GetServerSideProps } from 'next';
import axios from 'axios';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ProductDetail = ({ product }: { product: any }) => {
  const router = useRouter();

  const addToCart = async () => {
    try {
      await axios.post('http://localhost:5000/cart/add', {
        productId: product._id,
        quantity: 1,
      });
      alert('Product added to cart');
    } catch (error) {
      console.error('Error adding to cart', error);
      alert('Failed to add product to cart');
    }
  };

  const buyNow = () => {
    alert('Buy now functionality will be implemented later!');
  };

  return (
    <div className="bg-black min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow container mx-auto py-8 px-4 text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Product Image */}
          <div className="w-full">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>
            <p className="text-lg text-gray-400 mb-6">{product.description}</p>
            <p className="text-2xl font-semibold text-white mb-6">
              Price: ${product.price.toFixed(2)}
            </p>
            <div className="flex space-x-4">
              <button
                onClick={addToCart}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={buyNow}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const res = await axios.get(`http://localhost:5000/${id}`);
  return { props: { product: res.data } };
};

export default ProductDetail;
