import { TAdminBookLoader, TUsersBookLoader } from 'src/types/bookLoader'
import {
  TBook,
  TToken,
  TUserData,
  TReaderBook,
  TShopFilters, TShopBook
} from 'src/types/store'
import {
  TBuyBooks,
  TUploadBook,
  TGetReaderBook,
  TBookWithToken
} from './payloadActions'

// request types

type TGet = { method: 'GET' }
type TPut = { method: 'PUT' }
type TPost = { method: 'POST' }
type TDelete = { method: 'DELETE' }

export interface IEndpoint {
  url: string
  method: string
  token?: string
  fd?: TUsersBookLoader | TAdminBookLoader
  body?: string | TBook | TBook[] | TShopFilters
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
  data: TShopBook[]
}

export type TReaderRes = TResInformation & {
  data: TReaderBook
}

export type TResponse = TUserDataRes | TEmptyRes | TBookRes | TBooksRes | TReaderRes

// server actions types
// user
export type TSigninReq = ({ token }: TToken) => (TToken & TPost & { url: '/signin' })

export type TSignupReq = ({ token }: TToken) => (TToken & TPost & { url: '/signup' })

export type TGetUserReq = ({ token }: TToken) => (TToken & TGet & { url: '/user' })

export type TPasswordRecoveryReq = ({ token }: TToken) => (TToken & TPost & { url: '/password-recovery' })

export type TAddToBasketReq = ({ token, book }: TBookWithToken) => (TToken & TPost & {
  url: 'user/basket/add',
  body: TBook,
})

export type TDelFromBasketReq = ({ token, book }: TBookWithToken) => (TToken & TDelete & {
  url: 'user/basket/delete',
  body: TBook,
})

export type TUploadBookReq = ({ token, book }: TUploadBook) => (TToken & TPut & {
  url: 'user/upload',
  fd: TUsersBookLoader | TAdminBookLoader,
})

export type TBuyBookReq = ({ token, basket }: TBuyBooks) => (TToken & TPost & {
  url: 'user/buy',
  body: TBook[],
})

export type TUserServerActions = TSigninReq |
  TBuyBookReq | TGetUserReq | TUploadBookReq |
  TAddToBasketReq | TDelFromBasketReq |
  TPasswordRecoveryReq

// shop

export type TGetShopBooks = (filters: TShopFilters) => ({
  url: 'shop',
  method: 'POST',
  body: TShopFilters,
})

// reader

export type TGetBookReq = ({ token, cacheSize, selectedPage, id
} : TGetReaderBook) => (TToken & TGet & {
  url: string,
})


