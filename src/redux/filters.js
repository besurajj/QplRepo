import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  startDate: "",
  endDate: "",
  gameId: "",
};
const filtersSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    setFilters: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },

    resetFilters: () => initialState,
  },
});

export const { setFilters, resetFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
