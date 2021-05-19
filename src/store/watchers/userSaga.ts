import { TBookRes, TEmptyRes, TResponse, TUserDataRes } from 'src/types/api'
import { put, call, takeEvery } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { TToken } from 'src/types/store'
import { request } from 'src/api/request'
import {
  signinReq,
  signupReq,
  getUserReq,
  buyBookReq,
  uploadBookReq,
  addToBasketReq,
  delFromBasketReq,
  passwordRecoveryReq
} from 'src/api/server-actions'
import {
  TBuyBooks,
  TUploadBook,
  TBookWithToken,
  TUserActionPayload
} from 'src/types/payloadActions'
import {
  buyBooks,
  uploadBook,
  addToBasket,
  setUserData,
  delFromBasket,
  buyBooksAction,
  uploadBookAction,
  signinUserAction,
  signupUserAction,
  setUserDataAction,
  addToBasketAction,
  delFromBasketAction,
  passwordRecoveryAction
} from '../slices/userSlice'
import { stopSpin } from '../slices/spinnerSlice'

function* makeUserRequest({ payload, serverAction }:
  { payload: TUserActionPayload, serverAction: any }) {
  const fetchDataFromApi = () => request(serverAction(payload))
  const response: TResponse = yield call(fetchDataFromApi)
  return response
}

function* checkStatus({ response, action, actionPayload }: any) {
  const { data, message, status } = response
  if (status && data) {
    // make some operations with response data
    yield put(action(data))
    console.log(message) // Just for now. Next use Material notification
  } else if (status && actionPayload) {
    // make some operations with action payload data
    yield put(action(actionPayload))
    console.log(message) // Just for now. Next use Material notification
  } else if (status) {
    console.log(message) // Just for now. Next use Material notification
  } else {
    // here might be something like put(onError(message))
    console.error(message) // Just for now. Next use Material notification
  }
  yield put(stopSpin())
}

function* signinWorker(action: PayloadAction<TToken>) {
  try {
    const response: TUserDataRes = yield makeUserRequest({
      payload: action.payload, serverAction: signinReq
    })

    yield checkStatus({
      response, action: setUserData
    })
  } catch (e) {
    yield put(stopSpin())
    console.error(e.message) // Just for now. Next use Material notification
  }
}

function* getUserDataWorker(action: PayloadAction<TToken>) {
  try {
    const response: TUserDataRes = yield makeUserRequest({
      serverAction: getUserReq, payload: action.payload
    })

    yield checkStatus({
      response, action: setUserData
    })
  } catch (e) {
    yield put(stopSpin())
    console.error(e.message) // Just for now. Next use Material notification
  }
}

function* signupUserWorker(action: PayloadAction<TToken>) {
  try {
    const response: TEmptyRes = yield makeUserRequest({
      serverAction: signupReq, payload: action.payload
    })

    yield checkStatus({
      response
    })
  } catch (e) {
    yield put(stopSpin())
    console.error(e.message) // Just for now. Next use Material notification
  }
}

function* passwordRecoveryWorker(action: PayloadAction<TToken>) {
  try {
    const response: TEmptyRes = yield makeUserRequest({
      serverAction: passwordRecoveryReq, payload: action.payload
    })

    yield checkStatus({ response })
  } catch (e) {
    yield put(stopSpin())
    console.error(e.message) // Just for now. Next use Material notification
  }
}

function* addToBasketWorker(action: PayloadAction<TBookWithToken>) {
  try {
    const { book } = action.payload
    const response: TEmptyRes = yield makeUserRequest({
      serverAction: addToBasketReq, payload: action.payload
    })

    yield checkStatus({
      response, action: addToBasket, actionPayload: book
    })
  } catch (e) {
    yield put(stopSpin())
    console.error(e.message) // Just for now. Next use Material notification
  }
}

function* delFromBasketWorker(action: PayloadAction<TBookWithToken>) {
  try {
    const { book } = action.payload
    const response: TEmptyRes = yield makeUserRequest({
      serverAction: delFromBasketReq, payload: action.payload
    })

    yield checkStatus({
      response, action: delFromBasket, actionPayload: book
    })
  } catch (e) {
    yield put(stopSpin())
    console.error(e.message) // Just for now. Next use Material notification
  }
}

function* uploadBookWorker(action: PayloadAction<TUploadBook>) {
  try {
    const response: TBookRes = yield makeUserRequest({
      serverAction: uploadBookReq, payload: action.payload
    })

    yield checkStatus({
      response, action: uploadBook
    })
  } catch (e) {
    yield put(stopSpin())
    console.error(e.message) // Just for now. Next use Material notification
  }
}

function* buyBooksWorker(action: PayloadAction<TBuyBooks>) {
  try {
    const { basket } = action.payload
    const response: TEmptyRes = yield makeUserRequest({
      serverAction: buyBookReq, payload: action.payload
    })

    yield checkStatus({
      response, action: buyBooks, actionPayload: basket
    })
  } catch (e) {
    yield put(stopSpin())
    console.error(e.message) // Just for now. Next use Material notification
  }
}

export function* userSaga() {
  yield takeEvery(signinUserAction.type, signinWorker)
  yield takeEvery(buyBooksAction.type, buyBooksWorker)
  yield takeEvery(signupUserAction.type, signupUserWorker)
  yield takeEvery(uploadBookAction.type, uploadBookWorker)
  yield takeEvery(addToBasketAction.type, addToBasketWorker)
  yield takeEvery(setUserDataAction.type, getUserDataWorker)
  yield takeEvery(delFromBasketAction.type, delFromBasketWorker)
  yield takeEvery(passwordRecoveryAction.type, passwordRecoveryWorker)
}
