import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Cache questions for 1 hour
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour
const cache = new Map<string, { data: any; timestamp: number }>();

// Return all quiz questions with their options
export async function GET() {
  try {
    // Check cache first
    const cacheKey = 'quiz-questions';
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return NextResponse.json(cached.data, {
        headers: {
          'Cache-Control': 'public, max-age=3600, s-maxage=3600',
          'X-Cache': 'HIT'
        }
      });
    }

    const questions = await prisma.question.findMany({
      orderBy: { order: 'asc' },
      include: {
        options: { 
          orderBy: { order: 'asc' },
          select: {
            id: true,
            text: true,
            emoji: true,
            tags: true,
            order: true
          }
        },
      }
    });

    const responseData = { success: true, questions };

    // Cache the result
    cache.set(cacheKey, {
      data: responseData,
      timestamp: Date.now()
    });

    return NextResponse.json(responseData, {
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'X-Cache': 'MISS'
      }
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch questions',
        message: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : 'Something went wrong'
      },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-cache'
        }
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { selectedOptions } = await request.json();

    // Validate input
    if (!selectedOptions || !Array.isArray(selectedOptions) || selectedOptions.length === 0) {
      return NextResponse.json(
        { error: 'Invalid quiz data - no options selected' },
        { status: 400 }
      );
    }

    // Validate option IDs are numbers
    const validOptions = selectedOptions.filter(id => typeof id === 'number' && id > 0);
    if (validOptions.length !== selectedOptions.length) {
      return NextResponse.json(
        { error: 'Invalid option IDs' },
        { status: 400 }
      );
    }

    // Fetch all selected options with their tags
    const options = await prisma.option.findMany({
      where: {
        id: { in: validOptions }
      },
      select: {
        id: true,
        tags: true
      }
    });

    if (options.length !== validOptions.length) {
      return NextResponse.json(
        { error: 'Some selected options are invalid' },
        { status: 400 }
      );
    }

    // Calculate tag scores
    const tagScores: Record<string, number> = {};
    options.forEach(option => {
      const tags = option.tags as string[];
      tags?.forEach(tag => {
        tagScores[tag] = (tagScores[tag] || 0) + 1;
      });
    });

    // Get all sweets with only necessary fields
    const sweets = await prisma.sweet.findMany({
      select: {
        id: true,
        name: true,
        emoji: true,
        description: true,
        tagline: true,
        funFact: true,
        imageUrl: true,
        calories: true,
        protein: true,
        carbs: true,
        fat: true,
        fiber: true,
        sugar: true,
        tags: true
      }
    });

    if (sweets.length === 0) {
      return NextResponse.json(
        { error: 'No sweets found in database. Please contact support.' },
        { status: 500 }
      );
    }

    // Find the sweet with the most matching tags
    let bestSweet = sweets[0];
    let highestScore = -1;

    sweets.forEach(sweet => {
      let score = 0;
      const sweetTags = sweet.tags as string[];
      sweetTags?.forEach(tag => {
        score += tagScores[tag] || 0;
      });

      if (score > highestScore) {
        highestScore = score;
        bestSweet = sweet;
      }
    });

    // Save quiz result
    const quizResult = await prisma.quizResult.create({
      data: {
        selectedOptions: validOptions,
        tagScores: tagScores,
        recommendedSweet: bestSweet.name
      }
    });

    return NextResponse.json({
      success: true,
      id: quizResult.id,
      sweet: bestSweet,
      tagScores
    }, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });

  } catch (error) {
    console.error('Submit error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to submit quiz',
        message: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : 'Something went wrong'
      },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-cache'
        }
      }
    );
  }
}