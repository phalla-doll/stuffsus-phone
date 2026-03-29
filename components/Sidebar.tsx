import { ChevronDown, Folder, Home, Music, Smartphone, HardDrive, Sparkles, TrendingUp, Percent } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 flex-shrink-0 flex flex-col gap-8">
      <div>
        <h3 className="font-bold text-lg mb-4 text-gray-900">Category</h3>
        <ul className="flex flex-col gap-1.5">
          <li>
            <button className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-2xl text-sm font-bold text-gray-900 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <Folder className="w-4 h-4 text-gray-400" />
                All Product
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-[#FF5E00] text-white text-[10px] px-2 py-0.5 rounded-full">32</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </button>
          </li>
          <li>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-[#FF5E00] transition-colors">
              <Home className="w-4 h-4" />
              For Home
            </button>
          </li>
          <li>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-[#FF5E00] transition-colors">
              <Music className="w-4 h-4" />
              For Music
            </button>
          </li>
          <li>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-[#FF5E00] transition-colors">
              <Smartphone className="w-4 h-4" />
              For Phone
            </button>
          </li>
          <li>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-[#FF5E00] transition-colors">
              <HardDrive className="w-4 h-4" />
              For Storage
            </button>
          </li>
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
