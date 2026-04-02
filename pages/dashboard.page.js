
import { expect } from "@playwright/test";

export class DashboardPage {
    constructor(page) {
        this.page = page

        this.dashboardTitle = page.getByRole('heading', { name: /dashboard/i })

        this.sideMenu = page.locator('.oxd-sidepanel-body')

        this.pimMenuItem = this.sideMenu.getByRole('link', { name: /pim/i })
        this.adminMenuItem = this.sideMenu.getByRole('link', { name: /admin/i })

        this.emplyeeNameInput = page.getByPlaceholder(/type for hints/i).first()
        this.searchButton = page.getByRole('button', { name: /search/i })

        this.table = page.locator('.oxd-table-body')
    }

    async assertLoggedIn(){
        await expect(this.dashboardTitle).toBeVisible()
        await expect(this.sideMenu).toBeVisible()
    }
    async gotToPim(){
        await this.pimMenuItem.click()
    }

    async searchEmployee(employeeName){
        await this.emplyeeNameInput.fill(employeeName)
        await this.searchButton.click()
    }

    async assertResultTableVisible(){
        await expect(this.table).toBeVisible()
    }
} 

echo "# aula02_04" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/rannyer/aula02_04.git
git push -u origin main
git add .
git commit -m "add tudo""
git push