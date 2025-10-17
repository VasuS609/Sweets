'use client';

import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen  bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 relative overflow-hidden">
      
      {/* Decorative Elements - Top Corners */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8">
        <div className="text-6xl md:text-8xl opacity-20">☀️</div>
      </div>
      <div className="absolute top-4 right-4 md:top-8 md:right-8">
        <div className="text-6xl md:text-8xl opacity-20">☀️</div>
      </div>

      {/* Hanging Decorations */}
      <div className="absolute top-0 left-16 md:left-32">
        <div className="text-4xl md:text-6xl animate-bounce" style={{ animationDelay: '0s' }}>🪔</div>
      </div>
      <div className="absolute top-0 right-16 md:right-32">
        <div className="text-4xl md:text-6xl animate-bounce" style={{ animationDelay: '0.5s' }}>🪔</div>
      </div>

      {/* Social Icons - Top Right */}
      <div className="absolute top-8 right-8 flex justify-center gap-4 z-10">
        <a 
          href="https://linkedin.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-orange-200 transition-colors"
        >
          <Linkedin size={28} />
        </a>
        <a 
          href="https://github.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-orange-200 transition-colors"
        >
          <Github size={28} />
        </a>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4  flex flex-col items-center justify-center min-h-screen gap-10 ">
        
        {/* Main Heading */}
      <h1
  className="
    text-4xl md:text-6xl font-bold text-center mb-8  text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-amber-500 bg-[length:200%_auto] transition-[background-position] duration-[2500ms] ease-in-out hover:bg-[position:-100%_0] drop-shadow-2xl ">
  This Diwali, let&apos;s find which traditional sweet matches your personality perfectly!
</h1>
        {/* Feature Box */}
        <div className="bg-white/20 hover:scale-105 transition-all ease-in-out  backdrop-blur-md rounded-3xl md:p-12 mb-12 sm:w-150 w-75  border border-white/30 hover:bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 hover:duration-600  hover:ease-in-out">
          <h2 className="sm:text-3xl text-2xl font-semibold text-white w-full h-20  flex items-center justify-center hover:text-emerald-200">
            Answer 7 fun questions and discover:
          </h2>
          
          <ul className="space-y-4 text-white text-lg h-40 flex flex-col justify-center ">
            <li className="flex items-start gap-3">
              <span className="text-2xl">✨</span>
              <span className="hover:text-emerald-200">Your ideal festive sweet</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🎯</span>
              <span  className="hover:text-emerald-200">Why it matches your vibe</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">📊</span>
              <span  className="hover:text-emerald-200">Nutrition facts to celebrate mindfully</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🎁</span>
              <span  className="hover:text-emerald-200">A personalized Diwali treat recommendation</span>
            </li>
          </ul>
        </div>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-white font-medium mb-8 text-center drop-shadow">
          May your Diwali be as sweet as your result! ✨
        </p>

        {/* CTA Button */}
        <Link href="/quiz">
          <button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold text-xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-500 items-center gap-2 w-60 h-10  flex justify-center px-12">
            Get Started 🪔
          </button>
        </Link>

        {/* Footer */}
        <p className="text-white/80 text-sm mt-12">
          Made with ❤️ for Diwali 2025 by <a href="https://vashs-devor.vercel.app/" className='text-lg text-amber-50'>Vasu!!</a>
        </p>
      </div>

      {/* Bottom Diya Decorations */}
      <div className="absolute bottom-8 left-16 md:left-32">
        <div className="text-6xl md:text-8xl opacity-30 animate-pulse">🪔</div>
      </div>
      <div className="absolute bottom-8 right-16 md:right-32">
        <div className="text-6xl md:text-8xl opacity-30 animate-pulse">🪔</div>
      </div>
    </div>
  );
}