import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { rootReducer } from './redux'
import { sagaMiddleWare } from './saga'

export const store = configureStore({
  reducer: rootReducer,
  middleware: [ ...getDefaultMiddleware({
    thunk: false,
    serializableCheck: {
      ignoredActions: []
    }
  }), sagaMiddleWare ]
})
