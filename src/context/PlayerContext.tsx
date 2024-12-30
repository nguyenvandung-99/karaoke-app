import { PropsWithChildren, useState } from "react";
import { createCtx } from "../utils/createCtx";
import { useLocalStorage } from "usehooks-ts";
import { SongData } from "../types/SongData";

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
  const [queue, setQueue] = useLocalStorage<SongData[]>("queue", []);

  function playNextVideo() {
    if (queue.length > 0) {
      playVideo(queue[0].song.id.videoId);
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
