export interface VideoInfo {
  videoId: string;
  thumbnail: string;
  title?: string;
}

export interface QueueSongData {
  video: VideoInfo;
  singer: string;
}

export interface Comment {
  comment: string;
  uuid: string;
  timestamp: number;
  isNew?: boolean;
}

export interface ArchivedSongData {
  uuid: string;
  videos: VideoInfo[];
  spotifyId: string;
  comments: Comment[];
  trackName: string;
  artistName: string;
  geniusInfo: {
    geniusId: number | undefined | null;
    geniusUrl?: string | null;
    geniusTags?: string[] | null;
  };
  youtubeInfo: {
    earliestUploadDate: string;
    latestUploadDate: string;
    viewCount: number;
  };
  spotifyInfo?: {
    releaseDate: string;
  }
}

export interface ArchivedSongDataWithPossibleScore extends ArchivedSongData {
  score?: number
}

export interface ArchivedSongDataWithScore extends ArchivedSongDataWithPossibleScore {
  score: number;
}

export interface ArchivedSongDataWithNormalizedScore extends ArchivedSongDataWithScore {
  normalizedScore: number;
}