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

export interface ApiSearchSong {
  id: string;
  title: string;
  album:
    | {
        cover_big: string;
        title: string;
      }
    | any;
  artist:
    | {
        name: string;
      }
    | any;
  duration: number;
}

export interface LibSong extends Song {
  isMySong: true;
  isFav: true;
}
