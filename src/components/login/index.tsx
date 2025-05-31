import { Box, TextField } from '@mui/material';
import { useState } from 'react';
import useGoogleKey from '../../hooks/useGoogleKey';
import { useNavigate } from 'react-router';

export default function Login() {
  const [localKey, setLocalKey] = useState('');
  const [_, setGoogleKey] = useGoogleKey();

  const navigate = useNavigate();

  function onSubmit() {
    setGoogleKey(localKey);
    navigate('/');
  }

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: theme.palette.secondary.main,
      })}
    >
      <form onSubmit={onSubmit}>
        <TextField
          label="Enter key"
          value={localKey}
          onChange={(e) => setLocalKey(e.target.value)}
          color="primary"
        />
      </form>
    </Box>
  );
}
