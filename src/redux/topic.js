import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: "",
  selectedTopic: null,
};

const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
    setTopicData: (state, action) => {
      state.selectedTopic = action.payload;
    },
  },
});

export const { setData, setTopicData } = topicSlice.actions;

export default topicSlice.reducer;
