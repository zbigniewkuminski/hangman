context('Toggle language button', () => {
    beforeEach(() => { });

    it('Toggle language button not visible on main page', () => {
        cy.visit('http://localhost:3000')
        cy.get('#toggle-language-button').should('not.exist');
    });

    it('Toggle language button not visible on authors page', () => {
        cy.get('#authors-button').trigger('mouseover').click();
        cy.get('#toggle-language-button').should('not.exist');
    });

    it('Check if text on language toggle button is "English"', () => {
        cy.goToPolishClassicGame();
        var toggleButton = cy.get('#toggle-language-button');
        toggleButton.should('exist');
        toggleButton.should('have.text', 'English');
        cy.url().should('eq', 'http://localhost:3000/pl/game');
    });

    it('Clicking toggle language button should change from Polish to English', () => {
        var toggleButton = cy.get('#toggle-language-button');
        toggleButton.should('exist');
        toggleButton.should('have.text', 'English');
        cy.url().should('eq', 'http://localhost:3000/pl/game');
        cy.get('#toggle-language-button').click();
        cy.url().should('eq', 'http://localhost:3000/en/game');
    });

    it('Clicking toggle language button should change timegame from Polish to English', () => {
        cy.visit('http://localhost:3000/pl/timegame');
        var toggleButton = cy.get('#toggle-language-button');
        toggleButton.should('exist');
        toggleButton.should('have.text', 'English');
        cy.url().should('eq', 'http://localhost:3000/pl/timegame');
        cy.get('#toggle-language-button').click();
        cy.url().should('eq', 'http://localhost:3000/en/timegame');
    });

    it('Clicking toggle language button should change timegame from English to Polish', () => {
        cy.visit('http://localhost:3000/en/timegame');
        var toggleButton = cy.get('#toggle-language-button');
        toggleButton.should('exist');
        toggleButton.should('have.text', 'Polski');
        cy.url().should('eq', 'http://localhost:3000/en/timegame');
        cy.get('#toggle-language-button').click();
        cy.url().should('eq', 'http://localhost:3000/pl/timegame');
    });
    
    it('Check if text on language toggle button is "Polish"', () => {
        cy.goToEnglishClassicGame();
        var toggleButton = cy.get('#toggle-language-button');
        toggleButton.should('exist');
        toggleButton.should('have.text', 'Polski');
        cy.url().should('eq', 'http://localhost:3000/en/game');
    });

    it('Clicking toggle language button should change from English to Polish', () => {
        var toggleButton = cy.get('#toggle-language-button');
        toggleButton.should('exist');
        toggleButton.should('have.text', 'Polski');
        cy.url().should('eq', 'http://localhost:3000/en/game');
        cy.get('#toggle-language-button').click();
        cy.url().should('eq', 'http://localhost:3000/pl/game');
    });

});
