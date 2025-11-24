import { expect, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { SALES_PORTAL_URL } from "config/env";
export abstract class SalesPortalPage extends BasePage {
  readonly spinner = this.page.locator(".spinner-border");
  readonly toastMessage = this.page.locator(".toast-body");

  abstract readonly uniqueElement: Locator; 

  async waitForOpened() {
    await expect(this.uniqueElement).toBeVisible();
    await expect(this.spinner).toHaveCount(0);
  }

  async waitForElementToBeDisplyed(){
    await expect(this.uniqueElement).toBeVisible();
  }

  async waitForSpinners(){
    await expect(this.spinner).toHaveCount(0);
  }

  async open(){
    await this.page.goto(SALES_PORTAL_URL);
  }

  async waitForNotification(text: string) {
    const toast = this.toastMessage.filter({ hasText: text });
    await expect(toast).toBeVisible();
  }
}
