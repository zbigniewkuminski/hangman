context('Open Game', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Should contain hangman2077 title on main page', () => {
    cy.get('#home-page-title')
      .should('exist');
  });

  it('Should contain hangman2077 gif on main page', () => {
    cy.get('#home-page-gif')
      .should('exist');
  });

  it('Should navbar be visible', () => {
    cy.getNavbar();
  });

});
