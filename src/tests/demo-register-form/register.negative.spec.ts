// Создать тест сьют используя DDT подход с негативными тест-кейсами по регистрации на сайте
// https://anatoly-karpovich.github.io/demo-login-form/

// Требования:
// Страница регистрации:
//   Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//   Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен

// Страница логина:
//   Username: обязательное
//   Password: обязательное
import test, { expect } from "@playwright/test";
import invalidTestData from "data/demo-register-form/register.data";

test.describe("[Demo Login Form][Registration][Negative]", () => {
  const url = "https://anatoly-karpovich.github.io/demo-login-form/";
  test.beforeEach("[Go to registration form]", async ({ page }) => {
    const registorOnLoginButton = page.locator("#registerOnLogin");
    const registrationForm = page.locator(".registerForm");
    page.goto(url);
    await expect(registorOnLoginButton).toBeVisible();
    await registorOnLoginButton.click();
    await expect(registrationForm).toBeVisible({ timeout: 10000 });
  });

  for (const { title, creds, errorMessage } of invalidTestData) {
    test(title, async ({ page }) => {
      const userNameInput = page.locator("#userNameOnRegister");
      const passwordInput = page.locator("#passwordOnRegister");
      const registerButton = page.locator("#register");
      const registerError = page.locator("#errorMessageOnRegister");
      const { username, password } = creds;
      await userNameInput.fill(username);
      await passwordInput.fill(password);
      await registerButton.click();
      await expect(registerError).toHaveText(errorMessage);
    });
  }
});
