import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setTokenToCookie } from 'src/hooks/useAuth'
import {
  TBook,
  TReducer,
  TToken,
  TUserData
} from 'src/types/store'
import {
  TBuyBooks,
  TUploadBook,
  TBookPayload
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

    passwordRecoveryAction: (state, { type }: PayloadAction<TToken>) => void (state.lastReqType = type),

    setUserDataAction: (state, { type }: PayloadAction<TToken>) => void (state.lastReqType = type),

    addToBasketAction: (state, { type }: PayloadAction<TBookPayload>) => void (state.lastReqType = type),

    delFromBasketAction: (state, { type }: PayloadAction<TBookPayload>) => void (state.lastReqType = type),

    setUserToken: (state, { payload }: PayloadAction<TToken>) => ({ ...state, ...payload }),

    uploadBookAction: (state, { type }: PayloadAction<TUploadBook>) => void (state.lastReqType = type),

    buyBooksAction: (state, { type }: PayloadAction<TBuyBooks>) => void (state.lastReqType = type),

    setUserData: (state, { payload }: PayloadAction<TUserData>) => ({ ...state, ...payload }),

    delUserData: () => {
      setTokenToCookie()
      return initialState
    },

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
  setUserToken,
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
