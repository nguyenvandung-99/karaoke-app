import { Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import useGoogleKey from '../../hooks/useGoogleKey';
import { useNavigate } from 'react-router';
import useSpotifyCredentials from '../../hooks/useSpotifyCredentials';

export default function Login() {
  const [localGoogleKey, setLocalGoogleKey] = useState('');
  const [localSpotifyClientId, setLocalSpotifyClientId] = useState('');
  const [localSpotifyClientSecret, setLocalSpotifyClientSecret] = useState('');
  const [googleKey, setGoogleKey] = useGoogleKey();
  const { spotifyCredentials, setSpotifyCredentials } = useSpotifyCredentials();

  const navigate = useNavigate();

  function onSubmit() {
    setGoogleKey(localGoogleKey);
    setSpotifyCredentials({
      clientId: localSpotifyClientId || spotifyCredentials.clientId,
      clientSecret: localSpotifyClientSecret || spotifyCredentials.clientSecret,
    });
    navigate('/');
  }

  useEffect(() => {
    setLocalGoogleKey(googleKey);
    setLocalSpotifyClientId(spotifyCredentials.clientId);
    setLocalSpotifyClientSecret(spotifyCredentials.clientSecret);
  }, []);

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: theme.palette.secondary.main,
      })}
    >
      <form
        onSubmit={onSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '300px',
          padding: '1rem',
        }}
      >
        <TextField
          label="Enter Google key"
          value={localGoogleKey}
          onChange={(e) => setLocalGoogleKey(e.target.value)}
          color="primary"
        />
        <TextField
          label="Spotify Client ID"
          value={localSpotifyClientId}
          onChange={(e) => setLocalSpotifyClientId(e.target.value)}
          color="primary"
        />
        <TextField
          label="Spotify Client Secret"
          value={localSpotifyClientSecret}
          onChange={(e) => setLocalSpotifyClientSecret(e.target.value)}
          color="primary"
        />
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
    </Box>
  );
}
