import { rootReducer } from '@store';
import {
  burgerConstructor,
  feed,
  ingredients,
  orderMade,
  orderModal,
  userOrders,
  user
} from '@slices';

const initialState = {
  burgerConstructor: burgerConstructor.initialState,
  feed: feed.initialState,
  ingredients: ingredients.initialState,
  orderModal: orderModal.initialState,
  orderMade: orderMade.initialState,
  userOrders: userOrders.initialState,
  user: user.initialState
};

describe('rootReducer', () => {
  it('Должен возвращать начальное состояние', () => {
    expect(rootReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
});
