import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  IconButton,
  SnackbarCloseReason,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { SearchYoutubeResult } from '../../types/SearchResult';
import { useSnackbarContext } from '../../context/SnackbarContext';
import CloseIcon from '@mui/icons-material/Close';
import Login from '../login';
import { useYoutubeSearch } from '../hooks/useYoutubeSearch';

interface SearchYoutubeProps {
  selected: SearchYoutubeResult | null;
  onSelect: (selected: SearchYoutubeResult | null) => void;
}

export default function SearchYoutube({
  onSelect,
  selected,
}: SearchYoutubeProps) {
  const [searchValue, setSearchValue] = useState('');
  const { setIsOpenSnackbar } = useSnackbarContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
    setIsOpenSnackbar(false);
  };
  const handleClose = (
    _: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpenSnackbar(false);
  };
  const action = (
    <>
      <Button color="primary" size="small" onClick={openModal}>
        Enter new key
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  const { searchResults } = useYoutubeSearch(searchValue, action);

  return (
    <>
      <Box>
        <Autocomplete
          disablePortal
          getOptionLabel={(option) => option.snippet.title}
          options={searchResults}
          renderInput={(params) => <TextField {...params} />}
          value={selected}
          onChange={(_, option) => {
            onSelect(option);
          }}
          filterOptions={(x) => x}
          onInputChange={(_, newSearchValue) => {
            setSearchValue(newSearchValue);
          }}
          fullWidth
          renderOption={(props, option) => (
            <li
              {...props}
              key={option.id.videoId}
              style={{
                display: 'grid',
                gap: '8px',
                maxWidth: '100%',
                gridTemplateColumns: '100px 1fr',
              }}
            >
              <img
                src={option.snippet.thumbnails.medium.url}
                alt=""
                style={{ width: '100%' }}
              />
              <Box sx={{ fontSize: '14px', textAlign: 'left' }}>
                {option.snippet.title}
              </Box>
            </li>
          )}
        />
      </Box>
      <Dialog
        maxWidth="xs"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sx={{
          '.MuiBox-root': {
            backgroundColor: 'secondary.main',
          },
        }}
      >
        <Box sx={{ p: 4 }}>
          <Login />
        </Box>
      </Dialog>
    </>
  );
}
