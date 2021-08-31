import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { TMyBook, TMyBookStore } from 'src/types/store'

const initialState: TMyBookStore = {
  books: [],
  lastReqType: null
}

export const myBooksSlice = createSlice({
  name: 'myBooks',
  initialState,
  reducers: {
    getMyBooksAction: (state, { type }: PayloadAction) => {
      state.lastReqType = type
    },

    setMyBooks: (state, { payload }: PayloadAction<TMyBook[]>) => {
      state.books = payload
    }
  }
})

export const {
  getMyBooksAction,
  setMyBooks
} = myBooksSlice.actions
