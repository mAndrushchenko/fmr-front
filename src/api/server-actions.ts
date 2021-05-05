import { TAuthUser } from 'src/types/store'
import {
  TBuyBooks,
  TUploadBook,
  TAddToBasket,
  TDelFromBasket
} from 'src/types/payloadActions'

export const signinReq = ({ token }: TAuthUser) => ({
  url: '/signin',
  method: 'POST',
  token
})

export const signupReq = ({ token }: TAuthUser) => ({
  url: '/signup',
  method: 'POST',
  token
})

export const getUserReq = ({ token }: TAuthUser) => ({
  url: '/user',
  method: 'GET',
  token
})

export const passwordRecoveryReq = ({ token }: TAuthUser) => ({
  url: '/password-recovery',
  method: 'POST',
  token
})

export const addToBasketReq = ({ token, book: body }: TAddToBasket) => ({
  url: 'user/basket/add',
  method: 'POST',
  body,
  token
})

export const delFromBasketReq = ({ token, book: body }: TDelFromBasket) => ({
  url: 'user/basket/delete',
  method: 'DELETE',
  body,
  token
})

export const uploadBookReq = ({ token, book: body }: TUploadBook) => ({
  url: 'user/upload',
  method: 'POST',
  body,
  token
})

export const buyBookReq = ({ token, basket: body }: TBuyBooks) => ({
  url: 'user/buy',
  method: 'POST',
  body,
  token
})
