import { TUploadBook } from './store'

/*
* bookInfo describes common information about book
* bookData includes a data and an image of book
* */

export type TUsersBookInfoLoaderUser = {
  name: string
  author: string
  genre?: string
  description?: string
}

export type TBookInfoLoader = TUsersBookInfoLoaderUser | TUploadBook

export type TBookDataLoader = FormData

export type TBookImageLoader = FormData
