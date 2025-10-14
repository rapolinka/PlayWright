  // Разработайте смоук тест-сьют с тестами на REGISTER на странице https://anatoly-karpovich.github.io/demo-login-form/

  // Требования:
  //   Страница регистрации:
  //     Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
  //     Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен
  //   Страница логина:
  //     Username: обязательное
  //     Password: обязательное
import { test, expect } from "@playwright/test";

interface ICredentials {
  username: string;
  password: string;
}

enum NOTIFICATIONS {
  REGISTRATION_SUCCESS = "Successfully registered! Please, click Back to return on login page",
  REGISTRATION_PASSWORD_REQUIRED = "Password is required",
  REGISTRATION_USERNAME_REQUIRED = "Username is required",
  REGISTRATION_DATA_REQUIRED = "Please, provide valid data",
  LOGIN_IN_SUCCESS = "Logged in!",
}

enum PAGE_TITLES {
  LOGIN = "Login",
}

test.describe("[Demo-login-form][Registration form]", () => {
  const validCredentials: ICredentials = {
    username: "Dobby",
    password: "SecretPassword",
  };

  test.beforeEach(async ({ page }) => {
    const url = "https://anatoly-karpovich.github.io/demo-login-form/";
    await page.goto(url);
  });

  test("User registation with valid credentials: username and password", async ({
    page,
  }) => {
    const registerLink = page.locator("#registerOnLogin");
    const registrationUserNameInput = page.locator("#userNameOnRegister");
    const registrationPasswordInput = page.locator("#passwordOnRegister");
    const registerButton = page.locator("#register");
    const notification = page.locator("#errorMessageOnRegister");

    await registerLink.click();
    await registrationUserNameInput.fill(validCredentials.username);
    await registrationPasswordInput.fill(validCredentials.password);
    await registerButton.click();
    await expect(notification).toHaveText(NOTIFICATIONS.REGISTRATION_SUCCESS);
  });

  test("User registration: valid username and empty password", async ({
    page,
  }) => {
    const registerLink = page.locator("#registerOnLogin");
    const registrationUserNameInput = page.locator("#userNameOnRegister");
    const registerButton = page.locator("#register");
    const notification = page.locator("#errorMessageOnRegister");

    await registerLink.click();
    await registrationUserNameInput.fill(validCredentials.username);
    await registerButton.click();
    await expect(notification).toHaveText(
      NOTIFICATIONS.REGISTRATION_PASSWORD_REQUIRED
    );
  });

  
  test("User registration: empty username and valid password", async ({
    page,
  }) => {
    const registerLink = page.locator("#registerOnLogin");
    const registrationPasswordInput = page.locator("#passwordOnRegister");
    const registerButton = page.locator("#register");
    const notification = page.locator("#errorMessageOnRegister");

    await registerLink.click();
    await registrationPasswordInput.fill(validCredentials.password);
    await registerButton.click();
    await expect(notification).toHaveText(NOTIFICATIONS.REGISTRATION_USERNAME_REQUIRED);
  });

  test("User registation: empty username and empty password", async ({
    page,
  }) => {
    const registerLink = page.locator("#registerOnLogin");
    const registerButton = page.locator("#register");
    const notification = page.locator("#errorMessageOnRegister");

    await registerLink.click();
    await registerButton.click();
    await expect(notification).toHaveText(NOTIFICATIONS.REGISTRATION_DATA_REQUIRED);
  });

  test("User returns to login page after successful registration", async ({
    page,
  }) => {
    const registerLink = page.locator("#registerOnLogin");
    const registrationUserNameInput = page.locator("#userNameOnRegister");
    const registrationPasswordInput = page.locator("#passwordOnRegister");
    const registerButton = page.locator("#register");
    const notification = page.locator("#errorMessageOnRegister");
    const backRegisterButton = page.locator("#backOnRegister");
    const loginHeader = page.locator("#loginForm");

    await registerLink.click();
    await registrationUserNameInput.fill(validCredentials.username);
    await registrationPasswordInput.fill(validCredentials.password);
    await registerButton.click();
    await expect(notification).toHaveText(NOTIFICATIONS.REGISTRATION_SUCCESS);
    await backRegisterButton.click();
    await expect(loginHeader).toHaveText(PAGE_TITLES.LOGIN);
  });

  test("User logs in with valid credentials", async ({ page }) => {
    const loginUserNameInput = page.locator("#userName");
    const loginPasswordInput = page.locator("#password");
    const submitButton = page.locator("#submit");
    const successMessage = page.locator("#successMessage");

    await loginUserNameInput.fill(validCredentials.username);
    await loginPasswordInput.fill(validCredentials.password);
    await submitButton.click();
    await expect(successMessage).toHaveText(NOTIFICATIONS.LOGIN_IN_SUCCESS);
  });
});
