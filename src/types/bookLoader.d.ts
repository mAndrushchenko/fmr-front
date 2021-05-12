import { TUploadBook } from './store'

export type TUsersBookLoader = {
  name: string
  image: FormData | null
  author: string
  genre: string
  bookFile: FormData
}

export type TAdminBookLoader = {
  bookInfo: TUploadBook
  bookFile: FormData
}
