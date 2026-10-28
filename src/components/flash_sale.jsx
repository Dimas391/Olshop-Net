import React, { useState, useEffect } from 'react';
import { Star, MapPin, Heart } from 'lucide-react';

const FlashSale = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch flash sale products from API
  useEffect(() => {
    const fetchFlashSaleProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/flash-sale?limit=6');
        const data = await response.json();
        
        if (data.success) {
          setProducts(data.data);
        } else {
          setError(data.message || 'Gagal memuat produk flash sale');
        }
      } catch (error) {
        console.error('Error fetching flash sale products:', error);
        setError('Gagal terhubung ke server');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlashSaleProducts();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
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

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-8">
          <div className="text-red-500 text-lg mb-2">⚠️ {error}</div>
          <p className="text-gray-600">Tidak dapat memuat produk flash sale saat ini</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span className="text-yellow-500">⚡</span>
          Flash Sale
          {!isLoading && products.length > 0 && (
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({products.length} produk)
            </span>
          )}
        </h2>
        <a 
          href="/produk" 
          className="text-green-500 hover:text-green-600 font-bold text-sm transition-colors"
        >
          Lihat Semua
        </a>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
              <div className="bg-gray-200 h-40"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Products */}
      {!isLoading && products.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⚡</div>
          <h3 className="text-xl font-semibold mb-2">Belum ada flash sale</h3>
          <p className="text-gray-600">Flash sale akan segera hadir dengan penawaran menarik!</p>
        </div>
      )}

      {/* Product Grid */}
      {!isLoading && products.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer"
              onClick={() => window.location.href = `/produk/${product.id}`}
            >
              {/* Product Image */}
              <div className="relative bg-gray-50 h-40 flex items-center justify-center">
                <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                  {product.image || '📦'}
                </span>
                
                {/* Discount Badge */}
                <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  -{product.discount}%
                </div>

                {/* Favorite Button */}
                <button 
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors"
                  onClick={(e) => e.stopPropagation()}
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
                  <div className="text-xs text-gray-400 line-through">
                    {formatPrice(product.original_price)}
                  </div>
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

                {/* Location */}
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin className="w-3 h-3" />
                  <span>Banda Aceh</span>
                </div>

                {/* Stock Info */}
                {product.stock_quantity <= 10 && (
                  <div className="mt-2 text-xs text-orange-600 font-medium">
                    ⚠️ Tersisa {product.stock_quantity} stok
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Database Connection Status */}
      </div>
  );
};

export default FlashSale;