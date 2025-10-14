import test, { expect } from "@playwright/test";

interface ICredentials {
  firstname: string;
  lastname: string;
  address: string;
  email: string;
  phone: string;
  country: string;
  gender: string;
  hobbies: string[];
  language: string;
  skills: string[];
  dateOfBirth: {
    year: number;
    month: string;
    day: number;
  };
  password: string;
  passwordConfirmation: string;
}

test.describe("[Demo-registration-form][Detailed registration form]", () => {
  const validCredentials: ICredentials = {
    firstname: "Mary",
    lastname: "Jackson",
    address: "Amster avenue 6b",
    email: "mary.jackson@gmail.com",
    phone: "123456789",
    country: "UK",
    gender: "female",
    hobbies: ["Travelling", "Movies", "Gaming"],
    language: "English",
    skills: ["JavaScript", "Python"],
    dateOfBirth: {
      year: 1980,
      month: "May",
      day: 31,
    },
    password: "SuperSecret",
    passwordConfirmation: "SuperSecret",
  };

  test.beforeEach(async ({ page }) => {
    const url = "https://anatoly-karpovich.github.io/demo-registration-form/";
    await page.goto(url);
  });

  test("Registration with valid inputs for all fields", async ({ page }) => {
    const fistNameInput = page.locator("#firstName");
    const lastNameInput = page.locator("#lastName");
    const adressInput = page.locator("#address");
    const emailInput = page.locator("#email");
    const phoneInput = page.locator("#phone");
    const countryDropdown = page.locator("#country");
    const genderRadio = page.locator('//*[contains(@value, "female")]');
    const languageInput = page.locator("#language");
    const skillsForm = page.locator("#skills");
    const yearOfBirthDropdown = page.locator("#year");
    const monthOfBirthDropdown = page.locator("#month");
    const {day, month, year} = validCredentials.dateOfBirth;
    const dayOfBirthDropdown = page.locator("#day");
    const passwordInput = page.locator("#password");
    const passwordConfirmationInput = page.locator("#password-confirm");
    const submitButton = page.locator('button[type="submit"]');
    const fullNameConfirmation = page.locator("#fullName");
    const adressConfirmation = page.locator("#address");
    const emailConfirmation = page.locator("#email");
    const phoneConfirmation = page.locator("#phone");
    const countryConfirmation = page.locator("#country");
    const genderConfirmation = page.locator("#gender");
    const languageConfirmation = page.locator("#language");
    const skillsConfirmation = page.locator("#skills");
    const hobbiesConfirmation = page.locator("#hobbies");
    const dayOfBirtConfirmation = page.locator("#dateOfBirth");
    const passwordConfirmatiom = page.locator("#password");

    await fistNameInput.fill(validCredentials.firstname);
    await lastNameInput.fill(validCredentials.lastname);
    await adressInput.fill(validCredentials.address);
    await emailInput.fill(validCredentials.email);
    await phoneInput.fill(validCredentials.phone);
    await countryDropdown.selectOption({ value: validCredentials.country });
    await genderRadio.check();

    for (const hobby of validCredentials.hobbies) {
      await page.locator(`input.hobby[value="${hobby}"]`).check();
    }

    await languageInput.fill(validCredentials.language);
    await skillsForm.selectOption(validCredentials.skills);
    await yearOfBirthDropdown.selectOption(
      validCredentials.dateOfBirth.year.toString()
    );
    await monthOfBirthDropdown.selectOption(validCredentials.dateOfBirth.month);
    await dayOfBirthDropdown.selectOption(
      validCredentials.dateOfBirth.day.toString()
    );
    await passwordInput.fill(validCredentials.password);
    await passwordConfirmationInput.fill(validCredentials.passwordConfirmation);
    await submitButton.click();

    await expect(fullNameConfirmation).toContainText(
      `${validCredentials.firstname} ${validCredentials.lastname}`);
    await expect(adressConfirmation).toHaveText(validCredentials.address);
    await expect(emailConfirmation).toHaveText(validCredentials.email);
    await expect(phoneConfirmation).toHaveText(validCredentials.phone);
    await expect(countryConfirmation).toHaveText(validCredentials.country);
    await expect(genderConfirmation).toHaveText(validCredentials.gender);
    await expect(languageConfirmation).toHaveText(validCredentials.language);
    await expect(skillsConfirmation).toHaveText(validCredentials.skills.join(", "));
    await expect(hobbiesConfirmation).toHaveText(validCredentials.hobbies.join(", "));
    await expect(dayOfBirtConfirmation).toHaveText(`${day} ${month} ${year}`);
    await expect(passwordConfirmatiom).toHaveText(/^\*+$/);
  });
});
