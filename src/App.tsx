import { Box } from "@mui/material";
import "./App.css";
import Dashboard from "./components/dashboard";
import PlayerContextProvider from "./context/PlayerContext";
import Player from "./components/player";
import useGoogleKey from "./hooks/useGoogleKey";
import Login from "./components/login";
import SnackbarContextProvider from "./context/SnackbarContext";

function App() {
  const [googleKey] = useGoogleKey();
  return (
    <PlayerContextProvider>
      <SnackbarContextProvider>
        {!googleKey ? <Login /> :
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
        }
      </SnackbarContextProvider>
    </PlayerContextProvider>
  );
}

export default App;
