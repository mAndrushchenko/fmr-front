import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  TBook,
  TReducer,
  TAuthUser,
  TCandidate,
  TUserData,
  TUserEmail,
  TAuthUserByToken
} from '@types-fmr/store'
import {
  TBuyBooks,
  TUploadBook,
  TAddToBasket,
  TDelFromBasket
} from '@types-fmr/payloadActions'

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
    loginUserReq: (state, action: PayloadAction<TAuthUser>) => ({
      ...state, lastReqType: action.type
    }),

    loginUserByTokenReq: (state, action: PayloadAction<TAuthUserByToken>) => ({
      ...state, lastReqType: action.type
    }),

    registerUserReq: (state, action: PayloadAction<TCandidate>) => ({
      ...state, lastReqType: action.type
    }),

    changePasswordReq: (state, action: PayloadAction<TUserEmail>) => ({
      ...state, lastReqType: action.type
    }),

    setUserData: (state, action: PayloadAction<TUserData>) => action.payload,

    addToBasketReq: (state, action: PayloadAction<TAddToBasket>) => ({
      ...state, lastReqType: action.type
    }),

    addToBasket: (state, action: PayloadAction<TBook>) => ({
      ...state, basket: [ ...state.basket, action.payload ]
    }),

    delFromBasketReq: (state, action: PayloadAction<TDelFromBasket>) => ({
      ...state, lastReqType: action.type
    }),

    delFromBasket: (state, action: PayloadAction<{ id: number }>) => ({
      ...state,
      basket: state.basket.filter(book => book.id !== action.payload.id)
    }),

    uploadBookReq: (state, action: PayloadAction<TUploadBook>) => ({
      ...state, lastReqType: action.type
    }),

    uploadBook: (state, action: PayloadAction<TBook>) => ({
      ...state, uploadedBooks: [ ...state.uploadedBooks, action.payload ]
    }),

    buyBooksReq: (state, action: PayloadAction<TBuyBooks>) => ({
      ...state, lastReqType: action.type
    }),

    buyBooks: (state, action: PayloadAction<TBook[]>) => ({
      ...state, purchasedBooks: [ ...state.purchasedBooks, ...action.payload ]
    })
  }
})

export const {
  buyBooks,
  uploadBook,
  buyBooksReq,
  addToBasket,
  setUserData,
  loginUserReq,
  delFromBasket,
  uploadBookReq,
  addToBasketReq,
  registerUserReq,
  delFromBasketReq,
  changePasswordReq,
  loginUserByTokenReq
} = userSlice.actions

export const userSelector = (state: TReducer) => state.userSlice
