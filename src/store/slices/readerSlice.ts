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
    getBookAction: (state, action: PayloadAction<TGetReaderBook>) => ({
      ...state, lastReqType: action.type
    }),

    setReaderPages: (state, action: PayloadAction<TBookPage[]>) => ({
      ...state, pages: action.payload
    }),

    setReaderPage: (state, action: PayloadAction<TReaderSelectedPage>) => ({
      ...state, ...action.payload
    }),

    setReaderWord: (state, action: PayloadAction<TReaderSelectedWord>) => ({
      ...state, ...action.payload
    }),

    setCacheSize: (state, action: PayloadAction<TReaderCacheSize>) => ({
      ...state, ...action.payload
    }),

    setReaderBook: (state, action: PayloadAction<TReaderBook>) => ({
      ...state,
      selectedPage: 0,
      selectedWord: 0,
      totalPages: action.payload.totalPages,
      book: action.payload.book,
      pages: action.payload.pages
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
