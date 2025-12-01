import { SalesPortalPage } from "../salesPortal.page";
import { ICredentials } from "data/types/credentils.types";
import { credentials } from "config/env";
import { logStep } from "utils/report/logStep.utils";


export class LoginPage extends SalesPortalPage {
  readonly emailInput = this.page.locator("#emailinput");
  readonly passwordInput = this.page.locator("#passwordinput");
  readonly submitButton = this.page.locator("button[type= 'submit']");
  readonly uniqueElement = this.emailInput;

  @logStep("Filling fields to login")
  async fillCredentials({ username, password }: Partial<ICredentials>) {
    if (username) await this.emailInput.fill(credentials.username);
    if (password) await this.passwordInput.fill(credentials.password);
  }

  @logStep("Click Submit button")
  async clickLogin() {
    await this.submitButton.click();
  }
}
