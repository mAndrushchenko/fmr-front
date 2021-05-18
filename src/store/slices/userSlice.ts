import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  TBook,
  TReducer,
  TToken,
  TUserData,
  TUserEmail
} from 'src/types/store'
import {
  TBuyBooks,
  TUploadBook,
  TBookWithToken
} from 'src/types/payloadActions'

const initialState: TUserData = {
  token: '',
  name: '',
  lastReqType: '',
  isAdmin: false,
  basket: [],
  uploadedBooks: [],
  purchasedBooks: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signinUserAction: (state, { type }: PayloadAction<TToken>) => void (state.lastReqType = type),

    signupUserAction: (state, { type }: PayloadAction<TToken>) => void (state.lastReqType = type),

    passwordRecoveryAction: (state, { type }: PayloadAction<TUserEmail>) => void (state.lastReqType = type),

    setUserDataAction: (state, { type }: PayloadAction<TToken>) => void (state.lastReqType = type),

    addToBasketAction: (state, { type }: PayloadAction<TBookWithToken>) => void (state.lastReqType = type),

    delFromBasketAction: (state, { type }: PayloadAction<TBookWithToken>) => void (state.lastReqType = type),

    uploadBookAction: (state, { type }: PayloadAction<TUploadBook>) => void (state.lastReqType = type),

    buyBooksAction: (state, { type }: PayloadAction<TBuyBooks>) => void (state.lastReqType = type),

    setUserData: (state, { payload }: PayloadAction<TUserData>) => payload,

    delUserData: () => initialState,

    addToBasket: (state, { payload }: PayloadAction<TBook>) => {
      state.basket = [ ...state.basket, payload ]
    },

    delFromBasket: (state, { payload }: PayloadAction<TBook>) => {
      state.basket = state.basket.filter(book => book.id !== payload.id)
    },

    uploadBook: (state, { payload }: PayloadAction<TBook>) => {
      state.uploadedBooks = [ ...state.uploadedBooks, payload ]
    },

    buyBooks: (state, { payload }: PayloadAction<TBook[]>) => ({
      ...state, purchasedBooks: [ ...state.purchasedBooks, ...payload ]
    })
  }
})

export const {
  buyBooks,
  uploadBook,
  addToBasket,
  setUserData,
  delUserData,
  delFromBasket,
  buyBooksAction,
  signinUserAction,
  signupUserAction,
  uploadBookAction,
  addToBasketAction,
  setUserDataAction,
  delFromBasketAction,
  passwordRecoveryAction
} = userSlice.actions

export const userSelector = (state: TReducer) => state.userSlice
