import ReactDOM from "react-dom/client";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import News from "./pages/News";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ThemeCustomization from "./themes";
import MainLayout from "./layouts/MainLayout";

import { persistor, store } from "./store";

import "./localization";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/news",
        element: <News />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StoreProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeCustomization>
        <RouterProvider router={router} />
      </ThemeCustomization>
    </PersistGate>
  </StoreProvider>
);
