'use client';

import { useState, useEffect, useId } from 'react';
import { flushSync } from 'react-dom';
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
  isOutOfStock?: boolean;
  originalPrice?: number;
}

export default function ProductCard({ id, title, price, rating, reviews, category, imageSeed, badge, isOutOfStock = false, originalPrice }: ProductCardProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { addToCart } = useCart();
  const instanceId = useId().replace(/:/g, '');

  useEffect(() => {
    const handleHashChange = () => {
      const isOpen = window.location.hash === `#product-${instanceId}`;
      
      if (isQuickViewOpen === isOpen) return;

      if (!('startViewTransition' in document)) {
        setIsQuickViewOpen(isOpen);
        return;
      }

      (document as any).startViewTransition(() => {
        flushSync(() => {
          setIsQuickViewOpen(isOpen);
        });
      });
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [instanceId, isQuickViewOpen]);

  const openQuickView = () => {
    window.location.hash = `product-${instanceId}`;
  };

  const closeQuickView = () => {
    if (window.location.hash === `#product-${instanceId}`) {
      window.location.hash = '';
    } else {
      if (!('startViewTransition' in document)) {
        setIsQuickViewOpen(false);
        return;
      }
      (document as any).startViewTransition(() => {
        flushSync(() => {
          setIsQuickViewOpen(false);
        });
      });
    }
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart({ id, title, price, originalPrice, imageSeed, quantity: 1 });
    closeQuickView();
  };

  return (
    <>
      <div className="group flex flex-col gap-4 h-full">
        <div 
          className="relative aspect-square rounded-3xl bg-[#EBEBEB] flex items-center justify-center overflow-hidden isolate transition-transform group-hover:scale-[1.02] cursor-pointer shrink-0"
          onClick={openQuickView}
          style={{ viewTransitionName: isQuickViewOpen ? 'none' : `product-bg-${instanceId}` } as any}
        >
          {!isOutOfStock && (
            <span className="absolute top-4 right-4 px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-wider text-[#FF5E00] z-10 shadow-sm">
              {badge}
            </span>
          )}

          {isOutOfStock && (
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-20 flex items-center justify-center">
              <span className="px-4 py-2 bg-black text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                Out of Stock
              </span>
            </div>
          )}
          
          {/* Quick View Button Overlay - Hidden on mobile, visible on hover on desktop */}
          <button 
            className="hidden md:flex absolute inset-0 m-auto w-12 h-12 bg-white/95 backdrop-blur-md rounded-full items-center justify-center text-gray-900 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 hover:bg-[#FF5E00] hover:text-white hover:scale-110 shadow-lg"
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
              style={{ viewTransitionName: isQuickViewOpen ? 'none' : `product-image-${instanceId}` } as any}
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 px-1 flex-1">
          <div className="flex justify-between items-start gap-3">
            <div className="flex flex-col flex-1">
              <h3 className="font-bold text-lg leading-none text-gray-900 mb-1.5">{title}</h3>
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Star className="w-4 h-4 fill-[#FF5E00] text-[#FF5E00]" />
                <span className="font-bold text-gray-700">{rating.toFixed(1)}</span>
                <span>({reviews} Reviews)</span>
              </div>
            </div>
            <div className="flex flex-col items-end shrink-0">
              <span className={`font-bold text-lg leading-none ${originalPrice ? 'text-[#FF5E00]' : 'text-gray-900'}`}>
                ${price.toFixed(2)}
              </span>
              {originalPrice && (
                <span className="text-xs leading-none text-gray-400 line-through mt-1.5">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-auto pt-2">
            <button 
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex-1 py-2.5 rounded-full border text-xs sm:text-sm font-bold transition-colors ${
                isOutOfStock 
                  ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed' 
                  : 'border-gray-300 text-gray-700 hover:border-[#FF5E00] hover:text-[#FF5E00] bg-white'
              }`}
            >
              Add to Cart
            </button>
            <button 
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex-1 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-colors shadow-sm ${
                isOutOfStock
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                  : 'bg-black text-white hover:bg-[#FF5E00] shadow-black/5'
              }`}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {isQuickViewOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
          onClick={closeQuickView}
        >
          <div 
            className="bg-white rounded-[2rem] w-full max-w-6xl overflow-hidden flex flex-col md:flex-row shadow-2xl max-h-[90vh] relative"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button for mobile (moved outside content area for better reachability) */}
            <button 
              onClick={closeQuickView} 
              className="md:hidden absolute top-4 right-4 p-2 text-gray-900 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full transition-colors z-50 shadow-sm"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Side */}
            <div 
              className="w-full md:w-1/2 bg-[#EBEBEB] flex items-center justify-center relative min-h-[250px] sm:min-h-[300px] md:min-h-[500px] rounded-t-[2rem] md:rounded-none md:rounded-l-[2rem] overflow-hidden"
              style={{ viewTransitionName: `product-bg-${instanceId}` } as any}
            >
              <div className="relative w-full h-full mix-blend-multiply drop-shadow-md">
                <Image 
                  src={`https://picsum.photos/seed/${imageSeed}/800/800`} 
                  alt={title} 
                  fill
                  className="object-cover"
                  style={{ viewTransitionName: `product-image-${instanceId}` } as any}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            
            {/* Content Side */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col relative overflow-y-auto">
              <button 
                onClick={closeQuickView} 
                className="hidden md:flex absolute top-6 right-6 p-2.5 text-gray-400 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF5E00] mb-2 md:mb-3">{category}</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-3 leading-tight">
                {title}
              </h2>
              
              {isOutOfStock && (
                <span className="inline-block px-3 py-1 bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider rounded-full mb-3 w-fit">
                  Out of Stock
                </span>
              )}

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 md:mb-6">
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
              
              <div className="mb-8">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Product Specifications</h4>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <tbody className="divide-y divide-gray-200">
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 font-medium text-gray-900 w-1/3">Category</th>
                        <td className="px-4 py-3 text-gray-600">{category}</td>
                      </tr>
                      <tr>
                        <th className="px-4 py-3 font-medium text-gray-900 w-1/3">Weight</th>
                        <td className="px-4 py-3 text-gray-600">1.2 kg</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 font-medium text-gray-900 w-1/3">Dimensions</th>
                        <td className="px-4 py-3 text-gray-600">15 x 10 x 5 cm</td>
                      </tr>
                      <tr>
                        <th className="px-4 py-3 font-medium text-gray-900 w-1/3">Warranty</th>
                        <td className="px-4 py-3 text-gray-600">1 Year Manufacturer</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mt-auto pt-6 md:pt-8 border-t border-gray-100">
                <div className="flex items-end gap-3 mb-4 md:mb-6">
                  <div className={`text-3xl md:text-4xl font-black ${originalPrice ? 'text-[#FF5E00]' : 'text-gray-900'}`}>
                    ${price.toFixed(2)}
                  </div>
                  {originalPrice && (
                    <div className="text-lg md:text-xl font-medium text-gray-400 line-through mb-1 md:mb-1.5">
                      ${originalPrice.toFixed(2)}
                    </div>
                  )}
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className={`flex-1 py-3 md:py-3.5 rounded-full font-bold transition-colors shadow-sm text-sm md:text-base ${
                      isOutOfStock
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                        : 'bg-black text-white hover:bg-[#FF5E00] shadow-black/5'
                    }`}
                  >
                    {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
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
