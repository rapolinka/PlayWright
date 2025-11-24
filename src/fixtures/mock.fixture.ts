import { Mock } from "mock/mock";
import { test as base } from "@playwright/test";

export interface MockFixture {
  mock: Mock;
}

export const test = base.extend<MockFixture>({
  mock: async ({ page }, use) => {
    await use(new Mock(page));
  },
});

export { expect } from "@playwright/test";
