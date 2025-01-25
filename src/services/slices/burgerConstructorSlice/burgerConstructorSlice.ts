import {
  createSelector,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { swapArray } from '../../../utils/array';

export interface BurgerConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

export const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    selectCurrentBun: (state) => state.bun,
    selectCurrentIngredients: (state) => state.ingredients,
    selectCurrentItems: (state) => state
  },
  reducers: {
    clearData(state) {
      state.bun = initialState.bun;
      state.ingredients = initialState.ingredients;
    },
    setCurrentBun: {
      reducer(state, action: PayloadAction<TConstructorIngredient>) {
        state.bun = action.payload;
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    addToCurrentIngredients: {
      reducer(state, action: PayloadAction<TConstructorIngredient>) {
        state.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeFromCurrentIngredients(state, action: PayloadAction<number>) {
      state.ingredients.splice(action.payload, 1);
    },
    moveUpInCurrentIngredients(state, action: PayloadAction<number>) {
      swapArray(state.ingredients, action.payload, action.payload - 1);
    },
    moveDownInCurrentIngredients(state, action: PayloadAction<number>) {
      swapArray(state.ingredients, action.payload, action.payload + 1);
    }
  }
});
export const {
  selectCurrentBun,
  selectCurrentIngredients,
  selectCurrentItems
} = burgerConstructorSlice.selectors;
export const {
  setCurrentBun,
  addToCurrentIngredients,
  removeFromCurrentIngredients,
  moveUpInCurrentIngredients,
  moveDownInCurrentIngredients
} = burgerConstructorSlice.actions;
export const selectOrderData = createSelector(
  selectCurrentItems,
  (items): string[] => {
    if (items.bun === null) return [];
    const orderData = [items.bun, ...items.ingredients, items.bun];
    return orderData.map((item) => item._id);
  }
);
export const { clearData } = burgerConstructorSlice.actions;
export const reducer = burgerConstructorSlice.reducer;
