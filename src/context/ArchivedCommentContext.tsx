import { useEffect, useMemo } from 'react';
import { createCtx } from '../utils/createCtx';
import { usePlayerContext } from './PlayerContext';
import { ArchivedSongData } from '../types/SongData';
import useArchive from '../hooks/useArchive';
import useCurrentArchiveId from '../hooks/useCurrentArchiveId';

interface CommentContextType {
  currentArchiveId: string;
  archivedItem: ArchivedSongData | null;
  addComment: (comment: string) => Promise<void>;
}

const [useArchivedCommentContext, ArchivedCommentProvider] =
  createCtx<CommentContextType>();

export default function ArchivedCommentContextProvider({
  children,
}: React.PropsWithChildren) {
  const { currentArchiveId, setCurrentArchiveId } = useCurrentArchiveId();
  const { archive } = useArchive();
  const { currentTimestamp, videoId } = usePlayerContext();

  useEffect(() => {
    const matchedArchiveId = archive.find((item) =>
      item.videos.some((video) => video.videoId === videoId)
    )?.uuid;
    if (matchedArchiveId) {
      setCurrentArchiveId(matchedArchiveId);
    }
  }, [videoId, archive, setCurrentArchiveId]);

  const archivedItem = useMemo(() => {
    return currentArchiveId
      ? archive.find((item) => item.uuid === currentArchiveId) || null
      : null;
  }, [currentArchiveId, archive]);

  const { setArchive } = useArchive();

  async function addComment(comment: string) {
    if (!archivedItem) return;

    const updatedItem: ArchivedSongData = {
      ...archivedItem,
      comments: [
        ...archivedItem.comments,
        {
          comment,
          timestamp: currentTimestamp,
          uuid: crypto.randomUUID(),
        },
      ],
    };

    setArchive((prev) => {
      const index = prev.findIndex((item) => item.uuid === archivedItem.uuid);
      const newArchive = [...prev];
      newArchive[index] = updatedItem;
      return newArchive;
    });
  }

  return (
    <ArchivedCommentProvider
      value={{
        currentArchiveId,
        archivedItem,
        addComment,
      }}
    >
      {children}
    </ArchivedCommentProvider>
  );
}

export { useArchivedCommentContext };
