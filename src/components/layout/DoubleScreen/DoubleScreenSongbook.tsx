import { Box } from '@mui/material';
import Queue from '../../dashboard/Queue';
import Songbook from '../../dashboard/Songbook';
import AddCommentSection from '../../dashboard/AddCommentSection';

export default function DoubleScreenSongbook() {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'grid',
        gridTemplateColumns: '300px 3fr 2fr',
        bgcolor: 'lightpink',
        p: '1rem',
      }}
    >
      <Box>
        <Box>Queue</Box>
        <Queue />
      </Box>
      <Songbook />
      <AddCommentSection />
    </Box>
  );
}
