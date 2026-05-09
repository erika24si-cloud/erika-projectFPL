import React from "react";

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#FCF8F3] pt-20 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 md:gap-8">
        
        <div className="pr-4">
          <h1 className="text-4xl font-black text-black mb-6 tracking-wide">Mew</h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-white rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.05)] flex items-center justify-center text-gray-800 hover:text-[#FF7A00] hover:-translate-y-1 transition-all duration-300">
              <FacebookIcon />
            </a>
            <a href="#" className="w-10 h-10 bg-white rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.05)] flex items-center justify-center text-gray-800 hover:text-[#FF7A00] hover:-translate-y-1 transition-all duration-300">
              <TwitterIcon />
            </a>
            <a href="#" className="w-10 h-10 bg-white rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.05)] flex items-center justify-center text-gray-800 hover:text-[#FF7A00] hover:-translate-y-1 transition-all duration-300">
              <InstagramIcon />
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-black mb-6">Useful links</h2>
          <ul className="space-y-4 text-gray-500 text-sm font-medium">
            <li><a href="#" className="hover:text-black transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Shop</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Terms of Use</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Site Map</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-black mb-6">Explore</h2>
          <ul className="space-y-4 text-gray-500 text-sm font-medium">
            <li><a href="#" className="hover:text-black transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Services</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Our Team</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Adopt Pet</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-black mb-6">Contact Info</h2>
          <ul className="space-y-4 text-gray-500 text-sm font-medium">
            <li>+12 777-8888</li>
            <li>mew@gmail.com</li>
            <li>Portland, TX 78374</li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto text-center text-gray-400 font-medium text-sm mt-16 pt-6 border-t border-gray-200">
        Copyright 2022 | UIUXCrea
      </div>
    </footer>
  );
}