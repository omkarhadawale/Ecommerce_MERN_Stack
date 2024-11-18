import { FaUserCircle } from 'react-icons/fa'; // Importing a user icon from react-icons

const Navbar = () => (
  <nav className="bg-black/80 backdrop-blur-md py-4 shadow-lg sticky top-0 z-50">
    <div className="container mx-auto flex justify-between items-center">
      {/* Logo */}
      <div className="text-gray-100 text-xl font-bold tracking-wide">My Store</div>

      {/* Navigation Links */}
      <ul className="flex space-x-6 items-center">
        <li className="text-gray-100 text-lg hover:text-gray-300 transition-colors duration-200 cursor-pointer">
          Home
        </li>
        <li className="text-gray-100 text-lg hover:text-gray-300 transition-colors duration-200 cursor-pointer">
          Products
        </li>
        <li className="text-gray-100 text-lg hover:text-gray-300 transition-colors duration-200 cursor-pointer">
        <a href="/cart">Cart</a>
        </li>
        {/* User Profile Icon */}
        <li className="text-gray-100 text-lg hover:text-gray-300 transition-colors duration-200 cursor-pointer">
          <a href="/profile" className="flex items-center space-x-2">
            <FaUserCircle className="text-2xl" /> {/* Profile Icon */}
         
          </a>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
