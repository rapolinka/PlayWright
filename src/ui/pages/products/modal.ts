import { expect } from "@playwright/test";
import { SalesPortalPage } from "../salesPortal.page";
import { logStep } from "utils/report/logStep.utils";


export abstract class ProductModal extends SalesPortalPage{
  @logStep("Wait for enique element to be displayed on page")  
  async waitForClosed() {
    await expect(this.uniqueElement, "Enique element should not be visibale on page").not.toBeVisible();
  }
}