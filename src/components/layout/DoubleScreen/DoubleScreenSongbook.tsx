import { Box } from '@mui/material';
import Queue from '../../dashboard/Queue';
import Songbook from '../../dashboard/Songbook';
import AddCommentSection from '../../dashboard/AddCommentSection';
import BackButton from '../../dashboard/BackButton';

export default function DoubleScreenSongbook() {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'grid',
        gridTemplateColumns: '300px 1.3fr 1fr',
        // bgcolor: 'lightpink',
        p: '1rem',
        background: `url(/karaoke-app/src/assets/images/songbook-background.png) no-repeat center top / cover`,
        color: 'white',
        position: 'relative',
      }}
    >
      <Queue />
      <Box mt='2rem' mb='1rem'>
      <Songbook />
      </Box>
      <AddCommentSection />
      <BackButton url="/v2/sing" />
    </Box>
  );
}
