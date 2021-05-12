import { combineReducers } from '@reduxjs/toolkit'
import { userSlice } from './slices/userSlice'
import { shopSlice } from './slices/shopSlice'
import { readerSlice } from './slices/readerSlice'

export const rootReducer = combineReducers({
  userSlice: userSlice.reducer,
  shopSlice: shopSlice.reducer,
  readerSlice: readerSlice.reducer
})
