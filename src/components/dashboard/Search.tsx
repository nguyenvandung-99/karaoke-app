import {
  Autocomplete,
  Box,
  Button,
  debounce,
  Dialog,
  IconButton,
  SnackbarCloseReason,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { SearchResult } from "../../types/SearchResult";
import { htmlToText } from "html-to-text";
import useGoogleKey from "../../hooks/useGoogleKey";
import { useSnackbarContext } from "../../context/SnackbarContext";
import CloseIcon from "@mui/icons-material/Close";
import Login from "../login";

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
  const { showSnackbar, setIsOpenSnackbar } = useSnackbarContext();

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

          const embeddableResults = await axios.get<{ items: SearchResult[] }>(
            infoURL,
            {
              params: {
                part: "status",
                id: res.data.items.map((item) => item.id.videoId).join(","),
                key: googleKey,
              },
            }
          );

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
          console.error("error:", error);
          showSnackbar({
            message:
              "An error happened. Please enter a new key or try again later.",
            action,
          });
        }
      }, 1000),
    []
  );

  useEffect(() => {
    if (searchValue && searchValue !== selected?.snippet.title) {
      querySearch(searchValue);
    }
  }, [searchValue]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
    setIsOpenSnackbar(false);
  };
  const handleClose = (
    _: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
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

  return (
    <>
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
      <Dialog
        maxWidth="xs"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sx={{'.MuiBox-root': {
          backgroundColor: 'secondary.main'
        }}}
      >
        <Box sx={{ p: 4 }}>
          <Login />
        </Box>
      </Dialog>
    </>
  );
}
