import apiRoutes from "../../app/API/apiRoutes";
import { api } from "../../lib/api";

export const getStatisticssOverview = async () => {
  const songs = await api.get(apiRoutes.stats.overview);
  return songs;
};

export const getSongPerGenreStats = async () => {
  const songs = await api.get(apiRoutes.stats.songsPerGenre);
  return songs;
};

export const getSongsAlbumsPerArtistStats = async () => {
  const songs = await api.get(apiRoutes.stats.songperAlbumsPerArtist);
  return songs;
};

export const getSongsPerAlbumStats = async () => {
  const songs = await api.get(apiRoutes.stats.songsPerAlbum);
  return songs;
};
