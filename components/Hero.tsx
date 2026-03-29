import { Send } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="px-4 md:px-8 mb-12 md:mb-16">
      <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] rounded-2xl md:rounded-3xl overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <Image 
          src="https://picsum.photos/seed/interior/1920/1080" 
          alt="Interior" 
          fill
          className="absolute inset-0 object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Large Text */}
        <h1 className="relative z-10 text-[80px] sm:text-[120px] md:text-[200px] font-black text-white tracking-tighter leading-none opacity-90 select-none drop-shadow-2xl">
          Shop
        </h1>
        
        {/* Search Bar Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white max-w-xs leading-tight drop-shadow-md">
            Give All You Need
          </h2>
          <div className="flex-1 w-full sm:max-w-md flex sm:justify-end">
            <a 
              href="https://t.me/yourchannel" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto justify-center px-6 md:px-8 py-3 md:py-4 bg-[#229ED9] text-white rounded-full text-sm md:text-base font-bold hover:bg-[#1c84b5] transition-colors shadow-lg flex items-center gap-2"
            >
              <Send className="w-4 h-4 md:w-5 md:h-5" />
              Join Telegram Channel
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
