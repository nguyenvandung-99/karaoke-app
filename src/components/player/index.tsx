import Youtube from "react-youtube";
import { usePlayerContext } from "../../context/PlayerContext";

export default function Player() {
  const { videoId, playNextVideo } = usePlayerContext();

  return videoId && (
    <Youtube
      videoId={videoId}
      opts={{
        height: "100%",
        width: "100%",
        playerVars: {
          autoplay: 1,
        },
      }}
      onEnd={playNextVideo}
    />
  )
}