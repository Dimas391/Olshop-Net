import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Download, Package, Truck, CheckCircle, XCircle, Clock, ChevronDown, ChevronUp, Star } from 'lucide-react';
import Navbaruser from '../components/navbar_user.jsx';
import Footer from '../components/footer.jsx';

const Orderhistory = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const ordersPerPage = 5;

  // Sample order data
  useEffect(() => {
    const sampleOrders = [
      {
        id: 'ORD-2025-001',
        date: '2025-08-05',
        time: '14:30',
        status: 'delivered',
        total: 485000,
        items: 3,
        shippingAddress: 'Jl. Teuku Umar No. 45, Banda Aceh, Aceh',
        paymentMethod: 'Transfer Bank BCA',
        trackingNumber: 'JNE123456789',
        products: [
          { name: 'Kemeja Batik Premium', price: 185000, quantity: 1, image: '👔' },
          { name: 'Sepatu Sneakers Nike', price: 250000, quantity: 1, image: '👟' },
          { name: 'Tas Ransel Laptop', price: 150000, quantity: 1, image: '🎒' }
        ],
        rating: 5
      },
      {
        id: 'ORD-2025-002',
        date: '2025-08-03',
        time: '10:15',
        status: 'shipped',
        total: 325000,
        items: 2,
        shippingAddress: 'Jl. Ahmad Yani No. 78, Banda Aceh, Aceh',
        paymentMethod: 'E-Wallet OVO',
        trackingNumber: 'SiCepat987654321',
        products: [
          { name: 'Smartphone Samsung Galaxy', price: 275000, quantity: 1, image: '📱' },
          { name: 'Powerbank 10000mAh', price: 75000, quantity: 1, image: '🔋' }
        ]
      },
      {
        id: 'ORD-2025-003',
        date: '2025-08-01',
        time: '16:45',
        status: 'processing',
        total: 150000,
        items: 1,
        shippingAddress: 'Jl. Diponegoro No. 12, Banda Aceh, Aceh',
        paymentMethod: 'COD',
        trackingNumber: null,
        products: [
          { name: 'Headphone Wireless Sony', price: 150000, quantity: 1, image: '🎧' }
        ]
      },
      {
        id: 'ORD-2025-004',
        date: '2025-07-28',
        time: '09:20',
        status: 'cancelled',
        total: 95000,
        items: 2,
        shippingAddress: 'Jl. Gajah Mada No. 33, Banda Aceh, Aceh',
        paymentMethod: 'Transfer Bank Mandiri',
        trackingNumber: null,
        products: [
          { name: 'Kaos Polos Cotton', price: 45000, quantity: 1, image: '👕' },
          { name: 'Celana Jeans Slim Fit', price: 125000, quantity: 1, image: '👖' }
        ]
      },
      {
        id: 'ORD-2025-005',
        date: '2025-07-25',
        time: '11:30',
        status: 'delivered',
        total: 780000,
        items: 4,
        shippingAddress: 'Jl. Cut Nyak Dien No. 67, Banda Aceh, Aceh',
        paymentMethod: 'Kartu Kredit Visa',
        trackingNumber: 'TIKI456789123',
        products: [
          { name: 'Laptop ASUS VivoBook', price: 650000, quantity: 1, image: '💻' },
          { name: 'Mouse Wireless Logitech', price: 85000, quantity: 1, image: '🖱️' },
          { name: 'Keyboard Mechanical', price: 120000, quantity: 1, image: '⌨️' },
          { name: 'Mousepad Gaming', price: 35000, quantity: 1, image: '🟫' }
        ],
        rating: 4
      }
    ];
    setOrders(sampleOrders);
    setFilteredOrders(sampleOrders);
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = [...orders];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.products.some(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case '7days':
          filterDate.setDate(now.getDate() - 7);
          break;
        case '30days':
          filterDate.setDate(now.getDate() - 30);
          break;
        case '90days':
          filterDate.setDate(now.getDate() - 90);
          break;
      }
      
      filtered = filtered.filter(order => new Date(order.date) >= filterDate);
    }

    // Sort orders
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time);
        case 'oldest':
          return new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time);
        case 'highest':
          return b.total - a.total;
        case 'lowest':
          return a.total - b.total;
        default:
          return 0;
      }
    });

    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, dateFilter, sortBy, orders]);

  const getStatusInfo = (status) => {
    const statusMap = {
      processing: { text: 'Diproses', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      shipped: { text: 'Dikirim', color: 'bg-blue-100 text-blue-800', icon: Truck },
      delivered: { text: 'Terkirim', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      cancelled: { text: 'Dibatalkan', color: 'bg-red-100 text-red-800', icon: XCircle }
    };
    return statusMap[status] || { text: status, color: 'bg-gray-100 text-gray-800', icon: Package };
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleReorder = (order) => {
    alert(`Menambahkan ${order.items} item ke keranjang untuk pemesanan ulang`);
  };

  const handleTrackOrder = (trackingNumber) => {
    if (trackingNumber) {
      alert(`Melacak pesanan dengan nomor: ${trackingNumber}`);
    } else {
      alert('Nomor tracking belum tersedia');
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage);

  const Header = () => (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      <nav className="max-w-6xl mx-auto px-5 flex justify-between items-center py-4">
        <Navbaruser />
      </nav>
    </header>
  );

  const FilterSection = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Search Bar */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari nomor pesanan atau nama produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Filter Toggle Button (Mobile) */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex items-center gap-2 px-4 py-3 bg-gray-100 rounded-xl font-medium"
        >
          <Filter className="w-5 h-5" />
          Filter
          {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {/* Filters */}
        <div className={`flex flex-col sm:flex-row gap-4 ${showFilters ? 'block' : 'hidden lg:flex'}`}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
          >
            <option value="all">Semua Status</option>
            <option value="processing">Diproses</option>
            <option value="shipped">Dikirim</option>
            <option value="delivered">Terkirim</option>
            <option value="cancelled">Dibatalkan</option>
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
          >
            <option value="all">Semua Waktu</option>
            <option value="7days">7 Hari Terakhir</option>
            <option value="30days">30 Hari Terakhir</option>
            <option value="90days">3 Bulan Terakhir</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
          >
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
            <option value="highest">Harga Tertinggi</option>
            <option value="lowest">Harga Terendah</option>
          </select>
        </div>
      </div>
    </div>
  );

  const OrderCard = ({ order }) => {
    const statusInfo = getStatusInfo(order.status);
    const StatusIcon = statusInfo.icon;
    const isExpanded = expandedOrder === order.id;

    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6 hover:shadow-xl transition-shadow duration-300">
        {/* Order Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                <h3 className="text-xl font-bold text-gray-800">{order.id}</h3>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                  <StatusIcon className="w-4 h-4" />
                  {statusInfo.text}
                </div>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>📅 {formatDate(order.date)} • {order.time}</p>
                <p>📦 {order.items} item • {formatCurrency(order.total)}</p>
                <p>💳 {order.paymentMethod}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => toggleOrderDetails(order.id)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors"
              >
                <Eye className="w-4 h-4" />
                {isExpanded ? 'Sembunyikan' : 'Detail'}
              </button>
              
              {order.trackingNumber && (
                <button
                  onClick={() => handleTrackOrder(order.trackingNumber)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl font-medium transition-colors"
                >
                  <Truck className="w-4 h-4" />
                  Lacak
                </button>
              )}
              
              {order.status === 'delivered' && (
                <button
                  onClick={() => handleReorder(order)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-xl font-medium transition-colors"
                >
                  <Package className="w-4 h-4" />
                  Pesan Lagi
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Expanded Order Details */}
        {isExpanded && (
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Products List */}
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-4">Produk yang Dipesan</h4>
                <div className="space-y-4">
                  {order.products.map((product, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-xl">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center text-2xl">
                        {product.image}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-800 mb-1">{product.name}</h5>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Qty: {product.quantity}</span>
                          <span className="font-bold text-green-600">{formatCurrency(product.price)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Info */}
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-4">Informasi Pesanan</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-xl">
                    <h5 className="font-semibold text-gray-700 mb-2">📍 Alamat Pengiriman</h5>
                    <p className="text-gray-600">{order.shippingAddress}</p>
                  </div>
                  
                  {order.trackingNumber && (
                    <div className="p-4 bg-white rounded-xl">
                      <h5 className="font-semibold text-gray-700 mb-2">🚚 Nomor Tracking</h5>
                      <p className="text-gray-600 font-mono">{order.trackingNumber}</p>
                    </div>
                  )}
                  
                  <div className="p-4 bg-white rounded-xl">
                    <h5 className="font-semibold text-gray-700 mb-2">💰 Ringkasan Pembayaran</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{formatCurrency(order.total - 10000)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ongkir</span>
                        <span>{formatCurrency(10000)}</span>
                      </div>
                      <hr className="my-2" />
                      <div className="flex justify-between font-bold text-base">
                        <span>Total</span>
                        <span className="text-green-600">{formatCurrency(order.total)}</span>
                      </div>
                    </div>
                  </div>

                  {order.rating && (
                    <div className="p-4 bg-white rounded-xl">
                      <h5 className="font-semibold text-gray-700 mb-2">⭐ Penilaian Anda</h5>
                      <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < order.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">({order.rating}/5)</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors">
                <Download className="w-4 h-4" />
                Unduh Invoice
              </button>
              
              {order.status === 'delivered' && !order.rating && (
                <button className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl font-medium transition-colors">
                  <Star className="w-4 h-4" />
                  Beri Rating
                </button>
              )}
              
              <button className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors">
                💬 Hubungi CS
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const Pagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
        <div className="text-sm text-gray-600">
          Menampilkan {startIndex + 1}-{Math.min(startIndex + ordersPerPage, filteredOrders.length)} dari {filteredOrders.length} pesanan
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Sebelumnya
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 border rounded-lg transition-colors ${
                currentPage === index + 1
                  ? 'bg-green-500 text-white border-green-500'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              {index + 1}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <Header />
      
      <main className="max-w-6xl mx-auto px-5 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Riwayat Pemesanan</h1>
          <p className="text-gray-600">Lihat dan kelola semua pesanan Anda di sini</p>
        </div>

        {/* Filter Section */}
        <FilterSection />

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
                <p className="text-sm text-gray-600">Total Pesanan</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{orders.filter(o => o.status === 'delivered').length}</p>
                <p className="text-sm text-gray-600">Terkirim</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{orders.filter(o => o.status === 'processing' || o.status === 'shipped').length}</p>
                <p className="text-sm text-gray-600">Sedang Proses</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-purple-600 font-bold">💰</span>
              </div>
              <div>
                <p className="text-xl font-bold text-gray-800">{formatCurrency(orders.reduce((sum, order) => sum + order.total, 0))}</p>
                <p className="text-sm text-gray-600">Total Belanja</p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div>
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Tidak Ada Pesanan</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || statusFilter !== 'all' || dateFilter !== 'all'
                  ? 'Tidak ditemukan pesanan yang sesuai dengan filter Anda'
                  : 'Anda belum memiliki riwayat pesanan'
                }
              </p>
              <button className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors">
                Mulai Berbelanja
              </button>
            </div>
          ) : (
            <>
              {currentOrders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
              <Pagination />
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Orderhistory;