import { Box, Tab, Tabs } from "@mui/material";
import { PropsWithChildren, useState } from "react";
import Queue from "./Queue";
import Search from "./Search";
import { SearchResult } from "../../types/SearchResult";
import { useLocalStorage } from "usehooks-ts";
import SelectModal from "./SelectModal";
import { SongData } from "../../types/SongData";

type TabValue = "queue" | "search";

export default function Dashboard() {
  const [tabValue, setTabValue] = useState<TabValue>("queue");
  const [selected, setSelected] = useState<SearchResult | null>(null);

  const [value, setValue] = useLocalStorage<SongData[]>("queue", []);

  function addToQueue(name: string) {
    setValue([
      ...value,
      {
        song: selected!,
        singer: name,
      },
    ]);
    setSelected(null);
  }

  return (
    <>
      {selected && <SelectModal selected={selected} addToQueue={addToQueue} />}
      <Box sx={{ width: "100%", display: selected ? "none" : "block", maxHeight: "100vh", overflowY: "auto" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", position: "sticky", top: 0, zIndex: 1, bgcolor: "#ddd" }}>
          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
          >
            <Tab label="Queue" value={"queue"} />
            <Tab label="Search" value={"search"} />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={"queue"}>
          <Queue />
        </TabPanel>
        <TabPanel value={tabValue} index={"search"}>
          <Search onSelect={setSelected} selected={selected} />
        </TabPanel>
      </Box>
    </>
  );
}

function TabPanel(
  props: PropsWithChildren<{ value: TabValue; index: TabValue }>
) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      sx={{ display: value === index ? "block" : "none" }}
      {...other}
    >
      {value === index && <Box sx={{ px: 0.5, py: 3 }}>{children}</Box>}
    </Box>
  );
}
