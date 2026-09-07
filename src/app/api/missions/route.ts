import { NextResponse } from 'next/server';
import { gameDataProvider } from '@/lib/game-data';
import { DEMO_MODE } from '@/lib/constants';
import { MissionSchema } from '@/types';
import { validateInput } from '@/lib/security/validate';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let missions = await gameDataProvider.getMissions();

    // Apply filters
    if (category && category !== 'all') {
      missions = missions.filter((m) => m.category === category);
    }

    if (status === 'completed') {
      missions = missions.filter((m) => m.is_completed);
    } else if (status === 'incomplete') {
      missions = missions.filter((m) => !m.is_completed);
    }

    if (search) {
      const query = search.toLowerCase();
      missions = missions.filter(
        (m) =>
          m.title.toLowerCase().includes(query) ||
          m.description.toLowerCase().includes(query)
      );
    }

    return NextResponse.json({ success: true, data: missions });
  } catch (error) {
    console.error('Error fetching missions:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch missions' } },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateInput(MissionSchema, body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: validation.error } },
        { status: 400 }
      );
    }

    // In demo mode, just return the validated data
    if (DEMO_MODE) {
      return NextResponse.json({ success: true, data: validation.data });
    }

    // Save to database
    const client = await createClient();
    if (!client) {
      return NextResponse.json(
        { success: false, error: { code: 'AUTH_ERROR', message: 'Authentication required' } },
        { status: 401 }
      );
    }

    const { data, error } = await client
      .from('missions')
      .insert(validation.data)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error creating mission:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to create mission' } },
      { status: 500 }
    );
  }
}