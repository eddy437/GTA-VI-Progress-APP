import { NextResponse } from 'next/server';
import { gameDataProvider } from '@/lib/game-data';
import { DEMO_MODE } from '@/lib/constants';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    let exportData: any = {};

    if (DEMO_MODE) {
      // Export mock data
      const [player, progress, missions, collectibles, vehicles, businesses] =
        await Promise.all([
          gameDataProvider.getPlayer(),
          gameDataProvider.getProgress(),
          gameDataProvider.getMissions(),
          gameDataProvider.getCollectibles(),
          gameDataProvider.getVehicles(),
          gameDataProvider.getBusinesses(),
        ]);

      exportData = {
        profile: player,
        progress,
        missions: missions.filter((m) => m.is_completed),
        collectibles: collectibles.filter((c) => c.is_found),
        vehicles: vehicles.filter((v) => v.is_owned),
        businesses,
        exported_at: new Date().toISOString(),
        version: '1.0.0',
        demo_mode: true,
      };
    } else {
      // Export production data
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

      // Fetch user data from all tables
      const [
        profile,
        missionProgress,
        collectibleProgress,
        challengeProgress,
        playerAchievements,
        playerVehicles,
        playerBusinesses,
        reminders,
        activities,
        settings,
      ] = await Promise.all([
        client.from('profiles').select('*').eq('id', user.id).single(),
        client.from('mission_progress').select('*').eq('user_id', user.id),
        client.from('collectible_progress').select('*').eq('user_id', user.id),
        client.from('challenge_progress').select('*').eq('user_id', user.id),
        client.from('player_achievements').select('*').eq('user_id', user.id),
        client.from('player_vehicles').select('*').eq('user_id', user.id),
        client.from('player_businesses').select('*').eq('user_id', user.id),
        client.from('reminders').select('*').eq('user_id', user.id),
        client.from('activities').select('*').eq('user_id', user.id),
        client.from('user_settings').select('*').eq('user_id', user.id).single(),
      ]);

      exportData = {
        profile: profile.data,
        mission_progress: missionProgress.data,
        collectible_progress: collectibleProgress.data,
        challenge_progress: challengeProgress.data,
        player_achievements: playerAchievements.data,
        player_vehicles: playerVehicles.data,
        player_businesses: playerBusinesses.data,
        reminders: reminders.data,
        activities: activities.data,
        settings: settings.data,
        exported_at: new Date().toISOString(),
        version: '1.0.0',
      };
    }

    // Convert to JSON and create downloadable response
    const jsonData = JSON.stringify(exportData, null, 2);
    const fileName = `vicecompanion-export-${new Date().toISOString().split('T')[0]}.json`;

    return new NextResponse(jsonData, {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error('Error exporting data:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Export failed' } },
      { status: 500 }
    );
  }
}