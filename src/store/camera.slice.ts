import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type SceneState = {
  isEnabled: boolean
  width: number
  height: number
  x: number
  y: number
}

const initialState: SceneState = {
  isEnabled: false,
  width: 0,
  height: 0,
  x: 0,
  y: 0,
}

export const cameraSlice = createSlice({
  name: 'camera',
  initialState,
  reducers: {
    setCameraPosition: (state, action: PayloadAction<Pick<SceneState, 'width' | 'height' | 'x' | 'y'>>) => {
      state.height = action.payload.height
      state.width = action.payload.width
      state.x = action.payload.x
      state.y = action.payload.y
    },
    toogleCamera: (state, action: PayloadAction<boolean>) => {
      state.isEnabled = action.payload
    }
  }
})

export const { setCameraPosition, toogleCamera } = cameraSlice.actions
