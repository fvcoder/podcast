import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { sceneSlice } from './scene.slice'
import { cameraSlice } from './camera.slice'

export const store = configureStore({
  reducer: {
    [sceneSlice.name]: sceneSlice.reducer,
    [cameraSlice.name]: cameraSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
