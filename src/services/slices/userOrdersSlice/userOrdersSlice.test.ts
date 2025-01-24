import {
  reducer,
  getUserOrdersThunk,
  TUserOrdersState
} from './userOrdersSlice';
import { TOrder } from '@utils-types';

describe('userOrdersSlice', () => {
  const initialState: TUserOrdersState = {
    isLoading: false,
    orders: []
  };

  it('проверяет состояние при инициализации запроса', () => {
    const referenceState: TUserOrdersState = {
      isLoading: true,
      orders: []
    };

    const actualState = reducer(
      initialState,
      getUserOrdersThunk.pending('', undefined)
    );

    expect(actualState).toEqual(referenceState);
  });

  it('проверяет состояние при успешном завершении запроса', () => {
    const orders: TOrder[] = [
      {
        _id: '001',
        createdAt: '2025-01-01T12:00:00.000Z',
        ingredients: ['01', '02'],
        name: 'Заказ 1',
        number: 1,
        status: 'done',
        updatedAt: '2025-01-01T12:30:00.000Z'
      },
      {
        _id: '002',
        createdAt: '2025-01-02T14:00:00.000Z',
        ingredients: ['03', '04'],
        name: 'Заказ 2',
        number: 2,
        status: 'pending',
        updatedAt: '2025-01-02T14:15:00.000Z'
      }
    ];

    const referenceState: TUserOrdersState = {
      isLoading: false,
      orders
    };

    const actualState = reducer(
      initialState,
      getUserOrdersThunk.fulfilled(orders, '', undefined)
    );

    expect(actualState).toEqual(referenceState);
  });
});
