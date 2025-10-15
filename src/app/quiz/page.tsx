"use client";

import React from "react";
import img from "../../../public/quizpage.jpg";
import aos from "aos";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Option {
  text: string;
  emoji: string;
  tags: string[];  // ✅ Fixed: Should be array
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
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Initialize AOS
    aos.init({
      duration: 1000,
      once: true,
    });
    
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/quiz",{
        method: "GET",

      });

      if (!response.ok) throw new Error("Error to fetch question");

      const data = await response.json();

      if (!data.success) throw new Error("Failed to fetch questions");

      setQuestions(data.questions);
      setLoading(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setLoading(false);
    }
  };

  const handleOptionSelect = (optionId: number) => {
    setSelectedOption(optionId);
  };

  // ✅ NEW: Submit function
  const submitQuiz = async (finalAnswers: number[]) => {
    try {
      setSubmitting(true);
      console.log('📤 Submitting quiz with answers:', finalAnswers);
      
      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedOptions: finalAnswers })
      });
      
      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit quiz');
      }
      
      const result = await response.json();
      console.log('✅ Submit successful:', result);
      console.log('🎯 Result ID:', result.id);
      console.log('🎯 Navigating to /result/' + result.id);
      
      // Navigate to result page
      router.push(`/result/${result.id}`);
      
    } catch (error) {
      console.error('❌ Submit error:', error);
      alert('Failed to submit quiz: ' + (error instanceof Error ? error.message : 'Unknown error'));
      setSubmitting(false);
    }
  };

  // ✅ FIXED: handleNext function
  const handleNext = () => {
    if (selectedOption !== null) {
      const newAnswers = [...answers, selectedOption];
      
      console.log('📊 Current answers:', newAnswers);
      console.log('📊 Question', currentIndex + 1, 'of', questions.length);
      
      // Check if this is the last question
      if (currentIndex === questions.length - 1) {
        console.log('🎯 Last question! Submitting quiz...');
        submitQuiz(newAnswers);
      } else {
        // Move to next question
        console.log('➡️ Moving to next question');
        setAnswers(newAnswers);
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
      }
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      // Restore the previous answer
      setSelectedOption(answers[currentIndex - 1] || null);
      // Remove the last answer from the array
      setAnswers(answers.slice(0, -1));
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600">
        <div className="text-white text-2xl">Loading questions... 🪔</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600">
        <div className="text-white text-2xl">Error: {error} 😢</div>
      </div>
    );
  }

  // No questions found
  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600">
        <div className="text-white text-2xl">No questions found 🤔</div>
      </div>
    );
  }

  // Submitting state
  if (submitting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600">
        <div className="text-white text-2xl">
          Calculating your result... 🎉
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="w-screen h-screen">
      {/* Image */}
      <div className="fixed w-screen">
        <img
          src={img.src}
          alt=""
          className="sm:w-screen sm:h-screen w-screen h-screen"
        />
      </div>
      
      {/* Main content section */}
      <div className="absolute w-screen">
        <div>
          {/* Progress bar */}
          <div className="flex justify-center">
            <div
              data-aos="zoom-in"
              className="mt-4 h-4 w-96 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm"
            >
              <div
                className="h-full hover:scale-105 bg-gradient-to-r from-yellow-500 to-orange-600 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          {/* Question counter */}
          <div className="flex justify-center mt-2">
            <div className="text-black text-lg font-semibold">
              Question {currentIndex + 1} of {totalQuestions}
            </div>
          </div>
        </div>

        {/* Body Section */}
        <div className="flex justify-center items-center h-screen">
          <div className="sm:w-180 w-11/12 bg-amber-300 sm:h-auto rounded-xl opacity-65 hover:scale-105 hover:bg-amber-400 ease-out duration-700 hover:opacity-70 p-4">
            <div className="p-4">
              <h1 className="text-2xl sm:text-4xl font-semibold mb-6">
                {currentQuestion.text}
              </h1>
              
              {/* Options */}
              <div className="grid text-lg sm:text-xl font-semibold gap-4">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    className={`h-auto min-h-15 w-full flex items-center p-4 rounded-md hover:scale-105 duration-500 transition-all ${
                      selectedOption === option.id
                        ? "bg-blue-400 ring-4 ring-blue-600"
                        : "bg-amber-100 hover:bg-blue-200"
                    }`}
                  >
                    {option.text} {option.emoji}
                  </button>
                ))}
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between mt-6 gap-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  Previous
                </button>
                
                <button
                  onClick={handleNext}
                  disabled={selectedOption === null}
                  className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {currentIndex === questions.length - 1 ? "Submit" : "Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;