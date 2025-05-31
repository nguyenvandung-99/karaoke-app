import { STORAGE_GOOGLE_KEY } from "../utils/localStorageKeys";
import { useSyncedLocalStorage } from "./useSyncedLocalStorage";

export default function useGoogleKey() {
  return useSyncedLocalStorage<string>(STORAGE_GOOGLE_KEY, ""); // AIzaSyChM70JELoUABO0KiEKR6xRzFuQZPov0ok
}