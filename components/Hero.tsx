import { Search } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="px-8 mb-16">
      <div className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden bg-gray-200 flex items-center justify-center">
        {/* Background Image */}
        <Image 
          src="https://picsum.photos/seed/interior/1920/1080" 
          alt="Interior" 
          fill
          className="absolute inset-0 object-cover opacity-60 mix-blend-overlay"
          referrerPolicy="no-referrer"
        />
        {/* Large Text */}
        <h1 className="relative z-10 text-[120px] md:text-[200px] font-black text-white tracking-tighter leading-none opacity-90 mix-blend-overlay select-none">
          Shop
        </h1>
        
        {/* Search Bar Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col md:flex-row items-end md:items-center justify-between gap-6 bg-gradient-to-t from-black/40 to-transparent">
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-xs leading-tight">
            Give All You Need
          </h2>
          <div className="flex-1 max-w-md w-full relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search on Stuffsus" 
              className="w-full pl-12 pr-24 py-4 rounded-full bg-white/95 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#FF5E00] transition-all text-sm font-medium"
            />
            <button className="absolute inset-y-2 right-2 px-6 bg-black text-white rounded-full text-sm font-bold hover:bg-[#FF5E00] transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
