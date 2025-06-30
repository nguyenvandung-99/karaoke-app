import { Box, TextField } from '@mui/material';
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
          mx: '7rem',
          mt: '43rem',
        }}
      >
        <TextField
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
          multiline
          rows={4}
          sx={{
            textarea: {
              color: 'white',
              fontFamily: 'PixelifySans',
              fontSize: '2rem',
              lineHeight: 1.5,
            },
          }}
        />
        <Box display="flex" justifyContent="flex-end">
          <Box
            sx={{
              background:
                'url(/karaoke-app/src/assets/images/portal-button.png) no-repeat center center / cover',
              width: '13rem',
              height: '5rem',
            }}
            onClick={onSendToPortal}
          />
        </Box>
      </Box>
    )
  );
}
