import { useSyncedLocalStorage } from "./useSyncedLocalStorage";

export default function useSync() {
  const [lastSync, setLastSync] = useSyncedLocalStorage<number>("LAST_SYNC", Date.now());

  return {
    lastSync,
    setLastSync
  }
}