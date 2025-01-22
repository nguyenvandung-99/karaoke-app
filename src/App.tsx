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

function App() {
  useEffect(() => {
    document.title = "Karaoke Party";
  });

  const [googleKey] = useGoogleKey();
  return (
    <ThemeProvider theme={theme}>
      <SnackbarContextProvider>
        <PlayerContextProvider>
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
              <Dashboard />
              <Player />
            </Box>
          )}
        </PlayerContextProvider>
      </SnackbarContextProvider>
    </ThemeProvider>
  );
}

export default App;
