import { ICustomer } from "data/types/customer.types";
import { SalesPortalPage } from "../salesPortal.page";
import { th } from "@faker-js/faker";

export class AddNewCustomerPage extends SalesPortalPage {
  readonly title = this.page.getByRole("heading", { name: "Add New Customer" });
  readonly emailInput = this.page.locator("#inputEmail");
  readonly nameInput = this.page.locator("#inputName");
  readonly countrySelector = this.page.locator("#inputCountry");
  readonly cityInput = this.page.locator("#inputCity");
  readonly streetInput = this.page.locator("#inputStreet");
  readonly houseInput = this.page.locator("#inputHouse");
  readonly flatInput = this.page.locator("#inputFlat");
  readonly phoneInput = this.page.locator("#inputPhone");
  readonly notesInput = this.page.locator("#textareaNotes");
  readonly saveButton = this.page.locator("#save-new-customer");

  readonly uniqueElement = this.title;

  async fillForm(customerData: Partial<ICustomer>) {
    if (customerData.email) await this.emailInput.fill(customerData.email);
    if (customerData.name) await this.nameInput.fill(customerData.name);
    if (customerData.country)
      await this.countrySelector.selectOption(customerData.country);
    if (customerData.city) await this.cityInput.fill(customerData.city);
    if (customerData.street) await this.cityInput.fill(customerData.street);
    if (customerData.house) await this.houseInput.fill(customerData.house);
    if (customerData.flat) await this.flatInput.fill(customerData.flat);
    if (customerData.phone) await this.phoneInput.fill(customerData.phone);
    if (customerData.notes) await this.notesInput.fill(customerData.notes!);
  }

  async clickSave() {
    await this.saveButton.click();
  }
}
