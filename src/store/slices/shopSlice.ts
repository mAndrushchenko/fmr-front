import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  TShop,
  TReducer,
  TShopBook,
  TShopFilters
} from 'src/types/store'

const initialState: TShop = {
  books: [],
  filters: {
    author: null,
    genre: null,
    price: null,
    searchPhrase: null,
    year: null
  },
  lastReqType: null
}

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    getBooksAction: (state, { type }: PayloadAction<TShopFilters>) => void (state.lastReqType = type),

    setShopBooks: (state, { payload }: PayloadAction<TShopBook[]>) => void (state.books = payload),

    setShopFilters: (state, { payload }: PayloadAction<TShopFilters>) => void (state.filters = payload)
  }
})

export const {
  setShopBooks,
  setShopFilters,
  getBooksAction
} = shopSlice.actions

export const shopSelector = (state: TReducer) => state.shopSlice
