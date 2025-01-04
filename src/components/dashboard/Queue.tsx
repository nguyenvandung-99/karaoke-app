import { Box, MenuItem } from "@mui/material";
import { StyledMenu } from "../elements/Menu";
import { usePlayerContext } from "../../context/PlayerContext";
import useQueue from "../../hooks/useQueue";

export default function Queue() {
  const [queue] = useQueue();

  const { playVideo, removeVideoFromQueue, moveVideoToTop } =
    usePlayerContext();

  return (
    <Box>
      {queue.map(({ song, singer }) => (
        <StyledMenu
          key={song.id.videoId}
          menuButtonContent={
            <Box
              key={song.id.videoId}
              sx={{
                display: "grid",
                gap: "0.5rem",
                maxWidth: "100%",
                gridTemplateColumns: "100px 1fr",
                mb: "0.5rem",
              }}
            >
              <img
                src={song.snippet.thumbnails.medium.url}
                alt=""
                style={{ width: "100%" }}
              />
              <Box sx={{ fontSize: "14px", textAlign: "left" }}>
                <Box>{song.snippet.title}</Box>
                <Box sx={{ color: "text.secondary" }}>
                  performed by: {singer}
                </Box>
              </Box>
            </Box>
          }
        >
          <MenuItem onClick={() => playVideo(song.id.videoId)}>Play</MenuItem>
          <MenuItem onClick={() => removeVideoFromQueue(song.id.videoId)}>
            Remove
          </MenuItem>
          <MenuItem onClick={() => moveVideoToTop(song.id.videoId)}>
            Move to top
          </MenuItem>
        </StyledMenu>
      ))}
    </Box>
  );
}
