// examSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  exams: [], // Array to store exams
  currentExam: null, // To store current selected exam's data
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    // Action to set the list of exams
    setExams: (state, action) => {
      state.exams = action.payload;
    },
    // Action to set the current exam data
    setCurrentExam: (state, action) => {
      state.currentExam = action.payload;
    },
    // Action to update questions for a specific exam
    setExamQuestions: (state, action) => {
      if (state.currentExam) {
        state.currentExam.questions = action.payload;
      }
    },
    setSelectedSubject: (state, action) => {
      state.selectedSubject = action.payload;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
  },
});

export const {
  setExams,
  setCurrentExam,
  setExamQuestions,
  setSelectedSubject,
  setQuestions,
} = examSlice.actions;

export default examSlice.reducer;
