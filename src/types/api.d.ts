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
  TBookPayload
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

export type TSignupReq = () => (TPost & { url: '/signup' })

export type TGetUserReq = () => (TGet & { url: '/user' })

export type TPasswordRecoveryReq = ({ token }: TToken) => (TToken & TPost & { url: '/password-recovery' })

export type TAddToBasketReq = ({ book }: TBookPayload) => (TPost & {
  url: 'user/basket/add',
  body: TBook,
})

export type TDelFromBasketReq = ({ book }: TBookPayload) => (TDelete & {
  url: 'user/basket/delete',
  body: TBook,
})

export type TUploadBookReq = ({ book }: TUploadBook) => (TPut & {
  url: 'user/upload',
  fd: TUsersBookLoader | TAdminBookLoader,
})

export type TBuyBookReq = ({ basket }: TBuyBooks) => (TPost & {
  url: 'user/buy',
  body: TBook[],
})

export type TUserServerActions = TSigninReq | TSignupReq |
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

export type TGetBookReq = ({
  cacheSize,
  selectedPage,
  id
} : TGetReaderBook) => (TGet & {
  url: string,
})
