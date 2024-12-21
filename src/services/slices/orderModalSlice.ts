import { getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrderModalThunk = createAsyncThunk(
  'orders/getOrderModal',
  async (number: number) => await getOrderByNumberApi(number)
);

type TOrderModalState = {
  isFetched: boolean;
  order: TOrder | null;
};

const initialState: TOrderModalState = {
  isFetched: false,
  order: null
};

const orderModalSlice = createSlice({
  name: 'orderModal',
  initialState,
  selectors: {
    selectOrder: (state) => state.order,
    selectIsFetched: (state) => state.isFetched
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrderModalThunk.pending, (state) => {
      state.isFetched = false;
    });
    builder.addCase(
      getOrderModalThunk.fulfilled,
      (state, action: PayloadAction<{ orders: TOrder[] }>) => {
        state.isFetched = true;
        state.order = action.payload.orders[0];
      }
    );
    builder.addCase(getOrderModalThunk.rejected, (state) => {
      state.isFetched = true;
    });
  }
});

export const { selectIsFetched, selectOrder } = orderModalSlice.selectors;
export const reducer = orderModalSlice.reducer;
