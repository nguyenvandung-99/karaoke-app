import { Box } from '@mui/material';
import {
  CenterFlexBox,
  CenterFlexBoxWithBackground,
} from '../../shared/CenterFlexBox';
import { Link } from 'react-router';
import BackButton from '../../dashboard/BackButton';

const HEIGHT = '70%';

export default function DoubleScreenSing() {
  return (
    <CenterFlexBoxWithBackground sx={{ height: '100vh', position: 'relative' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          height: '24rem',
          width: '36rem',
          justifyContent: 'center',
          fontSize: '2rem',
        }}
      >
        <Link to="/v2/player">
          <CenterFlexBox
            sx={{
              p: '2rem',
              height: HEIGHT,
              color: 'white',
            }}
          >
            Player
          </CenterFlexBox>
        </Link>
        <Link to="/v2/songbook">
          <CenterFlexBox sx={{ p: '2rem', height: HEIGHT, color: 'white' }}>
            Songbook
          </CenterFlexBox>
        </Link>
      </Box>
      <BackButton url="/v2" />
    </CenterFlexBoxWithBackground>
  );
}
