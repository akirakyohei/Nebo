import { Provider as StoreProvider } from "react-redux";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { NotificationProvider } from "./components/notification/NotificationContext";
import { store } from "./store/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes/router.config";

function App() {
  const theme = createTheme({
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
        <NotificationProvider>
          <RouterProvider router={createBrowserRouter(routes)} />
        </NotificationProvider>
      </StoreProvider>
    </ThemeProvider>
  );
}

export default App;
