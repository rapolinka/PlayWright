// Разработать тест со следующими шагами:
//   - открыть https://anatoly-karpovich.github.io/demo-login-form/
//   - Засунуть в localStorage браузера данные test@gmail.com / SecretPw123!@# для логина на сайт
//   - Залогиниться с данными что вы вставили в localStorage
//   - Завалидировать успешный логин

//   Рекоммендации:
//   - Для доступа к localStorage используйте https://playwright.dev/docs/evaluating

import { test, expect } from "@playwright/test";
interface IUSer {
  username: string;
  password: string;
}

const user: IUSer = {
  username: "test@gmail.com",
  password: "SecretPw123!@#",
};

enum STORAGE_KEYS {
  USERNAME = "Username",
  PASSWORD = "Password",
}

enum NOTIFICATIONS {
  LOGIN_SUCCESS = "Logged in!",
}

const url = "https://anatoly-karpovich.github.io/demo-login-form/";

test("set localStorage data", async ({ page }) => {
  await page.goto(url);
  await page.evaluate(
    ({ STORAGE_KEYS, user }) => {
      localStorage.setItem(STORAGE_KEYS.USERNAME, user.username);
      localStorage.setItem(STORAGE_KEYS.PASSWORD, user.password);
    },
    {
      STORAGE_KEYS,
      user,
    }
  );


  const userName = await page.evaluate(
    (key) => localStorage.getItem(key),
    STORAGE_KEYS.USERNAME
  );

  const password = await page.evaluate(
    (key) => localStorage.getItem(key),
    STORAGE_KEYS.PASSWORD
  );

  expect(userName).toBe(user.username);
  expect(password).toBe(user.password);

  const usernameInput = page.locator("#userName");
  const passwordInput = page.locator("#password");
  const submitButton = page.locator("#submit");
  const loginMessage = page.locator("#successMessage");

  await usernameInput.fill(userName!);
  await passwordInput.fill(password!);
  await page.locator("#submit").click();

  await expect(loginMessage).toHaveText(NOTIFICATIONS.LOGIN_SUCCESS);
});
