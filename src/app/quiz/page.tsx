"use client";

import React from "react";
import img from "../../../public/quizpage.jpg";
import aos from "aos";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Option {
  text: string;
  emoji: string;
  tags: string;
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
      const response = await fetch("/api/quiz");

      if (!response.ok) throw new Error("Error to fetch question");

      const data = await response.json();

      if (!data.ok) throw new Error("Unauthenticated");

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

  const handleNext = () => {
    if (selectedOption !== null) {
      // Save the answer
      setAnswers([...answers, selectedOption]);
      
      // Move to next question or submit
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
      } else {
        // Quiz completed - navigate to results or submit
        console.log("Quiz completed with answers:", [...answers, selectedOption]);
        // router.push('/results'); // Uncomment when you have a results page
      }
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      // Optionally restore the previous answer
      setSelectedOption(answers[currentIndex - 1] || null);
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

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100; // Fixed: Proper progress calculation

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
                className="h-full bg-gradient-to-r from-yellow-500 to-orange-600 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          {/* Question counter */}
          <div className="flex justify-center mt-2">
            <div className="text-white text-lg font-semibold">
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