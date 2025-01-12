import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import createRootReducer from "./rootReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["exam", "topic", "user"],
};
const rootReducer = createRootReducer();

// persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store
const reduxStorage = () => {
  let store = configureStore({
    reducer: persistedReducer,
  });
  let persistor = persistStore(store);
  return { store, persistor };
};

export default reduxStorage;
