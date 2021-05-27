import {
  getBookAction,
  setReaderBook,
  getBookPages,
  setBookPages,
  removeLoadingPages,
  addLoadingPages
} from 'src/store/slices/readerSlice'
import { put, call, takeEvery, select } from 'redux-saga/effects'
import { getBookPagesReq, getReaderBookReq } from 'src/api/server-actions'
import { request } from 'src/api/request'
import { range } from 'src/utils/range'

import type { TGetBookPagesPayload, TGetReaderBook } from 'src/types/payloadActions'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { TBookPagesRes, TReaderRes } from 'src/types/api'
import type { RootState } from 'src/store/index'
import type { TId } from 'src/types/store'

const bookIdSelector = (store: RootState) => store.readerSlice.book?.id

function* getBookWorker(action: PayloadAction<TGetReaderBook>) {
  try {
    const fetchDataFromApi = () => request(getReaderBookReq(action.payload))
    const { data, message, status }: TReaderRes = yield call(fetchDataFromApi)

    if (status && data) {
      yield put(setReaderBook(data))
      console.log(message) // Just for now. Next use Material notification
    } else {
      console.error(message) // Just for now. Next use Material notification
    }
  } catch (e) {
    // here might be something like put(onError(message))
    console.error(e.message) // Just for now. Next use Material notification
  }
}

function* getBookPagesWorker({ payload: { index, count } }: PayloadAction<TGetBookPagesPayload>) {
  const bookId: TId['id'] = yield select(bookIdSelector)
  const loadingPages = range(index, index + (count ?? 0))
  const fetchDataFromApi = () => request(getBookPagesReq({
    index,
    count,
    id: bookId
  }))

  yield put(addLoadingPages(loadingPages))
  try {
    const { data, message, status }: TBookPagesRes = yield call(fetchDataFromApi)
    if (status && data) {
      yield put(setBookPages(data))
      console.log(message) // Just for now. Next use Material notification
    } else {
      console.error(message) // Just for now. Next use Material notification
    }
  } catch (e) {
    // here might be something like put(onError(message))
    console.error(e.message) // Just for now. Next use Material notification
  }
  yield put(removeLoadingPages(loadingPages))
}

export function* readerSaga() {
  yield takeEvery(getBookAction.type, getBookWorker)
  yield takeEvery(getBookPages.type, getBookPagesWorker)
}
