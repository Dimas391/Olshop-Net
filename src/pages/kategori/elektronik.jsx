import React, { useState, useCallback } from 'react';
import { Star, Heart, ShoppingCart, Filter, Grid, List, Zap, Search } from 'lucide-react';
import Navbar from '../../components/navbar_user';
import Footer from '../../components/footer';

const ElektronikPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

const elektronikProducts = [
    {
      id: 1,
      name: "Smartphone Android 128GB",
      price: 3299000,
      original_price: 3899000,
      rating: 4.8,
      reviews: 1542,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
      badge: "sale",
      description: "Smartphone dengan performa tinggi dan kamera berkualitas professional."
    },
    {
      id: 2,
      name: "Laptop Gaming RTX 4060",
      price: 12999000,
      original_price: null,
      rating: 4.9,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
      badge: "new",
      description: "Laptop gaming dengan kartu grafis RTX terbaru untuk performa gaming terbaik."
    },
    {
      id: 3,
      name: "Wireless Earbuds Pro",
      price: 899000,
      original_price: 1299000,
      rating: 4.7,
      reviews: 892,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
      badge: "sale",
      description: "Earbuds wireless dengan active noise cancelling dan battery life hingga 30 jam."
    },
    {
      id: 4,
      name: "Smart Watch Series 8",
      price: 2199000,
      original_price: null,
      rating: 4.6,
      reviews: 567,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
      badge: "bestseller",
      description: "Smartwatch dengan fitur health tracking lengkap dan GPS terintegrasi."
    },
    {
      id: 5,
      name: "Gaming Keyboard Mechanical",
      price: 789000,
      original_price: 999000,
      rating: 4.8,
      reviews: 342,
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
      badge: "sale",
      description: "Keyboard mechanical dengan RGB backlight dan blue switch untuk gaming."
    },
    {
      id: 6,
      name: "4K Action Camera",
      price: 1599000,
      original_price: null,
      rating: 4.5,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop",
      badge: "new",
      description: "Action camera 4K dengan kemampuan rekam 60fps dan tahan air."
    },
    {
      id: 7,
      name: "Bluetooth Speaker Premium",
      price: 699000,
      original_price: 899000,
      rating: 4.7,
      reviews: 423,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
      badge: "sale",
      description: "Speaker bluetooth dengan sound 360 derajat dan battery 20 jam."
    },
    {
      id: 8,
      name: "Gaming Mouse RGB",
      price: 459000,
      original_price: null,
      rating: 4.6,
      reviews: 289,
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop",
      badge: null,
      description: "Mouse gaming dengan DPI hingga 12000 dan tombol programmable."
    },
    {
      id: 9,
      name: "Tablet 10.9 inch 256GB",
      price: 4999000,
      original_price: 5799000,
      rating: 4.8,
      reviews: 445,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
      badge: "sale",
      description: "Tablet dengan layar 10.9 inch dan storage 256GB untuk produktivitas maksimal."
    },
    {
      id: 10,
      name: "Power Bank 20000mAh",
      price: 199000,
      original_price: null,
      rating: 4.4,
      reviews: 1234,
      image: "https://images.unsplash.com/photo-1609592885014-3b1271fa2a99?w=400&h=400&fit=crop",
      badge: "bestseller",
      description: "Power bank kapasitas besar dengan fast charging dan LED display."
    },
    {
      id: 11,
      name: "Webcam 4K Ultra HD",
      price: 899000,
      original_price: 1199000,
      rating: 4.7,
      reviews: 167,
      image: "https://images.unsplash.com/photo-1587832020058-6d3dfcecef87?w=400&h=400&fit=crop",
      badge: "sale",
      description: "Webcam 4K dengan auto focus untuk streaming dan video call berkualitas tinggi."
    },
    {
      id: 12,
      name: "Smart TV 43 Inch 4K",
      price: 3999000,
      original_price: null,
      rating: 4.6,
      reviews: 678,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
      badge: "new",
      description: "Smart TV 43 inch dengan resolusi 4K HDR dan smart operating system."
    }
  ];

  const [products] = useState(elektronikProducts);
  const productsPerPage = 12;

  // Brand data
  const brands = [
    { name: "ADVAN", color: "text-gray-800", logo: "📱" },
    { name: "TOSHIBA", color: "text-gray-800", logo: "💻" },
    { name: "ROBOT", color: "ttext-gray-800", logo: "🤖" },
    { name: "SECRET LAB", color: "text-gray-800", logo: "🪑" },
    { name: "SEAGATE", color: "text-gray-800", logo: "💾" },
    { name: "APPLE", color: "text-gray-800", logo: "🍎" },
    { name: "HUAWEI", color: "text-gray-800", logo: "📱" },
    { name: "APC", color: "text-gray-800", logo: "⚡" },
    { name: "SAMSUNG", color: "text-gray-800", logo: "📱" },
    { name: "ANBO", color: "text-gray-800", logo: "🎧" },
    { name: "HYPERX", color: "text-gray-800", logo: "🎮" },
    { name: "DIGIMAP", color: "text-gray-800", logo: "🗺️" }
];

  // Helper functions
  const getBadgeText = (badge) => {
    const badges = {
      'sale': 'SALE',
      'new': 'BARU',
      'bestseller': 'TERLARIS'
    };
    return badges[badge] || '';
  };

  const getStars = (rating) => {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars += '⭐';
      } else if (i - rating < 1) {
        stars += '⭐';
      } else {
        stars += '☆';
      }
    }
    return stars;
  };

  const showNotification = useCallback((message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    showNotification('Produk berhasil ditambahkan ke keranjang!', 'success');
  };

  const toggleWishlist = (productId) => {
    setWishlistItems(prev => {
      const isInWishlist = prev.includes(productId);
      if (isInWishlist) {
        showNotification('Produk dihapus dari wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showNotification('Produk ditambahkan ke wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = selectedPriceRange ? (() => {
      const [min, max] = selectedPriceRange.split('-').map(Number);
      return product.price >= min && (max ? product.price <= max : true);
    })() : true;
    const matchesRating = selectedRating ? product.rating >= selectedRating : true;
    
    return matchesSearch && matchesPrice && matchesRating;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedPriceRange('');
    setSelectedRating(0);
    setSortBy('popular');
    setCurrentPage(1);
  };

  // Product Card Component
  const ProductCard = ({ product }) => {
    const discount = product.original_price ? 
      Math.round((product.original_price - product.price) / product.original_price * 100) : 0;
    
    const isInWishlist = wishlistItems.includes(product.id);

    return (
      <div className={`bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ${
        viewMode === 'list' ? 'flex' : ''
      }`}>
        <div className={`relative ${viewMode === 'list' ? 'w-48' : ''}`}>
          <div className="relative bg-gradient-to-br from-green-50 to-indigo-50 p-2 h-48 overflow-hidden rounded-t-lg">
            <img 
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-110"
              loading="lazy"
            />
          </div>
          
          {product.badge && (
            <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold text-white ${
              product.badge === 'sale' ? 'bg-red-500' : 
              product.badge === 'new' ? 'bg-green-500' : 'bg-yellow-500'
            }`}>
              {getBadgeText(product.badge)}
            </div>
          )}
          <button
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
              isInWishlist ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 bg-white'
            } shadow-md hover:shadow-lg`}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
          >
            ❤️
          </button>
        </div>
        
        <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
          <div className="text-sm text-green-600 mb-1 font-medium">📱 Elektronik</div>
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center gap-2 mb-3">
            <div className="flex text-yellow-400">{getStars(product.rating)}</div>
            <span className="text-sm text-gray-500">({product.reviews})</span>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg font-bold text-green-600">
              Rp {product.price ? product.price.toLocaleString() : '0'}
            </span>
            {product.original_price && (
              <>
                <span className="text-sm text-gray-400 line-through">
                  Rp {product.original_price.toLocaleString()}
                </span>
                <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full">
                  -{discount}%
                </span>
              </>
            )}
          </div>
          
          <div className="flex gap-2">
            <button
              className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
            >
              🛒 Tambah ke Keranjang
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center">
              Lihat
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      {/* Brand Showcase Section */}
      <div className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Brand Terpercaya</h2>
            <button className="text-green-500 hover:text-green-600 font-medium">
              Lihat Semua →
            </button>
          </div>
          
          {/* Top row brands */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-6">
            {brands.slice(0, 6).map((brand, index) => (
              <div key={index} className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer group">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">
                  {brand.logo}
                </div>
                <div className={`font-semibold text-sm ${brand.color} group-hover:text-green-500 transition-colors duration-200`}>
                  {brand.name}
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom row brands */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {brands.slice(6, 12).map((brand, index) => (
              <div key={index + 6} className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer group">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">
                  {brand.logo}
                </div>
                <div className={`font-semibold text-sm ${brand.color} group-hover:text-green-500 transition-colors duration-200`}>
                  {brand.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium transition-all duration-300 ${
          notification.type === 'success' ? 'bg-green-500' : 
          notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        }`}>
          {notification.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {/* Clear Filters */}
            {(searchTerm || selectedPriceRange || selectedRating > 0 || sortBy !== 'popular') && (
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200"
              >
                🗑️ Hapus Filter
              </button>
            )}
          </div>
        </div>

        {/* Products Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-600">
            Menampilkan {startIndex + 1}-{Math.min(endIndex, sortedProducts.length)} dari {sortedProducts.length} produk
          </div>
          <div className="flex items-center gap-4">
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'bg-white text-gray-600'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 ${viewMode === 'list' ? 'bg-green-600 text-white' : 'bg-white text-gray-600'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {currentProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">Produk tidak ditemukan</h3>
            <p className="text-gray-600 mb-6">Maaf, tidak ada buku yang sesuai dengan pencarian Anda.</p>
            <button
              onClick={clearAllFilters}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              Hapus Filter
            </button>
          </div>
        ) : (
          <div className={`grid gap-6 mb-8 ${
            viewMode === 'list' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          }`}>
            {currentProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              ← Sebelumnya
            </button>
            
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === pageNum
                      ? 'bg-green-600 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Selanjutnya →
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ElektronikPage;