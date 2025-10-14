"use client"
import React, { useEffect, useState } from "react";
import { Bungee_Spice } from "next/font/google";
import img from "../assets/barfi.png"
import { PrismaClient } from "@/generated/prisma";
import aos from "aos";

const bungeeSpice = Bungee_Spice({
  weight: "400",
  subsets: ["latin"],
});

export default function SweetCard(){
  const [sweetName, setSweetName] = useState<string[]>([]);
  const [tagline, setTagline] = useState <string[]>([]);
  const [emoji, setEmoji] = useState <string[]>([])
  const [description, setDescription] = useState<string[]>([])
  const [loading, setLoading] =useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(()=>{
    aos.init({
      duration:1000,
      once:true
    });

    fetchData();
  }, [])

  const fetchData = async()=>{
    try{
      const response = await fetch("/api/result");
      if(!response.ok) throw new Error("unable to fetch Result")

        const data = await response.json();

        if(!data.ok) throw new Error("Unauthenticated");

        setSweetName( data.name);
        setTagline( data.tagline);
        setEmoji (data.emoji);
        setDescription (data.description);
        }catch(e){
           setError(e instanceof Error ? e.message : "Something went wrong");
           setLoading(false);
        }
  }

  return (
    <div>

      {/*Pop */}
      <div className={bungeeSpice.className}>
        <div className="text-6xl text-white font-bold p-3 bg-black/20 rounded-lg flex justify-center">
          Here's Your Result
        </div>
      </div>

      {}

      {/*Result */}
      <div className="flex justify-center pt-10">
        <div className="w-200 h-100 bg-black text-white p-4 pt-7 rounded-3xl flex flex-col items-center">
          <h1 className="text-xl">
            You Are ... <span className={`${bungeeSpice.className} text-3xl`}>{data.name}! {data.emoji}</span>
          </h1>
          <img src={img.src} alt="" className="rounded-full w-50 h-50"/>
          <h5>{data.tagline}</h5>
          <h5>{data.description}</h5>
        </div>
      </div>

      {/*Fun fact */}
      <div>
     <h1>{data.funFact}</h1>
     <p>fact Lorem ipsum dolor sit amet consectetur adipisicing.</p>
      </div>
{/*Nutrition Chart */}
      <div>
        <h1> Nutrition Facts (Per Peice)</h1>
        

      </div>
    </div>
  );
};
