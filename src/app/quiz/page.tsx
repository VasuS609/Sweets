//this is UI page where of quiz, api/quiz  is the backend part
"use client";

import React from "react";
import img from "../../../public/quizpage.jpg";
import aos from "aos"
import {useRouter} from "next/navigation";
import { useState, useEffect } from "react";

interface Option{
text:string;
emoji:string;
tags:string;
order:number;
id:number
}

interface Question {
  id:number;
  text:string;
  order:number;
  options:Option[]
}

const QuizPage = () => {
 const router = useRouter();
 const [question, setQuestion] = useState<Question[]>([]);
 const [loading, setLoading] = useState(true);
 const [answers, setAnswers] = useState<number[]>([]);
 const [selectedOptions, setSelectedOptions] = useState<number | null>(null);
 const [currentIndex, setCurrentIndex] = useState<Question[]>([])

  const currentQuestion = 10;
  const totalQuestions = 10;
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="w-screen h-screen">
      {/*image */}
      <div className="fixed w-screen">
        <img
          src={img.src}
          alt=""
          className="sm:w-screen sm:h-screen w-screen h-screen "
        />
      </div>
      {/*main content section */}

      <div className="absolute w-screen">
        <div>
          {/*progress bar */}

          <div className="flex justify-center">
           
              <div data-aos="zoom-in" className="mt-4 h-4  w-300 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm ">
                <div
                  className=" bg-gradient-to-r from-yellow-500 to-orange-600 transition-all duration-500 ease-out rounded-full hover:scale-120 p-10 "
                  style={{ width: `${progress}%` }}
                />
              </div>

            {/* Rest of your quiz content */}
          </div>
        </div>

{/*Body Section */}
        <div className="flex justify-center items-center h-screen  ">
          <div className="sm:w-180 w-50 bg-amber-300 h-100 sm:h-105 rounded-xl opacity-65 hover:scale-105 hover:bg-amber-400 ease-out duration-700 hover:opacity-70 ">
            <div className="p-4 h-20 w-full  ">
                <h1 className="text-2xl sm:text-4xl font-semibold p-5 w-full">Question</h1> 
            <div className="grid text-lg sm:text-xl font-semibold p-2 gap-4">
              <button className="h-15 w-full   bg-amber-100 flex items-center p-4 rounded-md hover:scale-105 duration-500 hover:bg-blue-200">Option1</button>
              <button className="h-15 w-full   bg-amber-100 flex items-center p-4 rounded-md hover:scale-105 duration-500 hover:bg-blue-200">Option1</button>
              <button className="h-15 w-full   bg-amber-100 flex items-center p-4 rounded-md hover:scale-105 duration-500 hover:bg-blue-200">Option1</button>
              <button className="h-15 w-full   bg-amber-100 flex items-center p-4 rounded-md hover:scale-105 duration-500 hover:bg-blue-200">Option1</button>
            </div>
            </div>
          
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default QuizPage;
