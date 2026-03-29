'use client';

import { useState } from 'react';
import { Star, Eye, X } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  rating: number;
  reviews: string;
  category: string;
  imageSeed: string;
  badge: string;
}

export default function ProductCard({ id, title, price, rating, reviews, category, imageSeed, badge }: ProductCardProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, title, price, imageSeed, quantity: 1 });
    setIsQuickViewOpen(false);
  };

  return (
    <>
      <div className="group flex flex-col gap-4">
        <div className="relative aspect-square rounded-3xl bg-[#EBEBEB] flex items-center justify-center overflow-hidden transition-transform group-hover:scale-[1.02]">
          <span className="absolute top-4 right-4 px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-wider text-[#FF5E00] z-10 shadow-sm">
            {badge}
          </span>
          
          {/* Quick View Button Overlay */}
          <button 
            onClick={() => setIsQuickViewOpen(true)}
            className="absolute inset-0 m-auto w-12 h-12 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center text-gray-900 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 hover:bg-[#FF5E00] hover:text-white hover:scale-110 shadow-lg"
            aria-label="Quick view"
          >
            <Eye className="w-5 h-5" />
          </button>

          <div className="relative w-full h-full mix-blend-multiply drop-shadow-sm transition-transform group-hover:scale-110 duration-500">
            <Image 
              src={`https://picsum.photos/seed/${imageSeed}/400/400`} 
              alt={title} 
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 px-1">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-bold text-lg leading-tight text-gray-900">{title}</h3>
            <span className="font-bold text-lg text-gray-900">${price.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <Star className="w-4 h-4 fill-[#FF5E00] text-[#FF5E00]" />
            <span className="font-bold text-gray-700">{rating.toFixed(1)}</span>
            <span>({reviews} Reviews)</span>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <button 
              onClick={handleAddToCart}
              className="flex-1 py-3 rounded-full border border-gray-300 text-sm font-bold text-gray-700 hover:border-[#FF5E00] hover:text-[#FF5E00] transition-colors bg-white"
            >
              Add to Cart
            </button>
            <button 
              onClick={handleAddToCart}
              className="flex-1 py-3 rounded-full bg-black text-white text-sm font-bold hover:bg-[#FF5E00] transition-colors shadow-sm shadow-black/5"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {isQuickViewOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsQuickViewOpen(false)}
        >
          <div 
            className="bg-white rounded-[2rem] w-full max-w-4xl overflow-hidden flex flex-col md:flex-row shadow-2xl max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            {/* Image Side */}
            <div className="w-full md:w-1/2 bg-[#EBEBEB] flex items-center justify-center relative min-h-[300px] md:min-h-[500px]">
              <div className="relative w-full h-full mix-blend-multiply drop-shadow-md">
                <Image 
                  src={`https://picsum.photos/seed/${imageSeed}/800/800`} 
                  alt={title} 
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            
            {/* Content Side */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col relative overflow-y-auto">
              <button 
                onClick={() => setIsQuickViewOpen(false)} 
                className="absolute top-6 right-6 p-2.5 text-gray-400 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF5E00] mb-3">{category}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">{title}</h2>
              
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#FF5E00] text-[#FF5E00]" />
                  <Star className="w-4 h-4 fill-[#FF5E00] text-[#FF5E00]" />
                  <Star className="w-4 h-4 fill-[#FF5E00] text-[#FF5E00]" />
                  <Star className="w-4 h-4 fill-[#FF5E00] text-[#FF5E00]" />
                  <Star className="w-4 h-4 fill-[#FF5E00] text-[#FF5E00]" />
                </div>
                <span className="font-bold text-gray-700 ml-1">{rating.toFixed(1)}</span>
                <span>({reviews} Reviews)</span>
              </div>
              
              <p className="text-gray-500 mb-8 leading-relaxed">
                Experience premium quality with the {title}. Designed for everyday use, this product combines durability with modern aesthetics to meet all your needs. Perfect for those who appreciate both form and function.
              </p>
              
              <div className="mt-auto pt-8 border-t border-gray-100">
                <div className="text-4xl font-black text-gray-900 mb-6">${price.toFixed(2)}</div>
                <div className="flex gap-4">
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 py-4 rounded-full bg-black text-white font-bold hover:bg-[#FF5E00] transition-colors shadow-sm shadow-black/5 text-lg"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
