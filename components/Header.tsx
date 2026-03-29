'use client';

import { Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <header className="flex items-center justify-between py-6 px-8 bg-[#F5F5F5]">
      <div className="flex items-center gap-2">
        {/* Logo icon placeholder */}
        <div className="w-6 h-6 bg-black rounded-sm transform rotate-45"></div>
        <span className="text-xl font-bold tracking-tight">Stuffsus</span>
      </div>
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
        <Link href="#" className="text-black font-bold">Beranda</Link>
        <Link href="#" className="hover:text-black transition-colors">Shop</Link>
        <Link href="#" className="hover:text-black transition-colors">Blog</Link>
      </nav>
      <div className="flex items-center gap-6">
        <button className="text-gray-600 hover:text-[#FF5E00] transition-colors">
          <Search className="w-5 h-5" />
        </button>
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
    </header>
  );
}
