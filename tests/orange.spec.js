import {test, expect} from '@playwright/test';
import { DashboardPage } from '../pages/dashboard.page';
import { LoginPage } from '../pages/login.page';

test.describe('OrangeHRM - exemplos para estudo', () => {
    
    test('[TC001 @login] deve realizar login com sucesso', async ({ page }) => {
        const loginPage = new LoginPage(page)
        const dashboardPage = new DashboardPage(page)
        
        await loginPage.open()

        await loginPage.login('Admin', 'admin123')

        await dashboardPage.assertLoggedIn()


        await expect(dashboardPage.userDropdown).toBeVisible()

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

    })
    test('[TC005 @dashboard] deve realizar busca por um funcionário inexistente', async ({ page }) => {
        const loginPage = new LoginPage(page)
        const dashboardPage = new DashboardPage(page)

        await loginPage.open()
    
        await loginPage.login('Admin', 'admin123')
        await dashboardPage.gotToPim()

        await expect(page).toHaveURL(/pim/i)
        await dashboardPage.searchEmployee('Funcionario Inexistente')

        const noResultsMessage = page.locator('.oxd-toast-content-text')
        await expect(noResultsMessage).toContainText('No records Found')
    })
})

