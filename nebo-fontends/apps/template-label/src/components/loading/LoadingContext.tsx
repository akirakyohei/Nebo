import { createContext, useState } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export type Context = {
  setValue: (value: boolean) => void;
};

export const LoadingContext = createContext<Context>({
  setValue: (value: boolean) => {},
});
const Provider = LoadingContext.Provider;

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <Provider value={{ setValue: setIsShow }}>
      {isShow && (
        <Box width={"100%"} sx={{ position: "absolute", zIndex: "9999" }}>
          <LinearProgress />
        </Box>
      )}
      {children}
    </Provider>
  );
};
