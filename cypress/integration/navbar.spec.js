/// <reference types="cypress" />

context("Navbar", () => {
    beforeEach(() => {});

    it("hould open hangman main page should check is classic game mode button and dropdown language buttons menu visible and are they correctly named", () => {
        cy.visit("http://localhost:3000/en/mainpage");
        cy.get("#classic-game-button").should('have.text','Classic Game');
        cy.get("#classic-game-button").trigger('mouseover');
        cy.get("#classic-game-polish-button").should('have.text','Polish');
        cy.get("#classic-game-english-button").should('have.text','English');
        cy.get("#classic-game-english-button").click();
        cy.url().should("eq", "http://localhost:3000/en/game");

        cy.get("#classic-game-polish-button").click();
        cy.get("#classic-game-button").should('have.text','Klasyczna Gra');
        cy.get("#classic-game-polish-button").should('have.text','Polski');
        cy.get("#classic-game-english-button").should('have.text','Angielski');
        cy.url().should("eq", "http://localhost:3000/pl/game");

        cy.get("#toggle-language-button").click()
    });

    it("should check name of main button in english and polish", () => {
        cy.get("#main-page-button").should("have.text", "Main Page");
        cy.get("#toggle-language-button").click()

        cy.get("#main-page-button").should("have.text", "Strona główna");
        cy.get("#toggle-language-button").click()
      });

      it("should check is time game mode button and dropdown language buttons menu visible and are they correctly named", () => {
        cy.get("#time-game-button").should('have.text','Time mode');
        cy.get("#time-game-button").trigger('mouseover');
        cy.get("#time-game-polish-button").should('have.text','Polish');
        cy.get("#time-game-english-button").should('have.text','English');
        cy.get("#time-game-polish-button").click();

        cy.url().should("eq", "http://localhost:3000/pl/timegame");
        cy.get("#classic-game-button").should('have.text','Klasyczna Gra');
        cy.get("#time-game-polish-button").should('have.text','Polski');
        cy.get("#time-game-english-button").should('have.text','Angielski');
        cy.get("#time-game-button").trigger('mouseover');
        cy.get("#time-game-english-button").click();
        cy.url().should("eq", "http://localhost:3000/en/timegame");
    });

    it("should check can user access Authors page and check has url changed", () => {
        cy.get("#authors-button").click();
        cy.url().should("eq", "http://localhost:3000/en/authors");
      });
  });
  