"use client"
import React from "react";
import { Bungee_Spice } from "next/font/google";
import img from "../assets/barfi.png"
import { PrismaClient } from "@/generated/prisma";

const bungeeSpice = Bungee_Spice({
  weight: "400",
  subsets: ["latin"],
});

const SweetCard = () => {
  const prisma = new PrismaClient();

  return (
    <div>

      {/*Pop */}
      <div className={bungeeSpice.className}>
        <div className="text-6xl text-white font-bold p-3 bg-black/20 rounded-lg flex justify-center">
          Here's Your Result
        </div>
      </div>

      {/*Result */}
      <div className="flex justify-center pt-10">
        <div className="w-200 h-100 bg-black text-white p-4 pt-7 rounded-3xl flex flex-col items-center">
          <h1 className="text-xl">
            You Are ... <span className={`${bungeeSpice.className} text-3xl`}>Sweet! emoji</span>
          </h1>
          <img src={img.src} alt="" className="rounded-full w-50 h-50"/>
          <h5>tagline Lorem ipsum dolor sit amet.</h5>
          <h5>Description Lorem ipsum dolor sit.</h5>
        </div>
      </div>

      {/*Fun fact */}
      <div>
     <h1>Fun Fact</h1>
     <p>fact Lorem ipsum dolor sit amet consectetur adipisicing.</p>
      </div>
{/*Nutrition Chart */}
      <div>
        <h1> Nutrition Facts (Per Peice)</h1>
        

      </div>
    </div>
  );
};

export default SweetCard;