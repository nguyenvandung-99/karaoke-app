import { Autocomplete, Box, debounce, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { SearchResult } from "../../types/SearchResult";
import { htmlToText } from "html-to-text";
import useGoogleKey from "../../hooks/useGoogleKey";
import { useSnackbarContext } from "../../context/SnackbarContext";

const searchURL = "https://www.googleapis.com/youtube/v3/search";
const infoURL = "https://www.googleapis.com/youtube/v3/videos";

interface SearchProps {
  selected: SearchResult | null;
  onSelect: (selected: SearchResult | null) => void;
}

export default function Search({ onSelect, selected }: SearchProps) {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [googleKey] = useGoogleKey();
  const { showSnackbar } = useSnackbarContext();

  const querySearch = useMemo(
    () =>
      debounce(async (input) => {
        try {
          const res = await axios.get<{ items: SearchResult[] }>(searchURL, {
            params: {
              part: "snippet",
              type: "video",
              q: `Karaoke ${input}`,
              key: googleKey,
              maxResults: 10,
            },
          });

          const embeddableResults = await axios.get<{ items: SearchResult[] }>(infoURL, {
            params: {
              part: "status",
              id: res.data.items.map((item) => item.id.videoId).join(","),
              key: googleKey,
            }
          })

          setSearchResults(
            res.data.items.filter((_, i) => embeddableResults.data.items[i].status.embeddable).map((item) => ({
              ...item,
              snippet: {
                ...item.snippet,
                title: htmlToText(item.snippet.title),
              },
            }))
          );
        } catch (error) {
          console.error("error:", error);
          showSnackbar();
        }
      }, 1000),
    []
  );

  useEffect(() => {
    if (searchValue && searchValue !== selected?.snippet.title) {
      querySearch(searchValue);
    }
  }, [searchValue]);

  return (
    <Box>
      <Autocomplete
        disablePortal
        getOptionLabel={(option) => option.snippet.title}
        renderInput={(params) => <TextField {...params} />}
        value={selected}
        options={searchResults}
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
              display: "grid",
              gap: "8px",
              maxWidth: "100%",
              gridTemplateColumns: "100px 1fr",
            }}
          >
            <img
              src={option.snippet.thumbnails.medium.url}
              alt=""
              style={{ width: "100%" }}
            />
            <Box sx={{ fontSize: "14px", textAlign: "left" }}>
              {option.snippet.title}
            </Box>
          </li>
        )}
      />
    </Box>
  );
}
