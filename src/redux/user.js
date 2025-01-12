// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: "",
  userData: "",
  role: "admin",
  // game: {
  //   label: "All",
  //   value: "",
  // },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    // setGameId: (state, action) => {
    //   state.gameId = action.payload;
    // },
    setUserData: (state, action) => {
      state.userData = {
        ...state.userData,
        ...action.payload,
      };
    },
  },
});

export const { setAuth, setUserData } = userSlice.actions;

export default userSlice.reducer;
