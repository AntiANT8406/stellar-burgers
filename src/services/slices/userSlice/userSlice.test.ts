import {
  reducer,
  registerUser,
  loginUser,
  getUser,
  updateUser,
  logoutUser,
  TUserState
} from './userSlice';
import { TUser } from '@utils-types';

describe('userSlice', () => {
  const initialState: TUserState = {
    isAuthChecked: false,
    user: null,
    error: null
  };
  const user: TUser = {
    email: 'test@example.com',
    name: 'Test User'
  };
  const accessToken = 'accessToken';
  const refreshToken = 'refreshToken';

  it('должен сбрасывать ошибку при инициализации любого экшена', () => {
    const anotherInitailState = { ...initialState, error: 'some error' };
    let actualState;
    actualState = reducer(
      anotherInitailState,
      registerUser.pending('', {} as any)
    );
    expect(actualState).toEqual(initialState);

    actualState = reducer(
      anotherInitailState,
      loginUser.pending('', {} as any)
    );
    expect(actualState).toEqual(initialState);

    actualState = reducer(anotherInitailState, getUser.pending('', {} as any));
    expect(actualState).toEqual(initialState);

    actualState = reducer(
      anotherInitailState,
      updateUser.pending('', {} as any)
    );
    expect(actualState).toEqual(initialState);
  });

  it('должен устанавливать ошибку при провале любого экшена', () => {
    const errorMessage = 'some error';
    const referenceState = { ...initialState, error: errorMessage };
    let actualState;

    actualState = reducer(
      initialState,
      registerUser.rejected(new Error(errorMessage) as any, '', {} as any)
    );
    expect(actualState).toEqual(referenceState);

    actualState = reducer(
      initialState,
      loginUser.rejected(new Error(errorMessage) as any, '', {} as any)
    );
    expect(actualState).toEqual(referenceState);

    actualState = reducer(
      initialState,
      getUser.rejected(new Error(errorMessage) as any, '', {} as any)
    );
    expect(actualState).toEqual({ ...referenceState, isAuthChecked: true });

    actualState = reducer(
      initialState,
      updateUser.rejected(new Error(errorMessage) as any, '', {} as any)
    );
    expect(actualState).toEqual(referenceState);
  });

  it('должен устанавливать пользователя при успешной регистрации', () => {
    const actualState = reducer(
      initialState,
      registerUser.fulfilled(
        { user, success: true, accessToken, refreshToken },
        '',
        {} as any
      )
    );
    expect(actualState).toEqual({
      ...initialState,
      user,
      isAuthChecked: true
    });
  });

  it('должен устанавливать пользователя при успешном логине', () => {
    const user: TUser = {
      email: 'test@example.com',
      name: 'Test User'
    };
    const actualState = reducer(
      initialState,
      loginUser.fulfilled(
        { user, success: true, accessToken, refreshToken },
        '',
        {} as any
      )
    );
    expect(actualState).toEqual({
      ...initialState,
      user,
      isAuthChecked: true
    });
  });

  it('должен устанавливать флаг isAuthChecked при неудачном получении пользователя', () => {
    const errorMessage = 'ot logged in';
    const actualState = reducer(
      initialState,
      getUser.rejected(new Error(errorMessage) as any, '', undefined)
    );
    expect(actualState).toEqual({
      ...initialState,
      error: errorMessage,
      isAuthChecked: true
    });
  });

  it('должен устанавливать пользователя при успешном получении пользователя', () => {
    const actualState = reducer(
      initialState,
      getUser.fulfilled({ user, success: true }, '', undefined)
    );
    expect(actualState).toEqual({
      ...initialState,
      user,
      isAuthChecked: true
    });
  });

  it('должен очищать пользователя при успешном выходе', () => {
    const stateWithUser: TUserState = {
      ...initialState,
      user
    };
    const actualState = reducer(
      stateWithUser,
      logoutUser.fulfilled(undefined, '', undefined)
    );
    expect(actualState).toEqual({
      ...initialState
    });
  });

  it('должен обновлять пользователя при успешном обновлении', () => {
    const updatedUser: TUser = {
      email: 'updated@example.com',
      name: 'Updated User'
    };
    const actualState = reducer(
      initialState,
      updateUser.fulfilled(
        { user: updatedUser, success: true },
        '',
        updatedUser
      )
    );
    expect(actualState).toEqual({
      ...initialState,
      user: updatedUser
    });
  });
});
