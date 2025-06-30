import {
  assignReleaseScoreByRecency,
  assignYoutubeLowestViewCountScore,
} from './scoring';

export const MANUAL_SETTINGS = [
  {
    name: 'release date',
    isSelected: false,
    isLeft: false,
    function: assignReleaseScoreByRecency,
    leftText: 'old',
    rightText: 'new',
  },
  {
    name: 'view count',
    isSelected: false,
    isLeft: true,
    function: assignYoutubeLowestViewCountScore,
    leftText: 'high',
    rightText: 'low',
  },
];
