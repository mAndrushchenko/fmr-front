import { put, call, takeEvery } from 'redux-saga/effects'
import type { PayloadAction } from '@reduxjs/toolkit'
import { request } from 'src/api/request'
import type {
  TBookRes,
  TEmptyRes,
  TResponse,
  TUserDataRes,
  TUserServerActions
} from 'src/types/api'
import type { TToken } from 'src/types/store'
import {
  signinReq,
  signupReq,
  getUserReq,
  buyBookReq,
  addToBasketReq,
  delFromBasketReq,
  passwordRecoveryReq, uploadBookImageReq, uploadBookDataReq, uploadBookInfoReq
} from 'src/api/server-actions'
import type {
  TBuyBooks,
  TBookPayload,
  TUploadInfo,
  TUploadData,
  TUploadImage,
  TUserActionPayload
} from 'src/types/payloadActions'
import {
  buyBooks,
  addToBasket,
  setUserData,
  delUserData,
  delFromBasket,
  buyBooksAction,
  signinUserAction,
  signupUserAction,
  setUserDataAction,
  addToBasketAction,
  delFromBasketAction,
  passwordRecoveryAction,
  uploadBookInfoAction,
  uploadBookDataAction,
  uploadBookImageAction
} from '../slices/userSlice'

import { stopSpin } from '../slices/spinnerSlice'

function* makeUserRequest({ payload, serverAction }:
  { payload: TUserActionPayload, serverAction: TUserServerActions }) {
  // Need to cast serverAction to any because
  // TS cannot match serverAction param type to payload type correctly
  const fetchDataFromApi = () => request((serverAction as any)(payload))
  const response: TResponse = yield call(fetchDataFromApi)
  return response
}

function* checkStatus({ response, action, actionPayload, errorAction }: any) {
  const { data, message, status } = response
  if (status && data) {
    // make some operations with response data
    yield put(action(data))
    yield put(stopSpin({ message, error: false }))
  } else if (status && actionPayload) {
    // make some operations with action payload data
    yield put(action(actionPayload))
    yield put(stopSpin({ message, error: false }))
  } else if (status) {
    yield put(stopSpin({ message, error: false }))
  } else if (!status && errorAction) {
    yield put(errorAction())
    yield put(stopSpin({ message, error: true }))
  } else {
    yield put(stopSpin({ message, error: true }))
  }
}

function* signinWorker(action: PayloadAction<TToken>) {
  try {
    const response: TUserDataRes = yield makeUserRequest({
      payload: action.payload, serverAction: signinReq
    })

    yield checkStatus({
      response, action: setUserData
    })
  } catch ({ message }) {
    yield put(stopSpin({ message, error: true }))
  }
}

function* getUserDataWorker(action: PayloadAction) {
  try {
    const response: TUserDataRes = yield makeUserRequest({
      serverAction: getUserReq, payload: action.payload
    })

    yield checkStatus({
      response, action: setUserData, errorAction: delUserData
    })
  } catch ({ message }) {
    yield put(stopSpin({ message, error: true }))
  }
}

function* signupUserWorker(action: PayloadAction) {
  try {
    const response: TEmptyRes = yield makeUserRequest({
      serverAction: signupReq, payload: action.payload
    })

    yield checkStatus({
      response
    })
  } catch ({ message }) {
    yield put(stopSpin({ message, error: true }))
  }
}

function* passwordRecoveryWorker(action: PayloadAction<TToken>) {
  try {
    const response: TEmptyRes = yield makeUserRequest({
      serverAction: passwordRecoveryReq, payload: action.payload
    })

    yield checkStatus({ response })
  } catch ({ message }) {
    yield put(stopSpin({ message, error: true }))
  }
}

function* addToBasketWorker(action: PayloadAction<TBookPayload>) {
  try {
    const { book } = action.payload
    const response: TEmptyRes = yield makeUserRequest({
      serverAction: addToBasketReq, payload: action.payload
    })

    yield checkStatus({
      response, action: addToBasket, actionPayload: book
    })
  } catch ({ message }) {
    yield put(stopSpin({ message, error: true }))
  }
}

function* delFromBasketWorker(action: PayloadAction<TBookPayload>) {
  try {
    const { book } = action.payload
    const response: TEmptyRes = yield makeUserRequest({
      serverAction: delFromBasketReq, payload: action.payload
    })

    yield checkStatus({
      response, action: delFromBasket, actionPayload: book
    })
  } catch ({ message }) {
    yield put(stopSpin({ message, error: true }))
  }
}

function* uploadBookInfoWorker(action: PayloadAction<TUploadInfo>) {
  try {
    const response: TEmptyRes = yield makeUserRequest({
      serverAction: uploadBookInfoReq, payload: action.payload
    })

    yield checkStatus({ response })
  } catch ({ message }) {
    yield put(stopSpin({ message, error: true }))
  }
}

function* uploadBookDataWorker(action: PayloadAction<TUploadData>) {
  try {
    console.log(action.payload)
    const response: TEmptyRes = yield makeUserRequest({
      serverAction: uploadBookDataReq, payload: action.payload
    })

    yield checkStatus({ response })
  } catch ({ message }) {
    yield put(stopSpin({ message, error: true }))
  }
}

function* uploadBookImageWorker(action: PayloadAction<TUploadImage>) {
  try {
    console.log(action.payload)
    const response: TEmptyRes = yield makeUserRequest({
      serverAction: uploadBookImageReq, payload: action.payload
    })

    yield checkStatus({ response })
  } catch ({ message }) {
    yield put(stopSpin({ message, error: true }))
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
  } catch ({ message }) {
    yield put(stopSpin({ message, error: true }))
  }
}

export function* userSaga() {
  yield takeEvery(signinUserAction.type, signinWorker)
  yield takeEvery(buyBooksAction.type, buyBooksWorker)
  yield takeEvery(signupUserAction.type, signupUserWorker)
  yield takeEvery(uploadBookInfoAction.type, uploadBookInfoWorker)
  yield takeEvery(uploadBookDataAction.type, uploadBookDataWorker)
  yield takeEvery(uploadBookImageAction.type, uploadBookImageWorker)
  yield takeEvery(addToBasketAction.type, addToBasketWorker)
  yield takeEvery(setUserDataAction.type, getUserDataWorker)
  yield takeEvery(delFromBasketAction.type, delFromBasketWorker)
  yield takeEvery(passwordRecoveryAction.type, passwordRecoveryWorker)
}
