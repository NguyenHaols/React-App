import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../src/slice/sliceUser'
import languageReducer from '../src/slice/sliceTranslate'
import { thunk } from 'redux-thunk'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    user: userReducer,
    translate: languageReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat([thunk]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector