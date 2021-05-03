import createSagaMiddleWare from 'redux-saga'
// import { all } from 'redux-saga/effects'
// import { userWatcher } from './userSaga'
//
//
// export function* rootWatcher() {
//   yield all([userWatcher()])
// }
export const sagaMiddleWare = createSagaMiddleWare()

// sagaMiddleWare.run(rootWatcher)
