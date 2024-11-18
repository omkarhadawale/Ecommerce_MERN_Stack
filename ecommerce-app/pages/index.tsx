import { GetServerSideProps } from 'next';
import axios from 'axios';
import Navbar from '../components/Navbar'; 
import '../styles/global.css';
import Footer from '../components/Footer';
import Link from 'next/link';

const Home = ({ products }: { products: any[] }) => {
  return (
    <div className="bg-black min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="container mx-auto py-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="border border-gray-700 rounded-lg bg-gray-900 p-4 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <Link href={`/product/${product._id}`}>
              {/* Product Image */}
              <img
                src={product.imageUrl || '/default-image.png'}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-4"
                onError={(e) => (e.currentTarget.src = '/default-image.png')}
              />
              {/* Product Name */}
              <h2 className="text-lg font-semibold text-white">{product.name}</h2>
              {/* Product Price */}
              <p className="text-gray-400 mt-2">${product.price.toFixed(2)}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get('http://localhost:5000/');
  return { props: { products: res.data } };
};

export default Home;
