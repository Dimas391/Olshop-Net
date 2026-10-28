import React, { useState, useEffect, useCallback } from 'react';
import Navbaruser from '../components/navbar_user.jsx';
import Sectionuser from '../components/section_user.jsx';
import Footer from '../components/footer.jsx';
import { Link } from 'react-router-dom';

const Productuser = () => {
  // State management
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState('');

  const productsPerPage = 12;

  // Helper functions
  const getBadgeText = (badge) => {
    const badges = {
      'sale': 'SALE',
      'new': 'BARU',
      'bestseller': 'TERLARIS'
    };
    return badges[badge] || '';
  };

  const getCategoryName = (category) => {
    const categoryNames = {
      'pakaian': 'Pakaian',
      'elektronik': 'Elektronik',
      'makanan': 'Makanan & Minuman',
      'rumah': 'Rumah Tangga',
      'kecantikan': 'Kecantikan',
      'olahraga': 'Olahraga'
    };
    return categoryNames[category] || category;
  };

  // Get product image - use API image or fallback to category-based placeholder
  const getProductImage = (product) => {
    // If product has an image URL from API, use it
    if (product.image && product.image.startsWith('http')) {
      return product.image;
    }
    
    // Otherwise, generate a placeholder based on category and product ID
    return getPlaceholderImage(product.category, product.id, product.name);
  };

  // Generate placeholder images using various free APIs
  const getPlaceholderImage = (category, productId, productName) => {
    const categoryKeywords = {
      'pakaian': ['fashion', 'clothing', 'shirt', 'dress', 'style'],
      'elektronik': ['technology', 'gadget', 'phone', 'laptop', 'electronic'],
      'makanan': ['food', 'meal', 'cooking', 'restaurant', 'delicious'],
      'rumah': ['home', 'furniture', 'interior', 'kitchen', 'decor'],
      'kecantikan': ['beauty', 'cosmetics', 'skincare', 'makeup', 'spa'],
      'olahraga': ['sports', 'fitness', 'exercise', 'gym', 'athletic']
    };

    const keywords = categoryKeywords[category] || ['product', 'item'];
    const keyword = keywords[productId % keywords.length];
    
    // Use different image services for variety
    const imageServices = [
      // Unsplash Source (direct image URLs)
      `https://source.unsplash.com/400x400/?${keyword}`,
      // Lorem Picsum with seed for consistency
      `https://picsum.photos/seed/${keyword}${productId}/400/400`,
      // Unsplash with specific collections
      `https://source.unsplash.com/collection/190727/400x400`,
      // LoremFlickr with category
      `https://loremflickr.com/400/400/${keyword}`
    ];
    
    // Select image service based on product ID for consistency
    const serviceIndex = productId % imageServices.length;
    return imageServices[serviceIndex];
  };

  // Image error handler
  const handleImageError = (e, product) => {
    // Fallback to a different service if image fails to load
    const fallbackServices = [
      `https://via.placeholder.com/400x400/4ade80/ffffff?text=${encodeURIComponent(product.name?.substring(0, 10) || 'Product')}`,
      `https://picsum.photos/seed/fallback${product.id}/400/400`,
      `https://source.unsplash.com/400x400/?product`
    ];
    
    const currentSrc = e.target.src;
    const nextFallback = fallbackServices.find(url => url !== currentSrc);
    
    if (nextFallback) {
      e.target.src = nextFallback;
    }
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

  // Notification system
  const showNotification = useCallback((message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // Load categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        const data = await response.json();
        
        if (data.success) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products from API
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Build query parameters
      const params = new URLSearchParams({
        page: currentPage,
        limit: productsPerPage,
        sortBy: sortBy
      });

      if (searchTerm.trim()) {
        params.append('search', searchTerm.trim());
      }
      
      if (selectedCategory) {
        params.append('category', selectedCategory);
      }
      
      if (selectedPriceRange) {
        const [min, max] = selectedPriceRange.split('-');
        if (min) params.append('minPrice', min);
        if (max) params.append('maxPrice', max);
      }
      
      if (selectedRating > 0) {
        params.append('minRating', selectedRating);
      }

      const response = await fetch(`http://localhost:5000/api/products?${params}`);
      const data = await response.json();
      
      if (data.success) {
        // Process products and enhance with image URLs if not present
        const processedProducts = data.data.products.map(product => ({
          ...product,
          // Ensure each product has an image URL
          image: product.image || getProductImage(product)
        }));
        
        setProducts(processedProducts);
        setTotalPages(data.data.pagination.totalPages);
        setTotalProducts(data.data.pagination.totalProducts);
      } else {
        setError(data.message || 'Gagal memuat produk');
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Gagal terhubung ke server. Pastikan backend berjalan.');
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchTerm, selectedCategory, selectedPriceRange, selectedRating, sortBy]);

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Reset to first page when filters change (except page change)
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedPriceRange, selectedRating, sortBy]);

  // Cart functions
  const addToCart = (product) => {
    if (!product) return;

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

  // Wishlist functions
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

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedPriceRange('');
    setSelectedRating(0);
    setSortBy('newest');
    setCurrentPage(1);
  };

  // Product Card Component
  const ProductCard = ({ product }) => {
    const discount = product.original_price ? 
      Math.round((product.original_price - product.price) / product.original_price * 100) : 0;
    
    const isInWishlist = wishlistItems.includes(product.id);

    return (
      <div 
        className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer ${
          viewMode === 'list' ? 'flex' : ''
        }`}
      >
        <div className={`relative ${viewMode === 'list' ? 'w-48' : ''}`}>
          <div className="relative bg-gradient-to-br from-green-50 to-purple-50 p-2 h-48 overflow-hidden rounded-lg">
            <img 
              src={getProductImage(product)}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-110"
              onError={(e) => handleImageError(e, product)}
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
          <div className="text-sm text-gray-500 mb-1">{getCategoryName(product.category)}</div>
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
          
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
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
            >
              🛒 Tambah ke Keranjang
            </button>
            <Link 
              to={`/produk/${product.id}`}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Lihat
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium transition-all duration-300 ${
          notification.type === 'success' ? 'bg-green-500' : 
          notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
        }`}>
          {notification.message}
        </div>
      )}
      
      <Navbaruser />
      <Sectionuser />
      
      <div className="max-w-8xl mx-auto px-4 py-8">
        
       
        {/* Category Pills */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                selectedCategory === ''
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              🏪 Semua
            </button>
            {[
              { key: 'pakaian', label: 'Pakaian', icon: '👔' },
              { key: 'elektronik', label: 'Elektronik', icon: '📱' },
              { key: 'makanan', label: 'Makanan', icon: '🍽️' },
              { key: 'rumah', label: 'Rumah Tangga', icon: '🏠' },
              { key: 'kecantikan', label: 'Kecantikan', icon: '💄' },
              { key: 'olahraga', label: 'Olahraga', icon: '⚽' },
            ].map(category => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                  selectedCategory === category.key
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.icon} {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {/* Price Range Filter */}
            

            {/* Rating Filter */}
            

            {/* Clear Filters */}
            {(searchTerm || selectedCategory || selectedPriceRange || selectedRating > 0 || sortBy !== 'newest') && (
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
            {isLoading ? 'Memuat...' : (
              totalProducts > 0 ? 
                `Menampilkan ${((currentPage - 1) * productsPerPage) + 1}-${Math.min(currentPage * productsPerPage, totalProducts)} dari ${totalProducts} produk` :
                'Tidak ada produk ditemukan'
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'bg-white text-gray-600'}`}
              >
                ⊞
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 ${viewMode === 'list' ? 'bg-green-600 text-white' : 'bg-white text-gray-600'}`}
              >
                ☰
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6">
            <div className="flex items-center">
              <span className="mr-2">⚠️</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="ml-4 text-gray-600">Memuat produk...</p>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !error && (
          <>
            {products.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">Produk tidak ditemukan</h3>
                <p className="text-gray-600 mb-6">Maaf, tidak ada produk yang sesuai dengan pencarian Anda.</p>
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
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Pagination */}
        {totalPages > 1 && !isLoading && (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              ← Sebelumnya
            </button>
            
            {/* Page Numbers */}
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

        {/* Products Summary */}
        {totalProducts > 0 && (
          <div className="mt-8 text-center text-gray-600">
            <p>Total {totalProducts} produk tersedia</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Productuser;