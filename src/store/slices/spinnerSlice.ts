import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  TReducer,
  TSpinner, TSpinnerPayload
} from 'src/types/store'

const initialState: TSpinner = {
  spin: false,
  message: null,
  error: false
}

export const spinnerSlice = createSlice({
  name: 'spinner',
  initialState,
  reducers: {
    startSpin: () => ({ spin: true, message: null, error: false }),

    stopSpin: (state, { payload }: PayloadAction<TSpinnerPayload>) => ({ spin: false, ...payload })
  }
})

export const {
  startSpin,
  stopSpin
} = spinnerSlice.actions

export const spinnerSelector = (state: TReducer) => state.spinnerSlice
