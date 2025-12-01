import test, { expect, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { SALES_PORTAL_URL } from "config/env";
import { logStep } from "utils/report/logStep.utils";
export abstract class SalesPortalPage extends BasePage {
  readonly spinner = this.page.locator(".spinner-border");
  readonly toastMessage = this.page.locator(".toast-body");

  abstract readonly uniqueElement: Locator; 

  @logStep("Wait for spinners and for enique element to be displayed on the page")
  async waitForOpened() {
    await expect(this.uniqueElement).toBeVisible();
    await expect(this.spinner).toHaveCount(0);
  }

  @logStep("Wait for spinners")
  async waitForSpinners(){
    await expect(this.spinner).toHaveCount(0);
  }

   async open(route?: string) {
    await test.step(`Go to ${SALES_PORTAL_URL}${route}`, async() => {
       await this.page.goto(SALES_PORTAL_URL + route);
    })
  }

  @logStep("Get notification")
  async waitForNotification(text: string) {
    const toast = this.toastMessage.filter({ hasText: text });
    await expect(toast, `${toast} should be visiable`).toBeVisible();
  }
}
