import { Twitter, Facebook, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="px-8 py-12 border-t border-gray-200">
      <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
        <div className="flex gap-24">
          <div>
            <h4 className="font-bold text-gray-900 mb-6">About</h4>
            <ul className="flex flex-col gap-4 text-sm font-medium text-gray-500">
              <li><a href="#" className="hover:text-[#FF5E00] transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-[#FF5E00] transition-colors">Meet The Team</a></li>
              <li><a href="#" className="hover:text-[#FF5E00] transition-colors">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Support</h4>
            <ul className="flex flex-col gap-4 text-sm font-medium text-gray-500">
              <li><a href="#" className="hover:text-[#FF5E00] transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-[#FF5E00] transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-[#FF5E00] transition-colors">Return</a></li>
              <li><a href="#" className="hover:text-[#FF5E00] transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-start md:items-end gap-4">
          <span className="text-sm font-bold text-gray-400">Social Media</span>
          <div className="flex items-center gap-3">
            <a href="#" className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#FF5E00] transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#FF5E00] transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#FF5E00] transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#FF5E00] transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-200 text-xs font-medium text-gray-400">
        <p>Copyright © 2023 Uangku. All Rights Reserved.</p>
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
