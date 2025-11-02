import { createHashRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AllFinQuestions from "../pages/Home/AllQuestions/AllFinQuestions";
import AllQuestions from "../pages/Home/AllQuestions/AllQuestions";
import GenerateFinQuestion from "../pages/Home/GenerateQuestions/GenerateFinQuestions";
import GenerateSwQuestion from "../pages/Home/GenerateQuestions/GenerateSwQuestions";
import Home from "../pages/Home/Home/Home";

export const router = createHashRouter([
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
        Component: GenerateSwQuestion, // Question display page
      },
      {
        path: "generate/sw", // /generate SW route
        Component: GenerateSwQuestion, // Question display page
      },
      {
        path: "generate/fin", // /generate Fin route
        Component: GenerateFinQuestion, // Question display page
      },
      {
        path: "all-questions", // /all-questions route
        Component: AllQuestions, // All Question display page
      },
      {
        path: "all-sw-questions", // /all-questions route
        Component: AllQuestions, // All SW Question display page
      },
      {
        path: "all-fin-questions", // /all-questions route
        Component: AllFinQuestions, // All Fin Question display page
      },
      {
        path: "*", // 👈 fallback for unmatched child paths
        Component: ErrorPage,
      },
    ]
  },
]);