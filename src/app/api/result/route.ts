import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Fetch the quiz result by ID
    const quizResult = await prisma.quizResult.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!quizResult) {
      return NextResponse.json(
        { success: false, error: "Quiz result not found" },
        { status: 404 }
      );
    }

    // Fetch the recommended sweet details
    const sweet = await prisma.sweet.findUnique({
      where: {
        name: quizResult.recommendedSweet,
      },
    });

    if (!sweet) {
      return NextResponse.json(
        { success: false, error: "Sweet not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      result: {
        id: quizResult.id,
        tagScores: quizResult.tagScores,
        sweet: sweet,
      },
    });
  } catch (e) {
    console.error("Error fetching result:", e);
    return NextResponse.json(
      { success: false, error: "Failed to fetch result" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}