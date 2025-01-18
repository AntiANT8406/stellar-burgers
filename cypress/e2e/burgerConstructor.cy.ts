describe('Проверка работы конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:4000');
  });

  it('Проверка добавления булки', () => {
    cy.get('[data-cy="top-no-bun"]').should('exist');
    cy.get('[data-cy="bottom-no-bun"]').should('exist');
    cy.get('[data-cy="buns-ingredients"]').contains('Добавить').click();
    cy.get('[data-cy="top-bun"]').contains('Ингридиент_01').should('exist');
    cy.get('[data-cy="bottom-bun"]').contains('Ингридиент_01').should('exist');
  });

  it('Проверка добавления котлет', () => {
    cy.get('[data-cy="ingredients"]').should('exist');
    cy.get('[data-cy="mains-ingredients"]').contains('Добавить').click();
    cy.get('[data-cy="ingredients"]').contains('Ингридиент_02').should('exist');
  });

  it('Проверка добавления соуса', () => {
    cy.get('[data-cy="ingredients"]').should('exist');
    cy.get('[data-cy="sauces-ingredients"]').contains('Добавить').click();
    cy.get('[data-cy="ingredients"]').contains('Ингридиент_04').should('exist');
  });
});

describe('Проверка работы модального окна ингридиента', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:4000');
    cy.get('[data-cy="mains-ingredients"]').contains('Ингридиент_02').click();
  });
  it('Проверка открытия модального окна ингридиента', () => {
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal"]').contains('Ингридиент_02').should('exist');
  });
  it('Проверка закрытия модального окна ингридиента по крестику', () => {
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });
  it('Проверка закрытия модального окна ингридиента по оверлею', () => {
    cy.get('[data-cy="modal-overlay"').click(10, 10, { force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });
});

describe('Проверка оформления заказа', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'token');
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' });
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:4000');
  });

  it('Проверка получения пользователя', () => {
    cy.get('[data-cy="user"]').contains('testName').should('exist');
  });
});
