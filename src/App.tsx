import { Box } from "@mui/material";
import "./App.css";
import Dashboard from "./components/dashboard";
import PlayerContextProvider from "./context/PlayerContext";
import Player from "./components/player";

function App() {
  return (
    <PlayerContextProvider>
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
    </PlayerContextProvider>
  );
}

export default App;
