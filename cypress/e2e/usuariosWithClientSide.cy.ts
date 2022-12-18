describe("Validation user", () => {
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

    //get display of users repeat 1
    cy.get("strong").then((strong) => {
      const beforeQuant = Number(strong.text().match(/[0-9]/gm));
      if (beforeQuant) {
        //click pagination
        cy.get('button:contains("Próxima Página")').click();

        //click pagination
        cy.get('button:contains("Próxima Página")').click();

        cy.get("strong").then((strong) => {
          const afterQuant = Number(strong.text().match(/[0-9]/gm));

          if (afterQuant && beforeQuant != beforeQuant) {
            const before = beforeQuant;
            const after = afterQuant;

            expect(after).to.be.equal(before + 2);
          }
        });
      }
    });
    
  });
});
