import {
  ArchivedSongDataWithPossibleScore,
  ArchivedSongDataWithScore,
} from './SongData';

export type ScoringFunction = (
  data: ArchivedSongDataWithPossibleScore[],
  coefficient?: number
) => ArchivedSongDataWithScore[];
export interface Scoring {
  function: ScoringFunction;
  coefficient?: number;
}

export interface World {
  name: string;
  uuid: string;
  description: string;
  scorings: Scoring[];
  background: string;
}
