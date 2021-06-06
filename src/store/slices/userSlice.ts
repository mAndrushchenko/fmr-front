import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setTokenToCookie } from 'src/hooks/useAuth'
import {
  TBook,
  TToken,
  TReducer,
  TUserData
} from 'src/types/store'
import {
  TBuyBooks,
  TBookPayload,
  TUploadInfo,
  TUploadData,
  TUploadImage
} from 'src/types/payloadActions'

const getToken = () => {
  let token: string = ''
  document.cookie.split('; ').forEach((field: string) => {
    const currentField = field.split('=')
    const [ cookieKey, cookieValue ] = currentField
    if (cookieKey === 'token') token = cookieValue
  })
  return token
}

const initialState: TUserData = {
  token: getToken(),
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

    uploadBookInfoAction: (state, { type }: PayloadAction<TUploadInfo>) => void (state.lastReqType = type),

    uploadBookDataAction: (state, { type }: PayloadAction<TUploadData>) => void (state.lastReqType = type),

    uploadBookImageAction: (state, { type }: PayloadAction<TUploadImage>) => void (state.lastReqType = type),

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

    buyBooks: (state, { payload }: PayloadAction<TBook[]>) => ({
      ...state, purchasedBooks: [ ...state.purchasedBooks, ...payload ]
    })
  }
})

export const {
  buyBooks,
  addToBasket,
  setUserData,
  delUserData,
  delFromBasket,
  buyBooksAction,
  signinUserAction,
  signupUserAction,
  uploadBookInfoAction,
  uploadBookDataAction,
  uploadBookImageAction,
  addToBasketAction,
  setUserDataAction,
  delFromBasketAction,
  passwordRecoveryAction
} = userSlice.actions

export const userSelector = (state: TReducer) => state.userSlice
