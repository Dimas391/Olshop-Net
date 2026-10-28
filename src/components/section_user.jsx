import { useState, useEffect } from 'react';
import Icon from '../image/icon.png';

const Sectionuser = () => {
  const [userData, setUserData] = useState({ nama: 'User' });
  const [greeting, setGreeting] = useState('Selamat Pagi');

  // Fungsi untuk mendapatkan salam berdasarkan waktu
  const getTimeGreeting = () => {
    const now = new Date();
    const hour = now.getHours();
    
    if (hour >= 5 && hour < 11) {
      return 'Selamat Pagi';
    } else if (hour >= 11 && hour < 15) {
      return 'Selamat Siang';
    } else if (hour >= 15 && hour < 18) {
      return 'Selamat Sore';
    } else {
      return 'Selamat Malam';
    }
  };

  // Fungsi untuk mengambil data user dari localStorage
  const loadUserData = () => {
    try {
      const storedUser = localStorage.getItem('user');
      
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.nama) {
          setUserData({ nama: parsedUser.nama });
          return;
        }
      }
      
      // Jika tidak ada data user, tetap gunakan default 'User'
      setUserData({ nama: 'User' });
    } catch (error) {
      console.error('Error loading user data from localStorage:', error);
      setUserData({ nama: 'User' });
    }
  };

  useEffect(() => {
    // Set greeting berdasarkan waktu saat ini
    setGreeting(getTimeGreeting());
    
    // Load user data from localStorage
    loadUserData();
    
    // Update greeting setiap menit
    const greetingInterval = setInterval(() => {
      setGreeting(getTimeGreeting());
    }, 60000);

    // Cleanup interval
    return () => clearInterval(greetingInterval);
  }, []);

  return (
    <section id="home" className="pt-32 relative overflow-hidden bg-green-50 py-20">
      {/* Bentuk Shape */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-green-300 rounded-full opacity-30 shape1"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-green-500 rounded-full opacity-20 shape2"></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">
          
          {/* Text */}
          <div className="max-w-xl text-center md:text-left">
            <h1 className="text-4xl text-green-500 font-bold text-gray-800 mb-4">Olshop NET</h1>
            <h1 className="text-4xl text-black-400 font-bold text-gray-800 mb-4">
              {`${greeting} ${userData.nama}`}
            </h1>
            <p className="text-gray-600 mb-6">
              Sebuah platform belanja online yang murah dan terjangkau dengan berbagai pilihan produk berkualitas untuk memenuhi kebutuhan sehari-hari Anda.
            </p>
            <a
              href="#"
              className="inline-block bg-green-500 text-white px-6 font-bold py-3 rounded-full shadow hover:bg-green-600 transition"
            >
              Belanja Sekarang
            </a>
          </div>

          {/* Gambar */}
          <img src={Icon} alt="Icon" className="w-[830px] h-[340px] ml-58 mt-[-57px]" />
        </div>
      </div>
    </section>
  );
};

export default Sectionuser;