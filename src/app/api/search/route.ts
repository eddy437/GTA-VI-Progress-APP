import { NextResponse } from 'next/server';
import { gameDataProvider } from '@/lib/game-data';
import { SearchQuerySchema } from '@/lib/validations';
import { validateInput } from '@/lib/security/validate';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const types = searchParams.get('types')?.split(',') || [];

    const validation = validateInput(SearchQuerySchema, {
      query,
      types: types.length > 0 ? types : undefined,
    });

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: validation.error } },
        { status: 400 }
      );
    }

    const searchQuery = validation.data.query.toLowerCase();
    const results = [];

    // Search missions
    if (!types.length || types.includes('mission')) {
      const missions = await gameDataProvider.getMissions();
      const missionResults = missions
        .filter(
          (m) =>
            m.title.toLowerCase().includes(searchQuery) ||
            m.description.toLowerCase().includes(searchQuery)
        )
        .slice(0, 5)
        .map((m) => ({
          id: m.id,
          title: m.title,
          type: 'mission',
          description: m.description,
          href: `/missions/${m.id}`,
        }));
      results.push(...missionResults);
    }

    // Search collectibles
    if (!types.length || types.includes('collectible')) {
      const collectibles = await gameDataProvider.getCollectibles();
      const collectibleResults = collectibles
        .filter(
          (c) =>
            c.name.toLowerCase().includes(searchQuery) ||
            c.description.toLowerCase().includes(searchQuery)
        )
        .slice(0, 5)
        .map((c) => ({
          id: c.id,
          title: c.name,
          type: 'collectible',
          description: c.description,
          href: `/collectibles`,
        }));
      results.push(...collectibleResults);
    }

    // Search vehicles
    if (!types.length || types.includes('vehicle')) {
      const vehicles = await gameDataProvider.getVehicles();
      const vehicleResults = vehicles
        .filter((v) => v.name.toLowerCase().includes(searchQuery))
        .slice(0, 5)
        .map((v) => ({
          id: v.id,
          title: v.name,
          type: 'vehicle',
          description: v.category,
          href: `/vehicles`,
        }));
      results.push(...vehicleResults);
    }

    // Search businesses
    if (!types.length || types.includes('business')) {
      const businesses = await gameDataProvider.getBusinesses();
      const businessResults = businesses
        .filter(
          (b) =>
            b.name.toLowerCase().includes(searchQuery) ||
            b.location.toLowerCase().includes(searchQuery)
        )
        .slice(0, 5)
        .map((b) => ({
          id: b.id,
          title: b.name,
          type: 'business',
          description: b.type,
          href: `/businesses`,
        }));
      results.push(...businessResults);
    }

    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.error('Error searching:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Search failed' } },
      { status: 500 }
    );
  }
}