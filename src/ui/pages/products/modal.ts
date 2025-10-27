import { expect } from "@playwright/test";
import { SalesPortalPage } from "../salesPortal.page";

export abstract class ProductModal extends SalesPortalPage{
    async waitForClosed() {
    await expect(this.uniqueElement).not.toBeVisible();
  }

}