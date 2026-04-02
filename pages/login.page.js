export class LoginPage{
    constructor(page){
        this.page = page

        this.usernameInput = page.getByRole('textbox', { name: /username/i })
        this.passwordInput = page.getByRole('textbox', { name: /password/i })
        this.loginButton = page.getByRole('button', { name: /login/i })

        this.invalidCredentialsMessage = page.getByText(/invalid credentials/i)

      
        
        this.dashboardTitle = page.getByRole('heading', { name: /dashboard/i })
        this.userDropdown = page.locator('.oxd-userdropdown-name')
    }

      async open() {
            await this.page.goto('/')
      }

      async fillUsername(username) {
            await this.usernameInput.fill(username)
      }

      async fillPassword(password) {
            await this.passwordInput.fill(password)
      }

      async submit() {
            await this.loginButton.click()
      }

      async login(username, password) {
            await this.fillUsername(username)
            await this.fillPassword(password)
            await this.submit()
      }
}



