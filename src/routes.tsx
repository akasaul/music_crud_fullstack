import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AddSong = lazy(() => import("./pages/AddSongs"));
const Search = lazy(() => import("./pages/Search"));
const FavoriteSongs = lazy(() => import("./pages/Favorites"));
const Library = lazy(() => import("./pages/Library"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
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
    path: "/analytics",
    element: <Library />,
  },
  {
    path: "/favorites",
    element: <FavoriteSongs />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
