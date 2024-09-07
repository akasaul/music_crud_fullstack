import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "./features/auth/authSlice";
import songReducer from "./features/song/songSlice";
import statsReducer from "./features/stats/statsSlice";
import rootSaga from "./sagas/rootSaga";

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    song: songReducer,
    stats: statsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga),
});

saga.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
