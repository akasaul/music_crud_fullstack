import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { auth, User } from "../../../firebase/firebase";

// Define the initial state type
interface UserState {
  user: object | null;
  favs: string[];
  isLoading: boolean;
  isSuccess: boolean;
  favId: string | null;
}

// Initial state
const initialState: UserState = {
  user: null,
  favs: [],
  isLoading: false,
  isSuccess: false,
  favId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set user data
    setUserReq: (state) => {
      state.isLoading = true;
    },

    setUser: (state, action: PayloadAction<object>) => {
      state.isLoading = false;
      state.user = action.payload;
      // state.favs = action.payload.favorites;
    },

    // Add or remove song from favorites
    setFavsReq: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
      state.favId = action.payload;
    },

    setFavs: (state, action: PayloadAction<string>) => {
      if (state.favs.includes(action.payload)) {
        state.favs = state.favs.filter((fav) => fav !== action.payload);
      } else {
        state.favs.push(action.payload);
      }
    },

    setFavsError: (state, action: PayloadAction<string>) => {
      state.favs = state.favs.filter((fav) => fav !== action.payload);
    },
  },
});

export const { setUser, setFavs, setFavsError, setFavsReq, setUserReq } =
  userSlice.actions;

export default userSlice.reducer;
