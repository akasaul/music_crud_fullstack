import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SongsPerAlbum {
  songsCount: number;
  album: string;
}

interface Overview {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
}

interface SongPerGenre {
  count: number;
  genre: string;
}

interface SongsAlbumsPerArtist {
  songsCount: number;
  artist: string;
  albumsCount: number;
}

interface StatsState {
  overview: Overview | null;
  songPerGenre: SongPerGenre[] | null;
  songsAlbumsPerArtist: SongsAlbumsPerArtist[] | null;
  songsPerAlbum: SongsPerAlbum[] | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const initialState: StatsState = {
  overview: null,
  songPerGenre: null,
  songsAlbumsPerArtist: null,
  songsPerAlbum: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    // Set user data
    getStatsOverview: (state) => {
      state.isLoading = true;
    },

    getStatsOverviewSuccess: (state, action: PayloadAction<Overview>) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.overview = action.payload;
    },
    getStatsOverviewError: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },

    getSongsPerGenre: (state) => {
      state.isLoading = true;
    },

    getSongsPerGenreSuccess: (state, action: PayloadAction<SongPerGenre[]>) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.songPerGenre = action.payload;
    },
    getSongsPerGenreError: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },

    getSongsAlbumsPerArtist: (state) => {
      state.isLoading = true;
    },

    getSongsAlbumsPerArtistSuccess: (
      state,
      action: PayloadAction<SongsAlbumsPerArtist[]>,
    ) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.songsAlbumsPerArtist = action.payload;
    },
    getSongsAlbumsPerArtistError: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },

    getSongsPerAlbum: (state) => {
      state.isLoading = true;
    },

    getSongsPerAlbumSuccess: (
      state,
      action: PayloadAction<SongsPerAlbum[]>,
    ) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.songsPerAlbum = action.payload;
    },
    getSongsPerAlbumError: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
});

export const {
  getStatsOverview,
  getStatsOverviewError,
  getStatsOverviewSuccess,
  getSongsPerGenre,
  getSongsPerGenreError,
  getSongsPerGenreSuccess,
  getSongsAlbumsPerArtist,
  getSongsAlbumsPerArtistSuccess,
  getSongsAlbumsPerArtistError,
  getSongsPerAlbum,
  getSongsPerAlbumSuccess,
  getSongsPerAlbumError,
} = statsSlice.actions;

export default statsSlice.reducer;
