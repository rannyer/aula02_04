import {test, expect} from '@playwright/test';
import { DashboardPage } from './dashboard.page';
import { LoginPage } from './login.page';

test.describe('OrangeHRM - exemplos para estudo', () => {
    
    test('[TC001 @login] deve realizar login com sucesso', async ({ page }) => {
        const loginPage = new LoginPage(page)
        const dashboardPage = new DashboardPage(page)
        
        await loginPage.open()

        await loginPage.login('Admin', 'admin123')

        await dashboardPage.assertLoggedIn()


        await expect(dashboardPage.userDropdown).toHaveText('Richard Dan')

        await expect(page).toHaveURL(/dashboard/i)

    })

    test('[TC002 @login] deve exibir mensagem de erro ao realizar login com credenciais inválidas', async ({ page }) => {
        const loginPage = new LoginPage(page)
        
        await loginPage.open()

        await loginPage.login('Admin', 'senhaerrada')

        await expect(loginPage.invalidCredentialsMessage).toBeVisible()
    })
    
    test('[TC003 @dashboard] deve navegadar até o módulo PIM ', async ({ page }) => {
        const loginPage = new LoginPage(page)
        const dashboardPage = new DashboardPage(page)

        await loginPage.open()
    
        await loginPage.login('Admin', 'admin123')
        await dashboardPage.gotToPim()

        await expect(page).toHaveURL(/pim/i)

        await expect(page.getByRole('heading')).toContainText(/pim/i)

    })
    test('[TC004 @dashboard] deve realizar busca por um funcionário', async ({ page }) => {
        const loginPage = new LoginPage(page)
        const dashboardPage = new DashboardPage(page)

        await loginPage.open()
    
        await loginPage.login('Admin', 'admin123')
        await dashboardPage.gotToPim()

        await expect(page).toHaveURL(/pim/i)
        await dashboardPage.searchEmployee('Jorge  Cardenas')

        await dashboardPage.assertResultTableVisible()

        await expect(dashboardPage.table).toContainText('Jorge  Cardenas')
    })
})

