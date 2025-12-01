import { logStep } from "utils/report/logStep.utils";
import { SalesPortalPage } from "../salesPortal.page";

export class CustomerListPage extends SalesPortalPage {
  readonly title = this.page.locator("#title h2");
  readonly addCustomerButton = this.page.locator(`[name="add-button"]`);
  readonly tableRowByName = (customerName: string) =>
    this.page.locator("table tbody tr", {
      has: this.page.locator("td", { hasText: customerName }),
    });
  readonly uniqueElement = this.title;

  @logStep("Click Add New Customer button")
  async clickAddNewCustomer() {
    await this.addCustomerButton.click();
  }
}
