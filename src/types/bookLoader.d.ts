import { TBook } from './store'

export type TUsersBookLoader = {
  name: string
  image: FormData
  author: string
  genre: string
  bookFile: FormData
}

export type TAdminBookLoader = {
  bookInfo: TUploadBook
  bookFile: FormData
}
