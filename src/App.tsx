import { ThemeProvider } from '@mui/material';
import './App.css';
import PlayerContextProvider from './context/PlayerContext';
import useGoogleKey from './hooks/useGoogleKey';
import Login from './components/login';
import SnackbarContextProvider from './context/SnackbarContext';
import { useEffect } from 'react';
import { theme } from './theme';
import { Route, Routes, useNavigate } from 'react-router';
import SingleScreen from './components/layout/SingleScreen';
import DoubleScreenPlayer from './components/layout/DoubleScreen/DoubleScreenPlayer';
import DoubleScreenHome from './components/layout/DoubleScreen/DoubleScreenHome';
import DoubleScreenSongbook from './components/layout/DoubleScreen/DoubleScreenSongbook';
import ArchivedCommentContextProvider from './context/ArchivedCommentContext';

function App() {
  const [googleKey] = useGoogleKey();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Karaoke Party';

    if (!googleKey) {
      navigate('/login');
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarContextProvider>
        <PlayerContextProvider>
          <ArchivedCommentContextProvider>
            <Routes>
              <Route path="" element={'Home page'} />
              <Route path="login" element={<Login />} />
              <Route path="v1" element={<SingleScreen />} />
              <Route path="v2" element={<DoubleScreenHome />} />
              <Route path="v2/player" element={<DoubleScreenPlayer />} />
              <Route path="v2/songbook" element={<DoubleScreenSongbook />} />
            </Routes>
          </ArchivedCommentContextProvider>
        </PlayerContextProvider>
      </SnackbarContextProvider>
    </ThemeProvider>
  );
}

export default App;
