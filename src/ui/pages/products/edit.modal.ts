import { IProduct } from "data/types/product.types";
import { ProductModal } from "./modal";
import { logStep } from "utils/report/logStep.utils";

export class ProductEditModal extends ProductModal {
  readonly uniqueElement = this.page.locator("#edit-product-form");
  readonly productValue = this.uniqueElement.locator("#title");

  readonly nameInput = this.uniqueElement.locator("#inputName");
  readonly priceInput = this.uniqueElement.locator("#inputPrice");
  readonly manufacturerDropdown =
    this.uniqueElement.locator("#inputManufacturer");
  readonly amountInput = this.uniqueElement.locator("#inputAmount");
  readonly notesField = this.uniqueElement.locator("#textareaNotes");
  readonly saveButton = this.page.locator("#save-product-changes");

  @logStep("Filling product form to  edit product")
  async fillForm(productData: Partial<IProduct>) {
    if (productData.name) await this.nameInput.fill(productData.name);
    if (productData.manufacturer)
      await this.manufacturerDropdown.selectOption(productData.manufacturer);
    if (productData.price)
      await this.priceInput.fill(productData.price.toString());
    if (productData.amount)
      await this.amountInput.fill(productData.amount.toString());
    if (productData.notes) await this.notesField.fill(productData.notes);
  }

  @logStep("Click Save button")
  async clickSave() {
    await this.saveButton.click();
  }
}
