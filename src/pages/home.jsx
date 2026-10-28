import React, { useState, useEffect } from 'react';
import Navbaruser from '../components/navbar_user.jsx';
import Sectionuser from '../components/section_user.jsx';
import KategoriPopuler from '../components/kategori.jsx';
import Footer from '../components/footer.jsx';
import FlashSale from '../components/flash_sale.jsx';
import Rekomendasi from '../components/rekomendasi.jsx';
import { Truck, CreditCard, Lock, MessageCircle, DollarSign, Star, Smartphone, Download } from 'lucide-react';

const HomeSections = () => {
  const [isVisible, setIsVisible] = useState({});

  // Categories data
  const categories = [
    {
      id: 1,
      icon: '👔',
      title: 'Pakaian',
      description: 'Fashion terlengkap untuk pria dan wanita dengan harga terjangkau'
    },
    {
      id: 2,
      icon: '📱',
      title: 'Elektronik',
      description: 'Gadget dan perangkat elektronik terbaru dengan kualitas terbaik'
    },
    {
      id: 3,
      icon: '🍽️',
      title: 'Makanan dan Minuman',
      description: 'Aneka makanan dan minuman segar langsung dari produsen'
    },
    {
      id: 4,
      icon: '🏠',
      title: 'Rumah Tangga',
      description: 'Peralatan rumah tangga untuk kenyamanan hidup sehari-hari'
    },
    {
      id: 5,
      icon: '💄',
      title: 'Kecantikan',
      description: 'Produk kecantikan dan perawatan diri berkualitas tinggi'
    },
    {
      id: 6,
      icon: '⚽',
      title: 'Olahraga',
      description: 'Perlengkapan olahraga dan fitness untuk gaya hidup sehat'
    }
  ];

  // Features data
  const features = [
    {
      id: 1,
      icon: <Truck className="w-8 h-8" />,
      title: 'Pengiriman Cepat',
      description: 'Pengiriman express ke seluruh Indonesia dengan jaminan barang sampai dengan aman'
    },
    {
      id: 2,
      icon: <CreditCard className="w-8 h-8" />,
      title: 'Pembayaran Aman',
      description: 'Berbagai metode pembayaran yang aman dan terpercaya untuk kemudahan berbelanja'
    },
    {
      id: 3,
      icon: <Lock className="w-8 h-8" />,
      title: 'Garansi Produk',
      description: 'Semua produk bergaransi resmi dengan layanan purna jual yang memuaskan'
    },
    {
      id: 4,
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Customer Service 24/7',
      description: 'Tim customer service yang siap membantu Anda kapan saja melalui berbagai channel'
    },
    {
      id: 5,
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Harga Terjangkau',
      description: 'Harga kompetitif dengan kualitas terbaik, plus promo menarik setiap hari'
    },
    {
      id: 6,
      icon: <Star className="w-8 h-8" />,
      title: 'Kualitas Terjamin',
      description: 'Produk berkualitas tinggi dari seller terpercaya dengan rating dan review terbaik'
    }
  ];

  // Stats data
  const stats = [
    { id: 1, number: '1M+', label: 'Pelanggan Puas' },
    { id: 2, number: '100K+', label: 'Produk Tersedia' },
    { id: 3, number: '500+', label: 'Kota Terjangkau' },
    { id: 4, number: '99%', label: 'Tingkat Kepuasan' }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      text: 'Belanja di Olshop NET sangat mudah dan nyaman. Produknya berkualitas dengan harga yang sangat terjangkau. Pengiriman juga cepat!',
      author: 'Sarah Jakarta'
    },
    {
      id: 2,
      text: 'Customer service yang responsif dan ramah. Ketika ada masalah dengan pesanan, langsung ditangani dengan baik. Recommended!',
      author: 'Budi Surabaya'
    },
    {
      id: 3,
      text: 'Variasi produknya lengkap banget, dari fashion sampai elektronik semua ada. Jadi one-stop shopping solution untuk keluarga.',
      author: 'Dian Bandung'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-in-element');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    
    <div className="bg-gray-50">
      {/* Categories Section */}
      <Navbaruser />
      <Sectionuser />
      <KategoriPopuler />
      <section id="produk" className="py-16 bg-white">
        <div className="promo-banner bg-green-500 text-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold flex justify-center items-center">
        ⚡ FLASH SALE 12.12 ⚡
        </h3>
        <p className="text-center text-lg mt-2">Diskon hingga 80% untuk semua kategori!</p>
        <div className="promo-timer flex justify-center mt-6">
        <div className="timer-item bg-green-300 text-white p-4 rounded-lg shadow-md mx-2">
            <div className="timer-number text-3xl font-bold">05</div>
            <div className="timer-label text-sm">Jam</div>
        </div>
        <div className="timer-item bg-green-300 text-white p-4 rounded-lg shadow-md mx-2">
            <div className="timer-number text-3xl font-bold">23</div>
            <div className="timer-label text-sm">Menit</div>
        </div>
        <div className="timer-item bg-green-300 text-white p-4 rounded-lg shadow-md mx-2">
            <div className="timer-number text-3xl font-bold">47</div>
            <div className="timer-label text-sm">Detik</div>
        </div>
        </div>
    </div>
    </section>
    <FlashSale />
    <Rekomendasi />

     <Footer />
    </div>
  );
};

export default HomeSections;