import React, { useState, useEffect } from 'react';
import { Star, MapPin, Heart, Loader2 } from 'lucide-react';

const Rekomendasi = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Base URL untuk API - sesuaikan dengan environment Anda
        const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        const apiUrl = `${API_BASE_URL}/api/products?limit=6&sortBy=rating&minRating=4.0`;
        
        console.log('Fetching products from:', apiUrl);
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        // Check if response is ok and content-type is JSON
        if (!response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP Error: ${response.status}`);
          } else {
            throw new Error(`Server error: ${response.status}. Pastikan server backend berjalan di ${API_BASE_URL}`);
          }
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Server tidak mengembalikan JSON. Periksa apakah endpoint API tersedia.');
        }
        
        const result = await response.json();
        console.log('API Response:', result);
        
        if (result.success) {
          setProducts(result.data.products || []);
        } else {
          throw new Error(result.message || 'Gagal mengambil data produk');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        
        // Set error message yang lebih informatif
        if (err.message.includes('fetch')) {
          setError('Tidak dapat terhubung ke server. Pastikan server backend berjalan.');
        } else if (err.message.includes('JSON')) {
          setError('Server mengembalikan response yang tidak valid. Periksa konfigurasi server.');
        } else {
          setError(err.message);
        }
        
        // Fallback ke data dummy untuk development
        console.log('Using fallback dummy data');
        setProducts([
          {
            id: 1,
            name: "Smartphone Android Terbaru",
            category: "elektronik",
            price: 2450000,
            original_price: 2890000,
            rating: 4.8,
            reviews: 89,
            image: "📱",
            badge: "new",
            stock_quantity: 15
          },
          {
            id: 2,
            name: "Kopi Premium Arabica 500g",
            category: "makanan",
            price: 75000,
            original_price: null,
            rating: 4.7,
            reviews: 234,
            image: "☕",
            badge: "bestseller",
            stock_quantity: 50
          },
          {
            id: 3,
            name: "Serum Vitamin C Anti Aging",
            category: "kecantikan",
            price: 125000,
            original_price: null,
            rating: 4.6,
            reviews: 156,
            image: "💧",
            badge: "new",
            stock_quantity: 25
          },
          {
            id: 4,
            name: "Laptop Gaming RTX Series",
            category: "elektronik",
            price: 8750000,
            original_price: null,
            rating: 4.9,
            reviews: 34,
            image: "💻",
            badge: "bestseller",
            stock_quantity: 8
          },
          {
            id: 5,
            name: "Set Peralatan Masak Non-Stick",
            category: "rumah",
            price: 245000,
            original_price: 320000,
            rating: 4.5,
            reviews: 123,
            image: "🍳",
            badge: "sale",
            stock_quantity: 30
          },
          {
            id: 6,
            name: "Dumbbell Set Adjustable 20kg",
            category: "olahraga",
            price: 285000,
            original_price: 340000,
            rating: 4.6,
            reviews: 58,
            image: "🏋️",
            badge: "sale",
            stock_quantity: 12
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const calculateDiscount = (originalPrice, currentPrice) => {
    if (!originalPrice || originalPrice <= currentPrice) return 0;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  const getProductImage = (category) => {
    const categoryImages = {
      'elektronik': '🎧',
      'pakaian': '👜',
      'makanan': '🍕',
      'rumah': '🏠',
      'kecantikan': '💄',
      'olahraga': '⌚'
    };
    return categoryImages[category.toLowerCase()] || '📦';
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-3 h-3 fill-yellow-400 text-yellow-400 opacity-50" />);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />);
    }
    
    return stars;
  };

  // Loading state
  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Rekomendasi</h2>
          <a href="#" className="text-green-500 hover:text-green-600 font-bold text-sm transition-colors">
            Lihat Semua
          </a>
        </div>
        
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-green-500" />
          <span className="ml-2 text-gray-600">Memuat produk rekomendasi...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Rekomendasi</h2>
          <a href="#" className="text-green-500 hover:text-green-600 font-bold text-sm transition-colors">
            Lihat Semua
          </a>
        </div>
        
        <div className="text-center py-12">
          <div className="text-orange-500 mb-2">⚠️</div>
          <p className="text-gray-600 mb-2">{error}</p>
          <p className="text-sm text-gray-500 mb-4">
            Menampilkan data contoh. Untuk menggunakan data dari database, 
            pastikan server backend berjalan di port 5000.
          </p>
          <div className="flex gap-2 justify-center">
            <button 
              onClick={() => {
                setError(null);
                window.location.reload();
              }} 
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Coba Lagi
            </button>
            <button 
              onClick={() => setError(null)} 
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Lanjutkan dengan Data Contoh
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Rekomendasi</h2>
          <a href="#" className="text-green-500 hover:text-green-600 font-bold text-sm transition-colors">
            Lihat Semua
          </a>
        </div>
        
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🛍️</div>
          <p className="text-gray-600">Belum ada produk rekomendasi tersedia</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          Rekomendasi
        </h2>
        <a href="/products" className="text-green-500 hover:text-green-600 font-bold text-sm transition-colors">
          Lihat Semua
        </a>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {products.map((product) => {
          const discount = calculateDiscount(product.original_price, product.price);
          
          return (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer"
              onClick={() => window.location.href = `/products/${product.id}`}
            >
              {/* Product Image */}
              <div className="relative bg-gray-50 h-40 flex items-center justify-center">
                <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                  {product.image || getProductImage(product.category)}
                </span>
                
                {/* Discount Badge */}
                {discount > 0 && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{discount}%
                  </div>
                )}

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {product.badge}
                  </div>
                )}

                {/* Favorite Button */}
                <button 
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle favorite logic here
                    console.log('Added to favorites:', product.id);
                  }}
                >
                  <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                {/* Product Name */}
                <h3 className="font-medium text-gray-800 text-sm mb-2 line-clamp-2 leading-tight">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="mb-2">
                  <div className="text-lg font-bold text-gray-800">
                    {formatPrice(product.price)}
                  </div>
                  {product.original_price && product.original_price > product.price && (
                    <div className="text-xs text-gray-400 line-through">
                      {formatPrice(product.original_price)}
                    </div>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex items-center gap-0.5">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-xs text-gray-600 ml-1">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Category & Stock Status */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span className="capitalize">{product.category}</span>
                  </div>
                  {product.stock_quantity < 10 && (
                    <span className="text-orange-500 font-medium">
                      Stok terbatas!
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Rekomendasi;