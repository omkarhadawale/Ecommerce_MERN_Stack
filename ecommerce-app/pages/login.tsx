import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter(); // Access router for navigation

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:5000/login', form);

      // Save token to localStorage
      localStorage.setItem('token', data.token);
      console.log('Token saved:', localStorage.getItem('token'));

      alert('Login successful');

      // Redirect to the previous page or default to /cart
      const redirectTo = router.query.redirect ? String(router.query.redirect) : '/cart';
      console.log('Redirect query:', router.query.redirect);
      console.log('Redirecting to:', redirectTo);

      router.push(redirectTo);
    } catch (error: any) {
      console.error('Error during login:', error);
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          required
          className="block w-full p-2 border border-gray-300 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          required
          className="block w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
