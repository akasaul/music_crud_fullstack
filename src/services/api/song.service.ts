import { Song } from "../../app/types/song";
import { api } from "../../lib/api";

const getRecentSongs = async () => {
  const songs = await api.get<Song[]>("/songs");
  return songs;
};

export { getRecentSongs };
