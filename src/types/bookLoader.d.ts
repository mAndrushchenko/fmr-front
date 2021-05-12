import { TBook } from './store'

export type TUsersBookLoader = {
  name: string
  image: string | null
  author: string
  genre: string
  bookFile: FormData
}

export type TAdminBookLoader = {
  bookInfo: TUploadBook
  bookFile: FormData
}
