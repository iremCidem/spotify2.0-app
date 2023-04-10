import { configureStore } from "@reduxjs/toolkit";
import { albumsReducer } from "./slices/albumSlice";
import { addAlbum, removeAlbum } from "./slices/albumSlice";
export const store = configureStore({
  reducer: {
    albums: albumsReducer,
  },
});
export { addAlbum, removeAlbum };
