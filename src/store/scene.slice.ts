import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IntroState {
  name: 'intro'
}

interface CameraState {
  name: 'camera'
}

export type SceneState = IntroState | CameraState

const initialState: SceneState = {
  name: 'camera'
}

export const sceneSlice = createSlice({
  name: 'scene',
  initialState,
  reducers: {
    setScene: (state, action: PayloadAction<SceneState>) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state = action.payload as any
    }
  }
})

export const { setScene } = sceneSlice.actions
