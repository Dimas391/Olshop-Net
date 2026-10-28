import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import OlshopLogin from './pages/login';
import Index from './pages/index';
import OlshopDaftar from'./pages/singup'; 
import HomeSections from './pages/home'; 
import  Product from './pages/produk'; 
import ProductDetail from './pages/detail_produk';
import AboutPage from './pages/tentang'; 
import OLShopSections from './pages/index';
import ContactPage from './pages/kontak'; 
import Orderhistory from './pages/riwayat_pesanan';
import NotificationPage from './pages/notifikasi';
import ProfilePage from './pages/profile'; // Assuming you have a ProfilePage component
import SettingsPage from './pages/settings'; // Assuming you have a SettingsPage component
import Productuser from './pages/produk_user'; // Assuming you have a Productuser component
import FashionPage from './pages/kategori/fashion'; // Assuming you have a FashionPage component
import ElektronikPage from './pages/kategori/elektronik'; // Assuming you have an ElektronikPage component
import RumahTanggaPage from './pages/kategori/rumah_tangga'; // Assuming you have a RumahTanggaPage component
import KecantikanPage from './pages/kategori/kecantikan'; // Assuming you have a KecantikanPage component
import OlahragaPage from './pages/kategori/olahraga'; // Assuming you have an OlahragaPage component
import BukuPage from './pages/kategori/buku'; // Assuming you have a BukuPage component
import GamingPage from './pages/kategori/gaming'; // Assuming you have a GamingPage component

const App = () => {
  return (
    <Router>
       {/* Menampilkan Navbar */}
      <Routes>
        <Route path="/" element={<Index />} />  {/* Halaman utama */}
        <Route path="/login" element={<OlshopLogin />} />  {/* Halaman Login */}
        <Route path="/daftar" element={<OlshopDaftar />} />  {/* Halaman Daftar */}
        <Route path="/home" element={<HomeSections />} />  {/* Halaman Home */}
        <Route path="/produk" element={<Product />} />  {/* Halaman Produk */}
        <Route path="/produk/:id" element={<ProductDetail />} />  {/* Halaman Detail Produk */}
        <Route path="/tentang" element={<AboutPage />} />  {/* Halaman Tentang Kami */}
        <Route path="/OLShopSections" element={<OLShopSections />} />  {/* Halaman OLShop Sections */}
        <Route path="/kontak" element={<ContactPage />} />  {/* Halaman Kontak */}
        <Route path="/riwayat-pesanan" element={<Orderhistory />} />  {/* Halaman Riwayat Pesanan */}
        <Route path="/notifikasi" element={<NotificationPage />} />  {/* Halaman Notifikasi */}
        <Route path="/profile" element={<ProfilePage />} />  {/* Halaman Profil */}
        <Route path="/settings" element={<SettingsPage />} />  {/* Halaman Pengaturan */}
        <Route path="/produk_user" element={<Productuser />} />  {/* Halaman Produk User */}
        <Route path="/kategori/fashion" element={<FashionPage />} />  {/* Halaman Kategori Fashion */}
        <Route path="/kategori/elektronik" element={<ElektronikPage />} />  {/* Halaman Kategori Elektronik */}
        <Route path="/kategori/rumah_tangga" element={<RumahTanggaPage />} />  {/* Halaman Kategori Rumah Tangga */}
        <Route path="/kategori/kecantikan" element={<KecantikanPage />} />  {/* Halaman Kategori Kecantikan */}
        <Route path="/kategori/olahraga" element={<OlahragaPage />} />  {/* Halaman Kategori Olahraga */}
        <Route path="/kategori/buku" element={<BukuPage />} />  {/* Halaman Kategori Buku */}
        <Route path="/kategori/gaming" element={<GamingPage />} />  {/* Halaman Kategori Gaming */}
       {/* Tambahkan rute lainnya sesuai kebutuhan */}
      </Routes> 
    </Router>
  );
};

export default App;
