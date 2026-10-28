import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import Logo from '../image/lambang.png'; // Adjust the path as necessary

const Navbarlogin = () => {
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

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-20">
             <div className="flex-1 max-w-md mx-8">
           
          </div>
          
            <a href="#" className="text-gray-700 hover:text-green-500 font-medium transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-green-500 font-medium transition-colors">
              Produk
            </a>
            <a href="#" className="text-gray-700 hover:text-green-500 font-medium transition-colors">
              Tentang Kami
            </a>
            <a href="#" className="text-gray-700 hover:text-green-500 font-medium transition-colors">
              Contacts
            </a>

            
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4 ml-8">
            {/* Cart */}
            

            {/* Login/Register Button */}
          
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
        <div className="px-4 py-2 space-y-3">
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

export default Navbarlogin;