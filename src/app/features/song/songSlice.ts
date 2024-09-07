import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LibSong, ApiSearchSong, Song } from "../../types/song";
import { AddSongBody } from "../../../lib/validation";

interface SongState {
  songs: Song[];
  genreSongs: Song[];
  mySongs: LibSong[];
  libSongs: LibSong[];
  recents: Song[];
  song: Song | null;
  favId: string | null;
  addSongData: AddSongBody | null;
  favSongs: LibSong[];
  updateSongData: { song: AddSongBody; id: string } | null;
  query: string;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMsg: string;
  currentState: string;
  isPlaying: boolean;
  songId: string | null;
  fetchRecentState: string;
  searchResults: Song[];
  apiSearchResults: ApiSearchSong[];
}

const initialState: SongState = {
  songs: [],
  mySongs: [],
  favSongs: [],
  favId: null,
  libSongs: [],
  recents: [],
  song: null,
  addSongData: null,
  updateSongData: null,
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
  genreSongs: [],
  apiSearchResults: [],
};

const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    searchRequest: (state) => {
      state.isLoading = true;
      state.currentState = "SEARCH";
    },
    searchRequestForAdd: (state) => {
      state.isLoading = true;
      state.currentState = "SEARCH_FOR_ADD";
    },
    searchRequestForAddSuccess: (
      state,
      action: PayloadAction<ApiSearchSong[]>,
    ) => {
      state.apiSearchResults = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
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
      state.isLoading = true;
    },
    setSong: (state, action: PayloadAction<AddSongBody>) => {
      state.addSongData = action.payload;
    },

    setSongForUpdate: (
      state,
      action: PayloadAction<{ song: AddSongBody; id: string }>,
    ) => {
      state.updateSongData = action.payload;
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
    },

    getAllReq: (state) => {
      state.isLoading = true;
      state.currentState = "GET_ALL";
    },

    getSongsByGenreReq: (state) => {
      state.isLoading = true;
      state.currentState = "GET_BY_GENRE";
    },
    getSongsByGenreSuccess: (state, action: PayloadAction<Song[]>) => {
      state.isLoading = false;
      state.genreSongs = action.payload;
    },
    getLibReq: (state) => {
      state.isLoading = true;
      state.currentState = "GET_LIB";
    },
    getLibSuccess: (state, action: PayloadAction<LibSong[]>) => {
      state.libSongs = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    },
    getLibFailure: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    getMySongsReq: (state) => {
      state.isLoading = true;
      state.currentState = "GET_MY_SONGS";
    },
    getMySongsSuccess: (state, action: PayloadAction<LibSong[]>) => {
      state.mySongs = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    },
    getMySongsFailure: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    getSongsByGenreFailure: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    getAllSuccess: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
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

    deleteSongReq: (state, action: PayloadAction<string>) => {
      state.songId = action.payload;
      state.isLoading = true;
      state.currentState = "DELETE";
      state.songs = state.songs.filter((song) => song._id !== action.payload);
    },

    deleteSongSuccess: (state) => {
      state.isLoading = false;
    },

    deleteSongFailure: (state, action: PayloadAction<Song[]>) => {
      state.isLoading = false;
      state.songs = action.payload;
    },
    searchSong: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.currentState = "SEARCH";
    },
    searchSongsSuccess: (state, action: PayloadAction<Song[]>) => {
      state.searchResults = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    },
    searchSongsFailure: (state: SongState) => {
      state.searchResults = [];
      state.errorMsg = state.errorMsg;
      state.isLoading = false;
      state.isError = true;
    },
    setFavId: (state, action: PayloadAction<string>) => {
      state.favId = action.payload;
    },
    setFavRequest: () => {},
    removeFavRequest: () => {},
    getFavsRequest: (state: SongState) => {
      state.isLoading = true;
    },
    getFavsSuccess: (state: SongState, action: PayloadAction<LibSong[]>) => {
      state.favSongs = action.payload;
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
  getSongsByGenreReq,
  getSongsByGenreSuccess,
  getSongsByGenreFailure,
  setSongForUpdate,
  getLibReq,
  getLibSuccess,
  getLibFailure,
  getMySongsReq,
  getMySongsSuccess,
  getMySongsFailure,
  setFavId,
  setFavRequest,
  removeFavRequest,
  getFavsRequest,
  getFavsSuccess,
  searchSongsSuccess,
  searchSongsFailure,
  searchRequestForAdd,
  searchRequestForAddSuccess,
} = songSlice.actions;

export default songSlice.reducer;
