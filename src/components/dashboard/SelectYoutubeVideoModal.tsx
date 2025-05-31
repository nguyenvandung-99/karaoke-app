import { Box, Button, Dialog, TextField } from '@mui/material';
import { SearchYoutubeResult } from '../../types/SearchResult';
import { Track } from '@spotify/web-api-ts-sdk';
import { useEffect, useState } from 'react';
import { useYoutubeSearch } from '../hooks/useYoutubeSearch';

interface Selection {
  selected: SearchYoutubeResult | null;
  name: string;
}

interface SelectYoutubeVideoModalProps {
  selectedTrack: Track | null;
  onSelectVideo: (selection: Selection) => void;
  isModalOpen: boolean;
  onToggleModal: (value: boolean) => void;
}

export default function SelectYoutubeVideoModal({
  onSelectVideo,
  isModalOpen,
  onToggleModal,
  selectedTrack,
}: SelectYoutubeVideoModalProps) {
  const [searchValue, setSearchValue] = useState('');
  const { searchResults, isLoading } = useYoutubeSearch(searchValue);
  const [selected, setSelected] = useState<SearchYoutubeResult | null>(null);

  const [singerName, setSingerName] = useState('');

  function resetModal() {
    setSearchValue('');
    setSelected(null);
    setSingerName('');
  }

  useEffect(() => {
    if (selectedTrack) {
      setSearchValue(
        `${selectedTrack.name} - ${selectedTrack.artists
          .map((artist) => artist.name)
          .join(' ')}`
      );
    }
  }, [selectedTrack]);

  function onAddToQueue() {
    if (!selected) return;
    onSelectVideo({
      selected,
      name: singerName,
    });
    onToggleModal(false);
    resetModal();
  }

  return (
    <Dialog
      open={isModalOpen}
      onClose={() => onToggleModal(false)}
      maxWidth="lg"
      sx={{
        '.MuiPaper-root': {
          overflowX: 'hidden',
        },
      }}
    >
      <Box sx={{ width: '600px', height: '640px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: '1rem',
            pb: '0.5rem',
            mb: '1rem',
            gap: '0.5rem',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            backgroundColor: 'white',
          }}
        >
          <Box>Song</Box>
          <TextField
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            fullWidth
            size="small"
          />
        </Box>
        <Box>
          {isLoading && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                my: '1rem',
              }}
            >
              Loading...
            </Box>
          )}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              mb: '1rem',
              mx: '1rem',
            }}
          >
            {searchResults.map((option) => (
              <Box
                key={option.id.videoId}
                sx={{
                  border: '1px solid #ccc',
                  padding: '8px',
                  cursor: 'pointer',
                  ...(selected === option
                    ? {
                        backgroundColor: '#e0e0e0',
                      }
                    : {
                        '&:hover': {
                          backgroundColor: '#f0f0f0',
                        },
                      }),
                }}
                onClick={() => setSelected(option)}
              >
                <img
                  src={option.snippet.thumbnails.medium.url}
                  alt=""
                  style={{ width: '100%' }}
                />
                <Box sx={{ fontSize: '14px', textAlign: 'left' }}>
                  {option.snippet.title}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        {selected && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '1rem',
              position: 'sticky',
              bottom: 0,
              p: '1rem',
              bgcolor: 'white',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '1rem',
                alignItems: 'center',
                flexGrow: 1,
              }}
            >
              <Box sx={{ minWidth: 'fit-content' }}>Your name</Box>
              <TextField
                value={singerName}
                onChange={(e) => setSingerName(e.target.value)}
                fullWidth
                size="small"
                autoComplete="off"
              />
            </Box>
            <Button variant="contained" onClick={onAddToQueue}>
              Add To Queue
            </Button>
          </Box>
        )}
      </Box>
    </Dialog>
  );
}
