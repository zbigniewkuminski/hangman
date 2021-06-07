
context('Classic game', () => {
  beforeEach(() => { })

  it('Should open main page and check does view contain polish description', () => {
    cy.visit("http://localhost:3000/en/mainpage");
    cy.goToPolishClassicGame();
    cy.get('#game-description').should('have.text', 'Twoim celem jest uratowanie tego biednego człowieka przed powieszeniem. Możesz dokonać tego odgadując wszystkie ukryte litery. Wybierz litery z tablicy poniżej ale miej na uwadze to że każdy błąd, który popełnisz przybliża tego nieszczęśnika do śmierci. Powodzenia.');
  });

  it('Should check if hidden word is displayed in polish classic game', () => {
    cy.get('#displayed-word').contains('*');
  });

  it('Should check if user is on polish classic game page', () => {
    cy.url().should('eq', 'http://localhost:3000/pl/game');
  });

  it('Should check if hangman graphic displayed in polish', () => {
    cy.get("#hangman-image").should("exist");
  });

  it('Should check if polish classic game uses 35 characters ', () => {
    cy.get('.keyboard-button').should('have.length', 35);
  });

  it('Should display polish new game button', () => {
    cy.get('#new-game-button').should('have.text', 'Nowa gra');
  });

  it('Should display polish scoreboard button', () => {
    cy.get('#scoreboard-button').should('have.text', 'Tablica wyników');
  });

  it('Should display polish finish-game button', () => {
    cy.get('#finish-game-button').should('have.text', 'Koniec gry');
  });

  it('Should display polish pick letter header', () => {
    cy.get('#pick-letter-header').should('have.text', 'Wybierz literę  ');
  });

  it('Should display polish already used letter header', () => {
    cy.get('#used-letter').should('have.text', 'Wybrane litery ');
  });

  it('Should display polish score label', () => {
    cy.get('#score-label').should('have.text', 'Wynik');
  });

  it('Should check if selecting polish letters works (letter dissappear from pick letter buttons section and appear in used letter list)', () => {
    cy.get('.keyboard-button').eq(0).click();
    cy.get('.keyboard-button').should('have.length', 34); 
    cy.get('.mr-1').should('have.length', 1)
  });

  it('Should check if Polish new game button works', () => {
    cy.get('#new-game-button').click();
    cy.get('.keyboard-button').should('have.length', 35); 
    cy.get('.mr-1').should('have.length', 0)
  });

  it('Should check if polish finish game button works', () => {
    cy.get('#finish-game-button').click();
    cy.get('#scoreboard').should('exist');
    cy.get('#close-scoreboard-button').click();
  });

  it('Should check if polish scoreboard button works', () => { 
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

  it('Should contain english description', () => {
    cy.goToEnglishClassicGame();
    cy.get('#game-description').should('have.text', 'Your goal is to save the poor man from being hanged. You can achieve this by guessing all hidden letters. Pick letters from board below but be aware that every mistake You make, gets this Guy closer to dead. Good luck.');
  });

  it('Should check if hidden word is displayed in english classic game', () => {
    cy.get('#displayed-word').contains('*');
  });

  it('Should check if user is on english classic game page', () => {
    cy.url().should('eq', 'http://localhost:3000/en/game');
  });

  it('Should check if hangman graphic displayed in english', () => {
    cy.get("#hangman-image").should("exist");
  });

  it('Should check if english classic game uses 26 characters ', () => {
    cy.get('.keyboard-button').should('have.length', 26);
  });

  it('Should display english new game button', () => {
    cy.get('#new-game-button').should('have.text', 'New game');
  });

  it('Should display english scoreboard button', () => {
    cy.get('#scoreboard-button').should('have.text', 'Scoreboard');
  });

  it('Should display english finish-game button', () => {
    cy.get('#finish-game-button').should('have.text', 'Finish game');
  });

  it('Should display english pick letter header', () => {
    cy.get('#pick-letter-header').should('have.text', 'Pick letter  ');
  });

  it('Should display polish already used letter header', () => {
    cy.get('#used-letter').should('have.text', 'Used letters ');
  });

  it('Should display english score label', () => {
    cy.get('#score-label').should('have.text', 'Score');
  });

  it('Should check if selecting english letters works (letter dissappear from pick letter buttons section and appear in used letter list)', () => {
    cy.get('.keyboard-button').eq(0).click();
    cy.get('.keyboard-button').should('have.length', 25); 
    cy.get('.mr-1').should('have.length', 1)
  });

  it('Should check if english new game button works', () => {
    cy.get('#new-game-button').click();
    cy.get('.keyboard-button').should('have.length', 26); 
    cy.get('.mr-1').should('have.length', 0)
  });

  it('Should check if english finish game button works', () => {
    cy.get('#finish-game-button').click();
    cy.get('#scoreboard').should('exist');
    cy.get('#close-scoreboard-button').click();
  });

  it('Should check if english scoreboard button works', () => { 
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
