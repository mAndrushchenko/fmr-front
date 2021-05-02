import { rootReducer, store } from 'bla bla bla/src/store/configure-store'

export type TReducer = ReturnType<typeof rootReducer>

export type TAppDispatch = typeof store.dispatch

export type TAuthUser = {
  name: string
  token: string
  ownBookList: TBook[]
  basket: TBook[]
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
