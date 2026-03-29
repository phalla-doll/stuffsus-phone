'use client';

import { useRef, useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const recommendations = [
  { id: 10, title: 'TWS Bujug', price: 29.90, rating: 5.0, reviews: '1.2k', category: 'Other', imageSeed: 'tws', badge: 'New Arrival', isOutOfStock: false },
  { id: 11, title: 'Headsound Baptis', price: 50.00, rating: 5.0, reviews: '1.2k', category: 'Music', imageSeed: 'white-headphones', badge: 'Best Seller', isOutOfStock: false },
  { id: 12, title: 'Adudu Cleaner', price: 12.00, originalPrice: 18.00, rating: 4.4, reviews: '1k', category: 'Other', imageSeed: 'piano', badge: 'Discount', isOutOfStock: true },
  { id: 13, title: 'Adu', price: 29.90, rating: 4.4, reviews: '1k', category: 'Music', imageSeed: 'device', badge: 'New Arrival', isOutOfStock: false },
  { id: 14, title: 'Sonic Boom', price: 89.99, rating: 4.8, reviews: '800', category: 'Audio', imageSeed: 'speaker', badge: 'Hot', isOutOfStock: false },
  { id: 15, title: 'Clear View', price: 120.00, originalPrice: 150.00, rating: 4.6, reviews: '450', category: 'Vision', imageSeed: 'glasses', badge: 'Sale', isOutOfStock: true },
];

export default function Recommendations() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // approximate card width + gap
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="px-4 md:px-8 mb-16 md:mb-24">
      <div className="flex items-end justify-between mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Explore our recomendations</h2>
        <div className="hidden sm:flex items-center gap-2">
          <button 
            onClick={() => scroll('left')}
            className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#FF5E00] hover:text-[#FF5E00] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#FF5E00] hover:text-[#FF5E00] transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 md:gap-6 pb-4 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={`skeleton-${i}`} className="min-w-[260px] sm:min-w-[300px] lg:min-w-[calc(25%-1.125rem)] snap-start">
              <ProductCardSkeleton />
            </div>
          ))
        ) : (
          recommendations.map((product) => (
            <div key={product.id} className="min-w-[260px] sm:min-w-[300px] lg:min-w-[calc(25%-1.125rem)] snap-start">
              <ProductCard {...product} />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
