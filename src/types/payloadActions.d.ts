import { TToken, TBook, TId, TReaderCacheSize, TReaderSelectedPage, TUserEmail } from './store'
import { TAdminBookLoader, TUsersBookLoader } from './bookLoader'

export type TBookPayload = {
  book: TBook
}

// export type TIdWithToken = TId

export type TUploadBook = {
  book: TUsersBookLoader | TAdminBookLoader
}

export type TBuyBooks = {
  basket: TBook[]
}

export type TUserActionPayload = TToken | TUserEmail | TBookPayload | TUploadBook | TBuyBooks | void

// reader

// export type TPagesWithToken = TReaderSelectedPage & TReaderCacheSize & TId

export type TGetReaderBook = TId & Partial<TReaderCacheSize>

export type TGetBookPages = TId & TGetBookPagesPayload

export type TUpdateBookProgress = TId & {
  selectedWord: number
}

export type TGetBookPagesPayload = {
  index: number
  count?: number
}
