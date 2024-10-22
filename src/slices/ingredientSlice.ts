import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

import { getIngredientsApi } from '@api';

interface IngredientsState {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  isIngredientsLoading: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  getIngredientsApi
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    ingredientsSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isIngredientsLoading = false;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.isIngredientsLoading = false;
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
export const { ingredientsSelector } = ingredientsSlice.selectors;
