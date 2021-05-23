import type {
  TSigninReq,
  TSignupReq,
  TGetBookReq,
  TBuyBookReq,
  TGetUserReq,
  TGetShopBooks,
  TUploadBookReq,
  TAddToBasketReq,
  TDelFromBasketReq,
  TPasswordRecoveryReq
} from 'src/types/api'

export const signinReq: TSigninReq = ({ token }) => ({
  url: '/signin',
  method: 'POST',
  token
})

export const signupReq: TSignupReq = () => ({
  url: '/signup',
  method: 'POST'
})

export const getUserReq: TGetUserReq = () => ({
  url: '/user',
  method: 'GET'
})

export const passwordRecoveryReq: TPasswordRecoveryReq = ({ token }) => ({
  url: '/password-recovery',
  method: 'POST',
  token
})

export const addToBasketReq: TAddToBasketReq = ({ book: body }) => ({
  url: 'user/basket/add',
  method: 'POST',
  body
})

export const delFromBasketReq: TDelFromBasketReq = ({ book: body }) => ({
  url: 'user/basket/delete',
  method: 'DELETE',
  body
})

export const uploadBookReq: TUploadBookReq = ({ book: fd }) => ({
  url: 'user/upload',
  method: 'PUT',
  fd
})

export const buyBookReq: TBuyBookReq = ({ basket: body }) => ({
  url: 'user/buy',
  method: 'POST',
  body
})

export const getShopBooksReq: TGetShopBooks = body => ({
  url: 'shop',
  method: 'POST',
  body
})

export const getReaderBookReq: TGetBookReq = ({
  id,
  cacheSize,
  selectedPage
}) => ({
  url: `reader?bookId=${id}&page=${selectedPage}&cache=${cacheSize}`,
  method: 'GET'
})
