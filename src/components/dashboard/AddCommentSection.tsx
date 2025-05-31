import { Box, Button, TextField } from '@mui/material';
import { usePlayerContext } from '../../context/PlayerContext';
import { useState } from 'react';
import { useArchivedCommentContext } from '../../context/ArchivedCommentContext';

export default function AddCommentSection() {
  const { nowPlaying } = usePlayerContext();
  const [comment, setComment] = useState('');
  const { addComment } = useArchivedCommentContext();

  function onSendToPortal() {
    addComment(comment);
    setComment('');
  }

  return (
    nowPlaying && (
      <Box
        sx={{
          height: '100vh',
          mx: '2rem',
        }}
      >
        <Box>Now playing: {nowPlaying.song.snippet.title}</Box>
        <img
          src={nowPlaying.song.snippet.thumbnails.medium.url}
          alt=""
          style={{ width: '100%' }}
        />
        <Box sx={{ mt: '2rem', fontSize: '1.5rem'}}> If this song resonates, where are you transported to?</Box>
        <TextField
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
          multiline
          rows={4}
          placeholder="a feeling, a memory, a possibility, a world?"
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="contained" onClick={onSendToPortal}>
            Send to portal
          </Button>
        </Box>
      </Box>
    )
  );
}
