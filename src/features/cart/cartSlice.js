import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exists = state.items.find((p) => p.id === item.id);

      if (exists) {
        // If item exists, increase quantity
        exists.quantity += 1;
      } else {
        // If new item, add it with quantity 1
        state.items.push({ ...item, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find((p) => p.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find((p) => p.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        // Remove item if quantity would be 0
        state.items = state.items.filter((p) => p.id !== action.payload);
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
