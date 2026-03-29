import { useState } from 'react';
import { ChevronDown, ChevronUp, Folder, Home, Music, Smartphone, HardDrive, Sparkles, TrendingUp, Percent, Shield, Zap, Watch } from 'lucide-react';

interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  activeBadge: string;
  onBadgeChange: (badge: string) => void;
  activeBrand: string;
  onBrandChange: (brand: string) => void;
  totalProducts: number;
}

export default function Sidebar({ 
  activeCategory, 
  onCategoryChange, 
  activeBadge,
  onBadgeChange,
  activeBrand,
  onBrandChange,
  totalProducts 
}: SidebarProps) {
  const [isBrandsOpen, setIsBrandsOpen] = useState(true);

  const categories = [
    { id: 'Mobile', label: 'Mobile Phones', icon: Smartphone },
    { id: 'Audio', label: 'Audio & TWS', icon: Music },
    { id: 'Cases', label: 'Cases & Covers', icon: Shield },
    { id: 'Chargers', label: 'Chargers & Cables', icon: Zap },
    { id: 'Wearables', label: 'Smartwatches', icon: Watch },
    { id: 'Accessory', label: 'Accessories', icon: HardDrive },
    { id: 'Home', label: 'Smart Home', icon: Home },
  ];

  const badges = [
    { id: 'New Arrival', label: 'New Arrival', icon: Sparkles },
    { id: 'Best Seller', label: 'Best Seller', icon: TrendingUp },
    { id: 'Discount', label: 'On Discount', icon: Percent },
  ];

  const brands = ['Apple', 'Samsung', 'Sony', 'Bose', 'Anker', 'Logitech'];

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col gap-8">
      <div>
        <h3 className="font-bold text-lg mb-4 text-gray-900">Category</h3>
        <ul className="flex flex-col gap-1.5">
          <li>
            <button 
              onClick={() => onCategoryChange('All')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                activeCategory === 'All' 
                  ? 'bg-white text-gray-900 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 font-bold' 
                  : 'text-gray-500 hover:text-[#FF5E00]'
              }`}
            >
              <Folder className={`w-4 h-4 ${activeCategory === 'All' ? 'text-[#FF5E00]' : ''}`} />
              All Products
            </button>
          </li>
          {categories.map(cat => (
            <li key={cat.id}>
              <button 
                onClick={() => onCategoryChange(cat.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                  activeCategory === cat.id 
                    ? 'bg-white text-gray-900 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 font-bold' 
                    : 'text-gray-500 hover:text-[#FF5E00]'
                }`}
              >
                <cat.icon className={`w-4 h-4 ${activeCategory === cat.id ? 'text-[#FF5E00]' : ''}`} />
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-1.5">
        {badges.map(badge => (
          <button 
            key={badge.id}
            onClick={() => onBadgeChange(activeBadge === badge.id ? 'All' : badge.id)}
            className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors rounded-xl ${
              activeBadge === badge.id
                ? 'bg-gray-100 text-gray-900 font-bold'
                : 'text-gray-600 hover:text-[#FF5E00]'
            }`}
          >
            <div className="flex items-center gap-3">
              <badge.icon className={`w-4 h-4 ${activeBadge === badge.id ? 'text-[#FF5E00]' : ''}`} />
              {badge.label}
            </div>
            {activeBadge === badge.id && <div className="w-1.5 h-1.5 rounded-full bg-[#FF5E00]" />}
          </button>
        ))}
      </div>

      <div>
        <button 
          onClick={() => setIsBrandsOpen(!isBrandsOpen)}
          className="w-full flex items-center justify-between font-bold text-lg mb-4 text-gray-900"
        >
          Brands
          {isBrandsOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
        </button>
        
        {isBrandsOpen && (
          <ul className="flex flex-col gap-1.5">
            <li>
              <button 
                onClick={() => onBrandChange('All')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeBrand === 'All' 
                    ? 'bg-gray-100 text-gray-900 font-bold' 
                    : 'text-gray-500 hover:text-[#FF5E00]'
                }`}
              >
                All Brands
              </button>
            </li>
            {brands.map(brand => (
              <li key={brand}>
                <button 
                  onClick={() => onBrandChange(brand)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeBrand === brand 
                      ? 'bg-gray-100 text-gray-900 font-bold' 
                      : 'text-gray-500 hover:text-[#FF5E00]'
                  }`}
                >
                  {brand}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
