import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  searchRequest,
  searchRequestFailure,
  searchRequestSuccess,
  reset,
} from "../../features/song/songSlice";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
//
// Define the structure of the API response
interface ApiResponse {
  data: {
    data: Array<{
      type: string;
      // Add other properties you expect from the API response here
    }>;
  };
}

import { takeEvery } from "redux-saga/effects";

// Define the structure of the state
interface SongState {
  query: string;
}

// Worker function
function* workSearch() {
  try {
    const { query }: SongState = yield select(
      (state: { song: SongState }) => state.song,
    );

    const {
      VITE_X_RAPID_API_HOST,
      VITE_X_RAPID_API_URL,
      VITE_X_RAPID_API_KEY,
    } = import.meta.env;

    const options: AxiosRequestConfig = {
      method: "GET",
      url: VITE_X_RAPID_API_URL,
      params: { q: query },
      headers: {
        "X-RapidAPI-Key": VITE_X_RAPID_API_KEY,
        "X-RapidAPI-Host": VITE_X_RAPID_API_HOST,
      },
    };

    const res: AxiosResponse<ApiResponse> = yield call(() =>
      axios.request(options),
    );

    let formattedResponse: Array<any> = []; // Adjust the type based on your expected data

    if (res.status === 200) {
      formattedResponse = res.data.data.filter((item) => item.type === "track");
      formattedResponse = formattedResponse.slice(0, 10);
      yield put(searchRequestSuccess(formattedResponse));
    } else {
      throw new Error("Failed to fetch");
    }
  } catch (err: any) {
    yield put(searchRequestFailure(err.message));
  }
}

// Search saga
function* searchSaga() {
  yield takeEvery(searchRequest.type, workSearch);
}

export default searchSaga;
