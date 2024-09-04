import { FC, lazy } from "react";
import { RouteObject } from "react-router-dom";
import AddSong from "./pages/AddSongs";

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
    path: "/add-song",
    element: <AddSong isEdit={false} />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
