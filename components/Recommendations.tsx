import ProductCard from './ProductCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const recommendations = [
  { id: 10, title: 'TWS Bujug', price: 29.90, rating: 5.0, reviews: '1.2k', category: 'Other', imageSeed: 'tws' },
  { id: 11, title: 'Headsound Baptis', price: 50.00, rating: 5.0, reviews: '1.2k', category: 'Music', imageSeed: 'white-headphones' },
  { id: 12, title: 'Adudu Cleaner', price: 12.00, rating: 4.4, reviews: '1k', category: 'Other', imageSeed: 'piano' },
  { id: 13, title: 'Adu', price: 29.90, rating: 4.4, reviews: '1k', category: 'Music', imageSeed: 'device' },
];

export default function Recommendations() {
  return (
    <section className="px-8 mb-24">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Explore our recomendations</h2>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#FF5E00] hover:text-[#FF5E00] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#FF5E00] hover:text-[#FF5E00] transition-colors">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
