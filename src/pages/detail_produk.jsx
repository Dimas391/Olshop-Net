import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar_user.jsx';
import  Sectionuser from '../components/section_user.jsx';
import Footer from '../components/footer.jsx';

const ProductDetail = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('white');
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeThumbnail, setActiveThumbnail] = useState(0);

  // Product data
  const product = {
    id: 1,
    name: "Kemeja Formal Premium",
    category: "pakaian",
    price: 75000,
    originalPrice: 150000,
    rating: 4.8,
    reviews: 234,
    sold: 1200,
    image: "👔",
    discount: 50,
    description: "Kemeja formal premium dengan kualitas bahan terbaik yang memberikan kenyamanan maksimal untuk aktivitas sehari-hari. Dibuat dari bahan cotton berkualitas tinggi yang breathable dan mudah perawatannya.",
    features: [
      "Bahan 100% Cotton Premium",
      "Jahitan rapi dan kuat",
      "Warna tidak mudah luntur",
      "Cocok untuk acara formal dan kasual",
      "Easy care - mudah dicuci"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["white", "blue", "black", "red"],
    stock: 47,
    thumbnails: ["👔", "👔", "👔", "👔"]
  };

  const relatedProducts = [
    {
      id: 2,
      name: "Kemeja Casual Premium",
      price: 85000,
      rating: 4.7,
      reviews: 156,
      image: "👕"
    },
    {
      id: 3,
      name: "Blazer Formal Elegant",
      price: 165000,
      rating: 4.5,
      reviews: 89,
      image: "🥼"
    },
    {
      id: 4,
      name: "Kemeja Batik Modern",
      price: 95000,
      rating: 4.8,
      reviews: 203,
      image: "👔"
    },
    {
      id: 5,
      name: "Celana Formal Slim Fit",
      price: 125000,
      rating: 4.6,
      reviews: 134,
      image: "👖"
    }
  ];

  const shippingOptions = [
    { name: "Reguler", time: "3-5 hari kerja", price: 15000 },
    { name: "Express", time: "1-2 hari kerja", price: 25000 },
    { name: "Same Day", time: "Hari ini juga", price: 35000 }
  ];

  const reviews = [
    {
      id: 1,
      name: "Andi Wijaya",
      date: "15 Nov 2025",
      rating: 5,
      text: "Kemejanya bagus banget! Bahannya adem dan nyaman dipakai. Ukurannya pas sesuai chart size. Packaging juga rapi dan pengiriman cepat. Will order again!"
    },
    {
      id: 2,
      name: "Budi Santoso",
      date: "1 Agustus 2025",
      rating: 5,
      text: "Kualitas premium dengan harga yang sangat terjangkau. Kemejanya cocok untuk acara formal maupun semi formal. Penjual responsif dan friendly. Recommended!"
    },
    {
      id: 3,
      name: "Citra Dewi",
      date: "1 Agustus 2025",
      rating: 4,
      text: "Belinya untuk suami, dia suka banget. Warnanya tidak mudah pudar dan jahitannya rapi. Cuma agak tipis bahannya, tapi overall memuaskan untuk harga segini."
    }
  ];

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Added ${quantity} ${product.name} to cart`);
    // You would typically dispatch an action to your cart store here
  };

  const handleBuyNow = () => {
    // Buy now logic here
    navigate('/checkout');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out this ${product.name} on our store!`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.error('Could not copy text: ', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
      </header>
      <Navbar />
      <Sectionuser />
      <main className="">
        {/* Product Detail */}
       <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            {/* Product Images */}
            <div>
              <div 
                className="w-full h-96 bg-gray-100 rounded-xl flex items-center justify-center text-8xl cursor-pointer relative"
                onClick={() => setIsZoomed(true)}
              >
                {product.image}
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  -{product.discount}%
                </div>
              </div>
              
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {product.thumbnails.map((thumb, index) => (
                  <div 
                    key={index}
                    className={`min-w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-2xl cursor-pointer border-2 ${activeThumbnail === index ? 'border-green-500' : 'border-transparent'}`}
                    onClick={() => setActiveThumbnail(index)}
                  >
                    {thumb}
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="py-2">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-xl">⭐⭐⭐⭐⭐</span>
                  <span className="text-gray-600 text-sm">{product.rating} ({product.reviews} ulasan)</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500 text-sm">{product.sold}+ terjual</span>
              </div>

              <div className="mb-6">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  Rp {product.price.toLocaleString('id-ID')}
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 text-lg line-through mr-3">
                    Rp {product.originalPrice.toLocaleString('id-ID')}
                  </span>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-semibold">
                    {product.discount}% OFF
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Deskripsi Produk</h3>
                <p className="text-gray-600 mb-3">{product.description}</p>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-600">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Product Options */}
              <div className="mb-6">
                <div className="mb-4">
                  <label className="block font-semibold text-gray-900 mb-2">Ukuran:</label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        className={`px-4 py-2 border-2 rounded-lg font-medium transition-colors ${selectedSize === size ? 'bg-green-600 border-green-600 text-white' : 'bg-white border-gray-200 text-gray-700 hover:border-green-500'}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block font-semibold text-gray-900 mb-2">Warna:</label>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        className={`w-10 h-10 rounded-full border-3 transition-transform ${selectedColor === color ? 'border-green-500 scale-110' : 'border-gray-200 hover:scale-105'}`}
                        style={{ backgroundColor: getColorValue(color) }}
                        title={getColorName(color)}
                        onClick={() => setSelectedColor(color)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Purchase Section */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-semibold text-gray-900">Jumlah:</span>
                  <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                    <button 
                      className="px-3 py-2 bg-white text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => handleQuantityChange(-1)}
                    >
                      −
                    </button>
                    <input 
                    type="number" 
                    className="w-16 text-center border-x-2 border-gray-200 py-2 font-semibold"
                    value={quantity}
                    min="1"
                    max="10"
                    onChange={(e) => setQuantity(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                    />
                    <button 
                      className="px-3 py-2 bg-white text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => handleQuantityChange(1)}
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">Stok: {product.stock} tersisa</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <button 
                    className="flex-1 bg-white border-2 border-green-600 text-green-600 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-colors"
                    onClick={handleAddToCart}
                  >
                    🛒 Tambah ke Keranjang
                  </button>
                  <button 
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    onClick={handleBuyNow}
                  >
                    💳 Beli Sekarang
                  </button>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="bg-gray-50 p-4 rounded-xl mt-6">
                
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Ulasan Pembeli</h2>
            <div className="flex items-center gap-3">
              <span className="text-yellow-400 text-xl">⭐⭐⭐⭐⭐</span>
              <span>{product.rating} dari 5 ({product.reviews} ulasan)</span>
            </div>
          </div>

          <div className="space-y-6">
            {reviews.map(review => (
              <div key={review.id} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold">{review.name}</div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>
                  </div>
                  <div className="text-yellow-400">
                    {'⭐'.repeat(review.rating)}
                  </div>
                </div>
                <p className="text-gray-600">{review.text}</p>
              </div>
            ))}

            <button className="w-full py-3 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
              Lihat Semua Ulasan
            </button>
          </div>
        </div>

        {/* Related Products */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Produk Terkait</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <div 
                key={product.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-5xl">
                  {product.image}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <div className="text-green-600 font-bold text-lg mb-2">
                    Rp {product.price.toLocaleString('id-ID')}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                    <span className="text-gray-500 text-sm">{product.rating} ({product.reviews})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
         <Footer />
      </main>

      {/* Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          <div className="text-9xl text-white">{product.image}</div>
        </div>
      )}
    </div>
  );
};

// Helper functions
function getColorValue(color) {
  const colors = {
    white: '#ffffff',
    blue: '#007bff',
    black: '#333333',
    red: '#dc3545'
  };
  return colors[color] || '#ffffff';
}

function getColorName(color) {
  const names = {
    white: 'Putih',
    blue: 'Biru',
    black: 'Hitam',
    red: 'Merah'
  };
  return names[color] || color;
}

export default ProductDetail;