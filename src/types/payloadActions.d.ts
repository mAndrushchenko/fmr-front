import { TToken, TBook, TId, TReaderCacheSize, TReaderSelectedPage, TUserEmail } from './store'
import { TAdminBookLoader, TUsersBookLoader } from './bookLoader'

export type TBookPayload = {
  book: TBook
}

// export type TIdWithToken = TId

export type TGetReaderBook = TBookPayload & TReaderCacheSize & TReaderSelectedPage & TId

export type TUploadBook = {
  book: TUsersBookLoader | TAdminBookLoader
}

export type TBuyBooks = {
  basket: TBook[]
}

export type TUserActionPayload = TToken | TUserEmail | TBookPayload | TUploadBook | TBuyBooks | void

// reader

// export type TPagesWithToken = TReaderSelectedPage & TReaderCacheSize & TId

export type TGetPagess = TReaderSelectedPage & TReaderCacheSize
