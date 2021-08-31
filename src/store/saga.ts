import createSagaMiddleWare from 'redux-saga'
import { all } from 'redux-saga/effects'
import { userSaga } from './watchers/userSaga'
import { shopSaga } from './watchers/shopSaga'
import { readerSaga } from './watchers/readerSaga'
import { myBooksSaga } from './watchers/myBooksSaga'

export function* rootWatcher() {
  yield all([ userSaga(), shopSaga(), readerSaga(), myBooksSaga() ])
}

export const sagaMiddleWare = createSagaMiddleWare()
