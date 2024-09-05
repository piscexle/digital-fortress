import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import authSlice from './auth/auth.reducer';
import uploadSlice from './upload/upload.reducer';
import notificationSlice from './notification/notification.reducer';
import settingAppSlice from './setting-app/setting-app.reducer';
import { AuthState } from './auth/auth.type';
import matBangSlice from './matBang/matBang.reducer';

const createNoopStorage = () => ({
  // eslint-disable-next-line no-unused-vars
  getItem(_key: any) {
    return Promise.resolve(null);
  },
  // eslint-disable-next-line no-unused-vars
  setItem(_key: any, value: any) {
    return Promise.resolve(value);
  },
  // eslint-disable-next-line no-unused-vars
  removeItem(_key: any) {
    return Promise.resolve();
  },
});

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const authPersistConfig = {
  key: 'auth-digital-fortress-fe',
  storage,
  whitelist: ['token', 'user', 'typeLogin'],
};

export const store = configureStore({
  reducer: {
    authSlice: persistReducer<AuthState>(authPersistConfig, authSlice),
    settingAppSlice,
    uploadSlice,
    notificationSlice,
    matBangSlice
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (gDM) =>
    gDM({
      serializableCheck: false,
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
