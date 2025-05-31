import { QueueSongData } from "../types/SongData";
import { STORAGE_QUEUE } from "../utils/localStorageKeys";
import { useSyncedLocalStorage } from "./useSyncedLocalStorage";

export default function useQueue() {
  const [queue, setQueue] = useSyncedLocalStorage<QueueSongData[]>(STORAGE_QUEUE, []);
  return [queue, setQueue] as const;
}