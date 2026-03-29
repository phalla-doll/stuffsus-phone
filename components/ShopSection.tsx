'use client';

import { useState, useMemo } from 'react';
import Sidebar from './Sidebar';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const baseProducts = [
  { title: 'Phone Holder Sakti', price: 29.90, rating: 5.0, reviews: '1.2k', category: 'Phone', imageSeed: 'holder' },
  { title: 'Headsound', price: 12.00, rating: 5.0, reviews: '1.2k', category: 'Music', imageSeed: 'headphones' },
  { title: 'Adudu Cleaner', price: 29.90, rating: 4.4, reviews: '1k', category: 'Home', imageSeed: 'robot-vacuum' },
  { title: 'CCTV Maling', price: 50.00, rating: 4.8, reviews: '120', category: 'Home', imageSeed: 'cctv' },
  { title: 'Stuffus Peker 32', price: 9.90, rating: 5.0, reviews: '1.2k', category: 'Music', imageSeed: 'speaker' },
  { title: 'Stuffus R175', price: 34.10, rating: 4.8, reviews: '2.4k', category: 'Music', imageSeed: 'earbuds' },
  { title: 'Smart Plug', price: 15.00, rating: 4.5, reviews: '800', category: 'Home', imageSeed: 'smart-plug' },
  { title: 'USB-C Hub', price: 45.00, rating: 4.7, reviews: '3.1k', category: 'Phone', imageSeed: 'usb-hub' },
  { title: '1TB SSD External', price: 89.90, rating: 4.9, reviews: '5k', category: 'Storage', imageSeed: 'ssd' },
  { title: 'MicroSD 256GB', price: 25.00, rating: 4.6, reviews: '10k', category: 'Storage', imageSeed: 'microsd' },
  { title: 'Wireless Charger', price: 22.50, rating: 4.3, reviews: '2k', category: 'Phone', imageSeed: 'wireless-charger' },
  { title: 'Bluetooth Turntable', price: 150.00, rating: 4.8, reviews: '450', category: 'Music', imageSeed: 'turntable' },
];

const allProducts = Array.from({ length: 240 }, (_, i) => {
  const base = baseProducts[i % baseProducts.length];
  const badges = ['New Arrival', 'Best Seller', 'Discount'];
  return {
    ...base,
    id: i + 1,
    title: `${base.title} Gen ${Math.floor(i / baseProducts.length) + 1}`,
    imageSeed: `${base.imageSeed}-${i}`,
    badge: badges[i % 3]
  };
});

const ITEMS_PER_PAGE = 30;

export default function ShopSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return allProducts;
    return allProducts.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <section className="px-8 mb-24 flex flex-col md:flex-row gap-12">
      <Sidebar 
        activeCategory={activeCategory} 
        onCategoryChange={handleCategoryChange} 
        totalProducts={allProducts.length}
      />
      <div className="flex-1 flex flex-col gap-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-8 border-t border-gray-200">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#FF5E00] disabled:opacity-50 disabled:hover:text-gray-500 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button 
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-colors ${
                    currentPage === page 
                      ? 'bg-gray-200 text-gray-900' 
                      : 'text-gray-500 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#FF5E00] disabled:opacity-50 disabled:hover:text-gray-500 transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
