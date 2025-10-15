"use client";

import React, { useEffect } from 'react'
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Exo_2 } from "next/font/google";
import AOS from 'aos';
import 'aos/dist/aos.css';

// Configure the font
const exo2 = Exo_2({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
  display: 'swap',
})

const LandingPage: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className={exo2.className}>
      <div className='fixed inset-0 -z-10'> 
        <img 
          className='w-full h-full object-cover' 
          src="/landingpageBg.jpeg" 
          alt="Landing background" 
        />
        <div className='absolute inset-0 bg-black/30'></div>
      </div>

      <div className='relative z-10'> 
        <div className='flex flex-col items-center justify-between min-h-screen w-full px-4 py-8'>
          
          {/* Top section - Social Icons */}
          <div 
            className='flex gap-8 text-2xl sm:text-4xl text-white'
            data-aos="fade-down"
          >
            <a 
              href="https://www.linkedin.com/in/vasu-sahu-s2ep7"
              className='hover:text-blue-400  transition-colors'
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>   
            <a 
              href="https://github.com/VasuS609"
              className=' transition-colors hover:text-black '
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>     
          </div>

          {/* Middle section - Main Content */}
          <div className='flex flex-col items-center gap-6 max-w-4xl text-center text-white'>
            <h1 
              className='text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight hover:scale-105 transition-all ease-in-out duration-500'
              data-aos="zoom-in"
            >
              🪔 This Diwali, let's find which traditional sweet matches your personality perfectly! 🍬
            </h1>
            
            <div 
              className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 hover:scale-105 transition-all duration-300'
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <p className='text-lg sm:text-xl mb-4 font-medium'>
                Answer 15 fun questions and discover:
              </p>
              <ul className='text-left space-y-2 text-base sm:text-lg'>
                <li data-aos="fade-right" data-aos-delay="300">✨ Your ideal festive sweet</li>
                <li data-aos="fade-right" data-aos-delay="400">🎯 Why it matches your vibe</li>
                <li data-aos="fade-right" data-aos-delay="500">📊 Nutrition facts to celebrate mindfully</li>
                <li data-aos="fade-right" data-aos-delay="600">🎁 A personalized Diwali treat recommendation</li>
              </ul>
            </div>
            
            <h3 
              className='text-xl sm:text-2xl font-medium'
              data-aos="fade-up"
              data-aos-delay="700"
            >
              May your Diwali be as sweet as your result! 🌟
            </h3>

            {/* CTA Button */}
            <button 
              className='bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold text-lg sm:text-xl px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 mt-4'
              data-aos="zoom-in"
              data-aos-delay="800"
            >
              Get Started 🎆
            </button>
          </div>

          {/* Bottom section - Optional footer */}
          <div 
            className='text-white text-md'
          >
            Made with 💝 for Diwali 2024
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
