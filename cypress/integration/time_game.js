/// <reference types="cypress" />

context("Time mode", () => {
  context("Polish", () => {
    beforeEach(() => {});
    var firstTimeValue = '';

    it("should open hangman main page and check is hangman2077 title displayed on main page", () => {
      cy.visit("http://localhost:3000/en/mainpage");
      cy.get("#home-page-title").should("exist");
    });

    it("should check is time mode button and dropdown language buttons menu visible and are they correctly named in polish", () => {
      cy.get("#time-game-button").should('have.text','Time mode');
      cy.get("#time-game-button").trigger('mouseover');
      cy.get("#time-game-polish-button").should('have.text','Polish');
      cy.get("#time-game-english-button").should('have.text','English');
    });

    it("should open time mode in polish and set firstTimeVariable value", () => {
      cy.get("#time-game-polish-button").click();
      cy.url().should("eq", "http://localhost:3000/pl/timegame");
      firstTimeValue = cy.get("#game-timer-header-and-value");
     });

    it("should check game description in polish", () => {
      cy.get("#game-description").should("have.text","Twoim celem jest uratowanie tego biednego człowieka przed powieszeniem. Możesz dokonać tego odgadując wszystkie ukryte litery. Wybierz litery z tablicy poniżej ale miej na uwadze to że każdy błąd, który popełnisz przybliża tego nieszczęśnika do śmierci. Powodzenia.");
    });

    it("should check is encrypted password displayed in polish", () => {
      cy.get("#displayed-word").contains("*");
    });

    it("should check is hangman graphic displayed in polish", () => {
      cy.get("#hangman-image").should("exist");
    });

    it("should check letters description header in polish", () => {
      cy.get("#pick-letter-description").should("have.text","Wybierz literę  ");
    });

    it("should check amount of letters buttons in polish", () => {
        cy.get(".keyboard-button").should("have.length", "35");
    });

    it("should check picked letters description header in polish", () => {
        cy.get("#used-letters-header").should("have.text","Wybrane litery ");
    });

    it("should check timer description header in polish", () => {
        cy.get("#game-timer-header-and-value").contains("Pozostaly czas");
    });

    it("should check score description header in polish", () => {
        cy.get(".header").eq(3).should("have.text","Wynik: 0");
    });

    it("should check are reset button, scoreboard button and finishgame button visible and correctly named in polish", () => {
      cy.get("#game-reset-button").should('have.text','Reset');
      cy.get("#scoreboard-button").should('have.text','Tablica wyników');
      cy.get("#finish-game-button").should('have.text','Koniec gry');
    });

    it("should compare first and second time variables", () => {
      cy.get("#game-timer-header-and-value").should("not.be.equal", firstTimeValue);
    });

    it("should check is used letters list empty and does used letter appear on this list after picking letter", () => {
      cy.get(".mr-1").should("not.exist");
      cy.get(".keyboard-button").eq(1).click();
      cy.get(".mr-1").should("have.text", "Ą");
      cy.get(".keyboard-button").should("have.length", "34");
    });

    it("should check is reset button working", () => {
      cy.get(".mr-1").should("have.text", "Ą");
      cy.get(".keyboard-button").should("have.length", "34");
      cy.get("#game-reset-button").click();
      cy.get(".mr-1").should("not.exist");
      cy.get(".keyboard-button").should("have.length", "35");
    });

    it("should check is end game working in polish", () => {
      cy.get(".add-player-to-scoreboard").should("not.exist");
      cy.get("#finish-game-button").click()
      cy.get(".add-player-to-scoreboard").should("exist");
      cy.get("#scoreboard-title").should("have.text", "TABLICA WYNIKÓW CZASOWYCH");
      cy.get("#to-weak-description").should("have.text", "Jesteś zbyt słaby i nie zasługujesz aby zająć miejsce na tablicy wyników.");
      cy.get("#close-scoreboard-button").click();
    });

    it("should check is scoreboard view working in polish", () => {
      cy.get("#displayed-word").should("not.contain","*");
      cy.get(".add-player-to-scoreboard").should("not.exist");
      cy.get("#scoreboard-button").click()
      cy.get(".add-player-to-scoreboard").should("exist");
      cy.get("#scoreboard-title").should("have.text", "TABLICA WYNIKÓW CZASOWYCH");
      cy.get(".first-place").should("exist");
      cy.get(".podium-first").should("exist");
      cy.get(".second-place").should("exist");
      cy.get(".podium-second").should("exist");
      cy.get(".third-place").should("exist");
      cy.get(".podium-third").should("exist");
      cy.get(".unique-scores-displaying-single-element").should("have.length", 7);
      cy.get("#close-scoreboard-button").click();
    });
});

context("Time mode", () => {
  context("English", () => {
    beforeEach(() => {});
    var firstTimeValue = '';

    it("should open hangman main page and check is hangman2077 title displayed on main page", () => {
      cy.visit("http://localhost:3000/en/mainpage");
      cy.get("#home-page-title").should("exist");
    });

    it("should check is time mode button and dropdown language buttons menu visible and are they correctly named in english", () => {
      cy.get("#time-game-button").should('have.text','Time mode');
      cy.get("#time-game-button").trigger('mouseover');
      cy.get("#time-game-polish-button").should('have.text','Polish');
      cy.get("#time-game-english-button").should('have.text','English');
    });

    it("should open time mode in english and set firstTimeVariable value", () => {
      cy.get("#time-game-english-button").click();
      cy.url().should("eq", "http://localhost:3000/en/timegame");
      firstTimeValue = cy.get("#game-timer-header-and-value");
    });
    
    it("should check game description in english", () => {
      cy.get("#game-description").should("have.text","Your goal is to save the poor man from being hanged. You can achieve this by guessing all hidden letters. Pick letters from board below but be aware that every mistake You make, gets this Guy closer to dead. Good luck.");
    });

    it("should check is encrypted password displayed in english", () => {
      cy.get("#displayed-word").contains("*");
    });

    it("should check is hangman graphic displayed in english", () => {
      cy.get("#hangman-image").should("exist");
    });

    it("should check letters description header in english", () => {
      cy.get("#pick-letter-description").should("have.text","Pick letter  ");
    });

    it("should check amount of letters buttons in english", () => {
        cy.get(".keyboard-button").should("have.length", "26");
    });

    it("should check picked letters description header in english", () => {
        cy.get("#used-letters-header").should("have.text","Used letters ");
    });

    it("should check timer description header in english", () => {
        cy.get("#game-timer-header-and-value").contains("Time remained");
    });

    it("should check score description header in english", () => {
        cy.get(".header").eq(3).should("have.text","Score: 0");
    });

    it("should check are reset button, scoreboard button and finishgame button visible and correctly named in english", () => {
      cy.get("#game-reset-button").should('have.text','Reset');
      cy.get("#scoreboard-button").should('have.text','Scoreboard');
      cy.get("#finish-game-button").should('have.text','Finish game');
    });

    it("should compare first and second time variables", () => {
      cy.get("#game-timer-header-and-value").should("not.be.equal", firstTimeValue);
    });

    it("should check is used letters list empty and does used letter appear on this list after picking letter", () => {
      cy.get(".mr-1").should("not.exist");
      cy.get(".keyboard-button").eq(0).click();
      cy.get(".mr-1").should("have.text", "A");
      cy.get(".keyboard-button").should("have.length", "25");
    });

    it("should check is reset button working", () => {
      cy.get(".mr-1").should("have.text", "A");
      cy.get(".keyboard-button").should("have.length", "25");
      cy.get("#game-reset-button").click();
      cy.get(".mr-1").should("not.exist");
      cy.get(".keyboard-button").should("have.length", "26");
    });

    it("should check is end game working in english", () => {
      cy.get(".add-player-to-scoreboard").should("not.exist");
      cy.get("#finish-game-button").click()
      cy.get(".add-player-to-scoreboard").should("exist");
      cy.get("#scoreboard-title").should("have.text", "TIME GAME SCOREBOARD");
      cy.get("#to-weak-description").should("have.text", "You are weak and you do not deserve for a place in scoreboard.");
      cy.get("#close-scoreboard-button").click();
    });

    it("should check is scoreboard view working in polish", () => {
      cy.get("#displayed-word").should("not.contain","*");
      cy.get(".add-player-to-scoreboard").should("not.exist");
      cy.get("#scoreboard-button").click()
      cy.get(".add-player-to-scoreboard").should("exist");
      cy.get("#scoreboard-title").should("have.text", "TIME GAME SCOREBOARD");
      cy.get(".first-place").should("exist");
      cy.get(".podium-first").should("exist");
      cy.get(".second-place").should("exist");
      cy.get(".podium-second").should("exist");
      cy.get(".third-place").should("exist");
      cy.get(".podium-third").should("exist");
      cy.get(".unique-scores-displaying-single-element").should("have.length", 7);
      cy.get("#close-scoreboard-button").click();
    });
});
});
});