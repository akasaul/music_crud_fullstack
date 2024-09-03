import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Song {
  id: number;
  title: string;
  album: string;
  artist: string;
  genre: string;
}

interface SongState {
  songs: Song[];
  recents: Song[];
  song: Song | null;
  query: string;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMsg: string;
  currentState: string;
  isPlaying: boolean;
  songId: number | null;
  fetchRecentState: string;
  searchResults: Song[];
}

const initialState: SongState = {
  songs: [],
  recents: [],
  song: null,
  query: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: "",
  currentState: "",
  isPlaying: false,
  songId: null,
  fetchRecentState: "",
  searchResults: [],
};

const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    searchRequest: (state) => {
      state.isLoading = true;
      state.currentState = "SEARCH";
    },

    searchRequestSuccess: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
    },

    searchRequestFailure: (
      state,
      action: PayloadAction<{ message: string }>,
    ) => {
      state.isError = true;
      state.errorMsg = action.payload.message;
      state.isLoading = false;
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },

    setSong: (state, action: PayloadAction<Song>) => {
      state.song = action.payload;
    },

    addSongRequest: (state) => {
      state.isLoading = true;
      state.currentState = "ADD";
    },

    addSongSuccess: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    },

    addSongFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = action.payload;
    },

    fetchRecentRequest: (state) => {
      state.isLoading = true;
      state.fetchRecentState = "FETCH_RECENT";
    },

    fetchRecentSuccess: (state, action: PayloadAction<Song[]>) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.recents = action.payload;
    },

    fetchRecentFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = action.payload;
    },

    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.errorMsg = "";
      state.currentState = "";
    },

    playSong: (state, action: PayloadAction<Song>) => {
      state.isPlaying = true;
      state.song = action.payload;
    },

    stopSong: (state) => {
      state.isPlaying = false;
      // state.song = null; // Uncomment this if you want to reset the current song
    },

    getAllReq: (state) => {
      state.isLoading = true;
      state.currentState = "GET_ALL";
    },

    getAllSuccess: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
      state.searchResults = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    },

    getAllFailure: (state) => {
      state.isLoading = false;
      state.isError = true;
    },

    editSongReq: (state) => {
      state.isLoading = true;
      state.currentState = "EDIT";
    },

    editSongSuccess: (state, action: PayloadAction<Song>) => {
      state.song = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    },

    editSongFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = action.payload;
    },

    deleteSongReq: (state, action: PayloadAction<number>) => {
      state.songId = action.payload;
      state.isLoading = true;
      state.currentState = "DELETE";
      state.songs = state.songs.filter((song) => song.id !== action.payload);
    },

    deleteSongSuccess: (state) => {
      state.isLoading = false;
    },

    deleteSongFailure: (state, action: PayloadAction<Song[]>) => {
      state.isLoading = false;
      state.songs = action.payload;
    },

    searchSong: (state, action: PayloadAction<string>) => {
      const query = action.payload.toLowerCase();
      const res = state.songs.filter(
        (song) =>
          song.title.toLowerCase().includes(query) ||
          song.album.toLowerCase().includes(query) ||
          song.artist.toLowerCase().includes(query) ||
          song.genre.toLowerCase().includes(query),
      );

      state.searchResults = [...res, ...state.songs].slice(0, 6);
    },
  },
});

export const {
  searchRequest,
  searchRequestFailure,
  setSearchQuery,
  searchRequestSuccess,
  reset,
  addSongFailure,
  addSongRequest,
  addSongSuccess,
  setSong,
  fetchRecentFailure,
  fetchRecentRequest,
  fetchRecentSuccess,
  playSong,
  stopSong,
  getAllFailure,
  getAllReq,
  getAllSuccess,
  editSongFailure,
  editSongReq,
  editSongSuccess,
  deleteSongFailure,
  deleteSongReq,
  deleteSongSuccess,
  searchSong,
} = songSlice.actions;

export default songSlice.reducer;
