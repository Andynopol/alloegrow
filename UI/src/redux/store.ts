import { configureStore, ThunkAction, Action, compose } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authSlice from './slices/authSlice';
import planificationSlice from './slices/planificationSlice';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = configureStore( {
  reducer: {
    auth: authSlice,
    planifications: planificationSlice
  },
  middleware: ( getDefaultMiddleware ) => getDefaultMiddleware().concat( thunk ),
  enhancers: composeEnhancers
} );

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
