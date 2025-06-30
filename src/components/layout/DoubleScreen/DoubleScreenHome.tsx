import { Box } from '@mui/material';
import {
  CenterFlexBox,
  CenterFlexBoxWithBackground,
} from '../../shared/CenterFlexBox';
import { Link } from 'react-router';

const HEIGHT = '70%';

export default function DoubleScreenHome() {
  return (
    <CenterFlexBoxWithBackground sx={{ height: '100vh' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          height: '24rem',
          width: '36rem',
          justifyContent: 'center',
        }}
      >
        <Link to="/v2/sing">
          <CenterFlexBox
            sx={{
              p: '2rem',
              bgcolor: 'pink',
              height: HEIGHT,
              background:
                'url(/karaoke-app/src/assets/images/sing-button.svg) no-repeat center center / cover',
              ':hover': {
                background:
                  'url(/karaoke-app/src/assets/images/sing-button-hover.svg) no-repeat center center / cover',
              },
            }}
          ></CenterFlexBox>
        </Link>
        <Link to="/v2/archive">
          <CenterFlexBox
            sx={{
              p: '2rem',
              bgcolor: 'lightgreen',
              height: HEIGHT,
              background:
                'url(/karaoke-app/src/assets/images/explore-button.svg) no-repeat center center / cover',
              ':hover': {
                background:
                  'url(/karaoke-app/src/assets/images/explore-button-hover.svg) no-repeat center center / cover',
              },
            }}
          >
          </CenterFlexBox>
        </Link>
      </Box>
    </CenterFlexBoxWithBackground>
  );
}
