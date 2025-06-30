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
import DoubleScreenArchive from './components/layout/DoubleScreen/DoubleScreenArchive';
import ArchiveWorldContextProvider from './context/ArchiveWorldContext';
import DoubleScreenSing from './components/layout/DoubleScreen/DoubleScreenSing';
import useArchive from './hooks/useArchive';
import useSync from './hooks/useSync';
import data from '../outputWithViewCount.json'

function App() {
  const [googleKey] = useGoogleKey();
  const { setArchive } = useArchive();
  const { lastSync, setLastSync } = useSync();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Karaoke Party';

    if (!googleKey) {
      navigate('/login');
    }

    // sync with last used archive on 30 June 2025 00:00 GMT+1
    if (lastSync < new Date('2025-06-30T00:00:00+01:00').getTime()) {
      console.log('Syncing with last used archive');
      setArchive(data);
      setLastSync(Date.now());
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarContextProvider>
        <PlayerContextProvider>
          <ArchivedCommentContextProvider>
            <ArchiveWorldContextProvider>
              <Routes>
                <Route path="" element={'Home page'} />
                <Route path="login" element={<Login />} />
                <Route path="v1" element={<SingleScreen />} />
                <Route path="v2" element={<DoubleScreenHome />} />
                <Route path="v2/sing" element={<DoubleScreenSing />} />
                <Route path="v2/player" element={<DoubleScreenPlayer />} />
                <Route path="v2/songbook" element={<DoubleScreenSongbook />} />
                <Route path="v2/archive" element={<DoubleScreenArchive />} />
              </Routes>
            </ArchiveWorldContextProvider>
          </ArchivedCommentContextProvider>
        </PlayerContextProvider>
      </SnackbarContextProvider>
    </ThemeProvider>
  );
}

export default App;
