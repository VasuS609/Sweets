"use client";
import React, { useEffect, useState } from "react";
import { Bungee_Spice } from "next/font/google";
import { useParams } from "next/navigation";
import aos from "aos";
import NutritionChart from "./chart";

const bungeeSpice = Bungee_Spice({
  weight: "400",
  subsets: ["latin"],
});

interface Sweet {
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

export default function SweetCard() {
  const params = useParams();
  const id = params?.id as string;

  const [sweet, setSweet] = useState<Sweet | null>(null);
  const [tagScores, setTagScores] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    aos.init({
      duration: 1000,
      once: true,
    });

    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/result/${id}`);

      if (!response.ok) throw new Error("Unable to fetch result");

      const data = await response.json();

      // FIXED: Check data.success instead of data.ok
      if (!data.success) throw new Error("Failed to load result");

      // FIXED: Access sweet object from data.result.sweet
      setSweet(data.result.sweet);
      setTagScores(data.result.tagScores);
      setLoading(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-white text-2xl">Loading your result... ✨</div>
      </div>
    );
  }

  if (error || !sweet) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-white text-2xl">Error: {error || "Result not found"} 😢</div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-8">
      {/* Header */}
      <div className={bungeeSpice.className} data-aos="zoom-in">
        <div className="text-4xl sm:text-6xl text-white font-bold p-6 bg-black/30 rounded-lg flex justify-center text-center backdrop-blur-sm">
          Here's Your Result! 🎉
        </div>
      </div>

      {/* Main Result Card */}
      <div className="flex justify-center" data-aos="fade-up">
        <div className="w-full max-w-2xl bg-gradient-to-br from-amber-100 to-orange-100 text-gray-800 p-8 rounded-3xl shadow-2xl">
          <h1 className="text-2xl sm:text-3xl text-center mb-4">
            You Are...{" "}
            <span className={`${bungeeSpice.className} text-4xl sm:text-5xl block mt-2`}>
              {sweet.name}! {sweet.emoji}
            </span>
          </h1>

          {/* Sweet Image Placeholder */}
          <div className="flex justify-center my-6">
            <div className="w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full flex items-center justify-center shadow-xl">
              <span className="text-9xl">{sweet.emoji}</span>
            </div>
          </div>

          <div className="space-y-4 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-orange-700">
              {sweet.tagline}
            </h3>
            <p className="text-lg sm:text-xl">{sweet.description}</p>
          </div>
        </div>
      </div>

      {/* Fun Fact Section */}
      <div className="flex justify-center" data-aos="fade-up" data-aos-delay="200">
        <div className="w-full max-w-2xl bg-white/20 backdrop-blur-sm text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-yellow-300">
            🎯 Fun Fact!
          </h2>
          <p className="text-lg sm:text-xl">{sweet.funFact}</p>
        </div>
      </div>

      {/* Nutrition Chart */}
      <div className="flex justify-center" data-aos="fade-up" data-aos-delay="400">
        <div className="w-full max-w-2xl bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center">
            📊 Nutrition Facts (Per Piece)
          </h2>
          <NutritionChart
            calories={sweet.calories}
            protein={sweet.protein}
            carbs={sweet.carbs}
            fat={sweet.fat}
            fiber={sweet.fiber}
            sugar={sweet.sugar}
          />
        </div>
      </div>

      {/* Personality Tags */}
      <div className="flex justify-center" data-aos="fade-up" data-aos-delay="600">
        <div className="w-full max-w-2xl bg-purple-500/20 backdrop-blur-sm text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
            Your Top Personality Traits
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {Object.entries(tagScores)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 5)
              .map(([tag, score]) => (
                <div
                  key={tag}
                  className="bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full font-semibold"
                >
                  {tag} ({score})
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Share Section */}
      <div className="flex justify-center" data-aos="fade-up" data-aos-delay="800">
        <div className="w-full max-w-2xl text-center">
          <button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            Share Your Result 📤
          </button>
        </div>
      </div>
    </div>
  );
}