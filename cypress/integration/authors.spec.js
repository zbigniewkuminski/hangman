/// <reference types="cypress" />

context("Authors page", () => {
  beforeEach(() => {});

  it("should open main page and check can user access Authors page and check has url changed", () => {
    cy.visit("http://localhost:3000/en/mainpage");
    cy.get("#authors-button").click();
    cy.url().should("eq", "http://localhost:3000/en/authors");
  });

  it("should check is zbydan logo displayed in upper and bottom view", () => {
    cy.get(".authors").eq(0).should("exist");
    cy.get(".authors").eq(1).should("exist");
  });

  it("should check does zbydan have animation css and it change color", () => {
    cy.get("body").should("have.css", "animation");
    cy.get(".authors").should("have.css", "color", 'rgb(255, 0, 0)');
    cy.get(".authors").should("have.css", "color", 'rgb(255, 255, 255)');
  });

  it("should check is all necessary text visible", () => {
    cy.get(".authors-page-wrapper").should("have.text", "ZBYDANENTERTAINMENT2021");
  });
});
