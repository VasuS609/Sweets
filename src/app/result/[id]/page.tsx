'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import LoadingSpinner from '@/app/components/LoadingSpinner';

// better performance
const NutritionChart = dynamic(() => import('@/app/components/chart'), { 
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 rounded-lg h-64 w-full"></div>
});

const Confetti = dynamic(() => import('@/app/components/Confetti'), { 
  ssr: false,
  loading: () => null
});

// Optimize image imports 
const imageMap = {
  barfi: () => import('@/app/sweetsImages/barfi.png'),
  coconutladoo: () => import('@/app/sweetsImages/coconutladoo.png'),
  gujiya: () => import('@/app/sweetsImages/gujiya.png'),
  gulabjamun: () => import('@/app/sweetsImages/gulabjamun.png'),
  jalebi: () => import('@/app/sweetsImages/jalebi.png'),
  kajukatli: () => import('@/app/sweetsImages/kajukatli.png'),
  kalakand: () => import('@/app/sweetsImages/kalakand.png'),
  kheer: () => import('@/app/sweetsImages/kheer.png'),
  ladoo: () => import('@/app/sweetsImages/ladoo.png'),
  mohanthal: () => import('@/app/sweetsImages/mohanthal.png'),
  mysorpak: () => import('@/app/sweetsImages/mysorpak.png'),
  peda: () => import('@/app/sweetsImages/peda.png'),
  rasagulla: () => import('@/app/sweetsImages/Rasagulla.png'),
  sandesh: () => import('@/app/sweetsImages/sandesh.png'),
  soanpapdi: () => import('@/app/sweetsImages/soanpapdi.png'),
};

interface Sweet {
  id: number;
  name: string;
  emoji: string;
  description: string;
  tagline: string;
  funFact: string;
  imageUrl: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}

interface Result {
  id: number;
  sweet: Sweet;
  tagScores: Record<string, number>;
  createdAt: string;
}

export default function ResultPage() {
  const params = useParams();
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  
  // Derive sweet without hooks to avoid conditional hook ordering
  const sweet = result?.sweet;
  
  // Image state/effect must be declared before any early returns
  const [sweetImage, setSweetImage] = useState<any>(null);
  useEffect(() => {
    if (!sweet) return;
    const normalize = (s: string | undefined | null) => (s ? s.toLowerCase().replace(/\s+/g, '') : '');
    const keyFromName = normalize(sweet.name);
    const keyFromUrl = normalize(sweet.imageUrl?.split('/').pop()?.split('.').shift());
    const imageKey = (keyFromName || keyFromUrl || 'jalebi') as keyof typeof imageMap;
    const loader = imageMap[imageKey] || imageMap.jalebi;
    loader().then((module) => {
      setSweetImage(module.default);
      setImageLoading(false);
    });
  }, [sweet]);
  
  useEffect(() => {
    if (params.id) {
      fetchResult();
    }
  }, [params.id]);

  const fetchResult = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/result/${params.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add cache control for better performance
        cache: 'force-cache',
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Result not found. Please take the quiz again.');
        }
        throw new Error(`Failed to fetch result: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success || !data.result) {
        throw new Error('Invalid response format');
      }

      setResult(data.result);
    } catch (err) {
      console.error('Error fetching result:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600">
        <div className="bg-white rounded-3xl p-8 max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <Link href="/quiz">
            <button className="w-full bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-all">
              Retake Quiz
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600">
        <div className="text-white text-2xl">No result found 😢</div>
      </div>
    );
  }

  // (moved hooks above)
  const s = sweet as Sweet;

return (
  <div className="min-h-screen bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 flex flex-col items-center px-4 py-8 md:py-12">
    {/* Title */}
    <div className="w-screen h-40  " >

    
    <h1 className="text-4xl mb-20 md:text-6xl font-extrabold mt-20 text-white text-center drop-shadow-lg">
      🎉 Your Result!
    </h1>
</div>
   
    {/* Confetti (client-only) */}
    <div className="fixed inset-0 pointer-events-none">
      <Confetti />
    </div>

    {/* Main Card */}
     <div className="grid grid-cols-1 sm:grid-cols-2 mt-20 gap-8">         
    <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full text-center p-6 md:p-10 relative">
      <p className="text-gray-600 text-xl mb-2 font-semibold ">You are...</p>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 flex justify-center items-center gap-2 mb-2">
        {s.emoji} <span className="hover:text-orange-600 text-amber-600">{s.name}</span> 
      </h2>
      <p className="text-orange-600 text-lg md:text-xl font-semibold italic mb-6">
        {s.tagline}
      </p>

      {/* Sweet Image */}
      <div className="flex justify-center mb-6">
        <div className="p-[5px] rounded-full bg-gradient-to-br from-orange-300 via-yellow-200 to-pink-300">
          {imageLoading ? (
            <div className="w-[220px] h-[220px] rounded-full bg-gray-200 animate-pulse flex items-center justify-center">
              <span className="text-gray-400 text-4xl">🍯</span>
            </div>
          ) : sweetImage ? (
            <Image
              src={sweetImage}
              alt={s.name}
              width={220}
              height={220}
              className="rounded-full bg-white shadow-lg"
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
          ) : (
            <div className="w-[220px] h-[220px] rounded-full bg-white shadow-lg flex items-center justify-center">
              <span className="text-4xl">🍯</span>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6 px-2 font-semibold  pb-3">
        {s.description}
      </p>

      {/* Fun Fact */}
      <div className="bg-orange-50 border-t-4 border-orange-400 rounded-2xl p-4 mb-6">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 flex justify-center items-center gap-2 mb-2">
          💡 Fun Fact
        </h3>
        <p className="text-gray-700 font-semibold text-lg">{s.funFact}</p>
      </div>
      
      </div>

      {/* Nutrition Chart */}
      <div className="mt-6 mb-4">
        <Suspense fallback={<div className="animate-pulse bg-gray-200 rounded-lg h-64 w-full"></div>}>
          <NutritionChart
            calories={s.calories}
            protein={s.protein}
            carbs={s.carbs}
            fat={s.fat}
            fiber={s.fiber}
            sugar={s.sugar}
          />
        </Suspense>
      </div></div>

      {/* Buttons */}
      <div className="h-20 flex justify-center items-center mt-15">
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-6 ">
        <Link href="/quiz">
          <button className="w-40 h-15 hover:cursor-pointer hover:scale-105  bg-white text-orange-600 font-semibold rounded-full border-2 border-orange-500 hover:bg-orange-50 transition-all">
            🔁 Retake Quiz
          </button>
        </Link>

        <button
          onClick={() => {
            const text = `I got ${s.name}, ${s.tagline} on the Diwali Sweet Quiz! 🎉`;
            navigator.clipboard.writeText(text);
            alert('Copied to clipboard!');
          }}
          className="px-8 py-3 w-40 h-15 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-full shadow-md hover:scale-105 transition-all"
        >
          📢 Share Result
        </button>

        <div className="mt-6 bg-white rounded-xl shadow-md w-60 h-15 flex justify-center items-center z-999">
      <Link href="/">
        <span className="text-orange-600  hover:text-orange-700 font-semibold text-lg transition-colors h-15 p-20 hover:scale-105">
          ← Back to Home
        </span>
      </Link>
    </div>
      </div>
    </div>
     
    
  </div>
);

}