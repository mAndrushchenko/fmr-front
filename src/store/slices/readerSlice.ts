import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  TReducer,
  TBookPage,
  TReaderBook,
  TReaderCacheSize,
  TReaderBookState,
  TReaderBookLength,
  TReaderSelectedWord
} from 'src/types/store'
import { TGetReaderBook } from 'src/types/payloadActions'

const testPage = [
  'Pariatur', 'labore', 'labore', 'do',
  'duis', 'ut', 'id', 'magna',
  'magna', 'ea', 'voluptate', 'nulla.',
  'Est', 'nostrud', 'nulla', 'est',
  'quis', 'consequat', 'non', 'proident',
  'aliqua', 'incididunt', 'ut', 'enim',
  'laboris', 'fugiat.', 'Tempor', 'voluptate',
  'deserunt', 'incididunt', 'aute', 'duis',
  'irure', 'laborum', 'laboris', 'aute',
  'commodo', 'ex', 'in.', 'Ullamco',
  'excepteur', 'laborum', 'duis', 'eu',
  'velit', 'esse', 'tempor', 'culpa',
  'esse', 'exercitation', 'et', 'veniam.',
  'Officia', 'reprehenderit', 'nisi', 'ipsum',
  'sint', 'irure', 'est', 'mollit',
  'nulla.'
]

const initialState: TReaderBookState = {
  pages: [ testPage, testPage ],
  book: null,
  selectedWord: 0,
  cacheSize: 3,
  totalPages: 2,
  bookLength: testPage.length * 2,
  lastReqType: null,
  loadingPages: []
}

export const readerSlice = createSlice({
  name: 'reader',
  initialState,
  reducers: {
    getBookAction: (state, action: PayloadAction<TGetReaderBook>) => void (state.lastReqType = action.type),

    setReaderPages: (state, { payload }: PayloadAction<TBookPage[]>) => void (state.pages = payload),

    setReaderWord: (state, { payload }: PayloadAction<TReaderSelectedWord>) => {
      state.selectedWord = payload.selectedWord
    },

    setCacheSize: (state, { payload }: PayloadAction<TReaderCacheSize>) => {
      state.cacheSize = payload.cacheSize
    },

    setBookLength: (state, { payload }: PayloadAction<TReaderBookLength>) => {
      state.bookLength = payload.bookLength
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
  setReaderWord,
  setReaderPages
} = readerSlice.actions

export const readerSelector = (state: TReducer) => state.readerSlice
