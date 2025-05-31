import { Box } from '@mui/material';
import SearchSpotify from './SearchSpotify';
import { useState } from 'react';
import { Track } from '@spotify/web-api-ts-sdk';
import SelectYoutubeVideoModal from './SelectYoutubeVideoModal';
import useQueue from '../../hooks/useQueue';
import { SearchYoutubeResult } from '../../types/SearchResult';
import useArchive from '../../hooks/useArchive';
import { ArchivedSongData } from '../../types/SongData';

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

  function onSelectVideo(selection: {
    selected: SearchYoutubeResult | null;
    name?: string;
  }) {
    if (!selection.selected) return;
    setQueue([
      ...queue,
      {
        song: selection.selected,
        singer: selection.name || '',
      },
    ]);
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
        song: selection.selected,
        singer: selection.name || '',
        videos: [
          {
            videoId: selection.selected.id.videoId,
            thumbnail: selection.selected.snippet.thumbnails.default.url,
          },
        ],
        spotifyId: selectedTrack?.id || '',
        comments: [],
        uuid,
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
    <Box sx={{ px: '2rem', bgcolor: 'pink' }}>
      <Box>Songbook</Box>
      <Box
        sx={{ display: 'flex', alignItems: 'center', gap: '1rem', mt: '1rem' }}
      >
        <Box>Search</Box>
        <SearchSpotify
          selectedTrack={selectedTrack}
          onSelectTrack={onSelectTrack}
        />
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
