import { TToken, TBook, TId, TReaderCacheSize, TReaderSelectedPage, TUserEmail } from './store'
import { TAdminBookLoader, TUsersBookLoader } from './bookLoader'

export type TBookWithToken = TToken & {
  book: TBook
}

// export type TIdWithToken = TToken & TId

export type TGetReaderBook = TBookWithToken & TReaderCacheSize & TReaderSelectedPage & TId

export type TUploadBook = TToken & {
  book: TUsersBookLoader | TAdminBookLoader
}

export type TBuyBooks = TToken & {
  basket: TBook[]
}

export type TUserActionPayload = TToken | TUserEmail | TBookWithToken | TUploadBook | TBuyBooks

// reader

// export type TPagesWithToken = TToken & TReaderSelectedPage & TReaderCacheSize & TId

export type TGetPagesWithToken = TToken & TReaderSelectedPage & TReaderCacheSize
