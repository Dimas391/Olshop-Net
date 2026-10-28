import React from 'react';
import { 
  Shirt, 
  Smartphone, 
  Home, 
  Sparkles, 
  Dumbbell, 
  Book, 
  Gamepad2, 
  Utensils 
} from 'lucide-react';

const KategoriPopuler = () => {
  const categories = [
    {
      id: 1,
      name: 'Fashion',
      icon: Shirt,
      color: 'bg-blue-100',
      hoverColor: 'hover:bg-blue-200',
      iconColor: 'text-blue-600',
      link: '/kategori/fashion'
    },
    {
      id: 2,
      name: 'Elektronik',
      icon: Smartphone,
      color: 'bg-gray-100',
      hoverColor: 'hover:bg-gray-200',
      iconColor: 'text-gray-700',
      link: '/kategori/elektronik'
    },
    {
      id: 3,
      name: 'Rumah Tangga',
      icon: Home,
      color: 'bg-red-100',
      hoverColor: 'hover:bg-red-200',
      iconColor: 'text-red-600',
      link: '/kategori/rumah-tangga'
    },
    {
      id: 4,
      name: 'Kecantikan',
      icon: Sparkles,
      color: 'bg-pink-100',
      hoverColor: 'hover:bg-pink-200',
      iconColor: 'text-pink-600',
      link: '/kategori/kecantikan'
    },
    {
      id: 5,
      name: 'Olahraga',
      icon: Dumbbell,
      color: 'bg-green-100',
      hoverColor: 'hover:bg-green-200',
      iconColor: 'text-green-600',
      link: '/kategori/olahraga'
    },
    {
      id: 6,
      name: 'Buku',
      icon: Book,
      color: 'bg-yellow-100',
      hoverColor: 'hover:bg-yellow-200',
      iconColor: 'text-yellow-700',
      link: '/kategori/buku'
    },
    {
      id: 7,
      name: 'Gaming',
      icon: Gamepad2,
      color: 'bg-purple-100',
      hoverColor: 'hover:bg-purple-200',
      iconColor: 'text-purple-600',
      link: '/kategori/gaming'
    },
    {
      id: 8,
      name: 'Makanan',
      icon: Utensils,
      color: 'bg-orange-100',
      hoverColor: 'hover:bg-orange-200',
      iconColor: 'text-orange-600',
      link: '/kategori/makanan'
    }
  ];

  const handleCategoryClick = (categoryName, link) => {
    console.log(`Kategori ${categoryName} diklik, mengarah ke: ${link}`);
    // Redirect langsung ke halaman tujuan
    window.location.href = link;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-left">
        Kategori Populer
      </h2>
      
      <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
        {categories.map((category) => {
          const IconComponent = category.icon;
          
          return (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.name, category.link)}
              className="flex flex-col items-center cursor-pointer group transition-all duration-300 transform hover:scale-105"
            >
              {/* Icon Container */}
              <div className={`
                w-16 h-16 md:w-20 md:h-20 rounded-full 
                ${category.color} ${category.hoverColor}
                flex items-center justify-center 
                shadow-md group-hover:shadow-lg
                transition-all duration-300
                border-2 border-white group-hover:border-gray-100
              `}>
                <IconComponent 
                  className={`w-8 h-8 md:w-10 md:h-10 ${category.iconColor} group-hover:scale-110 transition-transform duration-300`}
                />
              </div>
              
              {/* Category Name */}
              <span className="mt-3 text-sm md:text-base font-medium text-gray-700 text-center group-hover:text-gray-900 transition-colors duration-300">
                {category.name}
              </span>
            </div>
          );
        })}
      </div>
      
      {/* Optional: View All Categories Button */}
      <div className="mt-8 text-center">
        <button 
          onClick={() => window.location.href = '/kategori/semua'}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-300 font-medium"
        >
          Lihat Semua Kategori
        </button>
      </div>
    </div>
  );
};

export default KategoriPopuler;