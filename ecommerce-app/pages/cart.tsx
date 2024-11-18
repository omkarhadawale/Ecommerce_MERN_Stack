import { GetServerSideProps } from 'next';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const CartPage = ({ cart }: { cart: any }) => {
  const router = useRouter();

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login and include the current path as a query parameter
      router.push(`/login?redirect=${router.pathname}`);
    }
  }, [router]);

  return (
    <div className="bg-black min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4 flex-grow">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Your Cart</h1>

        {cart?.products?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cart.products.map((item: any) => (
              <div
                key={item.productId._id}
                className="border border-gray-700 rounded-lg bg-gray-900 p-4 text-center hover:shadow-lg transition-shadow duration-300"
              >
                {/* Product Image */}
                <img
                  src={item.productId.imageUrl || '/default-image.png'}
                  alt={item.productId.name}
                  className="w-full h-48 object-cover rounded mb-4"
                  onError={(e) => (e.currentTarget.src = '/default-image.png')}
                />
                {/* Product Name */}
                <h2 className="text-lg font-semibold text-white">{item.productId.name}</h2>
                {/* Quantity */}
                <p className="text-gray-400 mt-2">Quantity: {item.quantity}</p>
                {/* Price */}
                <p className="text-gray-400">Price: ${item.productId.price.toFixed(2)}</p>
                {/* Total Price */}
                <p className="text-gray-400">
                  Total: ${(item.productId.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center">Your cart is currently empty.</p>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies.token; // Get the token from cookies (sent via SSR)
  if (!token) {
    // Redirect unauthenticated users to the login page with a redirect query parameter
    return {
      redirect: {
        destination: `/login?redirect=${context.resolvedUrl}`, // Add redirect to the current page
        permanent: false,
      },
    };
  }

  try {
    const res = await axios.get(`http://localhost:5000/cart`, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
      },
    });
    return { props: { cart: res.data } };
  } catch (error) {
    console.error('Error fetching cart:', error);
    return { props: { cart: { products: [] } } }; // Return an empty cart if there's an error
  }
};

export default CartPage;
