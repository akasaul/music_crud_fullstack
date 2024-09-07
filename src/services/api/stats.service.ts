import { api } from "../../lib/api";

export const getStatisticssOverview = async () => {
  const songs = await api.get("/stats/overview");
  return songs;
};

export const getSongPerGenreStats = async () => {
  const songs = await api.get("/stats/songs-per-genre");
  return songs;
};

export const getSongsAlbumsPerArtistStats = async () => {
  const songs = await api.get("/stats/songs-albums-per-artist");
  return songs;
};

export const getSongsPerAlbumStats = async () => {
  const songs = await api.get("/stats/songs-per-album");
  return songs;
};
