import React, { useState, useEffect } from 'react';
import { Search, User, Heart, Bell, ShoppingCart, Menu, X, ChevronLeft, ChevronRight, Clock, Mail } from 'lucide-react';

const Facebook = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Twitter = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Youtube = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const OLShopSections = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [cartItems, setCartItems] = useState(3);
  const [cartTotal, setCartTotal] = useState(1250000);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [flashSaleTime, setFlashSaleTime] = useState({ hours: 6, minutes: 30, seconds: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Search suggestions data
  const searchData = [
    "Kemeja Pria",
    "Dress Wanita",
    "Celana Jeans",
    "Sepatu Sneakers",
    "Tas Ransel",
    "Jaket Denim",
    "Rok Plisket",
    "Blouse Katun",
    "Topi Baseball",
    "Aksesoris Fashion"
  ];

  // Hero carousel images
  const heroSlides = [
    {
      title: "Summer Collection 2024",
      subtitle: "Temukan gaya terbaru untuk musim panas",
      cta: "Belanja Sekarang",
      image: "https://placeholder-image-service.onrender.com/image/1200x600?prompt=fashion%20summer%20collection%202024%20with%20bright%20colors%20and%20beautiful%20models&id=summer-collection-1"
    },
    {
      title: "Flash Sale Akhir Tahun",
      subtitle: "Diskon hingga 70% untuk semua item",
      cta: "Lihat Promo",
      image: "https://placeholder-image-service.onrender.com/image/1200x600?prompt=fashion%20sale%20banner%20with%20discount%20tags%20and%20shopping%20bags&id=flash-sale-1"
    },
    {
      title: "New Arrivals",
      subtitle: "Koleksi terbaru sudah tiba",
      cta: "Jelajahi Koleksi",
      image: "https://placeholder-image-service.onrender.com/image/1200x600?prompt=new%20fashion%20collection%20arrival%20with%20trendy%20clothes&id=new-arrivals-1"
    }
  ];

  // Categories data
  const categories = [
    {
      name: "Pria",
      icon: "https://placeholder-image-service.onrender.com/image/200x200?prompt=men%27s%20fashion%20category%20icon&id=category-men-1"
    },
    {
      name: "Wanita",
      icon: "https://placeholder-image-service.onrender.com/image/200x200?prompt=women%27s%20fashion%20category%20icon&id=category-women-1"
    },
    {
      name: "Anak",
      icon: "https://placeholder-image-service.onrender.com/image/200x200?prompt=kids%20fashion%20category%20icon&id=category-kids-1"
    },
    {
      name: "Sepatu",
      icon: "https://placeholder-image-service.onrender.com/image/200x200?prompt=shoes%20category%20icon&id=category-shoes-1"
    },
    {
      name: "Tas",
      icon: "https://placeholder-image-service.onrender.com/image/200x200?prompt=bags%20category%20icon&id=category-bags-1"
    },
    {
      name: "Aksesoris",
      icon: "https://placeholder-image-service.onrender.com/image/200x200?prompt=fashion%20accessories%20category%20icon&id=category-accessories-1"
    }
  ];

  // New arrivals products
  const newArrivals = [
    {
      name: "Kemeja Oxford Pria",
      price: 499000,
      image: "https://placeholder-image-service.onrender.com/image/300x400?prompt=men%27s%20oxford%20shirt%20fashion%20photography&id=product-oxford-1"
    },
    {
      name: "Dress Floral Wanita",
      price: 699000,
      image: "https://placeholder-image-service.onrender.com/image/300x400?prompt=women%27s%20floral%20dress%20fashion%20photography&id=product-dress-1"
    },
    {
      name: "Sneakers Casual",
      price: 899000,
      image: "https://placeholder-image-service.onrender.com/image/300x400?prompt=casual%20sneakers%20fashion%20photography&id=product-sneakers-1"
    },
    {
      name: "Tas Ransel Kulit",
      price: 799000,
      image: "https://placeholder-image-service.onrender.com/image/300x400?prompt=leather%20backpack%20fashion%20photography&id=product-backpack-1"
    }
  ];

  // Trending products
  const trendingProducts = [
    {
      name: "Jeans Slim Fit",
      price: 599000,
      image: "https://placeholder-image-service.onrender.com/image/300x400?prompt=slim%20fit%20jeans%20fashion%20photography&id=product-jeans-1"
    },
    {
      name: "Blouse Silk Wanita",
      price: 459000,
      image: "https://placeholder-image-service.onrender.com/image/300x400?prompt=silk%20blouse%20women%27s%20fashion%20photography&id=product-blouse-1"
    },
    {
      name: "Jacket Denim",
      price: 899000,
      image: "https://placeholder-image-service.onrender.com/image/300x400?prompt=denim%20jacket%20fashion%20photography&id=product-jacket-1"
    },
    {
      name: "Sepatu Formal",
      price: 759000,
      image: "https://placeholder-image-service.onrender.com/image/300x400?prompt=formal%20shoes%20fashion%20photography&id=product-formalshoes-1"
    }
  ];

  // Brand logos
  const brands = [
    "https://placeholder-image-service.onrender.com/image/150x80?prompt=fashion%20brand%20logo%20elegant%20design&id=brand-1",
    "https://placeholder-image-service.onrender.com/image/150x80?prompt=fashion%20brand%20logo%20minimalist%20design&id=brand-2",
    "https://placeholder-image-service.onrender.com/image/150x80?prompt=fashion%20brand%20logo%20luxury%20design&id=brand-3",
    "https://placeholder-image-service.onrender.com/image/150x80?prompt=fashion%20brand%20logo%20modern%20design&id=brand-4",
    "https://placeholder-image-service.onrender.com/image/150x80?prompt=fashion%20brand%20logo%20trendy%20design&id=brand-5"
  ];

  useEffect(() => {
    // Carousel auto slide
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    // Flash sale countdown
    const countdownInterval = setInterval(() => {
      setFlashSaleTime(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => {
      clearInterval(slideInterval);
      clearInterval(countdownInterval);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length > 2) {
      const filtered = searchData.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSearchSuggestions(filtered);
    } else {
      setSearchSuggestions([]);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img 
                src="https://placeholder-image-service.onrender.com/image/40x40?prompt=hilma%20husna%20fashion%20brand%20logo&id=logo-1" 
                alt="Hilma Husna Fashion Logo" 
                className="w-10 h-10"
              />
              <h1 className="text-2xl font-bold text-primary">Hilma Husna</h1>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex space-x-8">
              {['New Arrivals', 'Pria', 'Wanita', 'Anak', 'Sepatu', 'Tas', 'Sale'].map((item) => (
                <a key={item} href="#" className="text-foreground hover:text-primary transition-colors">
                  {item}
                </a>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8 relative">
              <input
                type="text"
                placeholder="Cari produk fashion..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 border border-border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary/90">
                <Search size={20} />
              </button>
              {searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-border rounded-md shadow-lg mt-1 z-10">
                  {searchSuggestions.map((suggestion, index) => (
                    <div key={index} className="px-4 py-2 hover:bg-muted cursor-pointer">
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-muted rounded-full">
                <User size={24} />
              </button>
              <button className="p-2 hover:bg-muted rounded-full">
                <Heart size={24} />
              </button>
              <button className="p-2 hover:bg-muted rounded-full">
                <Bell size={24} />
              </button>
              <button className="p-2 hover:bg-muted rounded-full relative">
                <ShoppingCart size={24} />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 hover:bg-muted rounded-full"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="lg:hidden mt-4 relative">
            <input
              type="text"
              placeholder="Cari produk fashion..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-border rounded-md shadow-lg mt-1 z-10">
                {searchSuggestions.map((suggestion, index) => (
                  <div key={index} className="px-4 py-2 hover:bg-muted cursor-pointer">
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="md:hidden mt-4 space-y-2 pb-4">
              {['New Arrivals', 'Pria', 'Wanita', 'Anak', 'Sepatu', 'Tas', 'Sale'].map((item) => (
                <a key={item} href="#" className="block py-2 text-foreground hover:text-primary">
                  {item}
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>

      <main>
        {/* Hero Carousel */}
        <section className="relative h-96 md:h-[500px] overflow-hidden">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={`Hero banner showing ${slide.title}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg md:text-xl mb-6">{slide.subtitle}</p>
                <button className="bg-primary text-white px-8 py-3 rounded-md hover:bg-primary/90 transition-colors">
                  {slide.cta}
                </button>
              </div>
            </div>
          ))}
          
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
          >
            <ChevronRight size={24} />
          </button>
        </section>

        {/* Categories Grid */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center mb-8">Kategori Produk</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 bg-muted rounded-full overflow-hidden group-hover:scale-110 transition-transform">
                  <img
                    src={category.icon}
                    alt={`${category.name} category icon`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-semibold group-hover:text-primary">{category.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* New Arrivals */}
        <section className="bg-muted py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">New Arrivals</h2>
              <div className="flex items-center space-x-2 text-destructive">
                <Clock size={20} />
                <span className="font-bold">
                  {String(flashSaleTime.hours).padStart(2, '0')}:
                  {String(flashSaleTime.minutes).padStart(2, '0')}:
                  {String(flashSaleTime.seconds).padStart(2, '0')}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <img
                    src={product.image}
                    alt={`${product.name} fashion product`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <p className="text-primary font-bold">Rp {product.price.toLocaleString('id-ID')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Products */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center mb-8">Trending Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <img
                  src={product.image}
                  alt={`${product.name} trending fashion product`}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <p className="text-primary font-bold">Rp {product.price.toLocaleString('id-ID')}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Brand Highlights */}
        <section className="bg-muted py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Brand Kolaborasi</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {brands.map((brand, index) => (
                <img
                  key={index}
                  src={brand}
                  alt={`Fashion brand partner logo ${index + 1}`}
                  className="h-16 object-contain grayscale hover:grayscale-0 transition-all"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-primary text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Dapatkan Update Terbaru</h2>
            <p className="mb-6">Berlangganan newsletter untuk mendapatkan promo eksklusif dan informasi koleksi terbaru</p>
            <div className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Email Anda"
                className="flex-1 px-4 py-2 rounded-l-md text-foreground focus:outline-none"
              />
              <button className="bg-accent px-6 py-2 rounded-r-md hover:bg-accent/90 transition-colors">
                <Mail size={20} className="inline-block mr-2" />
                Berlangganan
              </button>
            </div>
            <p className="text-sm mt-4 text-white/80">Kami janji tidak spam! Dapatkan diskon 10% untuk pembelian pertama</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img 
                  src="https://placeholder-image-service.onrender.com/image/40x40?prompt=hilma%20husna%20fashion%20brand%20logo&id=logo-footer-1" 
                  alt="Hilma Husna Fashion Logo" 
                  className="w-10 h-10"
                />
                <h3 className="text-xl font-bold">Hilma Husna</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Menyediakan fashion terkini untuk segala kebutuhan gaya Anda dengan kualitas terbaik.
              </p>
              <div className="flex space-x-4">
                <Facebook size={24} className="cursor-pointer hover:text-primary" />
                <Instagram size={24} className="cursor-pointer hover:text-primary" />
                <Twitter size={24} className="cursor-pointer hover:text-primary" />
                <Youtube size={24} className="cursor-pointer hover:text-primary" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Bantuan</h4>
              <ul className="space-y-2">
                {['Pusat Bantuan', 'Cara Pesan', 'Pengiriman', 'Returns', 'Size Guide'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-muted-foreground hover:text-primary">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="font-semibold mb-4">Tentang Kami</h4>
              <ul className="space-y-2">
                {['Our Story', 'Karir', 'Sustainability', 'Blog', 'Press'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-muted-foreground hover:text-primary">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Payment */}
            <div>
              <h4 className="font-semibold mb-4">Kontak & Pembayaran</h4>
              <p className="text-muted-foreground mb-4">
                Customer Service: (021) 1234-5678<br />
                Email: hello@hilmahusna.com
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white p-2 rounded">
                    <img
                      src={`https://placeholder-image-service.onrender.com/image/40x25?prompt=payment%20method%20logo%20${i}&id=payment-${i}`}
                      alt={`Payment method ${i}`}
                      className="w-full h-6 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>© 2024 Hilma Husna. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OLShopSections;