import { NextResponse } from 'next/server';
import { gameDataProvider } from '@/lib/game-data';
import { DEMO_MODE } from '@/lib/constants';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    if (DEMO_MODE) {
      const progress = await gameDataProvider.getProgress();
      return NextResponse.json({ success: true, data: progress });
    }

    const client = await createClient();
    if (!client) {
      return NextResponse.json(
        { success: false, error: { code: 'AUTH_ERROR', message: 'Authentication required' } },
        { status: 401 }
      );
    }

    const {
      data: { user },
    } = await client.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: 'AUTH_ERROR', message: 'Authentication required' } },
        { status: 401 }
      );
    }

    // Fetch progress from database
    const { data, error } = await client
      .from('mission_progress')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch progress' } },
      { status: 500 }
    );
  }
}