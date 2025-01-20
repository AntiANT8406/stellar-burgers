import {
  createSlice,
  createAsyncThunk,
  createSelector
} from '@reduxjs/toolkit';
import { IngredientType, TIngredient } from '@utils-types';

import { getIngredientsApi } from '@api';

export interface IngredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/getAll',
  getIngredientsApi
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  selectors: {
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error,

    selectIngredients: (state) => state.ingredients
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.isLoading = false;
      });
  }
});

export const { selectIsLoading, selectError, selectIngredients } =
  ingredientsSlice.selectors;
export const selectBuns = createSelector(selectIngredients, (ingredients) =>
  ingredients.filter(
    (ingredient: TIngredient) => ingredient.type === IngredientType.bun
  )
);
export const selectMains = createSelector(selectIngredients, (ingredients) =>
  ingredients.filter(
    (ingredient: TIngredient) => ingredient.type === IngredientType.main
  )
);
export const selectSauces = createSelector(selectIngredients, (ingredients) =>
  ingredients.filter(
    (ingredient: TIngredient) => ingredient.type === IngredientType.sauce
  )
);
export const selectIngredientById = createSelector(
  [selectIngredients, (_, id: string) => id],
  (ingredients: TIngredient[], id) =>
    ingredients.find((ingredient: TIngredient) => ingredient._id === id)
);
export const reducer = ingredientsSlice.reducer;
