import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/navbar.jsx';
import Sectionuser from '../components/section_user.jsx';
import Footer from '../components/footer.jsx';

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef();

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, observerOptions);

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in-element');
    fadeElements.forEach(el => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const Header = () => (
    <header className="fixed w-full top-0 z-50 bg-white shadow-lg transition-all duration-300">
    <Navbar />
    </header>
  );
  const PageHeader = () => (
   <Sectionuser />
  );
  const CompanyOverview = () => (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
          <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-700">
            <h3 className="text-3xl text-green-500 mb-4 font-bold">Sejarah Olshop NET</h3>
            <p className="text-lg mb-6 text-justify leading-relaxed">
              Olshop NET didirikan pada tahun 2020 dengan visi untuk menjadi platform e-commerce terdepan di Indonesia. 
              Berawal dari keinginan untuk memudahkan masyarakat dalam berbelanja online, kami berkomitmen menyediakan 
              produk berkualitas dengan harga terjangkau.
            </p>
            <p className="text-lg mb-6 text-justify leading-relaxed">
              Dalam perjalanan 5 tahun terakhir, kami telah berkembang pesat dan kini melayani lebih dari 1 juta pelanggan 
              di seluruh Indonesia. Kepercayaan pelanggan adalah fondasi utama yang mendorong kami untuk terus berinovasi 
              dan memberikan layanan terbaik.
            </p>
            <p className="text-lg text-justify leading-relaxed">
              Kami bangga menjadi bagian dari transformasi digital Indonesia dan berperan aktif dalam mengembangkan 
              ekosistem e-commerce yang sehat dan berkelanjutan.
            </p>
          </div>
          <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-700 text-center">
            <div className="text-9xl">🏢</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-700 bg-white p-10 rounded-3xl shadow-xl text-center hover:transform hover:-translate-y-2 transition-all duration-300">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl text-white">
              🎯
            </div>
            <h3 className="text-2xl font-bold mb-4">Visi Kami</h3>
            <p className="text-gray-600 leading-relaxed">
              Menjadi platform e-commerce terpercaya dan terdepan di Indonesia yang menghadirkan kemudahan berbelanja online 
              dengan produk berkualitas dan harga terjangkau untuk semua kalangan.
            </p>
          </div>
          <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-700 bg-white p-10 rounded-3xl shadow-xl text-center hover:transform hover:-translate-y-2 transition-all duration-300">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl text-white">
              🚀
            </div>
            <h3 className="text-2xl font-bold mb-4">Misi Kami</h3>
            <p className="text-gray-600 leading-relaxed">
              Menyediakan pengalaman berbelanja online yang aman, nyaman, dan menyenangkan melalui teknologi terdepan, 
              layanan pelanggan terbaik, dan kemitraan strategis dengan seller terpercaya.
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  const ValuesSection = () => {
    const values = [
      { icon: '🤝', title: 'Integritas', desc: 'Berkomitmen pada kejujuran dan transparansi dalam setiap aspek bisnis' },
      { icon: '⭐', title: 'Kualitas', desc: 'Mengutamakan kualitas produk dan layanan untuk kepuasan pelanggan' },
      { icon: '💡', title: 'Inovasi', desc: 'Terus berinovasi untuk memberikan solusi dan pengalaman terbaik' },
      { icon: '❤️', title: 'Kepedulian', desc: 'Peduli terhadap kebutuhan dan kepuasan setiap pelanggan' },
      { icon: '🔒', title: 'Kepercayaan', desc: 'Membangun dan menjaga kepercayaan melalui layanan yang konsisten' },
    ];

    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="fade-in-element opacity-0 translate-y-8 transition-all duration-700 text-4xl font-bold text-center mb-4">
            Nilai-Nilai Olshop NET
          </h2>
          <p className="fade-in-element opacity-0 translate-y-8 transition-all duration-700 text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Prinsip-prinsip yang kami pegang teguh dalam menjalankan bisnis dan melayani pelanggan
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="fade-in-element opacity-0 translate-y-8 transition-all duration-700 bg-white p-8 rounded-2xl text-center shadow-lg hover:transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl text-white">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold mb-2">{value.title}</h4>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const ServicesSection = () => {
    const services = [
      { icon: '🛍️', title: 'Marketplace Terlengkap', desc: 'Menyediakan lebih dari 100,000 produk dari berbagai kategori mulai dari fashion, elektronik, hingga kebutuhan rumah tangga dengan pilihan yang sangat beragam.' },
      { icon: '🚚', title: 'Pengiriman Cepat', desc: 'Layanan pengiriman cepat ke seluruh Indonesia dengan jaminan barang sampai tepat waktu dan dalam kondisi baik melalui mitra logistik terpercaya.' },
      { icon: '💳', title: 'Sistem Pembayaran', desc: 'Sistem pembayaran yang aman dan beragam mulai dari transfer bank, e-wallet, hingga cicilan 0% untuk kemudahan transaksi Anda.' },
      { icon: '⭐', title: 'Rekomendasi Produk', desc: 'Sistem rekomendasi produk yang dipersonalisasi berdasarkan preferensi dan riwayat belanja untuk membantu Anda menemukan produk yang tepat.' },
      { icon: '🔄', title: 'Pengembalian Produk', desc: 'Kebijakan pengembalian yang mudah dan fleksibel dengan garansi uang kembali 100% jika produk tidak sesuai dengan deskripsi atau mengalami kerusakan.' }
    ];

    return (
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="fade-in-element opacity-0 translate-y-8 transition-all duration-700 text-4xl font-bold text-center mb-4">
            Layanan Kami
          </h2>
          <p className="fade-in-element opacity-0 translate-y-8 transition-all duration-700 text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Berbagai layanan unggulan yang kami tawarkan untuk kemudahan berbelanja Anda
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="fade-in-element opacity-0 translate-y-8 transition-all duration-700 bg-white p-8 rounded-2xl border-l-4 border-green-500 shadow-lg hover:transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <h4 className="text-xl font-bold text-green-500 mb-4 flex items-center">
                  <span className="mr-2">{service.icon}</span>
                  {service.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const CTASection = () => (
    <section className="py-20 bg-gradient-to-br from-green-500 to-green-600 text-white text-center">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="fade-in-element opacity-0 translate-y-8 transition-all duration-700 text-4xl font-bold mb-4">
          Bergabunglah dengan Keluarga Besar Olshop NET
        </h2>
        <p className="fade-in-element opacity-0 translate-y-8 transition-all duration-700 text-xl mb-8 opacity-90 max-w-3xl mx-auto">
          Rasakan pengalaman berbelanja online yang berbeda dan nikmati berbagai keuntungan eksklusif sebagai member kami
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#" className="bg-white text-green-500 px-8 py-4 rounded-full font-semibold hover:transform hover:-translate-y-1 transition-all duration-300 inline-block">
            Jelajahi Produk
          </a>
        </div>
      </div>
    </section>
  );
  
  return (
    <div className="font-sans">
      <Header />
      <PageHeader />
      <CompanyOverview />
      <ValuesSection />
      <ServicesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default AboutPage;