import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

async function getAccessToken() {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token || '',
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to refresh token: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function GET() {
  if (!client_id || !client_secret || !refresh_token) {
    return NextResponse.json({
      isConfigured: false,
      error: 'Spotify environment variables are not configured.',
    });
  }

  try {
    const { access_token } = await getAccessToken();

    if (!access_token) {
      throw new Error('Access token was not returned in the refresh response.');
    }

    // 1. Fetch currently playing
    const nowPlayingResponse = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: 'no-store',
    });

    if (nowPlayingResponse.status === 200) {
      const song = await nowPlayingResponse.json();
      
      if (song && song.item) {
        const isPlaying = song.is_playing || false;
        const title = song.item.name || 'Unknown Track';
        const artist = song.item.artists?.map((_artist: any) => _artist.name).join(', ') || 'Unknown Artist';
        const albumArt = song.item.album?.images?.[0]?.url || null;
        const songUrl = song.item.external_urls?.spotify || null;

        return NextResponse.json({
          isPlaying,
          title,
          artist,
          albumArt,
          songUrl,
        });
      }
    }

    // 2. Fetch recently played if not currently playing
    const recentlyPlayedResponse = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: 'no-store',
    });

    if (recentlyPlayedResponse.status === 200) {
      const recent = await recentlyPlayedResponse.json();
      
      if (recent && recent.items && recent.items.length > 0) {
        const item = recent.items[0];
        const track = item.track;
        if (track) {
          const title = track.name || 'Unknown Track';
          const artist = track.artists?.map((_artist: any) => _artist.name).join(', ') || 'Unknown Artist';
          const albumArt = track.album?.images?.[0]?.url || null;
          const songUrl = track.external_urls?.spotify || null;
          const lastPlayedAt = item.played_at || null;

          return NextResponse.json({
            isPlaying: false,
            title,
            artist,
            albumArt,
            songUrl,
            lastPlayedAt,
          });
        }
      }
    }

    return NextResponse.json({
      isPlaying: false,
      title: 'Offline',
      artist: 'Not listening right now',
      albumArt: null,
      songUrl: 'https://open.spotify.com',
    });
  } catch (error: any) {
    console.error('Spotify API fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from Spotify API.' },
      { status: 500 }
    );
  }
}
