import { Autocomplete, Box, debounce, TextField } from '@mui/material';
import { SpotifyApi, Track } from '@spotify/web-api-ts-sdk';
import { useEffect, useMemo, useState } from 'react';
import { useSnackbarContext } from '../../context/SnackbarContext';

interface SearchSpotifyProps {
  onSelectTrack: (selected: Track | null) => void;
  selectedTrack: Track | null;
}

export default function SearchSpotify({
  onSelectTrack,
  selectedTrack,
}: SearchSpotifyProps) {
  const clientId = 'abe1246f5c464865af56bc94dd6e5f53';
  const clientSecret = 'e25d8abf044c40369c35751588027f68';

  const { showSnackbar } = useSnackbarContext();

  const sdk = useMemo(
    () => SpotifyApi.withClientCredentials(clientId, clientSecret),
    [clientId, clientSecret]
  );

  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<(Track | null)[]>([]);

  const querySearch = useMemo(
    () =>
      debounce(async (input: string) => {
        try {
          const res = await sdk.search(input, ['track'], undefined, 10);
          setSearchResults(res.tracks.items);
        } catch (error) {
          console.error('Error searching Spotify:', error);
          showSnackbar({
            message:
              'An error happened. Please open console to see more details.',
          });
        }
      }, 1000),
    []
  );

  useEffect(() => {
    if (searchValue) {
      querySearch(searchValue);
    }
  }, [searchValue]);

  return (
    <Box sx={{ width: '100%' }}>
      <Autocomplete
        disablePortal
        options={searchResults}
        getOptionLabel={(option) =>
          option
            ? `${option.name} - ${option.artists
                .map((artist) => artist.name)
                .join(', ')}`
            : ''
        }
        value={selectedTrack}
        renderInput={(params) => <TextField {...params} />}
        onChange={(_, option) => onSelectTrack(option)}
        filterOptions={(options) => {
          const result = [...options];
          result.push(null as unknown as Track);
          return result;
        }}
        onInputChange={(_, value) => setSearchValue(value)}
        fullWidth
        renderOption={(props, option) =>
          option ? (
            <li
              {...props}
              key={option.id}
              style={{
                display: 'grid',
                gap: '8px',
                maxWidth: '100%',
                gridTemplateColumns: '60px 1fr',
                padding: '0.5rem',
              }}
            >
              <img
                src={option.album.images[0]?.url}
                alt=""
                style={{ width: '100%' }}
              />
              <Box sx={{ fontSize: '14px', textAlign: 'left' }}>
                <Box sx={{ fontWeight: 600 }}>{option.name}</Box>
                <Box>
                  {option.artists.map((artist) => artist.name).join(', ')}
                </Box>
              </Box>
            </li>
          ) : (
            <li
              {...props}
              key="no-selection"
              style={{ padding: '0.5rem' }}
              onClick={() => onSelectTrack(null)}
            >
              <Box sx={{ fontSize: '14px', textAlign: 'left' }}>
                Can't find the song? Click here to search on Youtube
              </Box>
            </li>
          )
        }
      />
    </Box>
  );
}
