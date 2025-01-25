import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { useDispatch, useSelector } from 'react-redux';

import {
  ingredients,
  burgerConstructor,
  userOrders,
  user,
  feed,
  orderModal,
  orderMade
} from '@slices';

export const rootReducer = combineReducers({
  ingredients: ingredients.reducer,
  burgerConstructor: burgerConstructor.reducer,
  userOrders: userOrders.reducer,
  user: user.reducer,
  feed: feed.reducer,
  orderModal: orderModal.reducer,
  orderMade: orderMade.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export const useAppSelector = useSelector.withTypes<RootState>();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
