import { Box, Button, TextField } from "@mui/material";
import { SearchResult } from "../../types/SearchResult";
import { useState } from "react";

interface SelectModalProps {
  selected: SearchResult;
  addToQueue: (name: string) => void;
}

export default function SelectModal({
  selected,
  addToQueue,
}: SelectModalProps) {
  const [name, setName] = useState("");

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "grid",
          gap: "8px",
          maxWidth: "100%",
          mb: "1rem",
        }}
      >
        <img
          src={selected.snippet.thumbnails.medium.url}
          alt=""
          style={{ width: "100%" }}
        />
        <Box sx={{ fontSize: "1.25rem", textAlign: "center" }}>
          {selected.snippet.title}
        </Box>
      </Box>
      <Box sx={{ mb: "1rem" }}>
        <form onSubmit={() => addToQueue(name)}>
          <TextField
            label="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </form>
      </Box>
      <Button variant="contained" onClick={() => addToQueue(name)}>
        Add to Queue
      </Button>
    </Box>
  );
}
