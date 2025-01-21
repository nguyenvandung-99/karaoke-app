import { Box, Button } from "@mui/material";
import { PropsWithChildren, useState } from "react";
import Queue from "./Queue";
import Search from "./Search";
import { SearchResult } from "../../types/SearchResult";
import SelectModal from "./SelectModal";
import useQueue from "../../hooks/useQueue";

type TabValue = "queue" | "search";

export default function Dashboard() {
  const [tabValue, setTabValue] = useState<TabValue>("queue");
  const [selected, setSelected] = useState<SearchResult | null>(null);

  const [value, setValue] = useQueue();

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
      <Box
        sx={{
          width: "100%",
          display: selected ? "none" : "block",
          overflowY: "auto",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            borderColor: "divider",
            position: "sticky",
            top: 0,
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <Button
            onClick={() => setTabValue("queue")}
            color={tabValue === "queue" ? "primary" : "secondary"}
            variant="contained"
            sx={{ m: 1, borderRadius: "18px" }}
          >
            Queue
          </Button>
          <Button
            onClick={() => setTabValue("search")}
            color={tabValue === "search" ? "primary" : "secondary"}
            variant="contained"
            sx={{ m: 1, borderRadius: "18px" }}
          >
            Search
          </Button>
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
