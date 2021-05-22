import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { rootReducer } from './redux'
import { rootWatcher, sagaMiddleWare } from './saga'
import { uploadBookDataAction, uploadBookImageAction } from './slices/userSlice'

export const store = configureStore({
  reducer: rootReducer,
  middleware: [ ...getDefaultMiddleware({
    thunk: false,
    serializableCheck: {
      ignoredActions: [
        uploadBookDataAction.type,
        uploadBookImageAction.type
      ]
    }
  }), sagaMiddleWare ]
})
sagaMiddleWare.run(rootWatcher)
