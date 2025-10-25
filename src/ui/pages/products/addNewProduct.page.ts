import { Locator } from "@playwright/test";
import { SalesPortalPage } from "../salesPortal.page";
import { IProduct } from "data/types/product.types";

export class AddNewProduct extends SalesPortalPage {
  readonly title = this.page.locator("h2.page-title-text");
  readonly nameInput = this.page.locator("#inputName");
  readonly priceInput = this.page.locator("#inputPrice");
  readonly amountInput = this.page.locator("#inputAmount");
  readonly notesInput = this.page.locator("#textareaNotes");
  readonly manufacterSelect = this.page.locator("#inputManufacturer");
  readonly saveButton = this.page.locator("#save-new-product");

  readonly uniqueElement = this.title;

  async fillForm(productData: Partial<IProduct>) {
    if(productData.name) await this.nameInput.fill(productData.name);
    if(productData.manufacturer) await this.manufacterSelect.selectOption(productData.manufacturer);
    if(productData.price) await this.priceInput.fill(productData.price.toString());
    if(productData.amount) await this.amountInput.fill(productData.amount.toString());
    if(productData.notes) await this.notesInput.fill(productData.notes!);
  }

  async clickSave(){
    await this.saveButton.click();
  }
}
