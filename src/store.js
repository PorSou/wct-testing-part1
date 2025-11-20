import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Reducers
import cartReducer from "./features/cart/cartSlice";
import favoriteReducer from "./features/favorite/favoriteSlice";
import searchReducer from "./features/search/searchSlice";
import authReducer from "./features/auth/authSlice"; // 🔹 Firebase Authentication

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "favorite"], // 🔹 auth is NOT persisted (security & freshness)
};

// Combine reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  favorite: favoriteReducer,
  search: searchReducer,
  auth: authReducer, // 🔹 Auth works normally (not persisted)
});

// Apply persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store configuration
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Persistor
export const persistor = persistStore(store);

export default store;
