import { Send } from 'lucide-react';
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
          <div className="flex-1 max-w-md w-full flex sm:justify-end">
            <a 
              href="https://t.me/yourchannel" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#229ED9] text-white rounded-full text-sm md:text-base font-bold hover:bg-[#1c84b5] transition-colors shadow-lg flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              Join Telegram Channel
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
