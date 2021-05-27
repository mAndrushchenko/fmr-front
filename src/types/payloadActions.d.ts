import { TToken, TBook, TId, TReaderCacheSize, TReaderSelectedPage, TUserEmail } from './store'
import { TAdminBookLoader, TBookDataLoader, TBookImageLoader, TBookInfoLoader, TUsersBookLoader } from './bookLoader'

export type TBookPayload = {
  book: TBook
}

// export type TIdWithToken = TId

export type TUploadBook = {
  book: TUsersBookLoader | TAdminBookLoader
}

export type TUploadInfo = { bookInfo: TBookInfoLoader }

export type TUploadData = { bookData: TBookDataLoader }

export type TUploadImage = { bookImage: TBookImageLoader }

export type TBuyBooks = {
  basket: TBook[]
}

export type TUserActionPayload = TToken | TUserEmail |
  TBookPayload | TUploadInfo | TUploadData |
  TUploadImage | TBuyBooks | void

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
