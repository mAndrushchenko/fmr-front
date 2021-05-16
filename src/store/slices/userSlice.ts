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
    signinUserAction: (state, action: PayloadAction<TToken>) => ({
      ...state, lastReqType: action.type
    }),

    signupUserAction: (state, action: PayloadAction<TToken>) => ({
      ...state, lastReqType: action.type
    }),

    passwordRecoveryAction: (state, action: PayloadAction<TUserEmail>) => ({
      ...state, lastReqType: action.type
    }),

    setUserDataAction: (state, action: PayloadAction<TToken>) => ({
      ...state, lastReqType: action.type
    }),

    addToBasketAction: (state, action: PayloadAction<TBookWithToken>) => ({
      ...state, lastReqType: action.type
    }),

    delFromBasketAction: (state, action: PayloadAction<TBookWithToken>) => ({
      ...state, lastReqType: action.type
    }),

    uploadBookAction: (state, action: PayloadAction<TUploadBook>) => ({
      ...state, lastReqType: action.type
    }),

    buyBooksAction: (state, action: PayloadAction<TBuyBooks>) => ({
      ...state, lastReqType: action.type
    }),

    setUserData: (state, action: PayloadAction<TUserData>) => action.payload,

    addToBasket: (state, action: PayloadAction<TBook>) => ({
      ...state, basket: [ ...state.basket, action.payload ]
    }),

    delFromBasket: (state, action: PayloadAction<TBook>) => ({
      ...state,
      basket: state.basket.filter(book => book.id !== action.payload.id)
    }),

    uploadBook: (state, action: PayloadAction<TBook>) => ({
      ...state, uploadedBooks: [ ...state.uploadedBooks, action.payload ]
    }),

    buyBooks: (state, action: PayloadAction<TBook[]>) => ({
      ...state, purchasedBooks: [ ...state.purchasedBooks, ...action.payload ]
    })
  }
})

export const {
  buyBooks,
  uploadBook,
  addToBasket,
  setUserData,
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
