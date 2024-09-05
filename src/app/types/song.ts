export interface Song {
  title: string;
  artist: string;
  album: string;
  genre: string;
  coverImg: string;
  duration: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface LibSong extends Song {
  isMySong: true;
  isFav: true;
}
