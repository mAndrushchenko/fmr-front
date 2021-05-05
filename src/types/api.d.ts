import { TBook, TUserData } from 'src/types/store'
import { TAdminBookLoader, TUsersBookLoader } from 'src/types/bookLoader'

export interface IEndpoint {
  url: string
  method: string
  body?: string | Blob | TBook | TUsersBookLoader | TAdminBookLoader | TBook[] //any type should be changed
  token: string
  fd?: FormData
}

export interface IHeaders {
  [headerName: string]: string;
}

type TResInformation = {
  message: string
  status: boolean
}

export type TUserDataRes = TResInformation & {
  data: TUserData
}

export type TEmptyRes = TResInformation & {
  data: null
}

export type TBookRes = TResInformation & {
  data: TBook
}

export type TResponse = TUserDataRes | TEmptyRes | TBookRes