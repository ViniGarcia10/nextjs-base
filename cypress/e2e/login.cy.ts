describe("Home", () => {
  beforeEach(() => {
    cy.visit("/api/auth/signin");
  });

  it("shold enter login page", () => {
    cy.title().should("contain", "Sign In");
  });

  it("shold get an error on login with wrong credentials", () => {
    const emailFalse = "wrong@gmail.com";
    const passFalse = "1235";

    cy.get("#input-email-for-credentials-provider").type(emailFalse);
    cy.get("#input-password-for-credentials-provider").type(passFalse);
    cy.contains("Sign in with Credentials").click();
    cy.contains("Sign in failed");
    cy.url().should("contain", "error=CredentialsSignin");
  });

  it("shold do credentials login property", () => {
    const emailValid = "viniciusgarcia49@gmail.com";
    const passValid = "1234";

    cy.get("#input-email-for-credentials-provider").type(emailValid);
    cy.get("#input-password-for-credentials-provider").type(passValid);
    cy.contains("Sign in with Credentials").click();
    cy.get('button:contains("Sair")').should("exist");
  });

  it("shold do logout", () => {
    const emailValid = "viniciusgarcia49@gmail.com";
    const passValid = "1234";
    cy.get("#input-email-for-credentials-provider").type(emailValid);
    cy.get("#input-password-for-credentials-provider").type(passValid);
    cy.contains("Sign in with Credentials").click();

    cy.get(`button:contains("Sair")`).click();
    cy.get(`button:contains("Login")`).should("exist");
  });
});
