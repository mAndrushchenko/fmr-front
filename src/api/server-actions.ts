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
  TGetMyBooksReq,
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

export const signupReq: TSignupReq = ({ token }) => ({
  url: '/signup',
  method: 'POST',
  token
})

export const getUserReq: TGetUserReq = ({ token }) => ({
  url: '/user',
  method: 'GET',
  token
})

export const passwordRecoveryReq: TPasswordRecoveryReq = ({ token }) => ({
  url: '/password-recovery',
  method: 'POST',
  token
})

export const addToBasketReq: TAddToBasketReq = ({ book: body }) => ({
  url: '/user/basket/add',
  method: 'POST',
  body
})

export const delFromBasketReq: TDelFromBasketReq = ({ book: body }) => ({
  url: '/user/basket/delete',
  method: 'DELETE',
  body
})

export const uploadBookInfoReq: TUploadBookInfoReq = ({ bookInfo: body }) => ({
  url: '/user/upload/info',
  method: 'POST',
  body
})

export const uploadBookDataReq: TUploadBookDataReq = ({ bookData: fd }) => ({
  url: '/user/upload/data',
  method: 'POST',
  fd
})

export const uploadBookImageReq: TUploadBookImageReq = ({ bookImage: fd }) => ({
  url: '/user/upload/image',
  method: 'POST',
  fd
})

export const buyBookReq: TBuyBookReq = ({ basket: body }) => ({
  url: '/user/buy',
  method: 'POST',
  body
})

export const getShopBooksReq: TGetShopBooks = body => ({
  url: '/shop',
  method: 'POST',
  body
})

export const getMyBooksReq: TGetMyBooksReq = () => ({
  url: '/user/books',
  method: 'GET'
})

/**
 * GET /reader/:id?[cache=number]
 * @response
 * - info:
 * - - id: string | number
 * - - name: string
 * - - author: string
 * - - image: string | null
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
  url: `/reader/${id}?${cacheSize ? `cache=${cacheSize}` : ''}`,
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
  url: `/reader/${id}/pages?index=${index}${count ? `&count=${count}` : ''}`,
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
  url: `/reader/${id}`,
  method: 'PATCH',
  body: { selectedWord }
})
