import { TAuthUser, TBook, TUserEmail } from './store'
import { TAdminBookLoader, TUsersBookLoader } from './bookLoader'

export type TAddToBasket = {
  token: string
  book: TBook
}

export type TDelFromBasket = {
  token: string
  book: TBook
}

export type TUploadBook = {
  token: string
  book: TUsersBookLoader | TAdminBookLoader
}

export type TBuyBooks = {
  token: string
  basket: TBook[]
}

export type TUserActionPayload = TAuthUser | TUserEmail | TAddToBasket | TDelFromBasket | TUploadBook | TBuyBooks