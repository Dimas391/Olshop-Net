import React, { useState, useCallback } from 'react';
import { Star, Heart, ShoppingCart, Filter, Grid, List, Zap, Search } from 'lucide-react';
import Navbar from '../../components/navbar_user';
import Footer from '../../components/footer';

const BukuPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const bukuProducts = [
    {
      id: 401,
      name: "Atomic Habits - James Clear",
      price: 125000,
      original_price: 149000,
      rating: 4.9,
      reviews: 2345,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
      badge: "bestseller",
      description: "Cara mudah dan terbukti untuk membentuk kebiasaan baik dan menghilangkan kebiasaan buruk."
    },
    {
      id: 402,
      name: "The Psychology of Money",
      price: 139000,
      original_price: 169000,
      rating: 4.8,
      reviews: 1876,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      badge: "sale",
      description: "Timeless lessons on wealth, greed, and happiness yang mengubah cara pandang tentang uang."
    },
    {
      id: 403,
      name: "Sapiens - Yuval Noah Harari",
      price: 159000,
      original_price: null,
      rating: 4.7,
      reviews: 1543,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
      badge: "new",
      description: "A brief history of humankind - dari zaman batu hingga era digital."
    },
    {
      id: 404,
      name: "Rich Dad Poor Dad",
      price: 89000,
      original_price: 119000,
      rating: 4.6,
      reviews: 3241,
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=400&fit=crop",
      badge: "sale",
      description: "Pelajaran tentang keuangan dan investasi dari dua ayah dengan pandangan berbeda."
    },
    {
      id: 405,
      name: "Thinking Fast and Slow",
      price: 169000,
      original_price: null,
      rating: 4.8,
      reviews: 987,
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=400&fit=crop",
      badge: "bestseller",
      description: "Nobel Prize winner Daniel Kahneman tentang cara kerja pikiran manusia."
    },
    {
      id: 406,
      name: "The 7 Habits - Stephen Covey",
      price: 145000,
      original_price: 179000,
      rating: 4.7,
      reviews: 2134,
      image: "https://images.unsplash.com/photo-1519681393784-d120f57ccf94?w=400&h=400&fit=crop",
      badge: "sale",
      description: "Tujuh kebiasaan manusia yang sangat efektif untuk kesuksesan pribadi dan profesional."
    }
  ];

  const [products] = useState(bukuProducts);
  const productsPerPage = 12;

  // Brand data
  const brands = [
    { name: "Petualangan", color: "text-gray-800", logo: "📚" },
    { name: "Teknologi", color: "text-gray-800", logo: "💻" },
    { name: "Fiksi Ilmiah", color: "ttext-gray-800", logo: "🤖" },
    { name: "Desain Furniture", color: "text-gray-800", logo: "🪑" },
    { name: "Penyimpanan Data", color: "text-gray-800", logo: "💾" },
    { name: "Buku Masakan", color: "text-gray-800", logo: "🍎" },
    { name: "Pengembangan Mobile", color: "text-gray-800", logo: "📱" },
    { name: "Listrik & Energi", color: "text-gray-800", logo: "⚡" },
    { name: "Smartphone", color: "text-gray-800", logo: "📱" },
    { name: "Peralatan Audio", color: "text-gray-800", logo: "🎧" },
    { name: "Permainan", color: "text-gray-800", logo: "🎮" },
    { name: "Panduan Perjalanan", color: "text-gray-800", logo: "🗺️" }
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
          <div className="text-sm text-green-600 mb-1 font-medium">📚 Buku</div>
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

export default BukuPage;