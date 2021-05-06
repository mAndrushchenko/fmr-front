import { combineReducers } from '@reduxjs/toolkit'
import { userSlice } from './slices/userSlice'
import { shopSlice } from './slices/shopSlice'

export const rootReducer = combineReducers({
  userSlice: userSlice.reducer,
  shopSlice: shopSlice.reducer
})
