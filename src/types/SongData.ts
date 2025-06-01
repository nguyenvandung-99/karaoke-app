interface VideoInfo {
  videoId: string;
  thumbnail: string;
  title?: string;
}

export interface QueueSongData {
  video: VideoInfo
  singer: string;
}

export interface Comment {
  comment: string;
  uuid: string;
  timestamp: number;
}

export interface ArchivedSongData {
  uuid: string;
  videos: VideoInfo[];
  spotifyId: string;
  comments: Comment[];
}