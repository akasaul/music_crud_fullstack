import { Song } from "../../app/types/song";
import { api } from "../../lib/api";
import { AddSongBody } from "../../lib/validation";

export const getRecentSongs = async () => {
  const songs = await api.get<Song[]>("/songs");
  return songs;
};

export const getSongsFromGenre = async (genre: string) => {
  const songs = await api.get<Song[]>(`/songs?genre=${genre}`);
  return songs;
};

export const addSongService = async ({
  imageUrl: coverImg,
  ...rest
}: AddSongBody) => {
  const newSong = { coverImg, ...rest };
  const songs = await api.post<Song>("/songs", newSong);
  return songs;
};

export const editSongService = async (
  { imageUrl: coverImg, ...rest }: AddSongBody,
  id: string,
) => {
  const newSong = { coverImg, ...rest };
  const songs = await api.put<Song>(`/songs/${id}`, newSong);
  return songs;
};
