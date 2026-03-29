import { Star } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  title: string;
  price: number;
  rating: number;
  reviews: string;
  category: string;
  imageSeed: string;
}

export default function ProductCard({ title, price, rating, reviews, category, imageSeed }: ProductCardProps) {
  return (
    <div className="group flex flex-col gap-4">
      <div className="relative aspect-square rounded-3xl bg-[#EBEBEB] p-6 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-[1.02]">
        <span className="absolute top-4 right-4 px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-800 z-10 shadow-sm">
          {category}
        </span>
        <div className="relative w-full h-full mix-blend-multiply drop-shadow-xl transition-transform group-hover:scale-110 duration-500">
          <Image 
            src={`https://picsum.photos/seed/${imageSeed}/400/400`} 
            alt={title} 
            fill
            className="object-contain"
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
          <button className="flex-1 py-3 rounded-full border border-gray-300 text-sm font-bold text-gray-700 hover:border-[#FF5E00] hover:text-[#FF5E00] transition-colors bg-white">
            Add to Chart
          </button>
          <button className="flex-1 py-3 rounded-full bg-black text-white text-sm font-bold hover:bg-[#FF5E00] transition-colors shadow-lg shadow-black/10">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
