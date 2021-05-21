import { getBookAction, setReaderBook } from 'src/store/slices/readerSlice'
import { put, call, takeEvery } from 'redux-saga/effects'
import { getReaderBookReq } from 'src/api/server-actions'
import { TGetReaderBook } from 'src/types/payloadActions'
import { PayloadAction } from '@reduxjs/toolkit'
import { TReaderRes } from 'src/types/api'
import { request } from 'src/api/request'

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

export function* readerSaga() {
  yield takeEvery(getBookAction.type, getBookWorker)
}
