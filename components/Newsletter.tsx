export default function Newsletter() {
  return (
    <section className="px-8 mb-24">
      <div className="bg-[#1A1A1A] rounded-[2rem] p-12 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
            Ready to Get<br />Our New Stuff?
          </h2>
          <div className="flex items-center bg-white rounded-full p-1.5 max-w-md w-full">
            <input 
              type="email" 
              placeholder="Your Email" 
              className="flex-1 px-6 py-3 bg-transparent focus:outline-none text-gray-900 font-medium"
            />
            <button className="px-8 py-3 bg-black text-white rounded-full font-bold hover:bg-[#FF5E00] transition-colors">
              Send
            </button>
          </div>
        </div>
        <div className="flex-1 max-w-sm">
          <h3 className="text-lg font-bold text-white mb-4">Stuffsus for Homes and Needs</h3>
          <p className="text-gray-400 text-sm leading-relaxed font-medium">
            We&apos;ll listen to your needs, identify the best approach, and then create a bespoke smart EV charging solution that&apos;s right for you.
          </p>
        </div>
      </div>
    </section>
  );
}
