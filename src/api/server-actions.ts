import {
  TSigninReq,
  TSignupReq,
  TBuyBookReq,
  TGetUserReq,
  TUploadBookReq,
  TAddToBasketReq,
  TDelFromBasketReq,
  TPasswordRecoveryReq, TGetShopBooks
} from '../types/api'

export const signinReq: TSigninReq = ({ token }) => ({
  url: '/signin',
  method: 'POST',
  token
})

export const signupReq: TSignupReq = ({ token }) => ({
  url: '/signup',
  method: 'POST',
  token
})

export const getUserReq: TGetUserReq = ({ token }) => ({
  url: '/user',
  method: 'GET',
  token
})
export const passwordRecoveryReq: TPasswordRecoveryReq = ({ token }) => ({
  url: '/password-recovery',
  method: 'POST',
  token
})

export const addToBasketReq: TAddToBasketReq = ({ token, book: body }) => ({
  url: 'user/basket/add',
  method: 'POST',
  body,
  token
})

export const delFromBasketReq: TDelFromBasketReq = ({ token, book: body }) => ({
  url: 'user/basket/delete',
  method: 'DELETE',
  body,
  token
})

export const uploadBookReq: TUploadBookReq = ({ token, book: body }) => ({
  url: 'user/upload',
  method: 'POST',
  body,
  token
})

export const buyBookReq: TBuyBookReq = ({ token, basket: body }) => ({
  url: 'user/buy',
  method: 'POST',
  body,
  token
})

export const getShopBooksReq: TGetShopBooks = body => ({
  url: 'shop',
  method: 'POST',
  body
})
