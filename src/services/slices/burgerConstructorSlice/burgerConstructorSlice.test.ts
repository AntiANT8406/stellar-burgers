import { ingredients } from '@slices';
import {
  reducer,
  BurgerConstructorState,
  setCurrentBun,
  addToCurrentIngredients,
  removeFromCurrentIngredients,
  moveUpInCurrentIngredients,
  moveDownInCurrentIngredients
} from './burgerConstructorSlice';

describe('burgerConstructorSlice', () => {
  const bun1 = {
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
  };
  const bun2 = {
    _id: '08',
    name: 'Ингридиент_08',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    __v: 0
  };
  const main = {
    _id: '02',
    name: 'Ингридиент_02',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  };
  const sauce = {
    _id: '04',
    name: 'Ингридиент_04',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    __v: 0
  };

  const initialState: BurgerConstructorState = {
    bun: null,
    ingredients: []
  };
  let currentState: BurgerConstructorState = initialState;

  it('Проверяем добавление булки и замену её на другую', () => {
    const referenceState1 = { bun: bun1, ingredients: [] };
    const referenceState2 = { bun: bun2, ingredients: [] };
    currentState = reducer(initialState, setCurrentBun(bun1));
    expect(currentState).toMatchObject(referenceState1);
    currentState = reducer(currentState, setCurrentBun(bun2));
    expect(currentState).toMatchObject(referenceState2);
  });

  it('Проверяем добавление ингредиента', () => {
    const referenceState = { bun: bun2, ingredients: [main] };
    currentState = reducer(currentState, addToCurrentIngredients(main));
    expect(currentState).toMatchObject(referenceState);
  });

  it('Проверяем удаление ингредиента', () => {
    const referenceState = { bun: bun2, ingredients: [] };
    currentState = reducer(currentState, removeFromCurrentIngredients(0));
    expect(currentState).toMatchObject(referenceState);
  });

  it('Проверяем перемещение ингредиента', () => {
    const referenceState1 = { bun: bun2, ingredients: [sauce, main] };
    const referenceState2 = { bun: bun2, ingredients: [main, sauce] };
    currentState = reducer(currentState, addToCurrentIngredients(sauce));
    currentState = reducer(currentState, addToCurrentIngredients(main));
    expect(currentState).toMatchObject(referenceState1);
    currentState = reducer(currentState, moveUpInCurrentIngredients(1));
    expect(currentState).toMatchObject(referenceState2);
    currentState = reducer(currentState, moveDownInCurrentIngredients(0));
    expect(currentState).toMatchObject(referenceState1);
  });
});
