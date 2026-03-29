'use client';

import { useState, useMemo, useEffect } from 'react';
import Sidebar from './Sidebar';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight, SearchX } from 'lucide-react';
import { useSearch } from '@/context/SearchContext';

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
  const [sortBy, setSortBy] = useState('featured');
  const { searchQuery, setSearchQuery } = useSearch();

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;
    
    if (activeCategory !== 'All') {
      filtered = filtered.filter(p => p.category === activeCategory);
    }
    
    if (searchQuery.trim() !== '') {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(p => p.title.toLowerCase().includes(lowerQuery));
    }
    
    return filtered;
  }, [activeCategory, searchQuery]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating-desc':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'featured':
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  // Reset pagination when search query or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const currentProducts = sortedProducts.slice(
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-bold text-gray-900">
            {activeCategory === 'All' ? 'All Products' : `${activeCategory} Products`}
            <span className="text-gray-500 text-sm font-normal ml-2">({sortedProducts.length})</span>
          </h2>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm font-medium text-gray-500">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 text-gray-900 text-sm rounded-full focus:ring-[#FF5E00] focus:border-[#FF5E00] block pl-4 pr-10 py-2 outline-none cursor-pointer transition-colors hover:border-gray-300"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Highest Rated</option>
            </select>
          </div>
        </div>

        {currentProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-4 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <SearchX className="w-16 h-16 opacity-20" />
            <p className="font-medium text-lg text-gray-900">No products found</p>
            <p className="text-sm">We couldn't find anything matching "{searchQuery}"</p>
            <button 
              onClick={() => setSearchQuery('')} 
              className="mt-2 px-6 py-2 bg-black text-white rounded-full font-bold hover:bg-[#FF5E00] transition-colors text-sm"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
        
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
