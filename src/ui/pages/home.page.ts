import { Locator } from "@playwright/test";
import { SalesPortalPage } from "./salesPortal.page";

type HomeModuleButton = "Products" | "Customers" | "Orders";

export class HomePage extends SalesPortalPage {
  readonly welcomText = this.page.locator(".welcome-text");
  readonly productsButton = this.page.locator("#products-from-home");
  readonly ordersButton = this.page.locator("#orders-from-home");
  readonly customersButton = this.page.locator("#customers-from-home");
  readonly uniqueElement = this.welcomText;

  async clickOnViewModel(module: HomeModuleButton) {
    const moduleButtons: Record<HomeModuleButton, Locator> = {
      Products: this.productsButton,
      Customers: this.customersButton,
      Orders: this.ordersButton,
    };

    await moduleButtons[module].click();
  }
}
