'use client';

import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Tech Reviewer',
    content: "The quality of these products is absolutely mind-blowing. I've tested hundreds of audio devices, and the sound profile here rivals brands that charge triple the price. Highly recommended!",
    avatarSeed: 'woman-portrait',
    rating: 5,
  },
  {
    id: 2,
    name: 'David Chen',
    role: 'Lifestyle Creator',
    content: "Not only do they sound great, but the aesthetic perfectly matches my minimalist setup. The neon orange accents are such a nice touch. Customer service was also incredibly helpful.",
    avatarSeed: 'man-portrait',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emma Watson',
    role: 'Music Producer',
    content: "I use these daily in the studio. The clarity and bass response are exactly what I need for mixing on the go. It's rare to find gear that looks this good and performs even better.",
    avatarSeed: 'girl-portrait',
    rating: 5,
  }
];

export default function Testimonials() {
  return (
    <section className="px-4 md:px-8 mb-16 md:mb-24">
      <div className="flex flex-col items-center text-center mb-10 md:mb-14">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Trusted by Creators</h2>
        <p className="text-gray-600 max-w-2xl">
          Don't just take our word for it. See what industry professionals and everyday users have to say about their experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full"
          >
            <div className="flex items-center gap-1 mb-6">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#FF5E00] text-[#FF5E00]" />
              ))}
            </div>
            
            <Quote className="w-10 h-10 text-gray-200 mb-4 rotate-180" />
            
            <p className="text-gray-700 leading-relaxed mb-8 flex-grow">
              "{testimonial.content}"
            </p>
            
            <div className="flex items-center gap-4 mt-auto">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                <Image
                  src={`https://picsum.photos/seed/${testimonial.avatarSeed}/100/100`}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
