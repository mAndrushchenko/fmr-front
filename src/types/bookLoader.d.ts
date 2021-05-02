import { TBook } from './store';

export type TUsersBookLoader = {
  id: number
  name: string
  image: string | null
  author: string
  genre: string
  bookFile: FormData
}

export type TAdminBookLoader = {
  bookInfo: TBook
  bookData: FormData
}