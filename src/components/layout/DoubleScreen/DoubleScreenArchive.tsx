import { Box } from '@mui/material';
import NavigationDeck from './Archive/NavigationDeck';

import DisplayWorld from './Archive/DisplayWorld';
import { useArchiveWorldContext } from '../../../context/ArchiveWorldContext';
import BackButton from '../../dashboard/BackButton';

const defaultBackground =
  '/karaoke-app/src/assets/images/explore-background.png';

export default function DoubleScreenArchive() {
  const { selectedWorld } = useArchiveWorldContext();

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        background: `url(${
          selectedWorld?.background || defaultBackground
        }) no-repeat center bottom / cover`,
        display: 'grid',
        gridTemplateRows: '1fr 21rem',
        fontFamily: 'PixelifySans',
        color: 'white',
        textAlign: 'left',
        position: 'relative',
      }}
    >
      <DisplayWorld />
      <NavigationDeck />
      <BackButton url="/v2" />
    </Box>
  );
}
