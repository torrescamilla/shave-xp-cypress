import login from '../support/pages/login'
import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'


describe('login', () => {

    context('quando submeto o formulário', () => {

        it('deve logar com sucesso', () => {
            const user = {
                name: 'Camilla',
                email: 'camillatorres@yahoo.com',
                password: 'pwp123'
            }

            loginPage.submit(user.email, user.password)
            shaversPage.header.userShouldBeloggedIn(user.name)

        })
        it('não deve logar com senha incorreta', () => {
            const user = {
                name: 'Camilla',
                email: 'camillatorres@yahoo.com',
                password: '123456'
            }

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(message)
        })
        it('não deve logar com email não cadastrado', () => {
            const user = {
                name: 'Camilla',
                email: 'camillatorres@404.com',
                password: '123456'
            }

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(message)
        })
        it('campos obrigatórios', () => {
            loginPage.submit()
            loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')
        })

    })

    context('senha muito curta', () => {

        const passwords = [
            '1',
            '12',
            '123',
            '1234',
            '12345'
        ]

        passwords.forEach((p) => {
            it(`não deve logar com a senha: ${p}`, () => {
                loginPage.submit('camilla@teste.com.br', p)
                loginPage.alertShouldBe('Pelo menos 6 caracteres')

            })

        })

    })

    context('email no formato incorreto', () => {

        const emails = [
            'camilla@gmail.com',
            'camilla.com.br',
            '@gmail.com',
            '@',
            'camilla@',
            '23432343',
            '@#!$@#$!',
            'xpto123'
        ]

        emails.forEach((e) => {
            it(`não deve logar com o email: ${e}`, () => {
                loginPage.submit(e, 'pwp123')
                loginPage.alertShouldBe('Informe um email válido')
            })

        })
    })

})