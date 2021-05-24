
context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })

  it('should contain hangman2077 title on main page', () => {
    cy.get('#home-page-title').should('exist');
  });

  it('should contain polish description', () => {
    cy.goToPolishClassicGame();
    cy.get('#game-description').should('have.text', 'Twoim celem jest uratowanie tego biednego człowieka przed powieszeniem. Możesz dokonać tego odgadując wszystkie ukryte litery. Wybierz litery z tablicy poniżej ale miej na uwadze to że każdy błąd, który popełnisz przybliża tego nieszczęśnika do śmierci. Powodzenia.');
  });

  it('should contain english description', () => {
    cy.goToEnglishClassicGame();
    cy.get('#game-description').should('have.text', 'Your goal is to save the poor man from being hanged. You can achieve this by guessing all hidden letters. Pick letters from board below but be aware that every mistake You make, gets this Guy closer to dead. Good luck.');
  });

  if ('should display hidden word', () => {
    cy.get()
    // displayed-word
  });

  it('check if user is on polish classic game page', () => {
    cy.goToPolishClassicGame();
    cy.url().should('eq', 'http://localhost:3000/pl/game');
  });

  it('check if user is on english classic game page', () => {
    cy.goToEnglishClassicGame();
    cy.url().should('eq', 'http://localhost:3000/en/game');
  });

  it('polish classic game uses 35 characters ', () => {
    cy.goToPolishClassicGame();
    cy.get('.keyboard-button').should('have.length', 35);
  });

  it('english classic game uses 26 characters ', () => {
    cy.goToEnglishClassicGame();
    cy.get('.keyboard-button').should('have.length', 26);
  });

  it('should display polish new game button', () => {
    cy.goToPolishClassicGame();
    cy.get('#new-game-button').should('have.text', 'Nowa gra')
  });

  it('should display english new game button', () => {
    cy.goToEnglishClassicGame();
    cy.get('#new-game-button').should('have.text', 'New game')
  });

  it('should display polish scoreboard button', () => {
    cy.goToPolishClassicGame();
    cy.get('#scoreboard-button').should('have.text', 'Tablica wyników')
  });

  it('should display english scoreboard button', () => {
    cy.goToEnglishClassicGame();
    cy.get('#scoreboard-button').should('have.text', 'Scoreboard')
  });

  it('should display polish finish-game button', () => {
    cy.goToPolishClassicGame();
    cy.get('#finish-game-button').should('have.text', 'Koniec gry')
  });

  it('should display english finish-game button', () => {
    cy.goToEnglishClassicGame();
    cy.get('#finish-game-button').should('have.text', 'Finish game')
  });

});
