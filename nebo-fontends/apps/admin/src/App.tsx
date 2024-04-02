import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createReactRouter } from "./pages/layout/createReactRouter";
import { routes } from "./pages/routes";

const router = createBrowserRouter(createReactRouter(routes));

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
