describe('BurgerConstructor', () => {
  beforeEach(() => {
    cy.clearAllLocalStorage();
    cy.intercept('GET', '/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
  });
});
