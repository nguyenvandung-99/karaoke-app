import { Box } from '@mui/material';
import Player from '../../player';
import ViewCommentSection from '../../dashboard/ViewCommentSection';

export default function DoubleScreenPlayer() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
      }}
    >
      <Player />
      <ViewCommentSection />
    </Box>
  );
}
