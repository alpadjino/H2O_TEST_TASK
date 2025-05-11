import { configureStore } from "@reduxjs/toolkit";
import { rtkQueryApi } from './rtkQueryApi';

const store = configureStore({
  reducer: {
    [rtkQueryApi.reducerPath]: rtkQueryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([rtkQueryApi.middleware]),
});

export default store;
