import type {
  TSigninReq,
  TSignupReq,
  TGetBookReq,
  TBuyBookReq,
  TGetUserReq,
  TGetShopBooks,
  TAddToBasketReq,
  TDelFromBasketReq,
  TUploadBookInfoReq,
  TUploadBookDataReq,
  TUploadBookImageReq,
  TPasswordRecoveryReq,
  TGetBookPagesReq,
  TUpdateBookProgressReq
} from 'src/types/api'

/**
 * All data in response should be returned in object { data, message }
 *
 * Structure like:
 * - test: number
 * - inner:
 * - - test: string
 *
 * is equal to JSON
 * ```json
 * { test: number, inner: { test: string } }
 * ```
 */

export const signinReq: TSigninReq = ({ token }) => ({
  url: '/signin',
  method: 'POST',
  token
})

export const signupReq: TSignupReq = () => ({
  url: '/signup',
  method: 'POST'
})

export const getUserReq: TGetUserReq = () => ({
  url: '/user',
  method: 'GET'
})

export const passwordRecoveryReq: TPasswordRecoveryReq = ({ token }) => ({
  url: '/password-recovery',
  method: 'POST',
  token
})

export const addToBasketReq: TAddToBasketReq = ({ book: body }) => ({
  url: 'user/basket/add',
  method: 'POST',
  body
})

export const delFromBasketReq: TDelFromBasketReq = ({ book: body }) => ({
  url: 'user/basket/delete',
  method: 'DELETE',
  body
})

export const uploadBookInfoReq: TUploadBookInfoReq = ({ token, bookInfo: body }) => ({
  url: 'user/upload/info',
  method: 'POST',
  body,
  token
})

export const uploadBookDataReq: TUploadBookDataReq = ({ token, bookData: fd }) => ({
  url: 'user/upload/data',
  method: 'POST',
  fd,
  token
})

export const uploadBookImageReq: TUploadBookImageReq = ({ token, bookImage: fd }) => ({
  url: 'user/upload/image',
  method: 'POST',
  fd,

  token
})

export const buyBookReq: TBuyBookReq = ({ basket: body }) => ({
  url: 'user/buy',
  method: 'POST',
  body
})

export const getShopBooksReq: TGetShopBooks = body => ({
  url: 'shop',
  method: 'POST',
  body
})

/**
 * GET /reader/:id?[cache=number]
 * @response
 * - info:
 * - - name: string
 * - - keywords: string[]
 * - - releaseYear: number
 * - - author: string
 * - - genre: string
 * - - price: number
 * - - description: string
 * - - length: number // Amount of words in book
 * - selectedWord: number // Word index where user stopped
 * - pages: { [key: number]: string[] } | null
 * @description
 * Get book info and, if [cache] is provided,
 * pages from last viewed by user
 */
export const getReaderBookReq: TGetBookReq = ({
  id,
  cacheSize
}) => ({
  url: `reader/${id}?${cacheSize ? `cache=${cacheSize}` : ''}`,
  method: 'GET'
})

/**
 * GET /reader/:id/pages?index=number&[count=number]
 * @response { [key: number]: string[] }
 * @description
 * Get [count] book pages started at [index].
 * If [count] is not provided or less than 0 use 1 instead.
 * If [count] is more than pages in the book - throw HTTP 400
 */
export const getBookPagesReq: TGetBookPagesReq = ({
  id,
  index,
  count
}) => ({
  url: `reader/${id}?index=${index}${count ? `&count=${count}` : ''}`,
  method: 'GET'
})

/**
 * PATCH /reader/:id
 * @request { selectedWord: number }
 * @description
 * Update user's book progress. Set word index where user stopped.
 */
export const updateBookProgress: TUpdateBookProgressReq = ({
  id,
  selectedWord
}) => ({
  url: `reader/${id}`,
  method: 'PATCH',
  body: { selectedWord }
})
