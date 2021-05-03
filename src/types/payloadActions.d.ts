import { TBook } from './store'
import { TAdminBookLoader, TUsersBookLoader } from './bookLoader'

export type TAddToBasket = {
  token: string
  book: TBook
}

export type TDelFromBasket = {
  token: string
  id: number
}

export type TUploadBook = {
  token: string
  book: TUsersBookLoader | TAdminBookLoader
}

export type TBuyBooks = {
  token: string
  basket: TBook[]
}
