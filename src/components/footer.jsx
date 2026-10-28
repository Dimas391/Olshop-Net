const Footer = () => {
  return (
    <footer id="kontak" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="footer-section">
              <h3 className="text-xl font-bold mb-4 text-green-400">Olshop NET</h3>
              <p className="text-gray-300 leading-relaxed">
                Platform belanja online terpercaya dengan produk berkualitas dan harga terjangkau untuk semua kebutuhan Anda.
              </p>
            </div>

            {/* Categories */}
            <div className="footer-section">
              <h3 className="text-lg font-semibold mb-4 text-white">Kategori</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-200">
                    Pakaian
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-200">
                    Elektronik
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-200">
                    Makanan & Minuman
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-200">
                    Rumah Tangga
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="footer-section">
              <h3 className="text-lg font-semibold mb-4 text-white">Layanan</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-200">
                    Bantuan
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-200">
                    Cara Belanja
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-200">
                    Kebijakan Privasi
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-200">
                    Syarat & Ketentuan
                  </a>
                </li>
              </ul>
            </div>

           <div className="footer-section">
              <h3 className="text-lg font-semibold mb-4 ml-2 text-white">Kontak</h3>
              <ul className="space-y-3">
                <li className="text-gray-300 flex items-start">
                  <span className="mr-2"></span>
                  <span>info@olshop.net</span>
                </li>
                <li className="text-gray-300 flex items-start">
                  <span className="mr-2"></span>
                  <span>0800-1234-5678</span>
                </li>
                <li className="text-gray-300 flex items-start">
                  <span className="mr-2"></span>
                  <span>Banda Aceh, Indonesia</span>
                </li>
                <li className="text-gray-300 flex items-start">
                  <span className="mr-2"></span>
                  <span>24/7 Customer Service</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2025 Olshop NET. Semua hak cipta dilindungi.
            </p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;