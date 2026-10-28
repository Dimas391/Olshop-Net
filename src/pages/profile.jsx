import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit3, 
  Save, 
  X, 
  Camera, 
  Shield,
  Package,
  Heart,
  Star
} from 'lucide-react';
import Navbaruser from '../components/navbar_user.jsx';
import Footer from '../components/footer.jsx';

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    nama: '',
    email: '',
    phone: '',
    address: '',
    created_at: '',
    avatar: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editData, setEditData] = useState({});
  
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
  }, []);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token') || localStorage.getItem('authToken');
      
      // Try to load from localStorage first
      const storedUser = localStorage.getItem('user') || localStorage.getItem('userData');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserData({
          nama: user.nama || '',
          email: user.email || '',
          phone: user.phone || '',
          address: user.address || '',
          created_at: user.created_at || '',
          avatar: user.avatar || null
        });
      }

      // Then fetch fresh data from API
      const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          const freshData = {
            nama: result.data.nama || '',
            email: result.data.email || '',
            phone: result.data.phone || '',
            address: result.data.address || '',
            created_at: result.data.created_at || '',
            avatar: result.data.avatar || null
          };
          setUserData(freshData);
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setEditData({
      nama: userData.nama,
      phone: userData.phone,
      address: userData.address
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditData({});
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const token = localStorage.getItem('token') || localStorage.getItem('authToken');
      
      const response = await fetch(`${API_BASE_URL}/api/auth/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editData)
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          // Update local state
          setUserData(prev => ({
            ...prev,
            ...editData
          }));
          
          // Update localStorage
          const storedUser = localStorage.getItem('user') || localStorage.getItem('userData');
          if (storedUser) {
            const user = JSON.parse(storedUser);
            const updatedUser = { ...user, ...editData };
            localStorage.setItem('user', JSON.stringify(updatedUser));
          }
          
          setIsEditing(false);
          alert('Profil berhasil diperbarui!');
        } else {
          alert('Gagal memperbarui profil: ' + (result.message || 'Unknown error'));
        }
      } else {
        alert('Gagal memperbarui profil');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Terjadi kesalahan saat memperbarui profil');
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Navbaruser />
        <div className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-6 bg-gray-300 rounded w-48"></div>
                    <div className="h-4 bg-gray-300 rounded w-64"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbaruser />
      
      {/* Profile Content */}
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Profil Saya</h1>
            <p className="text-gray-600 mt-2">Kelola informasi profil Anda</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info Card */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-8">
                {/* Profile Header */}
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {userData.avatar ? (
                          <img 
                            src={userData.avatar} 
                            alt="Avatar" 
                            className="w-20 h-20 rounded-full object-cover"
                          />
                        ) : (
                          userData.nama ? userData.nama.charAt(0).toUpperCase() : 'U'
                        )}
                      </div>
                      <button className="absolute -bottom-1 -right-1 bg-gray-600 text-white rounded-full p-1 hover:bg-gray-700">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{userData.nama || 'Nama belum diisi'}</h2>
                      <p className="text-gray-600">{userData.email}</p>
                      <p className="text-sm text-green-600 mt-1">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Bergabung {formatDate(userData.created_at)}
                      </p>
                    </div>
                  </div>
                  
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Edit Profil</span>
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        <span>{isSaving ? 'Menyimpan...' : 'Simpan'}</span>
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        <span>Batal</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Profile Details */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nama */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Nama Lengkap
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.nama || ''}
                          onChange={(e) => setEditData(prev => ({ ...prev, nama: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Masukkan nama lengkap"
                        />
                      ) : (
                        <p className="text-gray-900 py-2 px-3 bg-gray-50 rounded-lg">
                          {userData.nama || 'Belum diisi'}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email
                      </label>
                      <p className="text-gray-900 py-2 px-3 bg-gray-50 rounded-lg">
                        {userData.email}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Email tidak dapat diubah</p>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Nomor Telepon
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editData.phone || ''}
                          onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Masukkan nomor telepon"
                        />
                      ) : (
                        <p className="text-gray-900 py-2 px-3 bg-gray-50 rounded-lg">
                          {userData.phone || 'Belum diisi'}
                        </p>
                      )}
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 inline mr-2" />
                        Alamat
                      </label>
                      {isEditing ? (
                        <textarea
                          value={editData.address || ''}
                          onChange={(e) => setEditData(prev => ({ ...prev, address: e.target.value }))}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Masukkan alamat lengkap"
                        />
                      ) : (
                        <p className="text-gray-900 py-2 px-3 bg-gray-50 rounded-lg min-h-[80px]">
                          {userData.address || 'Belum diisi'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistik Akun</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Package className="w-5 h-5 text-blue-500" />
                      <span className="text-gray-700">Total Pesanan</span>
                    </div>
                    <span className="font-semibold text-blue-600">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span className="text-gray-700">Wishlist</span>
                    </div>
                    <span className="font-semibold text-red-600">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span className="text-gray-700">Review Diberikan</span>
                    </div>
                    <span className="font-semibold text-yellow-600">5</span>
                  </div>
                </div>
              </div>

              {/* Security Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  <Shield className="w-5 h-5 inline mr-2" />
                  Keamanan
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Verifikasi Email</span>
                    <span className="text-green-600 bg-green-100 px-2 py-1 rounded text-sm">
                      Terverifikasi
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Verifikasi Phone</span>
                    <span className="text-gray-600 bg-gray-100 px-2 py-1 rounded text-sm">
                      Belum
                    </span>
                  </div>
                  <button className="w-full mt-4 text-green-600 border border-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors">
                    Ubah Password
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => navigate('/riwayat-pesanan')}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Lihat Riwayat Pesanan
                  </button>
                  <button 
                    onClick={() => navigate('/wishlist')}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Wishlist Saya
                  </button>
                  <button 
                    onClick={() => navigate('/settings')}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Pengaturan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;