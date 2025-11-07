import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Cache results for 5 minutes
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const cache = new Map<string, { data: unknown; timestamp: number }>();

export async function GET(
  request: Request,
  context: any
) {
  try {
    // Await params before accessing properties
    const params = await context.params;
    
    let idStr: string | undefined;
    if (params && typeof params.id === 'string') {
      idStr = params.id;
    } else {
      try {
        const pathname = new URL(request.url).pathname;
        const parts = pathname.split('/').filter(Boolean);
        idStr = parts.length ? parts[parts.length - 1] : undefined;
      } catch {
        idStr = undefined;
      }
    }

    const resultId = Number.parseInt(idStr ?? '');

    // Validate result ID
    if (isNaN(resultId) || resultId <= 0) {
      return NextResponse.json(
        { error: 'Invalid result ID' },
        { status: 400 }
      );
    }

    // Check cache first
    const cacheKey = `result-${resultId}`;
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return NextResponse.json(cached.data, {
        headers: {
          'Cache-Control': 'public, max-age=300, s-maxage=300',
          'X-Cache': 'HIT'
        }
      });
    }

    // Fetch the quiz result with error handling
    const quizResult = await prisma.quizResult.findUnique({
      where: { id: resultId },
      select: {
        id: true,
        recommendedSweet: true,
        tagScores: true,
        createdAt: true
      }
    });

    if (!quizResult) {
      return NextResponse.json(
        { error: 'Result not found' },
        { 
          status: 404,
          headers: {
            'Cache-Control': 'no-cache'
          }
        }
      );
    }

    // Fetch the sweet details
    const sweet = await prisma.sweet.findUnique({
      where: { name: quizResult.recommendedSweet },
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
        sugar: true
      }
    });

    if (!sweet) {
      return NextResponse.json(
        { error: 'Sweet not found' },
        { 
          status: 404,
          headers: {
            'Cache-Control': 'no-cache'
          }
        }
      );
    }

    const responseData = {
      success: true,
      result: {
        id: quizResult.id,
        sweet: sweet,
        tagScores: quizResult.tagScores,
        createdAt: quizResult.createdAt
      }
    };

    // Cache the result
    cache.set(cacheKey, {
      data: responseData,
      timestamp: Date.now()
    });

    return NextResponse.json(responseData, {
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=300',
        'X-Cache': 'MISS'
      }
    });

  } catch (error) {
    console.error('Error fetching result:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
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