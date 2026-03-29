'use client';

import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import Image from 'next/image';

const slides = [
  "https://picsum.photos/seed/interior/1920/1080",
  "https://picsum.photos/seed/tech/1920/1080",
  "https://picsum.photos/seed/gadget/1920/1080",
  "https://picsum.photos/seed/workspace/1920/1080"
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="px-4 md:px-8 mb-16 md:mb-24">
      <div className="relative w-full h-[300px] sm:h-[350px] md:h-[450px] rounded-2xl md:rounded-3xl overflow-hidden flex items-center justify-center bg-gray-900">
        {/* Background Images */}
        {slides.map((slide, index) => (
          <Image 
            key={slide}
            src={slide} 
            alt={`Slide ${index + 1}`} 
            fill
            className={`absolute inset-0 object-cover transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100 z-0' : 'opacity-0 z-0'
            }`}
            referrerPolicy="no-referrer"
            priority={index === 0}
          />
        ))}
        
        {/* Large Text */}
        <h1 className="relative z-10 text-[60px] sm:text-[100px] md:text-[180px] lg:text-[200px] font-black text-white tracking-tighter leading-none opacity-90 select-none drop-shadow-2xl pb-16 sm:pb-0">
          Shop
        </h1>
        
        {/* Bottom Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative">
            
            {/* Empty spacer for desktop to keep pagination centered */}
            <div className="hidden sm:block flex-1"></div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 flex-1 order-2 sm:order-none sm:absolute sm:left-1/2 sm:-translate-x-1/2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    currentSlide === index ? 'w-8 bg-white' : 'w-3 bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Telegram Button */}
            <div className="w-full sm:w-auto flex-1 flex sm:justify-end order-1 sm:order-none">
              <a 
                href="https://t.me/yourchannel" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto justify-center px-5 py-2.5 md:px-6 md:py-3 bg-[#229ED9] text-white rounded-full text-sm font-bold hover:bg-[#1c84b5] transition-colors shadow-lg flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Join Telegram Channel
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
