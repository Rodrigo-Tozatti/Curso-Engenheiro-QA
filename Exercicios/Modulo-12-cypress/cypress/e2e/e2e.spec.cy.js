/*  Como cliente 
       Quero acessar a Loja EBAC 
       Para fazer um pedido de 4 produtos 
       Fazendo a escolha dos produtos
       Adicionando ao carrinho
       Preenchendo todas opções no checkout
       E validando minha compra ao final */

var dadosSensiveis = require('../fixtures/dadosSensiveis.json')
import dadosCheckout from '../support/Pageobjects/dadosCheckout';
var checkout = require('../fixtures/dadoschekout.json')

describe('TESTE E2E EBACSHOP - COMPRA DE PRODUTOS ', () => {

  beforeEach(() => {
    cy.visit('produtos')
    cy.login(dadosSensiveis.usuario, dadosSensiveis.senha)
    cy.get('#primary-menu > .menu-item-629 > a').click()
  });

  it.only('Deve fazer uma compra de 04 produtos', () => {

    cy.selProduto('1', 'Abominable Hoodie', 'M', 'Blue', '1');
    cy.selProduto('1', 'Ajax Full-Zip Sweatshirt', 'XL', 'Blue', '1')
    cy.selProduto('1', 'Arcadio Gym Short', '33', 'Red', '1')
    cy.selProduto('2', 'Autumn Pullie', 'M', 'Green', '1')

    cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()
    cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .view-cart').click()
    cy.get('.checkout-button').click()

    dadosCheckout.preencherCheckout(
      checkout[1].nome,
      checkout[1].sobrenome,
      checkout[1].empresa,
      checkout[1].pais,
      checkout[1].endereco,
      checkout[1].numero,
      checkout[1].cidade,
      checkout[1].estado,
      checkout[1].cep,
      checkout[1].telefone,
      checkout[1].email,
    )
    
    cy.get('.page-title').should('contain', 'Pedido recebido')
  });
})

