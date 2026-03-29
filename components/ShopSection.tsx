'use client';

import { useState, useMemo, useEffect } from 'react';
import Sidebar from './Sidebar';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight, SearchX, ChevronDown } from 'lucide-react';
import { useSearch } from '@/context/SearchContext';

const baseProducts = [
  { title: 'iPhone 15 Pro Max', price: 1199.00, rating: 4.9, reviews: '12k', category: 'Mobile', imageSeed: 'iphone', brand: 'Apple' },
  { title: 'Galaxy S24 Ultra', price: 1299.00, rating: 4.8, reviews: '8k', category: 'Mobile', imageSeed: 'galaxy', brand: 'Samsung' },
  { title: 'AirPods Pro 2', price: 249.00, rating: 4.9, reviews: '25k', category: 'Audio', imageSeed: 'airpods', brand: 'Apple' },
  { title: 'Sony WH-1000XM5', price: 398.00, rating: 4.8, reviews: '15k', category: 'Audio', imageSeed: 'headphones', brand: 'Sony' },
  { title: 'Silicone MagSafe Case', price: 49.00, rating: 4.5, reviews: '3k', category: 'Cases', imageSeed: 'phone-case', brand: 'Apple' },
  { title: 'Rugged Armor Case', price: 19.99, rating: 4.7, reviews: '10k', category: 'Cases', imageSeed: 'rugged-case', brand: 'Anker' },
  { title: 'Anker 735 Charger', price: 59.99, rating: 4.8, reviews: '5k', category: 'Chargers', imageSeed: 'charger', brand: 'Anker' },
  { title: 'USB-C to USB-C Cable', price: 19.00, rating: 4.6, reviews: '8k', category: 'Chargers', imageSeed: 'cable', brand: 'Apple' },
  { title: 'Apple Watch Series 9', price: 399.00, rating: 4.8, reviews: '10k', category: 'Wearables', imageSeed: 'smartwatch', brand: 'Apple' },
  { title: 'Galaxy Watch 6', price: 299.00, rating: 4.6, reviews: '6k', category: 'Wearables', imageSeed: 'galaxy-watch', brand: 'Samsung' },
  { title: 'Logitech MX Master 3S', price: 99.99, rating: 4.9, reviews: '18k', category: 'Accessory', imageSeed: 'mouse', brand: 'Logitech' },
  { title: 'Smart Home Hub', price: 129.00, rating: 4.4, reviews: '2k', category: 'Home', imageSeed: 'smart-hub', brand: 'Samsung' },
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
  const [activeBadge, setActiveBadge] = useState('All');
  const [activeBrand, setActiveBrand] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('featured');
  const { searchQuery, setSearchQuery } = useSearch();

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;
    
    if (activeCategory !== 'All') {
      filtered = filtered.filter(p => p.category === activeCategory);
    }
    
    if (activeBadge !== 'All') {
      filtered = filtered.filter(p => p.badge === activeBadge);
    }
    
    if (activeBrand !== 'All') {
      filtered = filtered.filter(p => p.brand === activeBrand);
    }
    
    if (searchQuery.trim() !== '') {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(p => p.title.toLowerCase().includes(lowerQuery));
    }
    
    return filtered;
  }, [activeCategory, activeBadge, activeBrand, searchQuery]);

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
  }, [searchQuery, sortBy, activeCategory, activeBadge, activeBrand]);

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
        activeBadge={activeBadge}
        onBadgeChange={setActiveBadge}
        activeBrand={activeBrand}
        onBrandChange={setActiveBrand}
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
            <div className="relative">
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 text-gray-900 text-sm rounded-full focus:ring-[#FF5E00] focus:border-[#FF5E00] block pl-4 pr-10 py-2 outline-none cursor-pointer transition-colors hover:border-gray-300"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Highest Rated</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
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
