import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, BellIcon, ChevronDown, UserCircle, Settings, LogOut } from 'lucide-react';
import Logo from '../image/lambang.png'; // Adjust the path as necessary

const Navbaruser = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(5);
  const [notificationCount, setNotificationCount] = useState(5);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [userData, setUserData] = useState({ nama: 'Guest' }); // Default user data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  
  // Base URL untuk API
  const API_BASE_URL = 'http://localhost:5000';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Load user data from localStorage and verify with API
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token') || localStorage.getItem('authToken');
        
        // Try different keys for stored user data
        let storedUser = localStorage.getItem('userData') || 
                        localStorage.getItem('user') || 
                        localStorage.getItem('userInfo');
        
        console.log('Token found:', !!token);
        console.log('Stored user found:', !!storedUser);
        console.log('Raw stored user:', storedUser);
        
        if (token && storedUser) {
          try {
            const user = JSON.parse(storedUser);
            console.log('Parsed user from localStorage:', user);
            
            // Normalize user data format
            const normalizedUser = {
              userId: user.userId || user.id,
              nama: user.nama || user.name,
              email: user.email
            };
            
            console.log('Normalized user data:', normalizedUser);
            setUserData(normalizedUser);
            
            // Verify token with API and get fresh user data
            await verifyUserToken(token);
          } catch (parseError) {
            console.error('Error parsing stored user data:', parseError);
            handleInvalidAuth();
          }
        } else {
          console.log('No token or user data found - setting as Guest');
          setUserData({ nama: 'Guest' });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        handleInvalidAuth();
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Verify token and get fresh user data from API
  const verifyUserToken = async (token) => {
    try {
      console.log('Verifying token with API...');
      const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      console.log('API Response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('API Response data:', result);
        
        if (result.success && result.data) {
          const freshUserData = {
            userId: result.data.id,
            nama: result.data.nama,
            email: result.data.email,
            created_at: result.data.created_at
          };
          
          console.log('Fresh user data from API:', freshUserData);
          
          // Update localStorage with fresh data (using 'user' key to match current storage)
          localStorage.setItem('user', JSON.stringify(freshUserData));
          
          // Update state
          setUserData(freshUserData);
        } else {
          console.log('Invalid API response:', result);
          // Don't clear auth, just use cached data
          console.log('Using cached user data');
        }
      } else {
        console.log('Token verification failed:', response.status);
        // Don't clear auth on API errors, use cached data
        console.log('Using cached user data due to API error');
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      // Don't clear auth on network errors, keep cached data
      console.log('Using cached user data due to network error');
    }
  };

  // Handle invalid authentication
  const handleInvalidAuth = () => {
    console.log('Handling invalid authentication');
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('user');
    localStorage.removeItem('userInfo');
    setUserData({ nama: 'Guest' });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  // Fungsi untuk melakukan logout lokal
  const performLocalLogout = () => {
    console.log('Performing local logout...'); // Debug log
    
    // Clear all possible stored data
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('user');
    localStorage.removeItem('userInfo');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('user');
    
    // Reset user data
    setUserData({ nama: 'Guest' });
    
    // Close dropdown
    setIsUserDropdownOpen(false);
    
    // Show success message
    alert('Logout berhasil!');
    
    console.log('Redirecting to login page...');
    
    // Redirect dengan replace untuk menghindari back navigation
    navigate('/login', { replace: true });
  };

  const handleLogout = async () => {
    console.log('Logout button clicked'); // Debug log
    
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('authToken');
      
      if (token) {
        console.log('Calling logout API...'); // Debug log
        
        // Call logout API
        const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (response.ok) {
          console.log('Logout API berhasil');
        } else {
          console.log('Logout API gagal, but proceeding with local logout');
        }
      }
    } catch (error) {
      console.error('Logout API error:', error);
      console.log('Proceeding with local logout despite API error');
    } finally {
      // Always perform local logout regardless of API response
      performLocalLogout();
    }
  };

  const handleViewProfile = () => {
    if (userData.nama === 'Guest') {
      navigate('/login');
      return;
    }
    setIsUserDropdownOpen(false);
    navigate('/profile');
  };

  const handleSettings = () => {
    if (userData.nama === 'Guest') {
      navigate('/login');
      return;
    }
    setIsUserDropdownOpen(false);
    navigate('/settings');
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  // Show loading state
  if (isLoading) {
    return (
      <header className="fixed top-0 left-0 w-full bg-white shadow-sm border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <img src={Logo} alt="Logo" className="w-[230px] h-[100px] ml-[-57px]" />
              </div>
            </div>
            <div className="flex items-center space-x-4 ml-8">
              <div className="bg-gray-200 animate-pulse px-4 py-2 rounded-full w-24 h-10"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

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
            <Link to="/home" className="text-gray-700 hover:text-green-500 font-medium transition-colors">
              Home
            </Link>
            <Link to="/produk_user" className="text-gray-700 hover:text-green-500 font-medium transition-colors">
              Produk
            </Link>
            {userData.nama !== 'Guest' && (
              <Link to="/riwayat-pesanan" className="text-gray-700 hover:text-green-500 font-medium transition-colors">
                Riwayat Pesanan
              </Link>
            )}
            {userData.nama !== 'Guest' && (
              <Link to="/notifikasi" className="relative p-2 text-gray-700 hover:text-green-500 font-medium transition-colors">
                <BellIcon className="w-6 h-6" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </Link>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4 ml-8">
            {/* Cart - only show if logged in */}
            {userData.nama !== 'Guest' && (
              <button className="relative p-2 text-gray-700 hover:text-green-500 transition-colors">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            {/* User Dropdown or Login Button */}
            {userData.nama === 'Guest' ? (
              <button 
                onClick={handleLoginRedirect}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-medium transition-colors flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </button>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={toggleUserDropdown}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-medium transition-colors flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span className="max-w-32 truncate">{userData.nama}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm text-gray-500">Masuk sebagai:</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{userData.email}</p>
                    </div>
                    
                    <button
                      onClick={handleViewProfile}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors"
                    >
                      <UserCircle className="w-4 h-4" />
                      <span>Lihat Profil</span>
                    </button>
                    
                    <button
                      onClick={handleSettings}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Pengaturan</span>
                    </button>
                    
                    <hr className="my-1 border-gray-200" />
                    
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Keluar</span>
                    </button>
                  </div>
                )}
              </div>
            )}
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
          <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-green-500 font-medium">
            Home
          </Link>
          <Link to="/produk" className="block px-3 py-2 text-gray-700 hover:text-green-500 font-medium">
            Produk
          </Link>
          {userData.nama !== 'Guest' && (
            <>
              <Link to="/riwayat-pesanan" className="block px-3 py-2 text-gray-700 hover:text-green-500 font-medium">
                Riwayat Pesanan
              </Link>
              <Link to="/notifikasi" className="block px-3 py-2 text-gray-700 hover:text-green-500 font-medium">
                Notifikasi
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbaruser;