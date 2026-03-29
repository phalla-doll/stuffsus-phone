'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { X, Minus, Plus, ShoppingBag, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';

export default function Cart() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isCartOpen && !isCheckoutOpen && !isSuccess) return null;

  const handleConfirmOrder = () => {
    setIsCheckoutOpen(true);
    setIsCartOpen(false);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to a Telegram bot API
    console.log('Order submitted to Telegram Bot:', { phone, address, items, total: cartTotal });
    
    clearCart();
    setIsCheckoutOpen(false);
    setIsSuccess(true);
    setPhone('');
    setAddress('');
  };

  return (
    <>
      {/* Cart Drawer Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm transition-opacity" 
          onClick={() => setIsCartOpen(false)}
        >
          <div 
            className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300" 
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" /> Your Cart
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)} 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-gray-400 gap-4"
                >
                  <ShoppingBag className="w-16 h-16 opacity-20" />
                  <p className="font-medium">Your cart is empty</p>
                </motion.div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {items.map(item => (
                    <motion.div 
                      key={item.id} 
                      layout
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, x: -20 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="flex gap-4 items-center bg-white"
                    >
                      <div className="w-20 h-20 bg-[#EBEBEB] rounded-2xl relative overflow-hidden flex-shrink-0">
                        <Image 
                          src={`https://picsum.photos/seed/${item.imageSeed}/200/200`} 
                          alt={item.title} 
                          fill 
                          className="object-cover mix-blend-multiply" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 line-clamp-1">{item.title}</h3>
                        <p className="text-[#FF5E00] font-bold">${item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                            className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#FF5E00] hover:text-[#FF5E00] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <motion.span 
                            key={item.quantity}
                            initial={{ scale: 1.5, color: '#FF5E00' }}
                            animate={{ scale: 1, color: '#111827' }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="text-sm font-bold w-4 text-center inline-block"
                          >
                            {item.quantity}
                          </motion.span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                            className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#FF5E00] hover:text-[#FF5E00] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)} 
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-500 font-medium">Total</span>
                  <motion.span 
                    key={cartTotal}
                    initial={{ scale: 1.1, color: '#FF5E00' }}
                    animate={{ scale: 1, color: '#111827' }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="text-2xl font-black text-gray-900"
                  >
                    ${cartTotal.toFixed(2)}
                  </motion.span>
                </div>
                <button 
                  onClick={handleConfirmOrder} 
                  className="w-full py-4 bg-black text-white rounded-full font-bold hover:bg-[#FF5E00] transition-colors shadow-sm shadow-black/5"
                >
                  Confirm Order
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200" 
          onClick={() => setIsCheckoutOpen(false)}
        >
          <div 
            className="bg-white rounded-[2rem] w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-200" 
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Delivery Details</h2>
              <button 
                onClick={() => setIsCheckoutOpen(false)} 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-6 font-medium">
              Please provide your contact details. We'll alert the shop owner via Telegram to process your order.
            </p>
            <form onSubmit={handleSubmitOrder} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF5E00] focus:border-transparent transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Delivery Location</label>
                <textarea 
                  required
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="Enter your full delivery address..." 
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF5E00] focus:border-transparent transition-all resize-none font-medium"
                />
              </div>
              <button 
                type="submit" 
                className="w-full py-4 mt-2 bg-black text-white rounded-full font-bold hover:bg-[#FF5E00] transition-colors shadow-sm shadow-black/5"
              >
                Submit Order
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccess && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200" 
          onClick={() => setIsSuccess(false)}
        >
          <div 
            className="bg-white rounded-[2rem] w-full max-w-sm p-8 shadow-2xl text-center animate-in zoom-in-95 duration-200" 
            onClick={e => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Received!</h2>
            <p className="text-gray-500 mb-8 font-medium">We've alerted the shop owner. They will contact you shortly to confirm your delivery.</p>
            <button 
              onClick={() => setIsSuccess(false)} 
              className="w-full py-4 bg-black text-white rounded-full font-bold hover:bg-[#FF5E00] transition-colors shadow-sm shadow-black/5"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </>
  );
}
