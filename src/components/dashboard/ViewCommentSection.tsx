import { useEffect, useRef, useState } from 'react';
import { usePlayerContext } from '../../context/PlayerContext';
import { useArchivedCommentContext } from '../../context/ArchivedCommentContext';
import { Comment } from '../../types/SongData';
import { Box, Paper, Slide } from '@mui/material';
import usePrevious from '../../hooks/usePrevious';

const SYNC_INTERVAL = 1000;

type TimedComment = Comment & { shownAt: number };

export default function ViewCommentSection() {
  const { currentTimestamp } = usePlayerContext();
  const { archivedItem, currentArchiveId } = useArchivedCommentContext();
  const previousArchiveId = usePrevious(currentArchiveId);

  const [visibleComments, setVisibleComments] = useState<TimedComment[]>([]);
  const shownCommentIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    const newComments =
      archivedItem?.comments.filter(
        (comment) =>
          comment.timestamp <= currentTimestamp &&
          !shownCommentIds.current.has(comment.uuid)
      ) || [];

    if (newComments.length > 0) {
      newComments.forEach((comment) => {
        shownCommentIds.current.add(comment.uuid);
      });
      const newVisibleComments = newComments.map((comment) => ({
        ...comment,
        shownAt: currentTimestamp,
      }));
      setVisibleComments((prev) => [...prev, ...newVisibleComments]);
    }
  }, [currentTimestamp, archivedItem]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleComments((prev) =>
        prev.filter(
          (comment) => currentTimestamp - comment.shownAt < SYNC_INTERVAL * 5 // Show for 5 seconds
        )
      );
    }, SYNC_INTERVAL);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (currentArchiveId !== previousArchiveId) {
      // Reset shown comments when archive changes
      shownCommentIds.current.clear();
      setVisibleComments([]);
    }
  }, [currentArchiveId, previousArchiveId]);

  return (
    <Box
      sx={{
        mx: '2rem',
        my: '1rem',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {visibleComments.map((comment) => (
        <Slide
          key={comment.uuid}
          direction="left"
          in={true}
          timeout={{ enter: 500, exit: 500 }}
          mountOnEnter
          unmountOnExit
        >
          <Paper elevation={2} sx={{ textAlign: 'left', padding: '0.5rem' }}>
            <strong>{formatTimestamp(comment.timestamp)}</strong>
            &nbsp;
            <span>{comment.comment}</span>
          </Paper>
        </Slide>
      ))}
    </Box>
  );
}

// a new function that calculate mm:ss from timestamp in seconds
function formatTimestamp(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
}
