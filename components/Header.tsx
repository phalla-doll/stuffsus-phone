import { Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
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
        <button className="text-gray-600 hover:text-[#FF5E00] transition-colors relative">
          <ShoppingCart className="w-5 h-5" />
          <span className="absolute -top-1.5 -right-1.5 bg-[#FF5E00] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">2</span>
        </button>
        <button className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden border border-gray-300 hover:border-[#FF5E00] transition-colors relative">
          <Image src="https://picsum.photos/seed/user/100/100" alt="User" fill className="object-cover" referrerPolicy="no-referrer" />
        </button>
      </div>
    </header>
  );
}
