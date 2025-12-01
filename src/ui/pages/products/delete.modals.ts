import { logStep } from "utils/report/logStep.utils";
import { ProductModal } from "./modal";

export class ProductDeleteModal extends ProductModal {
  readonly uniqueElement = this.page.locator(`[name="confirmation-modal"]`);
  readonly title = this.uniqueElement.locator("h5");
  readonly deleteButton = this.uniqueElement.getByRole("button", {
    name: "Delete",
  });

  @logStep("Click Delete button")
  async delete() {
    await this.deleteButton.click();
  }
}
