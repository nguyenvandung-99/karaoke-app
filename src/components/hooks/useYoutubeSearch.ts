import { debounce } from '@mui/material';
import axios from 'axios';
import { SearchYoutubeResult } from '../../types/SearchResult';
import useGoogleKey from '../../hooks/useGoogleKey';
import { useEffect, useMemo, useState } from 'react';
import { htmlToText } from 'html-to-text';
import { useSnackbarContext } from '../../context/SnackbarContext';

const searchURL = 'https://www.googleapis.com/youtube/v3/search';
const infoURL = 'https://www.googleapis.com/youtube/v3/videos';

export function useYoutubeSearch(searchValue: string, action?: JSX.Element) {
  const [googleKey] = useGoogleKey();
  const [searchResults, setSearchResults] = useState<SearchYoutubeResult[]>([]);
  const { showSnackbar } = useSnackbarContext();
  const [isLoading, setIsLoading] = useState(false);

  const querySearch = useMemo(
    () =>
      debounce(async (input: string) => {
        setIsLoading(true);
        try {
          const res = await axios.get<{ items: SearchYoutubeResult[] }>(
            searchURL,
            {
              params: {
                part: 'snippet',
                type: 'video',
                q: `Karaoke ${input}`,
                key: googleKey,
                maxResults: 10,
              },
            }
          );

          const embeddableResults = await axios.get<{
            items: SearchYoutubeResult[];
          }>(infoURL, {
            params: {
              part: 'status',
              id: res.data.items.map((item) => item.id.videoId).join(','),
              key: googleKey,
            },
          });

          setSearchResults(
            res.data.items
              .filter(
                (_, i) => embeddableResults.data.items[i].status.embeddable
              )
              .map((item) => ({
                ...item,
                snippet: {
                  ...item.snippet,
                  title: htmlToText(item.snippet.title),
                },
              }))
          );
        } catch (error) {
          console.error('error:', error);
          showSnackbar({
            message:
              'An error happened. Please enter a new key or try again later.',
            action,
          });
        } finally {
          setIsLoading(false);
        }
      }, 1000),
    []
  );

  useEffect(() => {
    if (searchValue) {
      querySearch(searchValue);
    }
  }, [searchValue]);

  return {
    searchResults,
    isLoading,
  };
}
