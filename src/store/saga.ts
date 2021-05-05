import createSagaMiddleWare from 'redux-saga'
import { all } from 'redux-saga/effects'
import { userSaga } from './watchers/userSaga'

export function* rootWatcher() {
  yield all([ userSaga() ])
}

export const sagaMiddleWare = createSagaMiddleWare()
