import { AlertProps, SnackbarContentProps, SnackbarProps } from "@mui/material";
import { createContext } from "react";
import {
  OptionsWithExtraProps,
  SharedProps,
  SnackbarProvider,
  VariantMap,
  VariantType,
  useSnackbar,
} from "notistack";

export type Options = {
  autoHideDuration: SharedProps["autoHideDuration"];
  variant: SharedProps["variant"];
};

export type Context = {
  show?: (message: string, options?: Options) => void;
};

export const NotificationContext = createContext<Context>({});
const Provider = NotificationContext.Provider;

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const showToast = (message: string, options?: Options) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { ...options });
  };

  return (
    <Provider value={{ show: showToast }}>
      <SnackbarProvider maxSnack={5}>{children}</SnackbarProvider>
    </Provider>
  );
};
