import { useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

export function useSyncedLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useLocalStorage<T>(key, initialValue);
  const [syncedValue, setSyncedValue] = useState<T>(value);

  // Keep local state and useLocalStorage state in sync
  useEffect(() => {
    if (value !== syncedValue) {
      setSyncedValue(value);
    }
  }, [value, syncedValue]);

  // Listen to storage events and update syncedValue when key changes externally
  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key === key && event.newValue) {
        try {
          const newValue = JSON.parse(event.newValue) as T;
          setSyncedValue(newValue);
          setValue(newValue); // update localStorage state as well
        } catch {
          // ignore parse errors
        }
      }
    }

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key, setValue]);

  return [syncedValue, setValue];
}
