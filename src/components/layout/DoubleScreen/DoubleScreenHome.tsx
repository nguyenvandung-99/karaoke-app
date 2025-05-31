import { Box } from '@mui/material';
import { CenterFlexBox } from '../../shared/CenterFlexBox';
import { Link } from 'react-router';

export default function DoubleScreenHome() {
  return (
    <CenterFlexBox sx={{ height: '100vh' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          height: '8rem',
          width: '36rem',
        }}
      >
        <Link to="/v2/player">
          <CenterFlexBox
            sx={{ p: '2rem', bgcolor: 'pink', height: '100%' }}
          >
            Player
          </CenterFlexBox>
        </Link>
        <Link to="/v2/songbook">
          <CenterFlexBox
            sx={{ p: '2rem', bgcolor: 'lightblue', height: '100%' }}
          >
            Songbook
          </CenterFlexBox>
        </Link>
      </Box>
    </CenterFlexBox>
  );
}
