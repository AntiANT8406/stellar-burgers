import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { getFeedsApi } from '@api';

type TFeedState = TOrdersData & { success: boolean; isLoading: boolean };

const initialState: TFeedState = {
  isLoading: false,
  success: false,
  orders: [],
  total: 0,
  totalToday: 0
};

export const getFeedThunk = createAsyncThunk('orders/getAll', getFeedsApi);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectFeed: (state) => state,
    selectOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder.addCase(getFeedThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getFeedThunk.fulfilled,
      (state, action: PayloadAction<Omit<TFeedState, 'isLoading'>>) => {
        state.success = action.payload.success;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      }
    );
  }
});

export const { selectFeed, selectOrders } = feedSlice.selectors;
export const reducer = feedSlice.reducer;
