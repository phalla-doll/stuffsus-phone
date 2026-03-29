import { Send } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="px-8 mb-24">
      <div className="bg-[#1A1A1A] rounded-[2rem] p-12 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
            Ready to Get<br />Our New Stuff?
          </h2>
          <div className="flex items-center max-w-md w-full">
            <a 
              href="https://t.me/yourchannel" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-[#229ED9] text-white rounded-full text-lg font-bold hover:bg-[#1c84b5] transition-colors shadow-lg flex items-center justify-center gap-3"
            >
              <Send className="w-6 h-6" />
              Join Telegram Channel
            </a>
          </div>
        </div>
        <div className="flex-1 max-w-sm">
          <h3 className="text-lg font-bold text-white mb-4">Get Notified on Product Drops</h3>
          <p className="text-gray-400 text-sm leading-relaxed font-medium">
            Join our Telegram channel to be the first to know when new products drop. Don&apos;t miss out on exclusive deals and limited stock items!
          </p>
        </div>
      </div>
    </section>
  );
}
