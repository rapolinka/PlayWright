import { SalesPortalPage } from "../salesPortal.page";

export class CustomerListPage extends SalesPortalPage {
  readonly title = this.page.locator("#title h2");
  readonly addCustomerButton = this.page.locator(`[name="add-button"]`);
  readonly uniqueElement = this.title;

  async clickAddNewCustomer() {
    await this.addCustomerButton.click();
  }
}
