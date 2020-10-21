describe('Test Admin', () => {
    beforeEach(() => {
        Cypress.Cookies.preserveOnce('ci_session')
    })

    it('login as admin', () => {
        cy.login('sultan', 'sultan')
    })

    it('crud anggota not exist', () => {
        cy.contains('Anggota').should('not.exist')
    })

    it('add new books', () => {
        cy.contains('Buku').click()
        cy.contains('Tambah Buku').click()
        cy.get('div.card-header').should('contain', 'Form Tambah Data Buku')
        cy.get('[name="judul"]').type('Lorem Ipsum Dolor Sit Amet')
        cy.get('[name="penulis"]').type('John Doe')
        cy.get('[name="penerbit"]').type('Karyaksa')
        cy.get('[name="rak"]').type('3C')
        cy.get('[name="idkategori"]')
            .select('Referensi')
            .should('have.value', '2')
        cy.get('[type="submit"]').click()
        cy.get('.alert-success')
            .should('be.visible')
            .contains('Data Buku berhasil ditambahkan')
        cy.get('h1').should('contain', 'Data Buku')
    })

    it('edit lorem books', () => {
        cy.contains('Lorem Ipsum Dolor Sit Amet')
            .parent()
            .find('a')
            .first()
            .should('contain', 'Edit')
            .click()
        cy.get('[name="penulis"]').clear().type('Sultan Achmad')
        cy.get('[name="penerbit"]').clear().type('Foo Bar')
        cy.get('[type="submit"]').click()
        cy.get('.alert-success')
            .should('be.visible')
            .contains('Data Buku berhasil diedit')
        cy.get('h1').should('contain', 'Data Buku')
    })

    it('delete lorem books', () => {
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.contains('Lorem Ipsum Dolor Sit Amet')
            .parent()
            .find('a')
            .last()
            .should('contain', 'Hapus')
            .click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith(
                    'Yakin Data ini akan dihapus?'
                )
            })
        cy.get('.alert-success')
            .should('be.visible')
            .contains('Data Buku berhasil dihapus')
        cy.get('h1').should('contain', 'Data Buku')
    })

    it('add new kategori', () => {
        cy.contains('Kategori').click()
        cy.contains('Tambah Kategori').click()
        cy.get('div.card-header').should('contain', 'Form Tambah Data Kategori')
        cy.get('[name="nama"]').type('Lorem')
        cy.get('[name="keterangan"]').type('Lorem Ipsum Dolor Sit Amet')
        cy.get('[type="submit"]').click()
        cy.get('.alert-success')
            .should('be.visible')
            .contains('Data Kategori berhasil ditambahkan')
        cy.get('h1').should('contain', 'Data Kategori')
    })

    it('edit lorem kategori', () => {
        cy.contains('Lorem')
            .parent()
            .find('a')
            .first()
            .should('contain', 'Edit')
            .click()
        cy.get('[name="nama"]').clear().type('Biografi')
        cy.get('[name="keterangan"]')
            .clear()
            .type('Buku tentang perjalanan hidup seseorang')
        cy.get('[type="submit"]').click()
        cy.get('.alert-success')
            .should('be.visible')
            .contains('Data Kategori berhasil diedit')
        cy.get('h1').should('contain', 'Data Kategori')
    })

    it('delete biografi kategori', () => {
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.contains('Biografi')
            .parent()
            .find('a')
            .last()
            .should('contain', 'Hapus')
            .click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith(
                    'Yakin Data ini akan dihapus?'
                )
            })
        cy.get('.alert-success')
            .should('be.visible')
            .contains('Data Kategori berhasil dihapus')
        cy.get('h1').should('contain', 'Data Kategori')
    })

    it('logout', () => {
        cy.logout()
    })
})
