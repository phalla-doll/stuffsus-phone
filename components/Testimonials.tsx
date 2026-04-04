'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
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
  },
  {
    id: 4,
    name: 'Marcus Johnson',
    role: 'Fitness Coach',
    content: "These stay in my ears through the toughest workouts. Sweat-resistant, secure fit, and the battery life is insane. I only have to charge them once a week!",
    avatarSeed: 'athlete',
    rating: 5,
  },
  {
    id: 5,
    name: 'Sophia Lee',
    role: 'Digital Nomad',
    content: "Working from cafes means I need top-tier noise cancellation. These deliver exactly that. Plus, the mic quality on calls is crystal clear. An absolute game changer for remote work.",
    avatarSeed: 'nomad',
    rating: 4,
  },
  {
    id: 6,
    name: 'Alex Rivera',
    role: 'Audiophile',
    content: "I was skeptical at first, but the soundstage on these is incredibly wide. The highs are crisp without being piercing, and the lows are punchy. Very impressive engineering.",
    avatarSeed: 'guy-portrait',
    rating: 5,
  }
];

export default function Testimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="px-4 md:px-8 mb-16 md:mb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-6">
        <div className="flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Trusted by Creators</h2>
          <p className="text-gray-600 max-w-2xl">
            Don't just take our word for it. See what industry professionals and everyday users have to say about their experience.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <button 
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#FF5E00] hover:text-[#FF5E00] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#FF5E00] hover:text-[#FF5E00] transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 md:gap-6 pb-8 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6 w-[85vw] sm:w-[500px] md:w-[600px] shrink-0 snap-start"
          >
            {/* Profile Side */}
            <div className="flex flex-row sm:flex-col items-center sm:items-start gap-4 sm:w-1/3 shrink-0">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-gray-100 shrink-0">
                <Image
                  src={`https://picsum.photos/seed/${testimonial.avatarSeed}/150/150`}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                <p className="text-sm text-[#FF5E00] font-medium mb-2">{testimonial.role}</p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'fill-[#FF5E00] text-[#FF5E00]' : 'fill-gray-200 text-gray-200'}`} />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Text Side */}
            <div className="flex flex-col sm:w-2/3">
              <Quote className="w-8 h-8 text-gray-200 mb-3 rotate-180 shrink-0" />
              <p className="text-gray-700 leading-relaxed italic">
                "{testimonial.content}"
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
