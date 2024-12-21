import { http, HttpResponse } from 'msw';
import mockIngredients from './ingredients.json';
const URL = process.env.BURGER_API_URL;

export const handlers = [
  http.get(URL + '/ingredients*', () => HttpResponse.json(mockIngredients))
];
