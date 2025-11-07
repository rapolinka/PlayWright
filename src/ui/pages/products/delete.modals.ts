import { ProductModal } from "./modal";

export class ProductDeleteModal extends ProductModal {
    readonly uniqueElement = this.page.locator(`[name="confirmation-modal"]`);
    readonly title = this.uniqueElement.locator("h5");
    readonly deleteButton = this.uniqueElement.getByRole("button", {name: "Delete"});

    async delete(){
        await this.deleteButton.click();

    }
}