import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAudio: new Audio(),
  audioList: [],
  combination: null,
}

export const audioSlice = createSlice({
  name: "audio",
  initialState: initialState,
  reducers: {
    setList: (state, action) => {
      state.audioList = action.payload;
      state.currentAudio = state.audioList[0];
    },
    setById: (state, action) => {
      state.currentAudio = state.audioList[action.payload];
    },
    setCombination: (state, action) => {
      state.combination = action.payload;
    }
  }
})

export const {
  setList, setById, setCombination
} = audioSlice.actions;

export default audioSlice.reducer
