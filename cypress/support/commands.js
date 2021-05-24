// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getNavbar', () => {
    cy.get('#navbar').should('exist');
});

Cypress.Commands.add('goToPolishClassicGame', () => {
    cy.get('#classic-game-button').trigger('mouseover');
    cy.get('#classic-game-polish-button').trigger('mouseover').click();
});
Cypress.Commands.add('goToEnglishClassicGame', () => {
    cy.get('#classic-game-button').trigger('mouseover');
    cy.get('#classic-game-english-button').trigger('mouseover').click();
});