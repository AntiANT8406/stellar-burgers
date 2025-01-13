describe('BurgerConstructor', () => {
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
