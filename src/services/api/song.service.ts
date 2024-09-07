import { LibSong, Song } from "../../app/types/song";
import { api } from "../../lib/api";
import { AddSongBody } from "../../lib/validation";

export const getRecentSongs = async () => {
  const songs = await api.get<Song[]>("/songs");
  return songs;
};

export const getLibSongs = async () => {
  const songs = await api.get<LibSong[]>("/songs/library");
  return songs;
};

export const getFavSongs = async () => {
  const songs = await api.get<LibSong[]>("/songs/favorites");
  return songs;
};

export const getMySongs = async () => {
  const songs = await api.get<LibSong[]>("/songs/library/my-songs");
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

export const addSongToFav = async (id: string) => {
  await api.post<Song>(`/songs/${id}/add-to-favorite`);
};

export const removeSongFromFav = async (id: string) => {
  await api.post<Song>(`/songs/${id}/remove-from-favorite`);
};

export const searchSongs = async (query: string) => {
  const songs = await api.get<LibSong[]>(`/songs/search?query=${query}`);
  return songs;
};

export const deleteSong = async (id: string) => {
  const songs = await api.delete<LibSong[]>(`/songs/${id}`);
  return songs;
};
