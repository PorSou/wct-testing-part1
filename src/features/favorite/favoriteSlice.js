import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const item = action.payload;
      const exists = state.items.find((p) => p.id === item.id);
      if (exists) {
        state.items = state.items.filter((p) => p.id !== item.id);
      } else {
        state.items.push(item);
      }
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
