import { PropsWithChildren, useState } from "react";
import { createCtx } from "../utils/createCtx";
import useQueue from "../hooks/useQueue";
import { useSnackbarContext } from "./SnackbarContext";

interface PlayerContextType {
  videoId: string;
  setVideoId: (videoId: string) => void;
  playVideo: (videoId: string) => void;
  removeVideoFromQueue: (videoId: string) => void;
  moveVideoToTop: (videoId: string) => void;
  playNextVideo: () => void;
}

const [usePlayerContext, PlayerProvider] = createCtx<PlayerContextType>();

export default function PlayerContextProvider({ children }: PropsWithChildren) {
  const [videoId, setVideoId] = useState("");
  const [queue, setQueue] = useQueue();

  const { showSnackbar } = useSnackbarContext();

  function playNextVideo() {
    if (queue.length > 0) {
      const nowPlaying = queue[0];
      playVideo(nowPlaying.song.id.videoId);
      showSnackbar({ message: `Playing: ${nowPlaying.song.snippet.title} for ${nowPlaying.singer}` });
    }
  }

  function playVideo(videoId: string) {
    setVideoId(videoId);
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
        videoId,
        setVideoId,
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
