const selectors = {
  topBun: 'top-bun',
  bottomBun: 'bottom-bun',
  topNoBun: 'top-no-bun',
  bottomNoBun: 'bottom-no-bun',
  ingredients: 'ingredients',
  bunsIngredients: 'buns-ingredients',
  mainsIngredients: 'mains-ingredients',
  saucesIngredients: 'sauces-ingredients',
  modal: 'modal',
  modalClose: 'modal-close',
  modalOverlay: 'modal-overlay',
  order: 'order',
  userName: 'user-name'
};

describe('Проверка работы конструктора', () => {
  beforeEach(() => {
    cy.setFixtures();
  });

  it('Проверка добавления булки', () => {
    cy.dataCy(selectors.topNoBun).should('exist');
    cy.dataCy(selectors.bottomNoBun).should('exist');
    cy.dataCy(selectors.bunsIngredients).contains('Добавить').click();
    cy.dataCy(selectors.topBun).contains('Ингридиент_01').should('exist');
    cy.dataCy(selectors.bottomBun).contains('Ингридиент_01').should('exist');
  });

  it('Проверка добавления котлет', () => {
    cy.dataCy(selectors.ingredients).should('exist');
    cy.dataCy(selectors.mainsIngredients).contains('Добавить').click();
    cy.dataCy(selectors.ingredients).contains('Ингридиент_02').should('exist');
  });

  it('Проверка добавления соуса', () => {
    cy.dataCy(selectors.ingredients).should('exist');
    cy.dataCy(selectors.saucesIngredients).contains('Добавить').click();
    cy.dataCy(selectors.ingredients).contains('Ингридиент_04').should('exist');
  });
});

describe('Проверка работы модального окна ингридиента', () => {
  beforeEach(() => {
    cy.setFixtures();
    cy.dataCy(selectors.mainsIngredients).contains('Ингридиент_02').click();
  });
  it('Проверка открытия модального окна ингридиента', () => {
    cy.dataCy(selectors.modal).should('be.visible');
    cy.dataCy(selectors.modal).contains('Ингридиент_02').should('exist');
  });
  it('Проверка закрытия модального окна ингридиента по крестику', () => {
    cy.dataCy(selectors.modalClose).click();
    cy.dataCy(selectors.modal).should('not.exist');
  });
  it('Проверка закрытия модального окна ингридиента по оверлею', () => {
    cy.dataCy(selectors.modalOverlay).click(10, 10, { force: true });
    cy.dataCy(selectors.modal).should('not.exist');
  });
});

describe('Проверка оформления заказа', () => {
  beforeEach(() => {
    cy.setFixtures();
    localStorage.setItem('refreshToken', 'refreshToken');
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' });
  });

  it('Проверка получения пользователя', () => {
    cy.dataCy(selectors.userName).contains('testName').should('exist');
  });

  it('Проверка создания заказа', () => {
    cy.dataCy(selectors.bunsIngredients).contains('Добавить').click();
    cy.dataCy(selectors.mainsIngredients).contains('Добавить').click();
    cy.dataCy(selectors.order).contains('Оформить заказ').click();
    cy.dataCy(selectors.modal).should('be.visible');
    cy.dataCy(selectors.modal).contains('123').should('exist');

    cy.dataCy(selectors.modalClose).click();
    cy.dataCy(selectors.modal).should('not.exist');

    cy.dataCy(selectors.topNoBun).should('exist');
    cy.dataCy(selectors.bottomNoBun).should('exist');
    cy.dataCy(selectors.ingredients).children('li').should('not.exist');
  });
});
