import { put, call, takeEvery } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { TShopFilters } from 'src/types/store'
import { TBooksRes } from 'src/types/api'
import { request } from 'src/api/request'
import { getShopBooksReq } from 'src/api/server-actions'

import { getBooksAction, setShopBooks } from '../slices/shopSlice'

function* getBooksWorker(action: PayloadAction<TShopFilters>) {
  try {
    const fetchDataFromApi = () => request(getShopBooksReq(action.payload))
    const { data, message, status }: TBooksRes = yield call(fetchDataFromApi)

    if (status && data) {
      // make some operations with response data
      yield put(setShopBooks(data))
      console.log(message) // Just for now. Next use Material notification
    } else {
      // here might be something like put(onError(message))
      console.error(message) // Just for now. Next use Material notification
    }
  } catch (e) {
    console.error(e.message) // Just for now. Next use Material notification
  }
}

export function* shopSaga() {
  yield takeEvery(getBooksAction.type, getBooksWorker)
}
