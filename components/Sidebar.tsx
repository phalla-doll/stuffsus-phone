import { ChevronDown, Folder, Home, Music, Smartphone, HardDrive, Sparkles, TrendingUp, Percent } from 'lucide-react';

interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  totalProducts: number;
}

export default function Sidebar({ activeCategory, onCategoryChange, totalProducts }: SidebarProps) {
  const categories = [
    { id: 'Home', label: 'For Home', icon: Home },
    { id: 'Music', label: 'For Music', icon: Music },
    { id: 'Phone', label: 'For Phone', icon: Smartphone },
    { id: 'Storage', label: 'For Storage', icon: HardDrive },
  ];

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col gap-8">
      <div>
        <h3 className="font-bold text-lg mb-4 text-gray-900">Category</h3>
        <ul className="flex flex-col gap-1.5">
          <li>
            <button 
              onClick={() => onCategoryChange('All')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                activeCategory === 'All' 
                  ? 'bg-white text-gray-900 shadow-sm shadow-black/5 border border-gray-100' 
                  : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Folder className={`w-4 h-4 ${activeCategory === 'All' ? 'text-[#FF5E00]' : 'text-gray-400'}`} />
                All Product
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-[#FF5E00] text-white text-[10px] px-2 py-0.5 rounded-full">{totalProducts}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </button>
          </li>
          {categories.map(cat => (
            <li key={cat.id}>
              <button 
                onClick={() => onCategoryChange(cat.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                  activeCategory === cat.id 
                    ? 'bg-white text-gray-900 shadow-sm shadow-black/5 border border-gray-100 font-bold' 
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
        <button className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-[#FF5E00] transition-colors">
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4" />
            New Arrival
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
        <button className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-[#FF5E00] transition-colors">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-4 h-4" />
            Best Seller
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
        <button className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-[#FF5E00] transition-colors">
          <div className="flex items-center gap-3">
            <Percent className="w-4 h-4" />
            On Discount
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </aside>
  );
}
