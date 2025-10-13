//main quiz section which will get question from neondb using prisma
import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient;

export async function GET(){ //GET --> getting data
  try{
    //fetch all question with their options in specified order;
    const questions = await prisma.question.findMany({
      orderBy: {order:'asc'},
      include:{
        options:{
          orderBy: {order:'asc'}
        }
      }
    });


    return NextResponse.json({
      success:true,
      questions
    });
  }catch(e){
    console.log("error while fetching the questions: ", e);
    return NextResponse.json({
      success:false,
      error:"failed to fetch the questions"
    },
  {status:500}
);
}

finally{
  await prisma.$disconnect()


}
}