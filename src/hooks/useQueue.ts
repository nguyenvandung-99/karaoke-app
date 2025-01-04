import { useLocalStorage } from "usehooks-ts";
import { SongData } from "../types/SongData";
import { STORAGE_QUEUE } from "../utils/localStorageKeys";

export default function useQueue() {
  return useLocalStorage<SongData[]>(STORAGE_QUEUE, []);
}