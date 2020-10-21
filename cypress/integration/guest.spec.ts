describe('Test Guest', () => {
    beforeEach(() => {
        Cypress.Cookies.preserveOnce('ci_session')
    })

    it('login as guest', () => {
        cy.login('guest', 'guest')
    })

    it('all crud access not exist', () => {
        cy.contains('Tambah Buku').should('not.exist')
        cy.contains('Kategori').should('not.exist')
        cy.contains('Anggota').should('not.exist')
    })

    it('search books', () => {
        cy.get('[type="search"]').type('solo')
        cy.get('#list_buku_info').should(
            'contain',
            'Showing 1 to 1 of 1 entries (filtered from 4 total entries)'
        )
    })

    it('logout', () => {
        cy.logout()
    })
})
