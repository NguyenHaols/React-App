import { ConfigProvider } from "antd";
import { IntlProvider } from "react-intl";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import DefaultLayout from "./Layout/defaultLayout/DefaultLayout";
import enMessages from "./language/en.json";
import viMessages from "./language/vi.json";
import Login from "./pages/auth/Login";
import ChildA from "./pages/childA";
import ChildB from "./pages/childB";
import { useAppSelector } from "./store";

function App() {
  const router = createBrowserRouter([
    {
      element: <DefaultLayout />,
      children: [
        {
          path: "/",
          element: <Navigate to="/a" replace />,
        },
        {
          path: "/a",
          element: <ChildA />,
        },
        {
          path: "/b",
          element: <ChildB />,
        },
      ],
      errorElement: <div>404 not found</div>,
    },
    {
      path: "/index",
      element: <div>abc</div>,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  // const language = store.getState().translate.lang
  // console.log("🚀 ~ App ~ language:", language)
  const language = useAppSelector((state) => state.translate.lang);
  const currentLang = language === "vi" ? viMessages : enMessages;
  const themMode = useAppSelector((state) => state.themeMode);
  let defaultData = {
    colorPrimary: themMode.mode === "dark" ? "#333" : "#ee4d2d",
  };
  return (
    <IntlProvider locale={language} messages={currentLang}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: defaultData.colorPrimary,
            fontFamily: "Helvetica, Arial,",
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </IntlProvider>
  );
}

export default App;
