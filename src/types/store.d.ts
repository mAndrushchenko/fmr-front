import { store } from '@store/index'
import { rootReducer } from '@store/redux'

export type TReducer = ReturnType<typeof rootReducer>

export type TAppDispatch = typeof store.dispatch

export type TCandidate = {
  name: string
  email: string
  password: string
  isAdmin: boolean
  uploadedBooks: TBook[]
  purchasedBooks: TBook[]
  basket: TBook[]
}

export type TAuthUser = {
  token: string
}

export type TUserData = {
  token: string
  isAdmin: boolean
  basket: TBook[]
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

export type TBook = {
  id: number
  name: string
  image: string
  keywords: string[]
  releaseYear: number
  author: string
  genre: string
  price: number
}

export type TShopFilters = {
  year: number | null
  price: number | null
  genre: string | null
  searchPhrase: string | null
  author: string | null
}

export type TReaderBook = {
  text: string[]
  book: TBook
}

export type TFirstLoadBooksLists = {
  popular: TBook[]
  last: TBook[]
  random: TBook[]
}
