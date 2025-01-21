import { Box, ThemeProvider } from "@mui/material";
import "./App.css";
import Dashboard from "./components/dashboard";
import PlayerContextProvider from "./context/PlayerContext";
import Player from "./components/player";
import useGoogleKey from "./hooks/useGoogleKey";
import Login from "./components/login";
import SnackbarContextProvider from "./context/SnackbarContext";
import { useEffect } from "react";
import { theme } from "./theme";
import background from "./assets/KTV_search_queue.png";

function App() {
  useEffect(() => {
    document.title = "Karaoke Party";
  });

  const [googleKey] = useGoogleKey();
  return (
    <ThemeProvider theme={theme}>
      <PlayerContextProvider>
        <SnackbarContextProvider>
          {!googleKey ? (
            <Login />
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "100vh",
                display: "grid",
                gridTemplateColumns: "300px 1fr",
              }}
            >
              <Box
                sx={{
                  backgroundImage: `url(${background})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  maxHeight: "100vh",
                }}
              >
                <Dashboard />
              </Box>
              <Player />
            </Box>
          )}
        </SnackbarContextProvider>
      </PlayerContextProvider>
    </ThemeProvider>
  );
}

export default App;
