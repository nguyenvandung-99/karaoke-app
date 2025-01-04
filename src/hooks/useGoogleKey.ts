import { useLocalStorage } from "usehooks-ts";
import { STORAGE_GOOGLE_KEY } from "../utils/localStorageKeys";

export default function useGoogleKey() {
  return useLocalStorage<string>(STORAGE_GOOGLE_KEY, "");
}