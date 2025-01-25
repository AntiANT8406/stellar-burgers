import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '@api';

export type TUserOrdersState = { orders: TOrder[]; isLoading: boolean };

export const initialState: TUserOrdersState = {
  isLoading: false,
  orders: []
};

export const getUserOrdersThunk = createAsyncThunk(
  'orders/getUsersAll',
  getOrdersApi
);

const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (state) => state.orders,
    selectIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder.addCase(getUserOrdersThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getUserOrdersThunk.fulfilled,
      (state, action: PayloadAction<TOrder[]>) => {
        state.orders = action.payload;
        state.isLoading = false;
      }
    );
  }
});

export const { selectOrders, selectIsLoading } = userOrdersSlice.selectors;
export const reducer = userOrdersSlice.reducer;
