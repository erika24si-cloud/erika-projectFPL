import React from "react";

export default function Blog() {
  return (
    <section className="w-full py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        <div className="pr-8">
          <h2 className="text-4xl md:text-5xl font-black text-[#212153] tracking-wide">
            DaCode Blog
          </h2>

          <p className="text-gray-500 mt-6 leading-relaxed max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>

          <button className="mt-8 bg-[#FF7A00] text-white px-8 py-3 rounded-xl font-semibold shadow-md shadow-orange-500/30 hover:bg-orange-600 transition duration-300">
            Learn More
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] flex items-stretch overflow-hidden">
          
          <div className="w-2/5 bg-[#5EE6EB] flex items-center justify-center p-4 relative shrink-0">
            <img
              src="/images/blog-dog.png" 
              alt="dog"
              className="w-full object-contain scale-110" 
            />
          </div>

          <div className="w-3/5 p-8 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-[#212153] leading-snug">
              Why Your SaaS Business should use WordPress
            </h3>

            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              A content management system like WordPress can help you build a 
              highly engaging website and gives you the tools you need to grow.
            </p>

            <div className="flex gap-3 mt-6">
              <button className="w-9 h-9 bg-[#FF7A00] text-white rounded-full flex items-center justify-center shadow hover:opacity-80 transition">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </button>
              <button className="w-9 h-9 bg-[#FF7A00] text-white rounded-full flex items-center justify-center shadow hover:opacity-80 transition">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}