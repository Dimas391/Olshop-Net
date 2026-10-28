import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Navbarlogin from '../components/navbar_login.jsx';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../image/icon.png';

const OlshopLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      // User already logged in, redirect to dashboard
      navigate('/home');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const errors = {};

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = 'Email harus diisi';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Format email tidak valid';
    }

    // Validate password
    if (!formData.password) {
      errors.password = 'Password harus diisi';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email.toLowerCase().trim(),
          password: formData.password
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(data.message);
        
        // Save user data and token to localStorage
        localStorage.setItem('authToken', data.data.token);
        localStorage.setItem('user', JSON.stringify({
          userId: data.data.userId,
          nama: data.data.nama,
          email: data.data.email
        }));

        // Save "remember me" preference
        if (formData.remember) {
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('rememberMe');
        }

        // Reset form
        setFormData({
          email: '',
          password: '',
          remember: false
        });

        // Redirect to home/dashboard after 1.5 seconds
        setTimeout(() => {
          navigate('/home');
        }, 1500);

      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Terjadi kesalahan koneksi. Pastikan server backend berjalan.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center font-sans">
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-30px);
          }
          60% {
            transform: translateY(-15px);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes spin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }

        .slide-up {
          animation: slideUp 0.8s ease-out;
        }

        .float-1 {
          animation: float 6s ease-in-out infinite;
        }

        .float-2 {
          animation: float 8s ease-in-out infinite reverse;
        }

        .float-3 {
          animation: float 7s ease-in-out infinite;
        }

        .loading-button::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>

      {/* Header */}
      <Navbarlogin />

      {/* Login Container */}
      <div className="slide-up bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 max-w-4xl w-full mx-5 mt-20">
        {/* Left Side - Form */}
        <div className="p-12 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-green-500 mb-2">Selamat Datang Kembali!</h1>
            <p className="text-gray-600 text-lg">Masuk ke akun Anda untuk melanjutkan berbelanja</p>
          </div>

          {errorMessage && (
            <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-center">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-500 text-white p-3 rounded-lg mb-4 text-center">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className={`flex flex-col gap-6 ${errorMessage ? 'shake' : ''}`}>
            {/* Email Field */}
            <div className="relative">
              <label htmlFor="email" className="block mb-2 text-gray-700 font-semibold text-sm">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Masukkan email Anda"
                className={`w-full p-4 pl-12 border-2 rounded-xl text-base transition-all bg-gray-50 focus:outline-none focus:bg-white focus:shadow-lg ${
                  validationErrors.email 
                    ? 'border-red-300 focus:border-red-500 focus:shadow-red-100' 
                    : 'border-gray-200 focus:border-green-500 focus:shadow-green-100'
                }`}
              />
              <Mail className="absolute left-4 top-12 text-gray-500 w-5 h-5" />
              {validationErrors.email && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <label htmlFor="password" className="block mb-2 text-gray-700 font-semibold text-sm">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Masukkan password Anda"
                className={`w-full p-4 pl-12 pr-12 border-2 rounded-xl text-base transition-all bg-gray-50 focus:outline-none focus:bg-white focus:shadow-lg ${
                  validationErrors.password 
                    ? 'border-red-300 focus:border-red-500 focus:shadow-red-100' 
                    : 'border-gray-200 focus:border-green-500 focus:shadow-green-100'
                }`}
              />
              <Lock className="absolute left-4 top-12 text-gray-500 w-5 h-5" />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-4 top-12 text-gray-500 hover:text-green-500 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              {validationErrors.password && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center my-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-gray-700">Ingat saya</span>
              </label>
              <Link to="/forgot-password" className="text-green-500 hover:text-green-600 font-semibold transition-colors">
                Lupa password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`relative w-full bg-gradient-to-r from-green-500 to-green-600 text-white p-4 border-none rounded-xl text-lg font-semibold cursor-pointer transition-all hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-green-300 active:transform active:translate-y-0 flex items-center justify-center ${isLoading ? 'opacity-70 pointer-events-none loading-button' : ''}`}
            >
              {isLoading ? '' : 'Masuk'}
            </button>
          </form>

          {/* Register Link */}
          <div className="text-center mt-8 text-gray-600">
            Belum punya akun? <Link to="/daftar" className="text-green-500 hover:text-green-600 font-semibold">Daftar sekarang</Link>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 flex flex-col items-center justify-center p-12 text-center text-white relative overflow-hidden order-first md:order-last">
          {/* Floating shapes */}
          <div className="absolute w-24 h-24 bg-white bg-opacity-10 rounded-full top-1/5 right-1/10 float-1"></div>
          <div className="absolute w-16 h-16 bg-white bg-opacity-10 rounded-full bottom-1/3 left-3/20 float-2"></div>
          <div className="absolute w-20 h-20 bg-white bg-opacity-10 rounded-full top-3/5 right-1/5 float-3"></div>
          
          <img src={Icon} alt="Icon" className="w-[830px] h-[340px] ml-58 mt-[-57px]" />
          <div>
            <h2 className="text-3xl font-bold mb-4">Belanja Mudah & Hemat</h2>
            <p className="text-lg opacity-90 leading-relaxed">
              Masuk ke akun Anda dan temukan ribuan produk berkualitas dengan harga terjangkau. Nikmati pengalaman berbelanja yang menyenangkan di Olshop NET.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OlshopLogin;