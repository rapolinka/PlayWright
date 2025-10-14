// Разработать тест со следующими шагами:
//   - открыть https://anatoly-karpovich.github.io/demo-login-form/
//   - Засунуть в localStorage браузера данные test@gmail.com / SecretPw123!@# для логина на сайт
//   - Залогиниться с данными что вы вставили в localStorage
//   - Завалидировать успешный логин

//   Рекоммендации:
//   - Для доступа к localStorage используйте https://playwright.dev/docs/evaluating

import { test, expect } from "@playwright/test";

enum NOTIFIVATIONS {
  LOGIN_SUCCESS = "Logged in!",
}
const url = "https://anatoly-karpovich.github.io/demo-login-form/";


test("set localStorage data", async ({ page }) => {
  await page.goto(url);
  await page.evaluate(() => {
    localStorage.setItem("Username", "test@gmail.com");
    localStorage.setItem("Password", "SecretPw123!@#");
  });

  await page.reload();

  const userName = await page.evaluate(() => localStorage.getItem("Username"));
  expect(userName).toBe("test@gmail.com");
 
  const password = await page.evaluate(() => localStorage.getItem("Password"));
  expect(password).toBe("SecretPw123!@#");

  const usernameInput = page.locator("#userName");
  const passwordInput = page.locator("#password");
  const submitButton = page.locator("#submit")
  const loginMessage = page.locator("#successMessage");

  await usernameInput.fill(userName!);
  await passwordInput.fill(password!);
  await page.locator("#submit").click();

  await expect(loginMessage).toHaveText(NOTIFIVATIONS.LOGIN_SUCCESS);
});
