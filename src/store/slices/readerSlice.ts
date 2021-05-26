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
  pages: {
    0: testPage,
    1: testPage
  },
  book: null,
  selectedWord: 0,
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

    getBookPages: (state, action: PayloadAction<TGetBookPagesPayload>) => void (state.lastReqType = action.type),

    setReaderWord: (state, { payload }: PayloadAction<TReaderSelectedWord>) => {
      state.selectedWord = payload.selectedWord
    },

    setBookLength: (state, { payload }: PayloadAction<TReaderBookLength>) => {
      state.bookLength = payload.bookLength
    },

    setBookPages: (state, { payload }: PayloadAction<TReaderBookPages>) => {
      state.pages = { ...state.pages, ...payload.pages }
    },

    setReaderBook: (state, { payload }: PayloadAction<TReaderBook>) => ({
      ...state,
      selectedWord: payload.selectedWord,
      bookLength: payload.bookLength,
      totalPages: payload.totalPages,
      book: payload.book,
      pages: payload.pages,
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
