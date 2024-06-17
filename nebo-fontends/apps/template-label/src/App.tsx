import { Provider as StoreProvider } from "react-redux";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { NotificationProvider } from "./components/notification/NotificationContext";
import { LoadingProvider } from "./components/loading/LoadingContext";
import { store } from "./store/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes/router.config";
import { transformRouter } from "./routes/transformRouter";
import AuthProvider from "./features/layout/AuthProvider";

function App() {
  const theme = createTheme({
    palette: {
      secondary: {
        main: "#a8a8a8",
      },
    },
    typography: {
      button: {
        textTransform: "none",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            margin: "auto",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StoreProvider store={store}>
        <AuthProvider>
          <LoadingProvider>
            <NotificationProvider>
              <RouterProvider
                router={createBrowserRouter(transformRouter(routes))}
              />
            </NotificationProvider>
          </LoadingProvider>
        </AuthProvider>
      </StoreProvider>
    </ThemeProvider>
  );
}

export default App;
