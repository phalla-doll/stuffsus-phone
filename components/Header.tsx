'use client';

import { useState, useEffect } from 'react';
import { Search, ShoppingCart, X, Menu } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useSearch } from '@/context/SearchContext';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const { cartCount, setIsCartOpen } = useCart();
  const { searchQuery, setSearchQuery, isSearchOpen, setIsSearchOpen } = useSearch();
  const [inputValue, setInputValue] = useState(searchQuery);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 300); // 300ms debounce
    return () => clearTimeout(timer);
  }, [inputValue, setSearchQuery]);

  return (
    <header className="relative flex items-center justify-between py-4 md:py-6 px-4 md:px-8 bg-[#F5F5F5]">
      <div className="flex items-center gap-2">
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 -ml-2 text-gray-600 hover:text-[#FF5E00]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        {/* Logo icon placeholder */}
        <div className="w-5 h-5 md:w-6 md:h-6 bg-black rounded-sm transform rotate-45 ml-2 md:ml-0"></div>
        <span className="text-lg md:text-xl font-bold tracking-tight">Stuffsus</span>
      </div>
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
        <Link href="#" className="text-black font-bold">Beranda</Link>
        <Link href="#" className="hover:text-black transition-colors">Shop</Link>
        <Link href="#" className="hover:text-black transition-colors">Blog</Link>
      </nav>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '200px' }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden"
              >
                <input 
                  type="text"
                  autoFocus
                  placeholder="Search products..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full px-4 py-1.5 rounded-full border border-gray-200 focus:outline-none focus:border-[#FF5E00] text-sm"
                />
              </motion.div>
            )}
          </AnimatePresence>
          <button 
            onClick={() => {
              if (isSearchOpen) {
                setIsSearchOpen(false);
                setInputValue('');
                setSearchQuery('');
              } else {
                setIsSearchOpen(true);
              }
            }}
            className="text-gray-600 hover:text-[#FF5E00] transition-colors p-1"
          >
            {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>
        </div>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="text-gray-600 hover:text-[#FF5E00] transition-colors relative"
        >
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-[#FF5E00] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 p-4 flex flex-col gap-4 md:hidden z-50"
          >
            <Link href="#" className="text-black font-bold px-4 py-2 hover:bg-gray-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Beranda</Link>
            <Link href="#" className="text-gray-600 font-medium px-4 py-2 hover:bg-gray-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
            <Link href="#" className="text-gray-600 font-medium px-4 py-2 hover:bg-gray-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
