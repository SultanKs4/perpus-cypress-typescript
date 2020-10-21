// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command to login website by username and password input
         * @example cy.login('john', 'password')
         */
        login(username: string, password: string): Chainable<string>

        /**
         * Custom command to logout website
         * @example cy.logout()
         */
        logout(): Chainable
    }
}

Cypress.Commands.add('login', (username: string, password: string) => {
    cy.visit('/')
    cy.get('[name="username"]').type(username)
    cy.get('[name="password"]').type(password)
    cy.get('[type="submit"]').click()
    cy.get('li').should('contain', `Hello, ${username}`)
})

Cypress.Commands.add('logout', () => {
    cy.contains('Logout').click()
    cy.get('h3').should('contain', 'Login')
})
