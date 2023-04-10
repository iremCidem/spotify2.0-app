import { createSlice, nanoid } from "@reduxjs/toolkit";
export const albumSlice = createSlice({
  name: "albums",
  initialState: {
    AlbumsList: [],
  },
  reducers: {
    addAlbum: (state, action) => {
      state.AlbumsList.push({ item: action.payload, id: nanoid() });
    },
    removeAlbum: (state, action) => {
      const filtered = state.AlbumsList.filter(
        (item) => item.item.id !== action.payload.id
      );
      state.AlbumsList = filtered;
    },
  },
});
export const { addAlbum, removeAlbum } = albumSlice.actions;
export const albumsReducer = albumSlice.reducer;
