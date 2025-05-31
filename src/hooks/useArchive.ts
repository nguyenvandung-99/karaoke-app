import { ArchivedSongData } from "../types/SongData";
import { useSyncedLocalStorage } from "./useSyncedLocalStorage";

export default function useArchive() {
  const [archive, setArchive] = useSyncedLocalStorage<ArchivedSongData[]>("ARCHIVE", []);

  function addToArchive(song: ArchivedSongData) {
    setArchive((prev) => [...prev, song]);
  }
  return {
    archive,
    setArchive,
    addToArchive,
  }
}