"use client"
import React from 'react';
import Image from 'next/image';
import img from "../../../../public/resultpage.jpg";
import SweetCard from '@/app/components/SweetCard';
import Confetti from "@/app/components/Confetti";

const ResultPage = () => {
  return (
    <div className='relative min-h-screen'>
      {/* Background Image */}
      <div className='fixed inset-0 -z-10'>
        <Image 
          src={img} 
          alt="Result page background" 
          fill
          className='object-cover'
          priority
        />
      </div>
      
      {/* Confetti Effect */}
    <div>
<Confetti />
    </div>
      
      
      {/* Content Cards */}
      <div className='relative z-10 p-4 md:p-8'>
        <SweetCard />
      </div>
    </div>
  );
};

export default ResultPage;