import {
  IngredientsState,
  reducer,
  fetchIngredients
} from './ingredientsSlice';

describe('ingredientsSlice', () => {
  const initialState: IngredientsState = {
    ingredients: [],
    isLoading: false,
    error: null
  };

  it('проверяем сброс ошибки и статус загрузки при инициализации запроса', () => {
    const referenceState = {
      ingredients: [],
      isLoading: true,
      error: null
    };
    const actualState = reducer(
      {
        ...initialState,
        error: 'error'
      },
      fetchIngredients.pending('')
    );
    expect(actualState).toEqual(referenceState);
  });
  it('проверяем выполнение удачного запроса', () => {
    const ingredientsData = [
      {
        _id: '01',
        name: 'Ингридиент_01',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      }
    ];

    const referenceState = {
      ingredients: ingredientsData,
      isLoading: false,
      error: null
    };

    const actualState = reducer(
      {
        ...initialState,
        isLoading: true
      },
      fetchIngredients.fulfilled(ingredientsData, '')
    );
    expect(actualState).toEqual(referenceState);
  });
  it('проверяем запись ошибки и статус загрузки при неудачном запросе', () => {
    const referenceState = {
      ingredients: [],
      isLoading: false,
      error: 'error'
    };
    const actualState = reducer(
      {
        ...initialState,
        isLoading: true
      },
      fetchIngredients.rejected(new Error('error'), '')
    );
    expect(actualState).toEqual(referenceState);
  });
});
