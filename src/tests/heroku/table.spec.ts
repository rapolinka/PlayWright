// Создать функцию getTableRow(page, email), которая возвращает строку в таблице по емейлу.
// Например getTableRow(page, 'jsmith@gmail.com') => { "Last Name": "Smith", "First Name": "John", Email: "jsmith@gmail.com", Due: "$50.00", "Web Site": "http://www.jsmith.com" }
// Создайте тест, проверяющий данную функцию, используя все емейлы из таблицы Example 2
// Сайт: https://the-internet.herokuapp.com/tables

import { test, expect, Page } from "@playwright/test";

async function getTableRow(page: Page, email: string) {
  const table = page.locator("#table2");
  const allHeaders = await table.locator("th").all();
  const headersText = await Promise.all(allHeaders.map((el) => el.innerText()));
  headersText.pop();

  const allRows = await table.locator("tbody tr").all();

  for (const row of allRows) {
    const cells = await row
      .locator("td")
      .filter({ hasNot: page.locator("a") })
      .allInnerTexts();
    const rowData = headersText.reduce<Record<string, string>>(
      (result, header, i) => {
        result[header] = cells[i] ?? "";
        return result;
      },
      {}
    );

    if (rowData["Email"] === email) {
      return rowData;
    }
  }

  throw new Error(`Row with email "${email}" not found`);
}

test.describe("Table 2", () => {
  test("Return correct data for each email", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/tables");

    const expectedTable = [
      {
        "Last Name": "Smith",
        "First Name": "John",
        Email: "jsmith@gmail.com",
        Due: "$50.00",
        "Web Site": "http://www.jsmith.com",
      },
      {
        "Last Name": "Bach",
        "First Name": "Frank",
        Email: "fbach@yahoo.com",
        Due: "$51.00",
        "Web Site": "http://www.frank.com",
      },
      {
        "Last Name": "Doe",
        "First Name": "Jason",
        Email: "jdoe@hotmail.com",
        Due: "$100.00",
        "Web Site": "http://www.jdoe.com",
      },
      {
        "Last Name": "Conway",
        "First Name": "Tim",
        Email: "tconway@earthlink.net",
        Due: "$50.00",
        "Web Site": "http://www.timconway.com",
      },
    ];

    for (const expectedRow of expectedTable) {
      const actualRow = await getTableRow(page, expectedRow.Email);
      expect(actualRow, `Row for ${expectedRow.Email} should match expected data`).toEqual(expectedRow);
    }
  });
});
