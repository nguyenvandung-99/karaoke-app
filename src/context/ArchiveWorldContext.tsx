import { useState } from "react";
import { World } from "../types/Scoring";
import { createCtx } from "../utils/createCtx";
import { presetWorlds } from "../components/layout/DoubleScreen/Archive/presetWorlds";

interface ArchiveWorldContextType {
  selectedWorld: World;
  setSelectedWorld: (world: World) => void;
  isSelectingNewWorld: boolean;
  setIsSelectingNewWorld: (isSelecting: boolean) => void;
  newWorld: World;
  setNewWorld: (world: World) => void;
}

const [useArchiveWorldContext, ArchiveWorldProvider] =
  createCtx<ArchiveWorldContextType>();

export default function ArchiveWorldContextProvider({
  children,
}: React.PropsWithChildren) {
  const [selectedWorld, setSelectedWorld] = useState<World>(presetWorlds[0]);
  const [newWorld, setNewWorld] = useState<World>({
    name: '',
    uuid: '',
    description: '',
    background: '',
    scorings: [],
  });

  const [isSelectingNewWorld, setIsSelectingNewWorld] = useState(false);

  return (
    <ArchiveWorldProvider
      value={{
        selectedWorld: selectedWorld!,
        setSelectedWorld,
        isSelectingNewWorld,
        setIsSelectingNewWorld,
        newWorld,
        setNewWorld,
      }}
    >
      {children}
    </ArchiveWorldProvider>
  );
}

export { useArchiveWorldContext };