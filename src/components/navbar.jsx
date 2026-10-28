import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User } from 'lucide-react';
import HeroSection from '../pages/login.jsx';
import Logo from '../image/lambang.png';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm border-b z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
               <img src={Logo} alt="Logo" className="w-[230px] h-[100px] ml-[-57px]" />
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Kamu mau belanja apa"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                className="w-full px-4 py-2 pl-4 pr-12 text-gray-700 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                onClick={handleSearch}
                className="absolute right-1 top-1 bottom-1 px-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/OLShopSections" className="text-gray-700 hover:text-green-500 font-medium transition-colors">
              Home
            </Link> 
            <Link to="/produk" className="text-gray-700 hover:text-green-500 font-medium transition-colors">
              Produk
            </Link>
            <Link to="/tentang" className="text-gray-700 hover:text-green-500 font-medium transition-colors">
              Tentang Kami
            </Link>
            <Link to="/kontak" className="text-gray-700 hover:text-green-500 font-medium transition-colors">
              Contacts
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4 ml-8">
            {/* Cart */}
            <button className="relative p-2 text-gray-700 hover:text-green-500 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Login/Register Button */}
          <Link 
          to="/login"  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-medium transition-colors flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Daftar/Masuk</span>
          </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 text-gray-700 hover:text-green-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu (hidden by default) */}
      <div className="md:hidden border-t bg-white">
        <div className="px-4 py-2 space-y-1">
          <a href="#" className="block px-3 py-2 text-gray-700 hover:text-green-500 font-medium">
            Home
          </a>
          <a href="#" className="block px-3 py-2 text-gray-700 hover:text-green-500 font-medium">
            Produk
          </a>
          <a href="#" className="block px-3 py-2 text-gray-700 hover:text-green-500 font-medium">
            Tentang Kami
          </a>
          <a href="#" className="block px-3 py-2 text-gray-700 hover:text-green-500 font-medium">
            Contacts
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;