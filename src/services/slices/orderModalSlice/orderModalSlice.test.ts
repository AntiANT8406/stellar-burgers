import {
  reducer,
  getOrderModalThunk,
  TOrderModalState
} from './orderModalSlice';

describe('orderModalSlice', () => {
  const initialState = {
    isFetched: false,
    order: null
  };

  it('проверяем изменение состояния при инициализации запроса', () => {
    const referenceState: TOrderModalState = {
      isFetched: false,
      order: null
    };
    const actualState = reducer(
      { ...initialState, isFetched: true },
      getOrderModalThunk.pending('', 0)
    );
    expect(actualState).toEqual(referenceState);
  });
  it('проверяем изменение состояния при удачном запросе', () => {
    const order = {
      _id: '001',
      createdAt: '2025-01-01T12:45:00.000Z',
      ingredients: ['01', '02', '01'],
      name: 'Тестовый заказ',
      number: 123,
      status: 'done',
      updatedAt: '2025-01-01T13:00:00.000Z'
    };
    const referenceState = {
      isFetched: true,
      order
    };
    const actualState = reducer(
      initialState,
      getOrderModalThunk.fulfilled({ orders: [order], success: true }, '', 0)
    );
    expect(actualState).toEqual(referenceState);
  });
});
