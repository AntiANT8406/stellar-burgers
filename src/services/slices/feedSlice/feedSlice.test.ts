import { reducer, getFeedThunk, TFeedState } from './feedSlice';

describe('feedSlice', () => {
  const initialState: TFeedState = {
    isLoading: false,
    success: false,
    orders: [],
    total: 0,
    totalToday: 0
  };
  it('Проверям статус при инициализации запроса', () => {
    expect(reducer(initialState, getFeedThunk.pending(''))).toEqual({
      ...initialState,
      isLoading: true
    });
  });
  it('Проверяем выполнение удачного запроса', () => {
    const feedResponse = {
      success: true,
      orders: [
        {
          _id: '678e706f133acd001be4b856',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa0947',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Space флюоресцентный фалленианский люминесцентный бургер',
          createdAt: '2025-01-20T15:49:03.468Z',
          updatedAt: '2025-01-20T15:49:04.096Z',
          number: 66165
        }
      ],
      total: 100,
      totalToday: 10
    };
    expect(
      reducer(initialState, getFeedThunk.fulfilled(feedResponse, ''))
    ).toEqual({
      isLoading: false,
      success: true,
      orders: feedResponse.orders,
      total: feedResponse.total,
      totalToday: feedResponse.totalToday
    });
  });
});
