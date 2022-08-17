import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAudio: { source: 'tr.mp3' },
  audioSource: new Audio(),
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
    },
    setAudioSource: (state, action) => {
      state.audioSource = action.payload;
    }
  }
})

export const {
  setList, setById, setCombination, setAudioSource
} = audioSlice.actions;

export default audioSlice.reducer
