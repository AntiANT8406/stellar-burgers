import { before } from 'cypress/types/lodash';

describe('BurgerConstructor', () => {
  beforeEach(() => {
    cy.clearAllLocalStorage();
    cy.intercept('GET', '/ingredients', { fixture: 'ingredients.json' });
  });
  it('Проверка загрузки списка ингридиентов', () => {
    cy.visit('http://localhost:4000');
    const buns = cy.get('[data-cy="Булки"]');
    console.log(buns);
  });
});
