import {
  TAdminBookLoader,
  TBookDataLoader,
  TBookImageLoader,
  TBookInfoLoader,
  TUsersBookLoader
} from 'src/types/bookLoader'
import {
  TBook,
  TToken,
  TUserData,
  TReaderBook,
  TShopFilters,
  TShopBook,
  TReaderBookPages
} from 'src/types/store'
import {
  TBuyBooks,
  TGetReaderBook,
  TBookPayload,
  TGetBookPages,
  TUpdateBookProgress,
  TUploadInfo,
  TUploadData,
  TUploadImage
} from './payloadActions'

// request types

type TGet = { method: 'GET' }
type TPut = { method: 'PUT' }
type TPatch = { method: 'PATCH' }
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

export type TBookPagesRes = TResInformation & {
  data: TReaderBookPages
}

export type TResponse = TUserDataRes | TEmptyRes | TBookRes | TBooksRes | TReaderRes

// server actions types
// user
export type TSigninReq = ({ token }: TToken) => (TToken & TPost & { url: '/signin' })

export type TSignupReq = () => (TPost & { url: '/signup' })

export type TGetUserReq = ({ token }: TToken) => (TToken & TGet & { url: '/user' })

export type TPasswordRecoveryReq = ({ token }: TToken) => (TToken & TPost & { url: '/password-recovery' })

export type TAddToBasketReq = ({ book }: TBookPayload) => (TPost & {
  url: 'user/basket/add',
  body: TBook,
})

export type TDelFromBasketReq = ({ book }: TBookPayload) => (TDelete & {
  url: 'user/basket/delete',
  body: TBook,
})

export type TUploadBookInfoReq = ({ bookInfo }: TUploadInfo) => (TPost & {
  url: 'user/upload/info',
  body: TBookInfoLoader,
})

export type TUploadBookDataReq = ({ bookData }: TUploadData) => (TPost & {
  url: 'user/upload/data',
  fd: TBookDataLoader
})

export type TUploadBookImageReq = ({ bookImage }: TUploadImage) => (TPost & {
  url: 'user/upload/image',
  fd: TBookImageLoader,
})

export type TBuyBookReq = ({ basket }: TBuyBooks) => (TPost & {
  url: 'user/buy',
  body: TBook[],
})

export type TUserServerActions = TSigninReq | TSignupReq |
  TBuyBookReq | TGetUserReq | TUploadBookInfoReq |
  TUploadBookDataReq | TUploadBookImageReq |
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
  id
}: TGetReaderBook) => (TGet & {
  url: string,
})

export type TGetBookPagesReq = ({
  id,
  index,
  count
}: TGetBookPages) => (TGet & {
  url: string
})

export type TUpdateBookProgressReq = ({
  id,
  selectedWord
}: TUpdateBookProgress) => (TPatch & {
  url: string,
  body: {
    selectedWord: number
  }
})
