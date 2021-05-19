import { store } from 'src/store'
import { rootReducer } from 'src/store/redux'

export type TReducer = ReturnType<typeof rootReducer>

export type TAppDispatch = typeof store.dispatch

export type TId = {
  id: number | string
}

export type TCandidate = {
  name: string
  email: string
  password: string
  isAdmin: boolean
  uploadedBooks: TBook[]
  purchasedBooks: TBook[]
  basket: TBook[]
}

export type TToken = {
  token: string
}

export type TUserData = TToken & {
  isAdmin: boolean
  basket: TBook[]
  name: string
  uploadedBooks: TBook[]
  purchasedBooks: TBook[],
  lastReqType: string | null
}

export type TUserEmail = {
  email: string
}

export type TRandomUser = {
  basket: TBook[]
}

export type TUploadBook = {
  name: string
  keywords: string[]
  releaseYear: number
  author: string
  genre: string
  price: number
  description: string
}

export type TBook = TId & TUploadBook

export type TShopFilters = {
  year: number | null
  price: number[] | null
  genre: string | null
  searchPhrase: string | null
  author: string | null
}

export type TBookPage = string[]

export type TReaderSelectedPage = { selectedPage: number }

export type TReaderSelectedWord = { selectedWord: number }

export type TReaderCacheSize = { cacheSize: number }

export type TReaderTotalPages = { totalPages: number }

export type TReaderBook = TReaderTotalPages & {
  pages: TBookPage[]
  book: TBook
}

export type TReaderBookState = TReaderSelectedPage &
  TReaderSelectedWord & TReaderCacheSize & TReaderTotalPages & {
  pages: TBookPage[]
  book: TBook | null,
  lastReqType: string | null
}

export type TFirstLoadBooksLists = {
  popular: TBook[]
  last: TBook[]
  random: TBook[]
}

export type TShop = {
  books: TBook[]
  filters: TShopFilters
  lastReqType: string | null
}


export type TSpinner = {
  spin: boolean
}