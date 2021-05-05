import { TBookRes, TEmptyRes, TResponse, TUserDataRes } from 'src/types/api'
import { put, call, takeEvery } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { TAuthUser } from 'src/types/store'
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
  TAddToBasket,
  TDelFromBasket
} from 'src/types/payloadActions'
import {
  buyBooks,
  uploadBook,
  buyBooksAction,
  addToBasket,
  setUserData,
  authUserAction,
  delFromBasket,
  uploadBookAction,
  addToBasketAction,
  setUserDataAction,
  signupUserAction,
  delFromBasketAction,
  passwordRecoveryAction
} from '../slices/userSlice'

function* makeUserRequest(actionPayload: any, serverAction: any) {
  const fetchDataFromApi = () => request(serverAction(actionPayload))
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
}

function* signinWorker(action: PayloadAction<TAuthUser>) {
  try {
    const response: TUserDataRes = yield makeUserRequest(
      signinReq, action.payload
    )

    yield checkStatus({
      response, action: setUserData
    })
  } catch (e) {
    console.error(e.message) // Just for now. Next use Material notification
  }
}

function* getUserDataWorker(action: PayloadAction<TAuthUser>) {
  try {
    const response: TUserDataRes = yield makeUserRequest(
      getUserReq, action.payload
    )

    yield checkStatus({
      response, action: setUserData
    })
  } catch (e) {
    console.error(e.message) // Just for now. Next use Material notification
  }
}

function* signupUserWorker(action: PayloadAction<TAuthUser>) {
  try {
    const response: TEmptyRes = yield makeUserRequest(
      signupReq, action.payload
    )
    yield checkStatus({
      response
    })
  } catch (e) {
    console.error(e.message) // Just for now. Next use Material notification
  }
}

function* passwordRecoveryWorker(action: PayloadAction<TAuthUser>) {
  try {
    const response: TEmptyRes = yield makeUserRequest(
      passwordRecoveryReq, action.payload
    )

    yield checkStatus({ response })
  } catch (e) {
    console.error(e.message) // Just for now. Next use Material notification
  }
}

function* addToBasketWorker(action: PayloadAction<TAddToBasket>) {
  try {
    const { book } = action.payload
    const response: TEmptyRes = yield makeUserRequest(
      addToBasketReq, action.payload
    )

    yield checkStatus({
      response, action: addToBasket, actionPayload: book
    })
  } catch (e) {
    console.error(e.message) // Just for now. Next use Material notification
  }
}

function* delFromBasketWorker(action: PayloadAction<TDelFromBasket>) {
  try {
    const { book } = action.payload
    const response: TEmptyRes = yield makeUserRequest(
      delFromBasketReq, action.payload
    )

    yield checkStatus({
      response, action: delFromBasket, actionPayload: book
    })
  } catch (e) {
    console.error(e.message) // Just for now. Next use Material notification
  }
}

function* uploadBookWorker(action: PayloadAction<TUploadBook>) {
  try {
    const response: TBookRes = yield makeUserRequest(
      uploadBookReq, action.payload
    )

    yield checkStatus({
      response, action: uploadBook
    })
  } catch (e) {
    console.error(e.message) // Just for now. Next use Material notification
  }
}

function* buyBooksWorker(action: PayloadAction<TBuyBooks>) {
  try {
    const { basket } = action.payload
    const response: TEmptyRes = yield makeUserRequest(
      buyBookReq, action.payload
    )

    yield checkStatus({
      response, action: buyBooks, actionPayload: basket
    })
  } catch (e) {
    console.error(e.message) // Just for now. Next use Material notification
  }
}

export function* userSaga() {
  yield takeEvery(authUserAction.type, signinWorker)
  yield takeEvery(buyBooksAction.type, buyBooksWorker)
  yield takeEvery(signupUserAction.type, signupUserWorker)
  yield takeEvery(uploadBookAction.type, uploadBookWorker)
  yield takeEvery(addToBasketAction.type, addToBasketWorker)
  yield takeEvery(setUserDataAction.type, getUserDataWorker)
  yield takeEvery(delFromBasketAction.type, delFromBasketWorker)
  yield takeEvery(passwordRecoveryAction.type, passwordRecoveryWorker)
}
