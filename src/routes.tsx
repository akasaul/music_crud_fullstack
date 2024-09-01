import { FC, lazy } from "react";
import { RouteObject } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
