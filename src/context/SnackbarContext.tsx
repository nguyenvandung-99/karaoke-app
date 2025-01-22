import { PropsWithChildren, useState } from "react";
import { createCtx } from "../utils/createCtx";
import { Snackbar } from "@mui/material";

interface SnackbarContent {
  message: string;
  action?: React.ReactNode;
}
interface SnackbarContextType {
  showSnackbar: ({ message, action }: SnackbarContent) => void;
  isOpenSnackbar: boolean;
  setIsOpenSnackbar: (isOpen: boolean) => void;
}

const [useSnackbarContext, SnackbarProvider] = createCtx<SnackbarContextType>();

export { useSnackbarContext };

export default function SnackbarContextProvider({
  children,
}: PropsWithChildren) {
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);

  const [snackbarContent, setSnackbarContent] = useState<SnackbarContent>({
    message: "",
    action: undefined,
  });

  function showSnackbar({ message, action }: SnackbarContent) {
    setSnackbarContent({ message, action });
    setIsOpenSnackbar(true);
  }

  return (
    <SnackbarProvider
      value={{ showSnackbar, isOpenSnackbar, setIsOpenSnackbar }}
    >
      {children}
      <Snackbar
        open={isOpenSnackbar}
        autoHideDuration={10000}
        onClose={() => setIsOpenSnackbar(false)}
        {...snackbarContent}
      />
    </SnackbarProvider>
  );
}
