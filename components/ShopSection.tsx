import Sidebar from './Sidebar';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const products = [
  { id: 1, title: 'Phone Holder Sakti', price: 29.90, rating: 5.0, reviews: '1.2k', category: 'Other', imageSeed: 'holder' },
  { id: 2, title: 'Headsound', price: 12.00, rating: 5.0, reviews: '1.2k', category: 'Music', imageSeed: 'headphones' },
  { id: 3, title: 'Adudu Cleaner', price: 29.90, rating: 4.4, reviews: '1k', category: 'Other', imageSeed: 'robot-vacuum' },
  { id: 4, title: 'CCTV Maling', price: 50.00, rating: 4.8, reviews: '120', category: 'Home', imageSeed: 'cctv' },
  { id: 5, title: 'Stuffus Peker 32', price: 9.90, rating: 5.0, reviews: '1.2k', category: 'Other', imageSeed: 'speaker' },
  { id: 6, title: 'Stuffus R175', price: 34.10, rating: 4.8, reviews: '2.4k', category: 'Music', imageSeed: 'earbuds' },
  { id: 7, title: 'CCTV Maling', price: 50.00, rating: 4.8, reviews: '120', category: 'Home', imageSeed: 'cctv2' },
  { id: 8, title: 'Stuffus Peker 32', price: 9.90, rating: 5.0, reviews: '1.2k', category: 'Other', imageSeed: 'speaker2' },
  { id: 9, title: 'Stuffus R175', price: 34.10, rating: 4.8, reviews: '2.4k', category: 'Music', imageSeed: 'earbuds2' },
];

export default function ShopSection() {
  return (
    <section className="px-8 mb-24 flex flex-col md:flex-row gap-12">
      <Sidebar />
      <div className="flex-1 flex flex-col gap-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between pt-8 border-t border-gray-200">
          <button className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#FF5E00] transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-900">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">3</button>
            <span className="text-gray-400 px-1">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">8</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">9</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">10</button>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#FF5E00] transition-colors">
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
