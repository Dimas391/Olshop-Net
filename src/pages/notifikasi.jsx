import React, { useState, useEffect } from 'react';
import Footer from '../components/footer.jsx';
import Navbaruser from '../components/navbar_user.jsx';
import { Bell, Package, Truck, CreditCard, Gift, AlertCircle, CheckCircle, Info, Star, Trash2, Settings, Filter, Search, X, Check, Eye } from 'lucide-react';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [showSettings, setShowSettings] = useState(false);

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    promotions: true,
    recommendations: true,
    security: true,
    newsletter: false
  });

  // Sample notification data
  useEffect(() => {
    const sampleNotifications = [
      {
        id: 'notif-001',
        type: 'order',
        title: 'Pesanan Anda Telah Dikirim',
        message: 'Pesanan ORD-2025-001 telah dikirim melalui JNE Express. Estimasi tiba: 2 hari kerja.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        read: false,
        priority: 'high',
        actionUrl: '#order-tracking',
        icon: Truck,
        color: 'blue',
        metadata: {
          orderId: 'ORD-2025-001',
          trackingNumber: 'JNE123456789'
        }
      },
      {
        id: 'notif-002',
        type: 'promotion',
        title: '🎉 Flash Sale 50% OFF!',
        message: 'Dapatkan diskon hingga 50% untuk semua kategori elektronik. Hanya berlaku hari ini!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: false,
        priority: 'medium',
        actionUrl: '#flash-sale',
        icon: Gift,
        color: 'purple',
        metadata: {
          discount: '50%',
          category: 'Elektronik'
        }
      },
      {
        id: 'notif-003',
        type: 'payment',
        title: 'Pembayaran Berhasil',
        message: 'Pembayaran sebesar Rp 485.000 untuk pesanan ORD-2025-001 telah berhasil diproses.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
        read: true,
        priority: 'medium',
        actionUrl: '#payment-receipt',
        icon: CreditCard,
        color: 'green',
        metadata: {
          amount: 485000,
          orderId: 'ORD-2025-001'
        }
      },
      {
        id: 'notif-004',
        type: 'security',
        title: 'Login dari Perangkat Baru',
        message: 'Kami mendeteksi login dari perangkat baru di Banda Aceh. Jika bukan Anda, segera ganti password.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
        read: false,
        priority: 'high',
        actionUrl: '#security-settings',
        icon: AlertCircle,
        color: 'red',
        metadata: {
          location: 'Banda Aceh',
          device: 'Chrome Browser'
        }
      },
      {
        id: 'notif-005',
        type: 'order',
        title: 'Pesanan Telah Sampai',
        message: 'Pesanan ORD-2024-098 telah sampai di tujuan. Terima kasih telah berbelanja bersama kami!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        read: true,
        priority: 'medium',
        actionUrl: '#order-review',
        icon: CheckCircle,
        color: 'green',
        metadata: {
          orderId: 'ORD-2024-098'
        }
      },
      {
        id: 'notif-006',
        type: 'recommendation',
        title: 'Produk yang Mungkin Anda Suka',
        message: 'Berdasarkan riwayat belanja Anda, kami rekomendasikan produk teknologi terbaru dengan harga terjangkau.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        read: true,
        priority: 'low',
        actionUrl: '#recommendations',
        icon: Star,
        color: 'yellow',
        metadata: {
          category: 'Teknologi'
        }
      },
      {
        id: 'notif-007',
        type: 'promotion',
        title: 'Kode Voucher Gratis!',
        message: 'Selamat! Anda mendapat voucher gratis ongkir untuk pembelian selanjutnya. Kode: FREESHIP2025',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
        read: false,
        priority: 'medium',
        actionUrl: '#vouchers',
        icon: Gift,
        color: 'purple',
        metadata: {
          voucherCode: 'FREESHIP2025',
          type: 'Free Shipping'
        }
      },
      {
        id: 'notif-008',
        type: 'order',
        title: 'Pesanan Sedang Diproses',
        message: 'Pesanan ORD-2025-003 sedang dalam tahap persiapan. Estimasi pengiriman: besok.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 days ago
        read: true,
        priority: 'low',
        actionUrl: '#order-details',
        icon: Package,
        color: 'blue',
        metadata: {
          orderId: 'ORD-2025-003'
        }
      }
    ];
    setNotifications(sampleNotifications);
    setFilteredNotifications(sampleNotifications);
  }, []);

  // Filter notifications
  useEffect(() => {
    let filtered = [...notifications];

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(notif => notif.type === filterType);
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(notif => 
        filterStatus === 'read' ? notif.read : !notif.read
      );
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(notif =>
        notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notif.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by timestamp (newest first)
    filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    setFilteredNotifications(filtered);
  }, [notifications, filterType, filterStatus, searchTerm]);

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Baru saja';
    if (minutes < 60) return `${minutes} menit yang lalu`;
    if (hours < 24) return `${hours} jam yang lalu`;
    if (days === 1) return 'Kemarin';
    return `${days} hari yang lalu`;
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAsUnread = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: false } : notif
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    setSelectedNotifications(prev => prev.filter(selectedId => selectedId !== id));
  };

  const toggleSelectNotification = (id) => {
    setSelectedNotifications(prev =>
      prev.includes(id)
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  const selectAllNotifications = () => {
    const allIds = filteredNotifications.map(notif => notif.id);
    setSelectedNotifications(allIds);
  };

  const clearSelection = () => {
    setSelectedNotifications([]);
  };

  const markSelectedAsRead = () => {
    setNotifications(prev =>
      prev.map(notif =>
        selectedNotifications.includes(notif.id) ? { ...notif, read: true } : notif
      )
    );
    clearSelection();
  };

  const deleteSelected = () => {
    if (window.confirm(`Hapus ${selectedNotifications.length} notifikasi yang dipilih?`)) {
      setNotifications(prev =>
        prev.filter(notif => !selectedNotifications.includes(notif.id))
      );
      clearSelection();
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const getNotificationColor = (color, priority) => {
    const colors = {
      blue: priority === 'high' ? 'bg-blue-100 border-blue-300' : 'bg-blue-50 border-blue-200',
      green: priority === 'high' ? 'bg-green-100 border-green-300' : 'bg-green-50 border-green-200',
      purple: priority === 'high' ? 'bg-purple-100 border-purple-300' : 'bg-purple-50 border-purple-200',
      red: priority === 'high' ? 'bg-red-100 border-red-300' : 'bg-red-50 border-red-200',
      yellow: priority === 'high' ? 'bg-yellow-100 border-yellow-300' : 'bg-yellow-50 border-yellow-200'
    };
    return colors[color] || 'bg-gray-50 border-gray-200';
  };

  const getIconColor = (color) => {
    const colors = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
      red: 'text-red-600',
      yellow: 'text-yellow-600'
    };
    return colors[color] || 'text-gray-600';
  };

  const unreadCount = notifications.filter(notif => !notif.read).length;

  const Header = () => (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      <nav className="max-w-6xl mx-auto px-5 flex justify-between items-center py-4">
        <Navbaruser />
      </nav>
    </header>
  );

  const NotificationSettings = () => (
    <div className={`fixed inset-0 z-50 ${showSettings ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowSettings(false)} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Pengaturan Notifikasi</h3>
          <button onClick={() => setShowSettings(false)}>
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        
        <div className="space-y-4">
          {Object.entries(notificationSettings).map(([key, value]) => {
            const labels = {
              orderUpdates: 'Update Pesanan',
              promotions: 'Promosi & Diskon',
              recommendations: 'Rekomendasi Produk',
              security: 'Keamanan Akun',
              newsletter: 'Newsletter'
            };
            
            return (
              <div key={key} className="flex items-center justify-between">
                <span className="text-gray-700">{labels[key]}</span>
                <button
                  onClick={() => setNotificationSettings(prev => ({
                    ...prev,
                    [key]: !value
                  }))}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    value ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            );
          })}
        </div>
        
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setShowSettings(false)}
            className="flex-1 bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );

  const NotificationCard = ({ notification }) => {
    const IconComponent = notification.icon;
    const isSelected = selectedNotifications.includes(notification.id);

    return (
      <div className={`border-2 rounded-2xl p-6 transition-all duration-200 hover:shadow-lg ${
        notification.read ? 'bg-white border-gray-200' : `${getNotificationColor(notification.color, notification.priority)} border-2`
      } ${isSelected ? 'ring-2 ring-green-500' : ''}`}>
        <div className="flex items-start gap-4">
          {/* Selection Checkbox */}
          <button
            onClick={() => toggleSelectNotification(notification.id)}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
              isSelected ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-green-500'
            }`}
          >
            {isSelected && <Check className="w-3 h-3 text-white" />}
          </button>

          {/* Notification Icon */}
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            notification.read ? 'bg-gray-100' : getNotificationColor(notification.color, notification.priority)
          }`}>
            <IconComponent className={`w-6 h-6 ${notification.read ? 'text-gray-600' : getIconColor(notification.color)}`} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className={`font-semibold text-gray-800 ${!notification.read ? 'font-bold' : ''}`}>
                {notification.title}
                {!notification.read && <span className="w-2 h-2 bg-blue-500 rounded-full inline-block ml-2" />}
              </h3>
              <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                {getTimeAgo(notification.timestamp)}
              </span>
            </div>
            
            <p className="text-gray-600 mb-3 leading-relaxed">
              {notification.message}
            </p>

            {/* Priority Badge */}
            {notification.priority === 'high' && (
              <div className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full mb-3">
                <AlertCircle className="w-3 h-3" />
                Prioritas Tinggi
              </div>
            )}

            {/* Metadata */}
            {notification.metadata && (
              <div className="text-xs text-gray-500 mb-3 space-y-1">
                {notification.metadata.orderId && (
                  <p>📦 Pesanan: {notification.metadata.orderId}</p>
                )}
                {notification.metadata.trackingNumber && (
                  <p>🚚 Tracking: {notification.metadata.trackingNumber}</p>
                )}
                {notification.metadata.voucherCode && (
                  <p>🎫 Kode: {notification.metadata.voucherCode}</p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              {notification.actionUrl && (
                <button className="px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors">
                  Lihat Detail
                </button>
              )}
              
              {!notification.read ? (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  Tandai Dibaca
                </button>
              ) : (
                <button
                  onClick={() => markAsUnread(notification.id)}
                  className="flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-colors"
                >
                  <Bell className="w-4 h-4" />
                  Tandai Belum Dibaca
                </button>
              )}
              
              <button
                onClick={() => deleteNotification(notification.id)}
                className="flex items-center gap-1 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 text-sm rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <Header />
      
      <main className="max-w-4xl mx-auto px-5 py-8">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Notifikasi</h1>
            <p className="text-gray-600">
              Anda memiliki {unreadCount} notifikasi yang belum dibaca
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors"
            >
              <Settings className="w-5 h-5" />
              Pengaturan
            </button>
            
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors"
            >
              <CheckCircle className="w-5 h-5" />
              Tandai Semua Dibaca
            </button>
          </div>
        </div>

        {/* Filter and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari notifikasi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
              >
                <option value="all">Semua Jenis</option>
                <option value="order">Pesanan</option>
                <option value="promotion">Promosi</option>
                <option value="payment">Pembayaran</option>
                <option value="security">Keamanan</option>
                <option value="recommendation">Rekomendasi</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
              >
                <option value="all">Semua Status</option>
                <option value="unread">Belum Dibaca</option>
                <option value="read">Sudah Dibaca</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedNotifications.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-green-800 font-medium">
                  {selectedNotifications.length} notifikasi dipilih
                </span>
                <button
                  onClick={clearSelection}
                  className="text-green-600 hover:text-green-800 text-sm underline"
                >
                  Batal Pilih
                </button>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={selectAllNotifications}
                  className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg font-medium transition-colors"
                >
                  Pilih Semua
                </button>
                <button
                  onClick={markSelectedAsRead}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                >
                  Tandai Dibaca
                </button>
                <button
                  onClick={deleteSelected}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bell className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Tidak Ada Notifikasi</h3>
              <p className="text-gray-600">
                {searchTerm || filterType !== 'all' || filterStatus !== 'all'
                  ? 'Tidak ditemukan notifikasi yang sesuai dengan filter Anda'
                  : 'Anda belum memiliki notifikasi'
                }
              </p>
            </div>
          ) : (
            filteredNotifications.map(notification => (
              <NotificationCard key={notification.id} notification={notification} />
            ))
          )}
        </div>

        {/* Summary Stats */}
     
      </main>

      <NotificationSettings />
      <Footer />
    </div>
  );
};

export default NotificationPage;