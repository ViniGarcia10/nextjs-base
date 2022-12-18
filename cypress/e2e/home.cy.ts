describe("Home", () => {
  it("shold load the page", () => {
    cy.visit("/");
  });
  it("shold go to login page", () => {
    cy.visit("/");
    cy.get("button").click();
    cy.url().should("include", "/api/auth/signin");
  });
});
