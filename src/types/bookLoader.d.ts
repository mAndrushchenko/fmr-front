import { TUploadBook } from './store'

export type TUsersBookLoader = {
  name: string
  author: string
  genre: string
  fd: FormData
}

export type TAdminBookLoader = {
  bookInfo: TUploadBook
  fd: FormData
}
