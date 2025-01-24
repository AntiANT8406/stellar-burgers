import { reducer, makeOrderThunk, TOrderMadeState } from './orderMadeSlice';

describe('orderMadeSlice', () => {
  const order = {
    ingredients: ['01', '02', '01'],
    _id: '001',
    status: 'done',
    name: 'Тестовый заказ',
    createdAt: '2025-01-01T12:45:00.000Z',
    updatedAt: '2025-01-01T13:00:00.000Z',
    number: 123
  };
  const orderResponse = {
    success: true,
    name: 'Тестовый заказ',
    order
  };
  const initialState: TOrderMadeState = {
    orderRequest: false,
    orderData: null,
    name: ''
  };
  it('проверяем статус загрузки при инициализации запроса', () => {
    const referenceState = { ...initialState, orderRequest: true };
    const actualState = reducer(initialState, makeOrderThunk.pending('', []));
    expect(actualState).toEqual(referenceState);
  });

  it('проверяем выполнение удачного запроса', () => {
    const referenceState = {
      name: 'Тестовый заказ',
      orderData: {
        _id: '001',
        createdAt: '2025-01-01T12:45:00.000Z',
        ingredients: ['01', '02', '01'],
        name: 'Тестовый заказ',
        number: 123,
        status: 'done',
        updatedAt: '2025-01-01T13:00:00.000Z'
      },
      orderRequest: false
    };
    const actualState = reducer(
      { ...initialState, orderRequest: true },
      makeOrderThunk.fulfilled(orderResponse, '', [])
    );
    expect(actualState).toEqual(referenceState);
  });
});
