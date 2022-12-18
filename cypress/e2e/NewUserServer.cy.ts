describe("create new user", () => {
  it("shold login and handle pagination", () => {
    //go to login page
    cy.visit("/api/auth/signin");

    //process login on page
    const emailValid = "viniciusgarcia49@gmail.com";
    const passValid = "1234";

    cy.title().should("contain", "Sign In");

    cy.get("#input-email-for-credentials-provider").type(emailValid);
    cy.get("#input-password-for-credentials-provider").type(passValid);
    cy.contains("Sign in with Credentials").click();

    //verify if login sucess
    cy.get('button:contains("Sair")').should("exist");

    //go to page usuariosWithClientSide
    cy.visit("/usuariosWithClientSide");

    //verify authorization user acess
    cy.get('h1:contains("Lista de Usuário com")').should("exist");
    cy.get('button:contains("Próxima Página")').should("exist");

    //create new user
    cy.get('button:contains("Novo Usuário")').click();

    //get elements
    const emailValidNew = Math.random().toString() + "@gmail.com";
    const nameValidNew = Math.random().toString() + " da Silva";
    cy.get("#name").type(nameValidNew);
    cy.get("#email").type(emailValidNew);
    cy.get("button:submit").click();

    //expected back page users
    cy.get('h1:contains("Lista de Usuário com")').should("exist");
    cy.get('button:contains("Próxima Página")').should("exist");
    cy.url().should("contain", "usuariosWithClientSide");
  });
});
