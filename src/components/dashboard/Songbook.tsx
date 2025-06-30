import { Box } from '@mui/material';
import SearchSpotify from './SearchSpotify';
import { useState } from 'react';
import { Track } from '@spotify/web-api-ts-sdk';
import SelectYoutubeVideoModal from './SelectYoutubeVideoModal';
import useQueue from '../../hooks/useQueue';
import { SearchYoutubeResult } from '../../types/SearchResult';
import useArchive from '../../hooks/useArchive';
import { ArchivedSongData, VideoInfo } from '../../types/SongData';
import { useSnackbarContext } from '../../context/SnackbarContext';

export default function Songbook() {
  const [isVideoSelectionModalOpen, setIsVideoSelectionModalOpen] =
    useState(false);

  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  function onSelectTrack(track: Track | null) {
    setSelectedTrack(track);
    setIsVideoSelectionModalOpen(true);
  }

  const { addToArchive, archive } = useArchive();
  const [queue, setQueue] = useQueue();

  const { showSnackbar } = useSnackbarContext();

  const addToQueue = ({ video, name }: { video: VideoInfo; name: string }) => {
    if (queue.some((item) => item.video.videoId === video.videoId)) {
      showSnackbar({
        message: `Video "${video.title}" is already in the queue.`,
      });
      return;
    }

    setQueue([
      ...queue,
      {
        singer: name,
        video,
      },
    ]);
  };

  function onSelectVideo(selection: {
    selected: SearchYoutubeResult | null;
    name?: string;
  }) {
    if (!selection.selected) return;
    addToQueue({
      video: {
        videoId: selection.selected.id.videoId,
        title: selection.selected.snippet.title,
        thumbnail: selection.selected.snippet.thumbnails.default.url,
      },
      name: selection.name || '',
    });
    setSelectedTrack(null);
    const isItemInArchive = (item: ArchivedSongData) => {
      return (
        item.spotifyId === selectedTrack?.id ||
        item.videos.some(
          (video) => video.videoId === selection.selected?.id.videoId
        )
      );
    };
    const matchedArchiveItem = archive.find(isItemInArchive);

    if (!matchedArchiveItem) {
      const uuid = crypto.randomUUID();

      const newArchivedItem: ArchivedSongData = {
        videos: [
          {
            videoId: selection.selected.id.videoId,
            thumbnail: selection.selected.snippet.thumbnails.default.url,
            title: selection.selected.snippet.title,
          },
        ],
        spotifyId: selectedTrack?.id || '',
        comments: [],
        uuid,
        trackName: selectedTrack?.name || '',
        artistName: selectedTrack?.artists.map((artist) => artist.name).join(', ') || '',
        geniusInfo: {
          geniusId: undefined,
          geniusUrl: null,
          geniusTags: null,
        },
        youtubeInfo: {
          earliestUploadDate: selection.selected.snippet.publishedAt,
          latestUploadDate: selection.selected.snippet.publishedAt,
          viewCount: +selection.selected.statistics?.viewCount || 0,
        },
      };
      addToArchive(newArchivedItem);
    } else {
      const isVideoInArchive = matchedArchiveItem.videos.some(
        (video) => video.videoId === selection.selected?.id.videoId
      );
      if (!isVideoInArchive) {
        const updatedVideos = [
          ...matchedArchiveItem.videos,
          {
            videoId: selection.selected.id.videoId,
            thumbnail: selection.selected.snippet.thumbnails.default.url,
            title: selection.selected.snippet.title,
          },
        ];
        const updatedArchivedItem: ArchivedSongData = {
          ...matchedArchiveItem,
          videos: updatedVideos,
        };
        addToArchive(updatedArchivedItem);
      }
    }
  }

  return (
    <Box
      sx={{
        ml: '6rem',
        mr: '2rem',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 3rem)',
      }}
    >
      <Box
        sx={{ display: 'flex', alignItems: 'center', gap: '1rem', mt: '11.5rem' }}
      >
        <SearchSpotify
          selectedTrack={selectedTrack}
          onSelectTrack={onSelectTrack}
        />
      </Box>
      <Box
        sx={{
          // bgcolor: '#FFD0DB',
          p: '1rem',
          mt: '1rem',
        overflowY: 'scroll',
mb: '6rem',
          flexGrow: 1,
        }}
      >
        {archive.map((item) => (
          <Box
            key={item.uuid}
            sx={{
              padding: '8px',
              borderBottom: '1px solid #ccc',
              '&:hover': {
                backgroundColor: '#ffe0e6',
                cursor: 'pointer',
              },
            }}
            onClick={() => {
              addToQueue({
                video: item.videos[0],
                name: '',
              });
            }}
          >
            <Box sx={{ fontWeight: 'bold' }}>
              {item.videos[0]?.title || 'No Title'}
            </Box>
          </Box>
        ))}
      </Box>
      <SelectYoutubeVideoModal
        onSelectVideo={onSelectVideo}
        isModalOpen={isVideoSelectionModalOpen}
        onToggleModal={setIsVideoSelectionModalOpen}
        selectedTrack={selectedTrack}
      />
    </Box>
  );
}
