import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  TBook,
  TShop,
  TReducer,
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
    getBooksAction: (state, action: PayloadAction<TShopFilters>) => ({
      ...state, lastReqType: action.type
    }),

    setShopBooks: (state, action: PayloadAction<TBook[]>) => ({
      ...state, books: action.payload
    }),

    setShopFilters: (state, action: PayloadAction<TShopFilters>) => ({
      ...state, filters: action.payload
    })
  }
})

export const {
  setShopBooks,
  setShopFilters,
  getBooksAction
} = shopSlice.actions

export const shopSelector = (state: TReducer) => state.shopSlice
