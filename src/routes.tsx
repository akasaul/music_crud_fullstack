import { FC, lazy } from "react";
import { RouteObject } from "react-router-dom";
import AddSong from "./pages/AddSongs";
import Library from "./pages/Library";

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
    path: "/edit-song",
    element: <AddSong isEdit={true} />,
  },
  {
    path: "/library",
    element: <Library />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
