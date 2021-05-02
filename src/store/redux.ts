import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { uploadPhotos, userSlice } from "./userSlice"
import { errorSlice } from "./errorSlice"
import { loadingSlice } from "./loadingSlice"
import { bufferSlice } from "./bufferSlice"
import { prevUserState } from "./prevUserState"
import { tokenSlice } from "./tokenSlice"

export const rootReducer = combineReducers({
  userSlice: userSlice.reducer,
  errorSlice: errorSlice.reducer,
  loadingSlice: loadingSlice.reducer,
  bufferSlice: bufferSlice.reducer,
  prevUserState: prevUserState.reducer,
  tokenSlice: tokenSlice.reducer
})
