import { configureStore } from '@reduxjs/toolkit';
import audio from './audio';

export const store = configureStore({
  reducer: {
    audio: audio
  }
})
