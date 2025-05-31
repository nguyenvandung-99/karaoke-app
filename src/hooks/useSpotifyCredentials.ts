import { useSyncedLocalStorage } from './useSyncedLocalStorage';

interface SpotifyCredentials {
  clientId: string;
  clientSecret: string;
}

export default function useSpotifyCredentials() {
  const [spotifyCredentials, setSpotifyCredentials] =
    useSyncedLocalStorage<SpotifyCredentials>('SPOTIFY_CREDENTIALS', {
      clientId: '',
      clientSecret: '',
    });
  
  return {
    spotifyCredentials,
    setSpotifyCredentials,
  }
}
