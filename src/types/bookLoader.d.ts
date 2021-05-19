import { TUploadBook } from './store'

  /*
  * bookInfo describes common information about book
  * bookData includes a data and an image of book
  * */

export type TUsersBookLoader = {
  bookInfo: {
    name: string
    author: string
    genre: string
    description: string
  }
  bookData: FormData
}

export type TAdminBookLoader = {
  bookInfo: TUploadBook
  bookData: FormData
}
