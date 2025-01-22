import Youtube from "react-youtube";
import { usePlayerContext } from "../../context/PlayerContext";
import { Box } from "@mui/material";

export default function Player() {
  const { videoId, playNextVideo } = usePlayerContext();

  return videoId ? (
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
  ) : (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
      }}
    >
      Developed by @DaniBaddie
    </Box>
  );
}
