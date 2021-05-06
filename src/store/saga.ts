import createSagaMiddleWare from 'redux-saga'
import { all } from 'redux-saga/effects'
import { userSaga } from './watchers/userSaga'
import { shopSaga } from './watchers/shopSaga'

export function* rootWatcher() {
  yield all([ userSaga(), shopSaga() ])
}

export const sagaMiddleWare = createSagaMiddleWare()
