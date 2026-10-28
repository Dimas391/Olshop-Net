import Icon from '../image/icon.png';

const HeroSection = () => {
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

export default HeroSection;
