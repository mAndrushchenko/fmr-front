import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  TReducer,
  TBookPage,
  TReaderBook,
  TReaderCacheSize,
  TReaderBookState,
  TReaderSelectedWord,
  TReaderSelectedPage
} from 'src/types/store'
import { TGetReaderBook } from 'src/types/payloadActions'

const initialState: TReaderBookState = {
  pages: [],
  book: null,
  selectedWord: 0,
  selectedPage: 0,
  cacheSize: 3,
  totalPages: 0,
  lastReqType: null
}

export const readerSlice = createSlice({
  name: 'reader',
  initialState,
  reducers: {
    getBookAction: (state, action: PayloadAction<TGetReaderBook>) => void (state.lastReqType = action.type),

    setReaderPages: (state, { payload }: PayloadAction<TBookPage[]>) => void (state.pages = payload),

    setReaderPage: (state, { payload }: PayloadAction<TReaderSelectedPage>) => {
      state.selectedPage = payload.selectedPage
    },

    setReaderWord: (state, { payload }: PayloadAction<TReaderSelectedWord>) => {
      state.selectedWord = payload.selectedWord
    },

    setCacheSize: (state, { payload }: PayloadAction<TReaderCacheSize>) => {
      state.cacheSize = payload.cacheSize
    },

    setReaderBook: (state, { payload }: PayloadAction<TReaderBook>) => ({
      ...state,
      selectedPage: 0,
      selectedWord: 0,
      totalPages: payload.totalPages,
      book: payload.book,
      pages: payload.pages
    })
  }
})

export const {
  getBookAction,
  setReaderBook,
  setReaderPage,
  setReaderWord,
  setReaderPages
} = readerSlice.actions

export const userSelector = (state: TReducer) => state.readerSlice
