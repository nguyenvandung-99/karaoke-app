import { World } from '../../../../types/Scoring';
import {
  assignByAvailableGeniusId,
  assignByAvailableSpotifyId,
  assignReleaseScoreByRecency,
  assignYouTubeGapScore,
  assignYoutubeLowestViewCountScore,
} from '../../../../utils/scoring';

export const presetWorlds: World[] = [
  {
    name: 'time bridge',
    uuid: 'time-bridge',
    description:
      'These might be songs your parents sang at karaoke night—songs that bridge a generational gap. They might hold generational resonance, traces of the diaspora’s lineage, or be portals to the imagined homeland.',
    scorings: [
      {
        function: assignReleaseScoreByRecency,
        coefficient: 2,
      },
      {
        function: assignYouTubeGapScore,
        coefficient: 1,
      },
    ],
    background: '/karaoke-app/src/assets/images/explore-background.png',
  },
  {
    name: 'lost tracks',
    uuid: 'lost-tracks',
    description: 'Perhaps they hold emotional resonance for many, but are of an marginalized or underrepresented culture or language. Perhaps it’s a niche artist, falling through the cracks of mainstream attention.',
    scorings: [
      {
        function: assignByAvailableSpotifyId,
        coefficient: 1,
      },
      {
        function: assignByAvailableGeniusId,
        coefficient: 1,
      },
      {
        function: assignYoutubeLowestViewCountScore,
        coefficient: 1,
      }
    ],
    background: '/karaoke-app/src/assets/images/explore-background-2.png',
  },
];
