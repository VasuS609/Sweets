import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req:NextRequest, res:NextResponse){ //POST --> posting data
try{
  const {selectedOption} = await req.json();

  //1. now fetching all the options which are selected by the users with their tags

  const options = await prisma.option.findMany({
    where:{
      id:{
        in:selectedOption  //now got option
      }
    },
    select:{
      id:true,
      tags:true
    }
  });

  //2.will calculate tags score

  const tagScores :Record <string, number> = {} //to create empty object of tagscore or storring tags 

  options.forEach(option=>{
    option.tags.forEach(tag =>{
      tagScores[tag] = (tagScores[tag] || 0) +1;
    })
  })

  //now coming to sweet part we have completed options and tags part

  //3.get all sweets with tags

  const sweets = await prisma.sweet.findMany();

  //now time to find sweets with most matching tags

  //4.finding sweets with most matching tags
  let bestSweet = sweets[0]; //shich suits user
  let highestScore = 0; //bid on sweet

  sweets.forEach(sweet=>{
    let score = 0;
    sweet.tags.forEach(tag=>{
      score += tagScores[tag] || 0;
    });

    if(score > highestScore){
      highestScore = score;
      bestSweet = sweet;
    }
  })

  //5. save quiz result
  const quizResult =await prisma.quizResult.create({
   data: {
        userName: null,  // No username collected
        selectedOptions: selectedOption,
        tagScores: tagScores,
        recommendedSweet: bestSweet.name
      }
  });

  return NextResponse.json({
    success:true,
    id:quizResult.id,
    sweet:bestSweet,
    tagScores:tagScores
  })

}catch(e){
 console.error('Error submitting quiz:', e);
    return NextResponse.json(
      { error: 'Failed to submit quiz' },
      { status: 500 }
    );
} finally {
    await prisma.$disconnect();
  }
}