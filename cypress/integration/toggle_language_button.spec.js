context('Toggle language button', () => {
    beforeEach(() => { });

    it('Should check if "toggle language" is not visible on main page', () => {
        cy.visit('http://localhost:3000')
        cy.get('#toggle-language-button').should('not.exist');
    });

    it('Should check if "toggle language" is not visible on authors page', () => {
        cy.get('#authors-button').trigger('mouseover').click();
        cy.get('#toggle-language-button').should('not.exist');
    });

    it('Should check if text on "toggle language" button is "English" in classic game mode', () => {
        cy.goToPolishClassicGame();
        var toggleButton = cy.get('#toggle-language-button');
        toggleButton.should('exist');
        toggleButton.should('have.text', 'English');
        cy.url().should('eq', 'http://localhost:3000/pl/game');
    });

    it('Should check if text on "toggle language" button is "Polski" in classic game mode', () => {
        cy.goToEnglishClassicGame();
        var toggleButton = cy.get('#toggle-language-button');
        toggleButton.should('exist');
        toggleButton.should('have.text', 'Polski');
        cy.url().should('eq', 'http://localhost:3000/en/game');
    });

    it('Should check if text on "toggle language" button is "English" in time game mode', () => {
        cy.goToPolishTimeGame();
        var toggleButton = cy.get('#toggle-language-button');
        toggleButton.should('exist');
        toggleButton.should('have.text', 'English');
        cy.url().should('eq', 'http://localhost:3000/pl/timegame');
    });

    it('Should check if text on "toggle language" button is "Polski" in time game mode', () => {
        cy.goToEnglishTimeGame();
        var toggleButton = cy.get('#toggle-language-button');
        toggleButton.should('exist');
        toggleButton.should('have.text', 'Polski');
        cy.url().should('eq', 'http://localhost:3000/en/timegame');
    });

    it('Should check if clicking "toggle language" button change language from Polish to English in classic game mode', () => {
        cy.goToPolishClassicGame();
        var toggleButton = cy.get('#toggle-language-button');
        toggleButton.should('exist');
        toggleButton.should('have.text', 'English');
        cy.url().should('eq', 'http://localhost:3000/pl/game');
        cy.get('#toggle-language-button').click();
        toggleButton.should('have.text', 'Polski');
        cy.url().should('eq', 'http://localhost:3000/en/game');
    });

    it('Should check if clicking "toggle language" button change language from Polish to English in timegame mode', () => {
        cy.goToPolishTimeGame();
        var toggleButton = cy.get('#toggle-language-button');
        toggleButton.should('exist');
        toggleButton.should('have.text', 'English');
        cy.url().should('eq', 'http://localhost:3000/pl/timegame');
        cy.get('#toggle-language-button').click();
        toggleButton.should('have.text', 'Polski');
        cy.url().should('eq', 'http://localhost:3000/en/timegame');
    });

    it('Should check if clicking "toggle language" button change from English to Polish in classic game mode', () => {
        cy.goToEnglishClassicGame()
        var toggleButton = cy.get('#toggle-language-button');
        toggleButton.should('exist');
        toggleButton.should('have.text', 'Polski');
        cy.url().should('eq', 'http://localhost:3000/en/game');
        cy.get('#toggle-language-button').click();
        cy.url().should('eq', 'http://localhost:3000/pl/game');
    });

    it('Should check if clicking "toggle language" button change from English to Polish in timegame mode', () => {
        cy.goToEnglishTimeGame();
        var toggleButton = cy.get('#toggle-language-button');
        toggleButton.should('exist');
        toggleButton.should('have.text', 'Polski');
        cy.url().should('eq', 'http://localhost:3000/en/timegame');
        cy.get('#toggle-language-button').click();
        cy.url().should('eq', 'http://localhost:3000/pl/timegame');
    });

});
