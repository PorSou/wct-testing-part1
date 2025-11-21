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

import cartReducer from "./features/cart/cartSlice";
import favoriteReducer from "./features/favorite/favoriteSlice";
import searchReducer from "./features/search/searchSlice";
import authReducer from "./features/auth/authSlice";
import orderReducer from "./features/order/orderSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "favorite", "order"], // 👈 Added order here
};

const rootReducer = combineReducers({
  cart: cartReducer,
  favorite: favoriteReducer,
  search: searchReducer,
  auth: authReducer, // 🔹 Auth is NOT persisted (Firebase handles it)
  order: orderReducer, // 🔹 Now persisted
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
