import { PropsWithChildren, useState } from "react";
import { createCtx } from "../utils/createCtx";
import { Button, IconButton, SnackbarCloseReason, Snackbar, Dialog, Box } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Login from "../components/login";

interface SnackbarContextType {
  showSnackbar: () => void;
}

const [useSnackbarContext, SnackbarProvider] = createCtx<SnackbarContextType>()

export { useSnackbarContext }

export default function SnackbarContextProvider({ children }: PropsWithChildren) {
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleClose = (
    _: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpenSnackbar(false);
  };

  const openModal = () => {
    setIsOpenModal(true)
    setIsOpenSnackbar(false)
  }

  const action = (
    <>
      <Button color="primary" size="small" onClick={openModal}>
        Enter new key
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <SnackbarProvider value={{ showSnackbar: () => setIsOpenSnackbar(true) }}>
      {children}
      <Snackbar
        open={isOpenSnackbar}
        autoHideDuration={5000}
        onClose={() => setIsOpenSnackbar(false)}
        message="An error happened. Please enter a new key or come back tomorrow."
        action={action}
      />
      <Dialog maxWidth='xs' open={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <Box sx={{ p: 4 }}>
          <Login />
        </Box>
      </Dialog>
    </SnackbarProvider >
  )
}