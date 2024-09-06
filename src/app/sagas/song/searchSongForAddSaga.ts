import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  searchRequestForAddSuccess,
  searchRequestForAdd,
} from "../../features/song/songSlice";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { RootState } from "../..";

interface ApiResponse {
  data: {
    data: Array<{
      type: string;
    }>;
  };
}

// Worker function
function* workSearch() {
  try {
    const { query } = yield select((state: RootState) => state.song);

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
      yield put(searchRequestForAddSuccess(formattedResponse));
    } else {
      throw new Error("Failed to fetch");
    }
  } catch (err: any) {
    // yield put(searchRequestFailure(err.message));
  }
}

// Search saga
function* searchRequestForAddSaga() {
  yield takeEvery(searchRequestForAdd.type, workSearch);
}

export default searchRequestForAddSaga;
