import { createContext, useRef } from "react";
import {
  SharedProps,
  SnackbarKey,
  SnackbarProvider,
  useSnackbar,
} from "notistack";
import { Box, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

export type Options = {
  autoHideDuration?: SharedProps["autoHideDuration"];
  variant?: SharedProps["variant"];
};

export type Context = {
  show: (message: string, options?: Options) => void;
};

function SnackbarCloseButton({ snackbarKey }: { snackbarKey: SnackbarKey }) {
  const { closeSnackbar } = useSnackbar();

  return (
    <Box height={"100%"}>
      <IconButton onClick={() => closeSnackbar(snackbarKey)}>
        <Close />
      </IconButton>
    </Box>
  );
}

export const NotificationContext = createContext<Context>({
  show: (_message: string, options?: Options) => {},
});
const Provider = NotificationContext.Provider;

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const providerRef = useRef<SnackbarProvider>(null);

  const showToast = (message: string, options?: Options) => {
    // variant could be success, error, warning, info, or default
    providerRef?.current?.enqueueSnackbar(message, {
      ...options,
      variant: options?.variant || "success",
    });
  };

  return (
    <Provider value={{ show: showToast }}>
      <SnackbarProvider
        ref={providerRef}
        maxSnack={5}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        autoHideDuration={2000}
        action={(snackbarKey) => (
          <SnackbarCloseButton snackbarKey={snackbarKey} />
        )}
      >
        {children}
      </SnackbarProvider>
    </Provider>
  );
};
