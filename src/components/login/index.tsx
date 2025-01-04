import { Box, TextField } from "@mui/material"
import { useState } from "react"
import useGoogleKey from "../../hooks/useGoogleKey"

export default function Login() {
  const [localKey, setLocalKey] = useState("")
  const [_, setGoogleKey] = useGoogleKey()

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', height: '100%' }}>
      <form onSubmit={() => setGoogleKey(localKey)}>
        <TextField
          label="Enter key"
          value={localKey}
          onChange={(e) => setLocalKey(e.target.value)}
        />
      </form>
    </Box>
  )
}