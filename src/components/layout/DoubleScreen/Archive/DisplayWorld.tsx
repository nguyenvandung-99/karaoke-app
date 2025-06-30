import data from '../../../../../outputWithViewCount.json';
import { useEffect, useMemo, useRef, useState } from 'react';
import { calculateNormalizedScore } from '../../../../utils/scoring';
import { useArchiveWorldContext } from '../../../../context/ArchiveWorldContext';
import { Box } from '@mui/material';
import { ArchivedSongDataWithNormalizedScore } from '../../../../types/SongData';
console.log('data:', data.length)

export default function DisplayWorld() {
  const { selectedWorld } = useArchiveWorldContext();
  const [selectedSong, setSelectedSong] =
    useState<ArchivedSongDataWithNormalizedScore | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver(([entry]) => {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      });
      resizeObserver.observe(containerRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  const center = {
    x: dimensions.width / 2,
    y: dimensions.height / 2,
  };

  // Random angles per render (fixed across renders)
  const [angles] = useState(() => data.map(() => Math.random() * 2 * Math.PI));

  const dataWithScores = useMemo(
    () => calculateNormalizedScore(data, selectedWorld.scorings),
    [selectedWorld]
  );

  const positioned = dataWithScores.map((song, i) => {
    const angle = angles[i];
    const x =
      center.x + center.x * Math.cos(angle) * (1 - song.normalizedScore);
    const y =
      center.y + center.y * Math.sin(angle) * (1 - song.normalizedScore);
    return { ...song, x, y };
  });

  const handleSelectSong = (song: ArchivedSongDataWithNormalizedScore) => {
    if (song.uuid === selectedSong?.uuid) {
      setSelectedSong(null);
    } else {
      setSelectedSong(song);
    }
  };

  const zIndexes = useMemo(() => {
    return positioned.map((song) => Math.floor(Math.random() * song.score));
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {positioned.map((song, i) => (
        <Box
          key={song.uuid}
          sx={{
            position: 'absolute',
            left: song.x,
            top: song.y,
            transform: 'translate(-50%, -50%)',
            boxShadow: selectedSong === song ? '0 0 20px rgba(255, 255, 255, 0.8)' : 'none',
            lineHeight: 0,
            ':hover': {
              cursor: 'pointer',
              boxShadow: selectedSong === song ? '0 0 20px rgba(255, 255, 255, 0.8)' : '0 0 10px rgba(255, 255, 255, 1)',
            },
            zIndex: zIndexes[i], // Random z-index for overlap
          }}
          onClick={() => handleSelectSong(song)}
        >
          <img
            src={song.videos[0].thumbnail}
            alt={song.videos[0].title}
            style={{ width: `${100 * song.normalizedScore}px` }}
          />
        </Box>
      ))}
      {selectedSong && (
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            color: 'white',
            borderRadius: '8px',
            background: `url(/karaoke-app/src/assets/images/thumbnail-popup.png) no-repeat center center / cover`,
            width: '300px',
            height: '140px',
            fontFamily: 'PixelifySans',
          }}
        >
          <Box sx={{ p: '16px 32px', height: 'calc(100% - 32px)', textAlign: 'left', overflowY: 'auto' }}>
            <Box sx={{ fontWeight: 900, px: '16px' }}>
              {selectedSong.artistName} - {selectedSong.trackName}
            </Box>
            {selectedSong.comments.map((comment) => (
              <Box>"{comment.comment}"</Box>
            ))}
          </Box>
        </Box>
      )}
    </div>
  );
}
