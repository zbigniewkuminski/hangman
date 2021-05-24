
context('Actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    });

    it('Toggle language button not visible on main page', () => {
        cy.get('#toggle-language-button').should('not.exist');
    });

    it('Toggle language button not visible on authors page', () => {
        cy.get('#authors-button').trigger('mouseover').click();
        cy.get('#toggle-language-button').should('not.exist');
    });

    it('Check if text on language toggle button is "English"', () => {
        cy.get('#classic-game-button').trigger('mouseover');
        cy.get('#classic-game-polish-button').trigger('mouseover').click();
        var toggleButton = cy.get('#toggle-language-button');
        toggleButton.should('exist');
        toggleButton.should('have.text', 'English');
        cy.url().should('eq', 'http://localhost:3000/pl/game');
    });

    it('Check if text on language toggle button is "Polish"', () => {
        cy.get('#classic-game-button').trigger('mouseover');
        cy.get('#classic-game-english-button').trigger('mouseover').click();
        var toggleButton = cy.get('#toggle-language-button');
        toggleButton.should('exist');
        toggleButton.should('have.text', 'Polski');
        cy.url().should('eq', 'http://localhost:3000/en/game');
    });

    it('Clicking toggle language button should change from Polish to English', () => {
        cy.get('#classic-game-button').trigger('mouseover');
        cy.get('#classic-game-polish-button').trigger('mouseover').click();
        var toggleButton = cy.get('#toggle-language-button');
        toggleButton.should('exist');
        toggleButton.should('have.text', 'English');
        cy.url().should('eq', 'http://localhost:3000/pl/game');
        cy.get('#toggle-language-button').click();
        cy.url().should('eq', 'http://localhost:3000/en/game');
    });

    it('Clicking toggle language button should change from English to Polish', () => {
        cy.get('#classic-game-button').trigger('mouseover');
        cy.get('#classic-game-english-button').trigger('mouseover').click();
        var toggleButton = cy.get('#toggle-language-button');
        toggleButton.should('exist');
        toggleButton.should('have.text', 'Polski');
        cy.url().should('eq', 'http://localhost:3000/en/game');
        cy.get('#toggle-language-button').click();
        cy.url().should('eq', 'http://localhost:3000/pl/game');
    });

    // testy:
    // po kliknięciu na przycisk język z angielskiego zmienia się na polski (zmiana w url)

});
