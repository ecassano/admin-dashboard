import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import tokenReducer from './features/token-slice'
import userInfoReducer from './features/user-info'

let rehydrationComplete: { (loaded: boolean): void }

const rehydrationPromise = new Promise(resolve => {
  rehydrationComplete = resolve
})

export function rehydration() {
  return rehydrationPromise
}

const persistConfig = {
  key: 'cartaoestacionamento',
  storage,
  stateReconciler: autoMergeLevel2,
}

const rootReducer = combineReducers({
  userInfo: userInfoReducer,
  token: tokenReducer,
})

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(
  persistConfig,
  rootReducer
)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store, null, () => {
  rehydrationComplete(true)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
