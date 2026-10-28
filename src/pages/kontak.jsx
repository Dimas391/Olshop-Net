import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/navbar.jsx';
import Sectionkontak from '../components/section_kontak.jsx';
import Footer from '../components/footer.jsx';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    subjek: '',
    pesan: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [formErrors, setFormErrors] = useState({});
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

    const fadeElements = document.querySelectorAll('.fade-in-element');
    fadeElements.forEach(el => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.nama.trim()) errors.nama = 'Nama lengkap harus diisi';
    if (!formData.email.trim()) errors.email = 'Email harus diisi';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email tidak valid';
    if (!formData.subjek) errors.subjek = 'Subjek harus dipilih';
    if (!formData.pesan.trim()) errors.pesan = 'Pesan harus diisi';
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert('Terima kasih! Pesan Anda telah terkirim. Tim kami akan segera merespons.');
      setFormData({ nama: '', email: '', subjek: '', pesan: '' });
      setIsSubmitting(false);
    }, 2000);
  };

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const Header = () => (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      <Navbar />
    </header>
  );

  const Hero = () => (
    <Sectionkontak />
  );

  const ContactForm = () => (
    <div className="fade-in-element translate-y-8 transition-all duration-700 bg-white p-8 rounded-3xl">
      <h2 className="text-3xl font-bold text-green-500 mb-6">Kirim Pesan</h2>
      <div>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="block mb-2 font-semibold text-gray-700">
              Nama Lengkap
            </div>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleInputChange}
              className={`w-full p-4 border-2 rounded-xl text-base transition-colors focus:outline-none ${
                formErrors.nama ? 'border-red-500' : 'border-gray-200 focus:border-green-500'
              }`}
            />
            {formErrors.nama && <p className="text-red-500 text-sm mt-1">{formErrors.nama}</p>}
          </div>
          <div>
            <div className="block mb-2 font-semibold text-gray-700">
              Email
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full p-4 border-2 rounded-xl text-base transition-colors focus:outline-none ${
                formErrors.email ? 'border-red-500' : 'border-gray-200 focus:border-green-500'
              }`}
            />
            {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
          </div>
        </div>
        
        <div className="mb-6">
          <div className="block mb-2 font-semibold text-gray-700">
            Subjek
          </div>
          <select
            name="subjek"
            value={formData.subjek}
            onChange={handleInputChange}
            className={`w-full p-4 border-2 rounded-xl text-base transition-colors focus:outline-none ${
              formErrors.subjek ? 'border-red-500' : 'border-gray-200 focus:border-green-500'
            }`}
          >
            <option value="">Pilih Subjek</option>
            <option value="tanya-produk">Pertanyaan Produk</option>
            <option value="keluhan-pengiriman">Keluhan Pengiriman</option>
            <option value="masalah-pembayaran">Masalah Pembayaran</option>
            <option value="return-refund">Return & Refund</option>
            <option value="akun-login">Masalah Akun/Login</option>
            <option value="kerjasama">Kerjasama Bisnis</option>
            <option value="saran">Saran & Masukan</option>
            <option value="lainnya">Lainnya</option>
          </select>
          {formErrors.subjek && <p className="text-red-500 text-sm mt-1">{formErrors.subjek}</p>}
        </div>

        <div className="mb-6">
          <div className="block mb-2 font-semibold text-gray-700">
            Pesan
          </div>
          <textarea
            name="pesan"
            rows="5"
            value={formData.pesan}
            onChange={handleInputChange}
            placeholder="Tuliskan pesan atau pertanyaan Anda..."
            className={`w-full p-4 border-2 rounded-xl text-base transition-colors focus:outline-none resize-vertical ${
              formErrors.pesan ? 'border-red-500' : 'border-gray-200 focus:border-green-500'
            }`}
          />
          {formErrors.pesan && <p className="text-red-500 text-sm mt-1">{formErrors.pesan}</p>}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-8 rounded-full text-lg font-semibold hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
        </button>
      </div>
    </div>
  );

  const ContactInfo = () => {
    const contactItems = [
      {
        icon: '📧',
        title: 'Email',
        details: ['info@olshop.net', 'support@olshop.net']
      },
      {
        icon: '📞',
        title: 'Telepon',
        details: ['0800-1234-5678 (Bebas Pulsa)', '(0651) 1234-5678']
      },
      {
        icon: '💬',
        title: 'WhatsApp',
        details: ['+62 812-3456-7890', 'Chat langsung dengan CS kami']
      },
      {
        icon: '📍',
        title: 'Alamat Kantor',
        details: ['Jl. Teuku Umar No. 123', 'Banda Aceh 23116, Aceh, Indonesia']
      },
      {
        icon: '⏰',
        title: 'Jam Operasional',
        details: ['Senin - Jumat: 08:00 - 22:00 WIB', 'Sabtu - Minggu: 09:00 - 21:00 WIB']
      }
    ];

    return (
      <div className="fade-in-element translate-y-8 duration-700">
        <h2 className="text-3xl font-bold text-green-500 mb-8">Informasi Kontak</h2>
        
        <div className="space-y-6">
          {contactItems.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg flex items-center gap-4 hover:transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-2xl text-white flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                {item.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600 mb-1">{detail}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const MapSection = () => (
    <div className="fade-in-element translate-y-8 transition-all duration-700 bg-white p-8 rounded-3xl shadow-xl mb-16">
      <h2 className="text-3xl font-bold text-green-500 mb-8 text-center">Lokasi Kantor Kami</h2>
      
      {/* Map Container */}
      <div className="w-full h-96 rounded-2xl overflow-hidden shadow-inner mb-6">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63571.78281822944!2d95.2838!3d5.5577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3040377ae63dbcdd%3A0x5df30b6aaf4b2c47!2sBanda%20Aceh%2C%20Kota%20Banda%20Aceh%2C%20Aceh!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Lokasi Kantor Olshop NET di Banda Aceh"
        />
      </div>
      </div>
  );

  const SocialSection = () => {
    const socialLinks = [
      { icon: '📘', name: 'Facebook', color: 'bg-blue-600', href: '#' },
      { icon: '📷', name: 'Instagram', color: 'bg-gradient-to-br from-purple-500 to-pink-500', href: '#' },
      { icon: '🐦', name: 'Twitter', color: 'bg-blue-400', href: '#' },
      { icon: '💬', name: 'WhatsApp', color: 'bg-green-500', href: '#' },
      { icon: '✈️', name: 'Telegram', color: 'bg-blue-500', href: '#' }
    ];
  };

  const FAQSection = () => {
    const faqs = [
      {
        question: 'Bagaimana cara melakukan pemesanan?',
        answer: 'Anda dapat melakukan pemesanan melalui website atau aplikasi mobile kami. Pilih produk yang diinginkan, masukkan ke keranjang, dan lakukan checkout dengan mengisi data pengiriman dan memilih metode pembayaran.'
      },
      {
        question: 'Berapa lama waktu pengiriman ke Banda Aceh?',
        answer: 'Untuk wilayah Banda Aceh dan sekitarnya, waktu pengiriman biasanya 1-3 hari kerja. Untuk kabupaten lain di Aceh, pengiriman membutuhkan waktu 3-5 hari kerja tergantung lokasi dan ketersediaan kurir.'
      },
      {
        question: 'Metode pembayaran apa saja yang tersedia?',
        answer: 'Kami menerima berbagai metode pembayaran seperti transfer bank, kartu kredit/debit, e-wallet (OVO, GoPay, DANA), dan bayar di tempat (COD) untuk area tertentu di Banda Aceh.'
      },
      {
        question: 'Bagaimana kebijakan return dan refund?',
        answer: 'Kami menerima return dalam 7 hari setelah barang diterima dengan kondisi barang masih dalam keadaan baik dan kemasan asli. Refund akan diproses dalam 3-5 hari kerja setelah barang return kami terima.'
      },
      {
        question: 'Apakah ada garansi untuk produk elektronik?',
        answer: 'Ya, semua produk elektronik yang kami jual memiliki garansi resmi dari distributor atau brand owner. Masa garansi bervariasi sesuai dengan jenis produk dan kebijakan masing-masing brand.'
      }
    ];

    return (
      <div className="fade-in-element translate-y-8 transition-all duration-700 bg-white p-8 rounded-3xl">
        <h2 className="text-3xl font-bold text-green-500 mb-8 text-center">Pertanyaan yang Sering Diajukan</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-4 hover:text-green-500 transition-colors focus:outline-none"
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">{faq.question}</span>
                  <span
                    className={`transform transition-transform duration-300 ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openFAQ === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-4 pt-0 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

 

  return (
    <div className="font-sans bg-gray-50">
      <Header />
      <Hero />
      
      <main className="py-20">
        <div className="max-w-6xl mx-auto px-5">
          {/* Contact Form and Info Grid */}
          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <ContactForm />
            <ContactInfo />
          </div>

          <MapSection />
          <SocialSection />
          <FAQSection />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;