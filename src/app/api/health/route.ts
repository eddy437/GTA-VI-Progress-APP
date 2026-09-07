import { NextResponse } from 'next/server';
import { DEMO_MODE } from '@/lib/constants';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      status: 'healthy',
      demo_mode: DEMO_MODE,
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    },
  });
}