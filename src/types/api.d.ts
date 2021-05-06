import { TAuthUser, TBook, TShopFilters, TUserData } from 'src/types/store'
import { TAdminBookLoader, TUsersBookLoader } from 'src/types/bookLoader'
import { TAddToBasket, TBuyBooks, TDelFromBasket, TUploadBook } from './payloadActions'

// request types

export interface IEndpoint {
  url: string
  method: string
  body?: string | Blob |
    TBook | TUsersBookLoader |
    TAdminBookLoader | TBook[] |
    TShopFilters
  token?: string
  fd?: FormData
}

export interface IHeaders {
  [headerName: string]: string;
}

// response types

type TResInformation = {
  message: string
  status: boolean
}

export type TUserDataRes = TResInformation & {
  data: TUserData
}

export type TEmptyRes = TResInformation & {
  data: null
}

export type TBookRes = TResInformation & {
  data: TBook
}

export type TBooksRes = TResInformation & {
  data: TBook[]
}

export type TResponse = TUserDataRes | TEmptyRes | TBookRes | TBooksRes

// server actions types

export type TSigninReq = ({ token }: TAuthUser) => ({
  url: '/signin',
  method: 'POST',
  token: string
})

export type TSignupReq = ({token}: TAuthUser) => ({
  url: '/signup',
  method: 'POST',
  token: string
})

export type TGetUserReq = ({ token }:TAuthUser) => ({
  url: '/user',
  method: 'GET',
  token: string
})

export type TPasswordRecoveryReq = ({ token }: TAuthUser) =>  ({
  url: '/password-recovery',
  method: 'POST',
  token: string
})

export type TAddToBasketReq = ({ token, book: body }: TAddToBasket) => ({
  url: 'user/basket/add',
  method: 'POST',
  body: TBook,
  token: string
})

export type TDelFromBasketReq = ({ token, book: body }: TDelFromBasket) => ({
  url: 'user/basket/delete',
  method: 'DELETE',
  body: TBook,
  token: string
})

export type TUploadBookReq = ({ token, book: body }: TUploadBook) => ({
  url: 'user/upload',
  method: 'POST',
  body: TUsersBookLoader | TAdminBookLoader,
  token: string
})

export type TBuyBookReq = ({ token, basket: body }: TBuyBooks) => ({
  url: 'user/buy',
  method: 'POST',
  body: TBook[],
  token: string
})

export type TGetShopBooks = (filters : TShopFilters) => ({
  url: 'shop',
  method: 'POST',
  body: TShopFilters,
})

export type TUserServerActions = TSigninReq |
  TBuyBookReq | TGetUserReq | TUploadBookReq |
  TAddToBasketReq |  TDelFromBasketReq |
  TPasswordRecoveryReq