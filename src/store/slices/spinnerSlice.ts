import { createSlice } from '@reduxjs/toolkit'
import {
  TReducer,
  TSpinner
} from 'src/types/store'

const initialState: TSpinner = {
  spin: false
}

export const spinnerSlice = createSlice({
  name: 'spinner',
  initialState,
  reducers: {
    startSpin: () => ({ spin: true }),

    stopSpin: () => ({ spin: false })
  }
})

export const {
  startSpin,
  stopSpin
} = spinnerSlice.actions

export const spinnerSelector = (state: TReducer) => state.spinnerSlice
