export const hello = () => "hello from @core";

import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { dataReducer } from "../data";
import { devicesReducer } from "../devices";

const logger = createLogger({});

export const createStore = () =>
  configureStore({
    reducer: {
      devices: devicesReducer,
      data: dataReducer,
    },
    middleware: (getDefaultMiddleware) =>
      [
        ...getDefaultMiddleware(),
        process.env.NODE_ENV === "development" && logger,
      ].filter(Boolean),
  });

export const store = createStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
