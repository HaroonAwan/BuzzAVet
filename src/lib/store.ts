import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  type PersistConfig,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { baseApi } from '@apis/baseApi';
import { reducers } from '@apis/reducers';
import { ENCRYPTION_KEY } from '@/constants';

const encryption = encryptTransform({
  secretKey: ENCRYPTION_KEY,
  onError: (error) => {
    console.error('Encryption error:', error);
  },
});

const rootReducer = combineReducers({
  ...reducers,
  [baseApi.reducerPath]: baseApi.reducer,
});

type RootReducerState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<RootReducerState> = {
  key: 'BuzzAVet',
  version: 1,
  storage,
  whitelist: ['auth', 'onBoarding'],
  transforms: [encryption],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(baseApi.middleware),
  });

  return store;
};

export const store = makeStore();
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
