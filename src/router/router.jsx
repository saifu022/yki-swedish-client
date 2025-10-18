import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import GenerateQuestion from "../pages/Home/GenerateQuestions/GenerateQuestions";
import Home from "../pages/Home/Home/Home";

export const router = createBrowserRouter([
    {
      path: "/",
      Component: RootLayout,
      children: [
        {
        index: true,
        Component: Home, // Landing page
      },
      {
        path: "generate", // /generate route
        Component: GenerateQuestion, // Question display page
      },
      {
        path: "*", // 👈 fallback for unmatched child paths
        Component: ErrorPage,
      },
      ]
    },
  ]);