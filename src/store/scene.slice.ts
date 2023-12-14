import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IntroState {
  name: 'intro'
}

export type SceneState = IntroState

const initialState = {
  name: 'intro'
}

export const sceneSlice = createSlice({
  name: 'scene',
  initialState,
  reducers: {
    setScene: (state, action: PayloadAction<SceneState>) => {
      state = action.payload
    }
  }
})

export const { setScene } = sceneSlice.actions
