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
      {queue.map(({ singer, video: { thumbnail, videoId, title } }) => (
        <StyledMenu
          key={videoId}
          menuButtonContent={
            <Box
              key={videoId}
              sx={{
                display: "grid",
                gap: "0.5rem",
                maxWidth: "100%",
                gridTemplateColumns: "100px 1fr",
                mb: "0.5rem",
              }}
            >
              <img
                src={thumbnail}
                alt=""
                style={{ width: "100%" }}
              />
              <Box sx={{ fontSize: "14px", textAlign: "left" }}>
                <Box>{title}</Box>
                <Box sx={{ color: "text.secondary" }}>
                  Song for: {singer}
                </Box>
              </Box>
            </Box>
          }
        >
          <MenuItem onClick={() => playVideo(videoId)}>Play</MenuItem>
          <MenuItem onClick={() => removeVideoFromQueue(videoId)}>
            Remove
          </MenuItem>
          <MenuItem onClick={() => moveVideoToTop(videoId)}>
            Move to top
          </MenuItem>
        </StyledMenu>
      ))}
    </Box>
  );
}
