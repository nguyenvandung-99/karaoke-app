import { SearchYoutubeResult } from "./SearchResult";

export interface QueueSongData {
  song: SearchYoutubeResult;
  singer: string;
}

export interface Comment {
  comment: string;
  uuid: string;
  timestamp: number;
}

export interface ArchivedSongData {
  uuid: string;
  song: SearchYoutubeResult;
  singer: string;
  videos: {
    videoId: string;
    thumbnail: string
  }[];
  spotifyId: string;
  comments: Comment[];
}