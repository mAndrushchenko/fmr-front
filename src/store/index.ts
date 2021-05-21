import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { rootReducer } from './redux'
import { rootWatcher, sagaMiddleWare } from './saga'
import { uploadBookAction } from './slices/userSlice'

export const store = configureStore({
  reducer: rootReducer,
  middleware: [ ...getDefaultMiddleware({
    thunk: false,
    serializableCheck: {
      ignoredActions: [ uploadBookAction.type ]
    }
  }), sagaMiddleWare ]
})
sagaMiddleWare.run(rootWatcher)

export type RootState = ReturnType<typeof rootReducer>

declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
}
