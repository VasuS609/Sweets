"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

interface Option {
  text: string;
  emoji: string;
  tags: string[];
  order: number;
  id: number;
}

interface Question {
  id: number;
  text: string;
  order: number;
  options: Option[];
}

const QuizPage = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch("/api/quiz", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch questions: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success || !data.questions || data.questions.length === 0) {
        throw new Error("No questions available");
      }

      setQuestions(data.questions);
    } catch (e) {
      console.error("Fetch error:", e);
      setError(e instanceof Error ? e.message : "Failed to load questions");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (optionId: number) => {
    if (animating || submitting) return;

    setSelectedOption(optionId);
    setAnimating(true);

    setTimeout(() => {
      const newAnswers = [...answers, optionId];

      if (currentIndex === questions.length - 1) {
        submitQuiz(newAnswers);
      } else {
        setAnswers(newAnswers);
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
        setAnimating(false);
      }
    }, 300);
  };

  const submitQuiz = async (finalAnswers: number[]) => {
    try {
      setSubmitting(true);
      console.log("Submitting quiz with answers:", finalAnswers);

      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedOptions: finalAnswers }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Submission failed: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success || !result.id) {
        throw new Error("Invalid response from server");
      }

      console.log("Submit successful, redirecting to:", `/result/${result.id}`);
      
      // Navigate to result page
      router.push(`/result/${result.id}`);
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitting(false);
      setError(
        error instanceof Error 
          ? error.message 
          : "Failed to submit quiz. Please try again."
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 text-6xl animate-bounce">🪔</div>
          <div className="absolute top-20 right-20 text-5xl animate-pulse">✨</div>
          <div className="absolute bottom-20 left-20 text-5xl animate-bounce">🎆</div>
          <div className="absolute bottom-10 right-10 text-6xl animate-pulse">🪔</div>
        </div>
        <div className="relative z-10 text-center">
          <div className="text-7xl mb-4 animate-pulse">🪔</div>
          <div className="text-white text-3xl font-bold">Loading your Diwali journey...</div>
          <div className="mt-4 flex gap-2 justify-center">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !submitting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 p-4">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center max-w-md">
          <div className="text-6xl mb-4">😢</div>
          <div className="text-gray-800 text-2xl font-bold mb-4">Oops!</div>
          <div className="text-gray-600 mb-6">{error}</div>
          <button
            onClick={fetchQuestions}
            className="px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0 && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center">
          <div className="text-6xl mb-4">🤔</div>
          <div className="text-gray-800 text-2xl font-bold mb-4">No questions found</div>
          <button
            onClick={fetchQuestions}
            className="px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (submitting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-4xl animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              {['🎆', '✨', '🎉', '🪔'][Math.floor(Math.random() * 4)]}
            </div>
          ))}
        </div>
        <div className="relative z-10 text-center bg-white/10 backdrop-blur-md rounded-3xl p-12">
          <div className="text-8xl mb-6 animate-bounce">🎊</div>
          <div className="text-white text-4xl font-bold mb-2">Calculating your result...</div>
          <div className="text-white/90 text-xl">Your Diwali personality awaits!</div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 p-4 md:p-8 flex justify-center relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none opacity-30 hidden sm:block">
        <div className="absolute top-10 left-10 text-4xl animate-float">🪔</div>
        <div className="absolute top-40 right-20 text-3xl" style={{ animation: 'float-delayed 5s ease-in-out infinite' }}>✨</div>
        <div className="absolute bottom-40 left-20 text-3xl animate-float">🎆</div>
        <div className="absolute bottom-20 right-40 text-4xl" style={{ animation: 'float-delayed 5s ease-in-out infinite' }}>🪔</div>
      </div>

      <div className="max-w-3xl mx-auto w-full z-10">
        {/* Progress bar */}
        <div className="mb-8 bg-white/20 backdrop-blur-md rounded-2xl p-2 shadow-xl">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white font-bold text-xl flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span className="text-white font-bold text-xl bg-white/20 px-4 py-1 rounded-full">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-3 bg-white/30 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg flex items-center justify-center gap-3">
            <span className="animate-pulse">✨</span>
            <span>Diwali Quiz</span>
            <span className="animate-pulse">✨</span>
          </h1>
          <p className="text-white/90 text-lg font-semibold">Discover your festive personality!</p>
        </div>

        {/* Question Card */}
        <div
          className={`bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-8 mb-6 transition-all duration-300 ${
            animating ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <div className="text-center mb-6">
            <div className="inline-block bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
              Question {currentIndex + 1}
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center leading-relaxed">
            {currentQuestion.text}
          </h2>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-8">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                disabled={animating || submitting}
                className={`group p-5 sm:p-6 rounded-2xl border-3 transition-all duration-200 text-left relative overflow-hidden disabled:cursor-not-allowed ${
                  selectedOption === option.id
                    ? "bg-gradient-to-br from-orange-400 via-pink-500 to-purple-500 border-orange-500 scale-105 shadow-2xl"
                    : "bg-white border-gray-200 hover:border-orange-400 hover:shadow-xl hover:scale-102"
                }`}
                style={{ 
                  animationDelay: `${idx * 100}ms`,
                  borderWidth: '3px'
                }}
              >
                {selectedOption === option.id && (
                  <div className="absolute inset-0 bg-white/20"></div>
                )}
                <div className="flex items-center gap-4 relative z-10">
                  <span className={`text-4xl sm:text-5xl transition-transform duration-200 ${
                    selectedOption === option.id ? "scale-110" : "group-hover:scale-110"
                  }`}>
                    {option.emoji}
                  </span>
                  <span
                    className={`text-base sm:text-lg font-semibold transition-colors duration-200 ${
                      selectedOption === option.id
                        ? "text-white"
                        : "text-gray-800 group-hover:text-orange-600"
                    }`}
                  >
                    {option.text}
                  </span>
                </div>
                {selectedOption === option.id && (
                  <div className="absolute top-2 right-2 text-2xl text-white">✓</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Helper Text */}
        <div className="text-center">
          <div className="inline-block bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-white text-sm font-medium shadow-lg">
            {selectedOption === null ? (
              <span className="flex items-center gap-2">
                <span className="animate-pulse">👆</span>
                Choose an option to continue
                <span className="animate-pulse">✨</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>✓</span>
                Great choice! Moving to next question...
                <span className="animate-bounce">→</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
