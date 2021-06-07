
context('Classic game', () => {
  beforeEach(() => { })

  it('main page and check does view contain polish description', () => {
    cy.visit("http://localhost:3000/en/mainpage");
    cy.goToPolishClassicGame();
    cy.get('#game-description').should('have.text', 'Twoim celem jest uratowanie tego biednego człowieka przed powieszeniem. Możesz dokonać tego odgadując wszystkie ukryte litery. Wybierz litery z tablicy poniżej ale miej na uwadze to że każdy błąd, który popełnisz przybliża tego nieszczęśnika do śmierci. Powodzenia.');
  });

  it('should display hidden word in polish classic game', () => {
    cy.get('#displayed-word').contains('*');
  });

  it('check if user is on polish classic game page', () => {
    cy.url().should('eq', 'http://localhost:3000/pl/game');
  });

  it("should check if hangman graphic displayed in polish", () => {
    cy.get("#hangman-image").should("exist");
  });

  it('polish classic game uses 35 characters ', () => {
    cy.get('.keyboard-button').should('have.length', 35);
  });

  it('should display polish new game button', () => {
    cy.get('#new-game-button').should('have.text', 'Nowa gra');
  });

  it('should display polish scoreboard button', () => {
    cy.get('#scoreboard-button').should('have.text', 'Tablica wyników');
  });

  it('should display polish finish-game button', () => {
    cy.get('#finish-game-button').should('have.text', 'Koniec gry');
  });

  it('should display polish pick letter header', () => {
    cy.get('#pick-letter-header').should('have.text', 'Wybierz literę  ');
  });

  it('should display polish already used letter header', () => {
    cy.get('#used-letter').should('have.text', 'Wybrane litery ');
  });

  it('should display polish score label', () => {
    cy.get('#score-label').should('have.text', 'Wynik');
  });

  it('selecting polish letters works (letter dissappear from pick letter buttons section and appear in used letter list)', () => {
    cy.get('.keyboard-button').eq(0).click();
    cy.get('.keyboard-button').should('have.length', 34); 
    cy.get('.mr-1').should('have.length', 1)
  });

  it('polish new game button works', () => {
    cy.get('#new-game-button').click();
    cy.get('.keyboard-button').should('have.length', 35); 
    cy.get('.mr-1').should('have.length', 0)
  });

  it('polish finish game button works', () => {
    cy.get('#finish-game-button').click();
    cy.get('#scoreboard').should('exist');
    cy.get('#close-scoreboard-button').click();
  });

  it('polish scoreboard button works', () => { 
    cy.get('#scoreboard-button').click();
    cy.get('#scoreboard').should('exist');
    cy.get('.first-place').should('exist');
    cy.get('.podium-first').should('exist');
    cy.get('.second-place').should('exist');
    cy.get('.podium-second').should('exist');
    cy.get('.third-place').should('exist');
    cy.get('.podium-third').should('exist');
    cy.get('#scoreboard-list').should('exist');
    cy.get('#close-scoreboard-button').click();
  });  

  it('should contain english description', () => {
    cy.goToEnglishClassicGame();
    cy.get('#game-description').should('have.text', 'Your goal is to save the poor man from being hanged. You can achieve this by guessing all hidden letters. Pick letters from board below but be aware that every mistake You make, gets this Guy closer to dead. Good luck.');
  });

  it('should display hidden word in english classic game', () => {
    cy.get('#displayed-word').contains('*');
  });

  it('check if user is on english classic game page', () => {
    cy.url().should('eq', 'http://localhost:3000/en/game');
  });

  it("should check if hangman graphic displayed in english", () => {
    cy.get("#hangman-image").should("exist");
  });

  it('english classic game uses 26 characters ', () => {
    cy.get('.keyboard-button').should('have.length', 26);
  });

  it('should display english new game button', () => {
    cy.get('#new-game-button').should('have.text', 'New game');
  });

  it('should display english scoreboard button', () => {
    cy.get('#scoreboard-button').should('have.text', 'Scoreboard');
  });

  it('should display english finish-game button', () => {
    cy.get('#finish-game-button').should('have.text', 'Finish game');
  });

  it('should display english pick letter header', () => {
    cy.get('#pick-letter-header').should('have.text', 'Pick letter  ');
  });

  it('should display polish already used letter header', () => {
    cy.get('#used-letter').should('have.text', 'Used letters ');
  });

  it('should display english score label', () => {
    cy.get('#score-label').should('have.text', 'Score');
  });

  it('selecting english letters works (letter dissappear from pick letter buttons section and appear in used letter list)', () => {
    cy.get('.keyboard-button').eq(0).click();
    cy.get('.keyboard-button').should('have.length', 25); 
    cy.get('.mr-1').should('have.length', 1)
  });

  it('english new game button works', () => {
    cy.get('#new-game-button').click();
    cy.get('.keyboard-button').should('have.length', 26); 
    cy.get('.mr-1').should('have.length', 0)
  });

  it('english ginish game button works', () => {
    cy.get('#finish-game-button').click();
    cy.get('#scoreboard').should('exist');
    cy.get('#close-scoreboard-button').click();
  });

  it('english scoreboard button works', () => { 
    cy.get('#scoreboard-button').click();
    cy.get('#scoreboard').should('exist');
    cy.get('.first-place').should('exist');
    cy.get('.podium-first').should('exist');
    cy.get('.second-place').should('exist');
    cy.get('.podium-second').should('exist');
    cy.get('.third-place').should('exist');
    cy.get('.podium-third').should('exist');
    cy.get('#scoreboard-list').should('exist');
    cy.get('#close-scoreboard-button').click();
  });

});
