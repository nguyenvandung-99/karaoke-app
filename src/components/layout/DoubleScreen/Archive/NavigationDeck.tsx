import { Box, styled } from '@mui/material';
import { useArchiveWorldContext } from '../../../../context/ArchiveWorldContext';
import { presetWorlds } from './presetWorlds';
import { MANUAL_SETTINGS } from '../../../../utils/constants';

export default function NavigationDeck() {
  const { selectedWorld, setSelectedWorld } = useArchiveWorldContext();

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        // backgroundImage: `url(/karaoke-app/src/assets/images/nav-deck.svg)`,
        // backgroundSize: 'cover',
        // backgroundPositionY: '100%',
      }}
    >
      <Box
        sx={{
          mx: '6%',
          my: '5.5rem',
          height: '-webkit-fill-available',
          display: 'grid',
          gridTemplateColumns: '14fr 5fr 40fr 10fr 31fr',
        }}
      >
        <Box sx={{ pt: '3rem', pl: '2rem' }}>
          {presetWorlds.map((world) => (
            <Box
              key={world.uuid}
              onClick={() => setSelectedWorld(world)}
              sx={{
                fontSize: '1.6rem',
                position: 'relative',
              }}
            >
              {selectedWorld.uuid === world.uuid && (
                <Box position="absolute" left="-1.2rem">
                  &gt;
                </Box>
              )}
              <Box
                sx={{
                  textShadow:
                    selectedWorld.uuid === world.uuid
                      ? '0 0 20px deeppink'
                      : 'none',
                  cursor: 'pointer',
                }}
              >
                {world.name}
              </Box>
            </Box>
          ))}
        </Box>
        <Box></Box>
        <Box fontSize="1.6rem" color="white">
          {selectedWorld?.description}
        </Box>
        <Box></Box>
        <Box
          sx={{
            display: 'grid',
            mt: '3rem',
          }}
        >
          {MANUAL_SETTINGS.map(setting => (
            <GridBox key={setting.name}>
              <Box>{setting.name}</Box>
              <Box display="flex">
                <Box sx={{ width: '4rem' }}>{setting.leftText}</Box>
                <Box sx={{ ml: '0.5rem', mr: '2rem' }}>/</Box>
                <Box sx={{ width: '4rem' }}>{setting.rightText}</Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <Box sx={{
                  background: 'url(/karaoke-app/src/assets/images/slider.svg) no-repeat center center / cover',
                }}>

                </Box>
              </Box>
            </GridBox>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

const GridBox = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  fontSize: '1.6rem',
}));
