import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const makeOrderThunk = createAsyncThunk(
  'order/makeOrder',
  async (data: string[]) => await orderBurgerApi(data)
);

type TOrderMadeState = {
  orderRequest: boolean;
  orderData: TOrder | null;
  name: string;
};

const initialState: TOrderMadeState = {
  orderRequest: false,
  orderData: null,
  name: ''
};

const orderMadeSlice = createSlice({
  name: 'orderMade',
  initialState,
  selectors: {
    selectOrderData: (state) => state.orderData,
    selectOrderRequest: (state) => state.orderRequest
  },
  reducers: {
    clearData(state) {
      state.orderData = initialState.orderData;
      state.name = initialState.name;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(makeOrderThunk.pending, (state) => {
      state.orderRequest = true;
    });
    builder.addCase(
      makeOrderThunk.fulfilled,
      (state, action: PayloadAction<{ order: TOrder; name: string }>) => {
        state.orderData = action.payload.order;
        state.name = action.payload.name;
        state.orderRequest = false;
      }
    );
    builder.addCase(makeOrderThunk.rejected, (state) => {
      state.orderRequest = false;
    });
  }
});

export const { selectOrderData, selectOrderRequest } = orderMadeSlice.selectors;
export const { clearData } = orderMadeSlice.actions;
export const reducer = orderMadeSlice.reducer;
