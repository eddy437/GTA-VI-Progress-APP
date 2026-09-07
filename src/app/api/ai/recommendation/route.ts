import { NextResponse } from 'next/server';
import { aiProvider } from '@/lib/ai/provider';
import { AIRecommendationRequestSchema } from '@/lib/ai/types';
import { validateInput } from '@/lib/security/validate';
import { rateLimit } from '@/lib/security/rate-limit';
import { sanitizeObject } from '@/lib/security/sanitize';

export async function POST(request: Request) {
  try {
    // Rate limiting
    const userId = request.headers.get('x-user-id') || 'anonymous';
    if (!rateLimit(`ai-recommendation-${userId}`, 10, 60000)) {
      return NextResponse.json(
        { success: false, error: { code: 'RATE_LIMIT', message: 'Too many requests. Please try again later.' } },
        { status: 429 }
      );
    }

    const body = await request.json();
    const sanitizedBody = sanitizeObject(body);
    const validation = validateInput(AIRecommendationRequestSchema, sanitizedBody);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: validation.error } },
        { status: 400 }
      );
    }

    const recommendation = await aiProvider.getRecommendation(validation.data);

    return NextResponse.json({ success: true, data: recommendation });
  } catch (error) {
    console.error('Error getting AI recommendation:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to get recommendation' } },
      { status: 500 }
    );
  }
}