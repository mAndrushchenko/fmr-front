import { combineReducers } from '@reduxjs/toolkit'
import { userSlice } from './slices/userSlice'
import { shopSlice } from './slices/shopSlice'
import { readerSlice } from './slices/readerSlice'
import { spinnerSlice } from './slices/spinnerSlice'
import { myBooksSlice } from './slices/myBooksSlice'

export const rootReducer = combineReducers({
  userSlice: userSlice.reducer,
  shopSlice: shopSlice.reducer,
  readerSlice: readerSlice.reducer,
  spinnerSlice: spinnerSlice.reducer,
  myBooksSlice: myBooksSlice.reducer
})
