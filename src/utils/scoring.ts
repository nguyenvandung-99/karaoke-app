import { Scoring } from '../types/Scoring';
import {
  ArchivedSongDataWithNormalizedScore,
  ArchivedSongDataWithPossibleScore,
  ArchivedSongDataWithScore,
} from '../types/SongData';

function parseLooseDate(dateStr?: string): Date | null {
  if (!dateStr) return null;
  const fullDate = /^\d{4}$/.test(dateStr) ? `${dateStr}-01-01` : dateStr;
  const parsed = new Date(fullDate);
  return isNaN(parsed.getTime()) ? null : parsed;
}

function computeDaysBetween(date1: Date, date2: Date): number {
  return Math.abs((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));
}

export function assignReleaseScoreByRecency(
  items: ArchivedSongDataWithPossibleScore[],
  coefficient = 1,
  isReverse = false
) {
  const itemsWithDates = items.map((item, index) => {
    const releaseDate =
      item.spotifyInfo?.releaseDate || item.youtubeInfo?.earliestUploadDate;
    const parsedDate = parseLooseDate(releaseDate);

    return {
      ...item,
      _releaseDate: parsedDate ? Number(new Date(parsedDate)) : 0,
      _originalIndex: index,
    };
  });

  if (isReverse) itemsWithDates.sort((a, b) => b._releaseDate - a._releaseDate);
  else itemsWithDates.sort((a, b) => a._releaseDate - b._releaseDate);

  const total = itemsWithDates.length;

  const itemsWithScore = items.map<ArchivedSongDataWithScore>(
    (item, index) => ({
      ...item,
      score:
        (item.score || 0) +
        (total - itemsWithDates.findIndex((i) => i._originalIndex === index)) *
          coefficient,
    })
  );

  return itemsWithScore;
}

export function assignYouTubeGapScore(
  items: ArchivedSongDataWithPossibleScore[],
  coefficient = 1,
  isReverse = false
) {
  const itemsWithGaps = items
    .map((item, index) => {
      const start = new Date(
        item.spotifyInfo?.releaseDate || item.youtubeInfo?.earliestUploadDate
      );
      const end = new Date(item.youtubeInfo?.latestUploadDate);
      const gap = start && end ? computeDaysBetween(start, end) : 0;
      return {
        ...item,
        _gapDays: gap,
        _originalIndex: index,
      };
    })
    .filter((item) => item._gapDays !== null);

  if (isReverse) itemsWithGaps.sort((a, b) => b._gapDays - a._gapDays);
  else itemsWithGaps.sort((a, b) => a._gapDays - b._gapDays);

  const total = itemsWithGaps.length;

  const itemsWithScore = items.map<ArchivedSongDataWithScore>(
    (item, index) => ({
      ...item,
      score:
        (item.score || 0) +
        (total - itemsWithGaps.findIndex((i) => i._originalIndex === index)) *
          coefficient,
    })
  );

  return itemsWithScore;
}

export function assignByAvailableGeniusId(
  items: ArchivedSongDataWithPossibleScore[],
  coefficient = 1,
  isReverse = false
) {
  const geniusScore = items.map((item) => {
    if (item.geniusInfo?.geniusId) {
      if (!isReverse) return 1;
      return items.length;
    }
    if (!isReverse) return items.length;
    return 1;
  });

  const itemsWithScore = items.map<ArchivedSongDataWithScore>(
    (item, index) => ({
      ...item,
      score: (item.score || 0) + geniusScore[index] * coefficient,
    })
  );
    console.log('itemsWithScore genius:', itemsWithScore)

  return itemsWithScore;
}

export function assignByAvailableSpotifyId(
  items: ArchivedSongDataWithPossibleScore[],
  coefficient = 1,
  isReverse = false
) {
  const spotifyScore = items.map((item) => {
    if (item.spotifyId) {
      if (!isReverse) return 1;
      return items.length;
    }
    if (!isReverse) return items.length;
    return 1;
  });

  const itemsWithScore = items.map<ArchivedSongDataWithScore>(
    (item, index) => ({
      ...item,
      score: (item.score || 0) + spotifyScore[index] * coefficient,
    })
  );

  console.log('itemsWithScore spotify:', itemsWithScore)
  return itemsWithScore;
}

export function assignYoutubeLowestViewCountScore(
  items: ArchivedSongDataWithPossibleScore[],
  coefficient = 1,
  isReverse = false
) {
  const itemsWithViewCount = items
    .map((item, index) => {
      const viewCount = item.youtubeInfo?.viewCount || 0;
      return {
        ...item,
        _viewCount: viewCount,
        _originalIndex: index,
      };
    })
    .filter((item) => item._viewCount !== null);

  if (isReverse) {
    itemsWithViewCount.sort((a, b) => b._viewCount - a._viewCount);
  } else {
    itemsWithViewCount.sort((a, b) => a._viewCount - b._viewCount);
  }

  const total = itemsWithViewCount.length;

  const itemsWithScore = items.map<ArchivedSongDataWithScore>(
    (item, index) => ({
      ...item,
      score:
        (item.score || 0) +
        (total -
          itemsWithViewCount.findIndex((i) => i._originalIndex === index)) *
          coefficient,
    })
  );

  return itemsWithScore;
}

export function assignRandomScore(
  items: ArchivedSongDataWithPossibleScore[],
  coefficient = 1
) {
  // generate random ranking that is integer between 1 and the length of the items
  const randomRanking = items
    .map((_, index) => ({ index, value: Math.random() }))
    .sort((a, b) => a.value - b.value)
    .map((item, rank) => ({ ...item, rank: rank + 1 }));
  const itemsWithScore = items.map<ArchivedSongDataWithScore>((item, index) => {
    const randomRank = randomRanking.find((r) => r.index === index)?.rank || 0;
    return {
      ...item,
      score: (item.score || 0) + randomRank * coefficient,
    };
  });

  return itemsWithScore;
}

export function normalizeScores(
  items: ArchivedSongDataWithPossibleScore[]
): ArchivedSongDataWithNormalizedScore[] {
  const maxScore = Math.max(...items.map((item) => item.score || 0));
  return items.map((item) => ({
    ...item,
    score: (item.score || 0) ** 2,
    normalizedScore: (item.score || 0) / maxScore,
  }));
}

export function calculateNormalizedScore(
  data: ArchivedSongDataWithPossibleScore[],
  scorings: Scoring[]
): ArchivedSongDataWithNormalizedScore[] {
  const dataWithScore = scorings.reduce((acc, scoring) => {
    return scoring.function(acc, scoring.coefficient);
  }, data);

  return normalizeScores(dataWithScore);
}
