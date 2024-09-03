import { Song } from "../../app/types/song";
import { api } from "../../lib/api";

export const getRecentSongs = async () => {
  const songs = await api.get<Song[]>("/songs");
  return songs;
};

export const getSongsFromGenre = async (genre: string) => {
  const songs = await api.get<Song[]>(`/songs?genre=${genre}`);
  return songs;
};
