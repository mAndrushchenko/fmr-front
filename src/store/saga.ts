import createSagaMiddleWare from 'redux-saga'
import { all } from 'redux-saga/effects'
import { userSaga } from './watchers/userSaga'
import { shopSaga } from './watchers/shopSaga'
import { readerSaga } from './watchers/readerSaga'

export function* rootWatcher() {
  yield all([ userSaga(), shopSaga(), readerSaga() ])
}

export const sagaMiddleWare = createSagaMiddleWare()
