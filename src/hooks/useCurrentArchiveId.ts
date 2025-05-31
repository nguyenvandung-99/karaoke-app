import { useSyncedLocalStorage } from "./useSyncedLocalStorage";

export default function useCurrentArchiveId() {
  const [currentArchiveId, setCurrentArchiveId] = useSyncedLocalStorage<string>("CURRENT_ARCHIVE_ID", '');

  return {
    currentArchiveId,
    setCurrentArchiveId,
  };
}