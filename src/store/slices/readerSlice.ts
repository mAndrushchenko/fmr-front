import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  TReducer,
  TReaderBook,
  TReaderBookState,
  TReaderBookLength,
  TReaderSelectedWord,
  TReaderBookPages
} from 'src/types/store'
import { TGetBookPagesPayload, TGetReaderBook } from 'src/types/payloadActions'

const initialState: TReaderBookState = {
  pages: {},
  book: null,
  selectedWord: 0,
  totalPages: 0,
  bookLength: 0,
  lastReqType: null,
  loadingPages: []
}

export const readerSlice = createSlice({
  name: 'reader',
  initialState,
  reducers: {
    getBookAction: (state, action: PayloadAction<TGetReaderBook>) => void (state.lastReqType = action.type),

    getBookPages: (state, action: PayloadAction<TGetBookPagesPayload>) => void (state.lastReqType = action.type),

    setReaderWord: (state, { payload }: PayloadAction<TReaderSelectedWord>) => {
      state.selectedWord = payload.selectedWord
    },

    setBookLength: (state, { payload }: PayloadAction<TReaderBookLength>) => {
      state.bookLength = payload.bookLength
    },

    setBookPages: (state, { payload }: PayloadAction<TReaderBookPages['pages']>) => {
      state.pages = { ...state.pages, ...payload }
    },

    setReaderBook: (state, { payload }: PayloadAction<TReaderBook>) => ({
      ...state,
      selectedWord: payload.selectedWord,
      bookLength: +payload.info.bookLength,
      totalPages: Math.floor(+payload.info.bookLength / 300),
      book: payload.info,
      pages: payload.pages ?? {},
      loadingPages: []
    }),

    addLoadingPages: (state, { payload }: PayloadAction<number[]>) => {
      state.loadingPages = state.loadingPages.concat(payload)
    },

    removeLoadingPages: (state, { payload }: PayloadAction<number[]>) => {
      state.loadingPages = state.loadingPages.filter(
        page => !payload.includes(page)
      )
    }
  }
})

export const {
  getBookAction,
  getBookPages,
  setReaderBook,
  setReaderWord,
  setBookPages,
  addLoadingPages,
  removeLoadingPages
} = readerSlice.actions

export const readerSelector = (state: TReducer) => state.readerSlice
