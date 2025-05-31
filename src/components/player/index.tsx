import Youtube, { YouTubeEvent } from 'react-youtube';
import { usePlayerContext } from '../../context/PlayerContext';
import { Box } from '@mui/material';

export default function Player() {
  const { videoId, playNextVideo, setPlayer } = usePlayerContext();

  function onReady(event: YouTubeEvent<'onReady'>) {
    setPlayer(event.target);
    event.target.playVideo();
  }

  return videoId ? (
    <Youtube
      videoId={videoId}
      opts={{
        height: '100%',
        width: '100%',
        playerVars: {
          autoplay: 1,
        },
      }}
      onEnd={playNextVideo}
      onReady={onReady}
    />
  ) : (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'end',
      }}
    >
      Developed by @DaniBaddie
    </Box>
  );
}
