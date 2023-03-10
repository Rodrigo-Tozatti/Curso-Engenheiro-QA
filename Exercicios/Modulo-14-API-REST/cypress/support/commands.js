// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginToken', (email, password) => {
    cy.request({
        method: 'POST',
        url: 'login',
        body: {
            "email": email,
            "password": password
        }
    }).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body.message).to.equal('Login realizado com sucesso')
        return response.body.authorization
    })
})

Cypress.Commands.add('cadProduto', (token, produto, preco, descricao, quantidade) => {
    cy.request({
        method: 'POST',
        url: 'Produtos',
        body: {
            "nome": produto,
            "preco": preco,
            "descricao": descricao,
            "quantidade": quantidade
        },
        headers: { authorization: token },
        failOnStatusCode: false // linha de comando para validar um teste de erro (cenário negativo)
    })
})

Cypress.Commands.add('cadUsuario', (nome, email, senha) => {
    cy.request({
        method: 'POST',
        url: 'usuarios',
        body: {
            "nome": nome,
            "email": email,
            "password": senha,
            "administrador": "true"
        }
    }).then((response) => {
        expect(response.status).to.equal(201)
        expect(response.body.message).to.equal('Cadastro realizado com sucesso')
    })
})