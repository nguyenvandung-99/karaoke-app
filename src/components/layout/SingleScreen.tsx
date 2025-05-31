import { Box } from '@mui/material';
import Dashboard from '../dashboard';
import Player from '../player';

export default function SingleScreen() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
      }}
    >
      <Dashboard />
      <Player />
    </Box>
  );
}
