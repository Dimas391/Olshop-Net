import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Truck, 
  Moon, 
  Sun, 
  Globe, 
  Lock, 
  Mail, 
  Phone,
  Eye,
  EyeOff,
  Save,
  AlertCircle,
  Check,
  X,
  Trash2
} from 'lucide-react';
import Navbaruser from '../components/navbar_user.jsx';
import Footer from '../components/footer.jsx';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState({
    nama: '',
    email: '',
    phone: ''
  });
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      orderUpdates: true,
      promotions: false,
      newsletter: true
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false,
      dataCollection: true
    },
    preferences: {
      language: 'id',
      currency: 'IDR',
      theme: 'light',
      itemsPerPage: 20
    }
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const navigate = useNavigate();
  const API_BASE_URL = 'http://localhost:5000';

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('token') || localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }
    
    loadUserData();
    loadSettings();
  }, []);

  const loadUserData = async () => {
    try {
      const storedUser = localStorage.getItem('user') || localStorage.getItem('userData');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserData({
          nama: user.nama || '',
          email: user.email || '',
          phone: user.phone || ''
        });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const loadSettings = () => {
    // Load settings from localStorage or use defaults
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  };

  const saveSettings = async () => {
    try {
      setIsSaving(true);
      
      // Save to localStorage
      localStorage.setItem('userSettings', JSON.stringify(settings));
      
      // Here you would also save to your API
      // const response = await fetch(`${API_BASE_URL}/api/user/settings`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify(settings)
      // });

      setMessage({ type: 'success', text: 'Pengaturan berhasil disimpan!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage({ type: 'error', text: 'Gagal menyimpan pengaturan' });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      setMessage({ type: 'error', text: 'Semua field password harus diisi' });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'Konfirmasi password tidak cocok' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password baru minimal 6 karakter' });
      return;
    }

    try {
      setIsSaving(true);
      const token = localStorage.getItem('token') || localStorage.getItem('authToken');
      
      const response = await fetch(`${API_BASE_URL}/api/auth/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
          setMessage({ type: 'success', text: 'Password berhasil diubah!' });
        } else {
          setMessage({ type: 'error', text: result.message || 'Gagal mengubah password' });
        }
      } else {
        setMessage({ type: 'error', text: 'Gagal mengubah password' });
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setMessage({ type: 'error', text: 'Terjadi kesalahan saat mengubah password' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      'Apakah Anda yakin ingin menghapus akun? Tindakan ini tidak dapat dibatalkan!'
    );
    
    if (confirmed) {
      const doubleConfirm = window.confirm(
        'Konfirmasi sekali lagi: Semua data akan hilang permanen!'
      );
      
      if (doubleConfirm) {
        // Handle account deletion
        alert('Fitur hapus akun akan segera tersedia');
      }
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profil & Akun', icon: User },
    { id: 'notifications', label: 'Notifikasi', icon: Bell },
    { id: 'privacy', label: 'Privasi & Keamanan', icon: Shield },
    { id: 'preferences', label: 'Preferensi', icon: Settings }
  ];

  const togglePassword = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const renderProfileTab = () => (
    <div className="space-y-8">
      {/* Account Info */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Akun</h3>
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Nama:</span>
            <span className="font-medium">{userData.nama}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Email:</span>
            <span className="font-medium">{userData.email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Telepon:</span>
            <span className="font-medium">{userData.phone || 'Belum diisi'}</span>
          </div>
        </div>
        <button 
          onClick={() => navigate('/profile')}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Edit Profil
        </button>
      </div>

      {/* Password Change */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ubah Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password Saat Ini
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Masukkan password saat ini"
              />
              <button
                type="button"
                onClick={() => togglePassword('current')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password Baru
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? 'text' : 'password'}
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Masukkan password baru"
              />
              <button
                type="button"
                onClick={() => togglePassword('new')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Konfirmasi Password Baru
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Konfirmasi password baru"
              />
              <button
                type="button"
                onClick={() => togglePassword('confirm')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            onClick={handlePasswordChange}
            disabled={isSaving}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {isSaving ? 'Mengubah...' : 'Ubah Password'}
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div>
        <h3 className="text-lg font-semibold text-red-600 mb-4">Zona Berbahaya</h3>
        <div className="border border-red-200 bg-red-50 p-4 rounded-lg">
          <p className="text-red-700 mb-4">
            Menghapus akun akan menghilangkan semua data Anda secara permanen.
          </p>
          <button
            onClick={handleDeleteAccount}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Hapus Akun</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifikasi Email</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Notifikasi Pesanan</div>
              <div className="text-sm text-gray-500">Terima email untuk update pesanan Anda</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.orderUpdates}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, orderUpdates: e.target.checked }
                }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Promosi & Penawaran</div>
              <div className="text-sm text-gray-500">Terima email tentang diskon dan penawaran khusus</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.promotions}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, promotions: e.target.checked }
                }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Newsletter</div>
              <div className="text-sm text-gray-500">Terima newsletter mingguan dengan tips belanja</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.newsletter}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, newsletter: e.target.checked }
                }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifikasi Push</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Notifikasi Browser</div>
              <div className="text-sm text-gray-500">Terima notifikasi langsung di browser</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.push}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, push: e.target.checked }
                }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">SMS Notifikasi</div>
              <div className="text-sm text-gray-500">Terima SMS untuk update penting</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.sms}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, sms: e.target.checked }
                }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Visibilitas Profil</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Siapa yang dapat melihat profil Anda?
            </label>
            <select
              value={settings.privacy.profileVisibility}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                privacy: { ...prev.privacy, profileVisibility: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="public">Publik</option>
              <option value="friends">Hanya Teman</option>
              <option value="private">Privat</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Tampilkan Email</div>
              <div className="text-sm text-gray-500">Email akan terlihat di profil publik</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.privacy.showEmail}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  privacy: { ...prev.privacy, showEmail: e.target.checked }
                }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Tampilkan Telepon</div>
              <div className="text-sm text-gray-500">Nomor telepon akan terlihat di profil publik</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.privacy.showPhone}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  privacy: { ...prev.privacy, showPhone: e.target.checked }
                }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data & Privasi</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Pengumpulan Data Analitik</div>
              <div className="text-sm text-gray-500">Bantu kami meningkatkan layanan dengan data anonim</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.privacy.dataCollection}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  privacy: { ...prev.privacy, dataCollection: e.target.checked }
                }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-blue-800 font-medium">Unduh Data Anda</p>
                <p className="text-blue-600 text-sm mt-1">
                  Anda dapat mengunduh semua data pribadi yang kami simpan tentang Anda.
                </p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm mt-3 hover:bg-blue-600 transition-colors">
                  Unduh Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tampilan & Bahasa</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Globe className="w-4 h-4 inline mr-2" />
              Bahasa
            </label>
            <select
              value={settings.preferences.language}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                preferences: { ...prev.preferences, language: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="id">Bahasa Indonesia</option>
              <option value="en">English</option>
              <option value="ms">Bahasa Malaysia</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mata Uang
            </label>
            <select
              value={settings.preferences.currency}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                preferences: { ...prev.preferences, currency: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="IDR">IDR - Rupiah</option>
              <option value="USD">USD - Dollar</option>
              <option value="MYR">MYR - Ringgit</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Theme
          </label>
          <div className="flex space-x-4">
            <button
              onClick={() => setSettings(prev => ({
                ...prev,
                preferences: { ...prev.preferences, theme: 'light' }
              }))}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                settings.preferences.theme === 'light'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-300 text-gray-700'
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>Light</span>
            </button>
            <button
              onClick={() => setSettings(prev => ({
                ...prev,
                preferences: { ...prev.preferences, theme: 'dark' }
              }))}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                settings.preferences.theme === 'dark'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-300 text-gray-700'
              }`}
            >
              <Moon className="w-4 h-4" />
              <span>Dark</span>
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferensi Belanja</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jumlah Item per Halaman
          </label>
          <select
            value={settings.preferences.itemsPerPage}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              preferences: { ...prev.preferences, itemsPerPage: parseInt(e.target.value) }
            }))}
            className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value={10}>10 item</option>
            <option value={20}>20 item</option>
            <option value={50}>50 item</option>
            <option value={100}>100 item</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbaruser />
      
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Pengaturan</h1>
            <p className="text-gray-600 mt-2">Kelola preferensi dan pengaturan akun Anda</p>
          </div>

          {/* Message */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              {message.type === 'success' ? (
                <Check className="w-5 h-5" />
              ) : (
                <X className="w-5 h-5" />
              )}
              <span>{message.text}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <nav className="bg-white rounded-lg shadow-sm p-4">
                <div className="space-y-1">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeTab === tab.id
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span className="text-sm font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </nav>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm p-8">
                {activeTab === 'profile' && renderProfileTab()}
                {activeTab === 'notifications' && renderNotificationsTab()}
                {activeTab === 'privacy' && renderPrivacyTab()}
                {activeTab === 'preferences' && renderPreferencesTab()}

                {/* Save Button */}
                {activeTab !== 'profile' && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <button
                      onClick={saveSettings}
                      disabled={isSaving}
                      className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isSaving ? 'Menyimpan...' : 'Simpan Pengaturan'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SettingsPage;