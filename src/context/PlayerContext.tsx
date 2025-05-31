import { PropsWithChildren, useEffect, useState } from 'react';
import { createCtx } from '../utils/createCtx';
import useQueue from '../hooks/useQueue';
import { useSnackbarContext } from './SnackbarContext';
import { QueueSongData } from '../types/SongData';
import { YouTubePlayer } from 'react-youtube';
import { useSyncedLocalStorage } from '../hooks/useSyncedLocalStorage';

interface PlayerContextType {
  videoId: string;
  player: YouTubePlayer | null;
  setPlayer: (player: YouTubePlayer | null) => void;
  nowPlaying: QueueSongData | null;
  currentTimestamp: number;
  playVideo: (videoId: string) => void;
  removeVideoFromQueue: (videoId: string) => void;
  moveVideoToTop: (videoId: string) => void;
  playNextVideo: () => void;
}
const SYNC_INTERVAL = 1000;

const [usePlayerContext, PlayerProvider] = createCtx<PlayerContextType>();

export default function PlayerContextProvider({ children }: PropsWithChildren) {
  const [nowPlaying, setNowPlaying] =
    useSyncedLocalStorage<QueueSongData | null>('nowPlaying', null);
  const videoId = nowPlaying?.song.id.videoId || '';

  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [currentTimestamp, setCurrentTimestamp] = useSyncedLocalStorage<number>('currentTimestamp', 0);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (player) {
        const currentTime = await player.getCurrentTime();
        setCurrentTimestamp(currentTime);
      }
    }, SYNC_INTERVAL);

    return () => clearInterval(interval);
  }, [player]);

  const [queue, setQueue] = useQueue();

  const { showSnackbar } = useSnackbarContext();

  function playNextVideo() {
    if (queue.length > 0) {
      const nowPlaying = queue[0];
      playVideo(nowPlaying.song.id.videoId);
      showSnackbar({
        message: `Playing: ${nowPlaying.song.snippet.title} for ${nowPlaying.singer}`,
      });
    }
  }

  function playVideo(videoId: string) {
    setNowPlaying(
      queue.find((item) => item.song.id.videoId === videoId) || null
    );
    removeVideoFromQueue(videoId);
  }

  function removeVideoFromQueue(videoId: string) {
    setQueue(queue.filter((item) => item.song.id.videoId !== videoId));
  }

  function moveVideoToTop(videoId: string) {
    const index = queue.findIndex((item) => item.song.id.videoId === videoId);
    const item = queue[index];
    const newQueue = queue.filter((item) => item.song.id.videoId !== videoId);
    newQueue.unshift(item);
    setQueue(newQueue);
  }

  return (
    <PlayerProvider
      value={{
        nowPlaying,
        player,
        setPlayer,
        currentTimestamp,
        videoId,
        playVideo,
        removeVideoFromQueue,
        moveVideoToTop,
        playNextVideo,
      }}
    >
      {children}
    </PlayerProvider>
  );
}

export { usePlayerContext };
