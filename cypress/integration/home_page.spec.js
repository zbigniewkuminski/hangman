context('Open Game', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('should contain hangman2077 title on main page', () => {
    cy.get('#home-page-title')
      .should('exist');
  });

  it('should contain hangman2077 gif on main page', () => {
    cy.get('#home-page-gif')
      .should('exist');
  });

  it('is navbar visible', () => {
    cy.getNavbar();
  });

});
