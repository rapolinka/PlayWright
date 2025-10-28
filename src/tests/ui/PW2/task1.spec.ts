
// Разработать тест со следующими шагами:
//   - открыть https://the-internet.herokuapp.com/
//   - перейти на страницу Dynamic Controls
//   - Дождаться появления кнопки Remove
//   - Завалидировать текста в заголовке страницы
//   - Чекнуть чекбокс
//   - Кликнуть по кнопке Remove
//   - Дождаться исчезновения чекбокса
//   - Проверить наличие кнопки Add
//   - Завалидировать текст It's gone!
//   - Кликнуть на кнопку Add
//   - Дождаться появления чекбокса
//   - Завалидировать текст It's back!

import test, { expect } from "@playwright/test";

enum PAGE_TITLES {
    DYNAMIC_CONTROLS = "Dynamic Controls",
}

enum PAGE_TEXTS {
    DESCRIPTION = "This example demonstrates when elements (e.g., checkbox, input field, etc.) are changed asynchronously.",
}

enum BUTTONS {
  REMOVE = "Remove",
  ADD = "Add",
}

enum DYNAMIC_CONTROLS_MESSAGES {
  REMOVED = "It's gone!",
  ADDED = "It's back!",
}

const url = "https://the-internet.herokuapp.com";

test.describe("[Herokuapp][Smoke: Dynamic Controls]", () => {
    test.beforeEach("[Dynamic Controls: go to the page]", async({page}) => {
    
        const dynamicControlsLink = page.locator('a[href="/dynamic_controls"]');
        const dynamicControlsTitle = page.locator(".example > h4:first-of-type");
        const dynamicControlsText = page.locator(".example p");
        
        await page.goto(url);
        await dynamicControlsLink.click();
        
        await expect(dynamicControlsTitle).toBeVisible();
        await expect(dynamicControlsText).toBeVisible();

        await expect(dynamicControlsTitle).toHaveText(PAGE_TITLES.DYNAMIC_CONTROLS);
        await expect(dynamicControlsText).toHaveText(PAGE_TEXTS.DESCRIPTION);
    })

    test("Dynamic Controls page: add and remove checkbox flow", async ({page})=> {
        const dynamicControlsButton = page.locator("#checkbox-example > button");
        const dynamicControlsCheckbox = page.locator('input[type="checkbox"]');
        const dynamicControlMessage= page.locator("#checkbox-example > #message");

        await expect(dynamicControlsButton).toBeVisible();
        await expect(dynamicControlsButton).toHaveText(BUTTONS.REMOVE);

        await expect(dynamicControlsCheckbox).toBeVisible();
        await dynamicControlsCheckbox.check();
        await expect(dynamicControlsCheckbox).toBeChecked();
        
        await dynamicControlsButton.click();

        await expect(dynamicControlsCheckbox).toBeHidden({timeout: 20000});
        await expect(dynamicControlsButton).toBeVisible();
        await expect(dynamicControlsButton).toHaveText(BUTTONS.ADD);
        await expect(dynamicControlMessage).toHaveText(DYNAMIC_CONTROLS_MESSAGES.REMOVED);

        await dynamicControlsButton.click();
        await expect(dynamicControlsCheckbox).toBeVisible({timeout: 20000})
        await expect(dynamicControlMessage).toHaveText(DYNAMIC_CONTROLS_MESSAGES.ADDED);
        await expect(dynamicControlsButton).toHaveText(BUTTONS.REMOVE);
    })
})
