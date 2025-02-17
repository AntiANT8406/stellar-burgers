import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ name, email, password }: TRegisterData) =>
    await registerUserApi({ name, email, password })
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) =>
    await loginUserApi({ email, password })
);

export const getUser = createAsyncThunk('user/getUser', async () => {
  if (!localStorage.getItem('refreshToken')) {
    return Promise.reject('Not logged in');
  }
  return await getUserApi();
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: Partial<TRegisterData>) => await updateUserApi(user)
);

export const logoutUser = createAsyncThunk('user/logoutUser', logoutApi);

export type TUserState = {
  isAuthChecked: boolean;
  user: TUser | null;
  error: string | null;
};

export const initialState: TUserState = {
  isAuthChecked: false,
  user: null,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    selectError: (state) => state.error,
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.error = null;
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.error.message || 'register failed';
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.error = null;
      state.user = action.payload.user;
      state.isAuthChecked = true;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.error.message || 'login failed';
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.error = null;
      state.user = action.payload.user;
      state.isAuthChecked = true;
    });
    builder.addCase(getUser.pending, (state) => {
      state.error = null;
    });

    builder.addCase(getUser.rejected, (state, action) => {
      state.error = action.error.message || 'failed to get user';
      state.isAuthChecked = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isAuthChecked = true;
      state.user = action.payload.user;
    });
    builder.addCase(logoutUser.fulfilled, (sate) => {
      sate.user = null;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.error = null;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.error = action.error.message || 'update failed';
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
  }
});

export const { selectError, selectUser, selectIsAuthChecked } =
  userSlice.selectors;
export const reducer = userSlice.reducer;
