import { put, call, takeEvery } from 'redux-saga/effects'
import type { TMyBooksRes } from 'src/types/api'
import { request } from 'src/api/request'
import { getMyBooksReq } from 'src/api/server-actions'

import { getMyBooksAction, setMyBooks } from '../slices/myBooksSlice'

function* getMyBooksWorker() {
  try {
    const fetchDataFromApi = () => request(getMyBooksReq())
    const { data, message, status }: TMyBooksRes = yield call(fetchDataFromApi)

    if (status && data) {
      // make some operations with response data
      yield put(setMyBooks(data))
      console.log(message) // Just for now. Next use Material notification
    } else {
      // here might be something like put(onError(message))
      console.error(message) // Just for now. Next use Material notification
    }
  } catch (e) {
    console.error(e.message) // Just for now. Next use Material notification
  }
}

export function* myBooksSaga() {
  yield takeEvery(getMyBooksAction.type, getMyBooksWorker)
}
