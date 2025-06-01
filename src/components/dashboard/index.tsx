import { Box, Button, ButtonProps, styled } from '@mui/material';
import { PropsWithChildren, useState } from 'react';
import Queue from './Queue';
import SearchYoutube from './SearchYoutube';
import { SearchYoutubeResult } from '../../types/SearchResult';
import SelectModal from './SelectModal';
import useQueue from '../../hooks/useQueue';
import background from '../../assets/KTV_search_queue.png';

type TabValue = 'queue' | 'search';

export default function Dashboard() {
  const [tabValue, setTabValue] = useState<TabValue>('queue');
  const [selected, setSelected] = useState<SearchYoutubeResult | null>(null);
  const onSelect = (selected: SearchYoutubeResult | null) => {
    setSelected(selected);
  };

  const [value, setValue] = useQueue();

  function addToQueue(name: string) {
    if (!selected) return;
    setValue([
      ...value,
      {
        singer: name,
        video: {
          videoId: selected.id.videoId,
          title: selected.snippet.title,
          thumbnail: selected.snippet.thumbnails.default.url,
        }
      },
    ]);
    setSelected(null);
  }

  return (
    <Box
      sx={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        maxHeight: '100vh',
      }}
    >
      {selected && <SelectModal selected={selected} addToQueue={addToQueue} />}
      <Box
        sx={{
          width: '100%',
          display: selected ? 'none' : 'block',
          overflowY: 'auto',
          height: '100vh',
        }}
      >
        <Box
          sx={{
            borderColor: 'divider',
            position: 'sticky',
            top: 0,
            zIndex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
          }}
        >
          <StyledButton
            onClick={() => setTabValue('queue')}
            color={tabValue === 'queue' ? 'primary' : 'secondary'}
            sx={{ m: 1 }}
          >
            Queue
          </StyledButton>
          <StyledButton
            onClick={() => setTabValue('search')}
            color={tabValue === 'search' ? 'primary' : 'secondary'}
          >
            Search
          </StyledButton>
        </Box>
        <TabPanel value={tabValue} index={'queue'}>
          <Queue />
        </TabPanel>
        <TabPanel value={tabValue} index={'search'}>
          <SearchYoutube onSelect={onSelect} selected={selected} />
        </TabPanel>
      </Box>
    </Box>
  );
}

function TabPanel(
  props: PropsWithChildren<{ value: TabValue; index: TabValue }>
) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      sx={{ display: value === index ? 'block' : 'none' }}
      {...other}
    >
      {value === index && <Box sx={{ px: 0.5, py: 3 }}>{children}</Box>}
    </Box>
  );
}

const StyledButton = styled((props: ButtonProps) => (
  <Button variant="contained" {...props} />
))(() => ({
  margin: 8,
  padding: '0 16px',
  borderRadius: '18px',
  fontWeight: 'bold',
  color: 'white',
  fontSize: '20px',
  fontFamily: 'Freude',
}));
