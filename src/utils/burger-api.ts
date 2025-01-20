import { getCookie, setCookie, deleteCookie } from './cookie';
import { TIngredient, TOrder, TUser } from './types';

const URL = process.env.BURGER_API_URL;
const HEADERS_JSON = {
  'Content-Type': 'application/json;charset=utf-8'
};

type TServerResponse<T> = {
  success: boolean;
} & T;

const checkResponse = <T>(res: Response): Promise<TServerResponse<T>> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

const checkSuccess = <T>(
  res: TServerResponse<T>
): Promise<TServerResponse<T>> =>
  res && res.success ? Promise.resolve(res) : Promise.reject(res);

const request = <T>(endpoint: string, options: RequestInit = {}): Promise<T> =>
  fetch(`${URL}${endpoint}`, options)
    .then(checkResponse<T>)
    .then(checkSuccess<T>);

type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

export const refreshToken = (): Promise<TRefreshResponse> =>
  request<TRefreshResponse>('/auth/token', {
    method: 'POST',
    headers: HEADERS_JSON,
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  }).then((refreshData) => {
    localStorage.setItem('refreshToken', refreshData.refreshToken);
    setCookie('accessToken', refreshData.accessToken);
    return refreshData;
  });

export const requestWithRefresh = <T>(
  url: string,
  options?: RequestInit
): Promise<T> =>
  request<T>(url, options)
    .catch((err) => {
      if ((err as { message: string }).message === 'jwt expired') {
        return refreshToken();
      }
    })
    .then(() => request(url, options));

type TIngredientsResponse = TServerResponse<{
  data: TIngredient[];
}>;

export const getIngredientsApi = () =>
  request<TIngredientsResponse>('/ingredients').then((data) => data.data);

type TFeedsResponse = TServerResponse<{
  orders: TOrder[];
  total: number;
  totalToday: number;
}>;

export const getFeedsApi = () => request<TFeedsResponse>('/orders/all');

type TOrdersResponse = TServerResponse<{
  orders: TOrder[];
}>;

export const getOrdersApi = () =>
  requestWithRefresh<TOrdersResponse>('/orders', {
    method: 'GET',
    headers: Object.assign(HEADERS_JSON, {
      authorization: getCookie('accessToken')
    }) as HeadersInit
  }).then((res) => res.orders);

type TNewOrderResponse = TServerResponse<{
  order: TOrder;
  name: string;
}>;

export const orderBurgerApi = (data: string[]) =>
  request<TNewOrderResponse>('/orders', {
    method: 'POST',
    headers: HEADERS_JSON,
    body: JSON.stringify({
      ingredients: data
    })
  });

type TOrderResponse = TServerResponse<{
  orders: TOrder[];
}>;

export const getOrderByNumberApi = (number: number) =>
  request<TOrderResponse>(`/orders/${number}`);

export type TRegisterData = {
  email: string;
  name: string;
  password: string;
};

type TAuthResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: TUser;
}>;

export const registerUserApi = (data: TRegisterData) =>
  request<TAuthResponse>('/auth/register', {
    method: 'POST',
    headers: HEADERS_JSON,
    body: JSON.stringify(data)
  }).then((res) => {
    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);
    return res;
  });

export type TLoginData = {
  email: string;
  password: string;
};

export const loginUserApi = (data: TLoginData) =>
  request<TAuthResponse>('/auth/login', {
    method: 'POST',
    headers: HEADERS_JSON,
    body: JSON.stringify(data)
  }).then((res) => {
    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);
    return res;
  });

export const forgotPasswordApi = (data: { email: string }) =>
  request<TServerResponse<{}>>('/password-reset', {
    method: 'POST',
    headers: HEADERS_JSON,
    body: JSON.stringify(data)
  });

export const resetPasswordApi = (data: { password: string; token: string }) =>
  request<TServerResponse<{}>>('/password-reset/reset', {
    method: 'POST',
    headers: HEADERS_JSON,
    body: JSON.stringify(data)
  });

type TUserResponse = TServerResponse<{ user: TUser }>;

export const getUserApi = () =>
  request<TUserResponse>('/auth/user', {
    headers: Object.assign(HEADERS_JSON, {
      authorization: getCookie('accessToken')
    }) as HeadersInit
  });

export const updateUserApi = (user: Partial<TRegisterData>) =>
  request<TUserResponse>('/auth/user', {
    method: 'PATCH',
    headers: Object.assign(HEADERS_JSON, {
      authorization: getCookie('accessToken')
    }) as HeadersInit,
    body: JSON.stringify(user)
  });

export const logoutApi = () =>
  request<TServerResponse<{}>>('/auth/logout', {
    method: 'POST',
    headers: HEADERS_JSON,
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  }).then(() => {
    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
  });
