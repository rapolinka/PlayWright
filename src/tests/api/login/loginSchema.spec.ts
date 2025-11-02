import test, { expect } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { credentials } from "config/env";
import { loginSchema } from "data/schemas/login.schema";
import { validateResponse } from "utils/validateResponse.utils";
const { baseUrl, endpoints } = apiConfig;

// Написать смоук API тест на логин
//   - создать и проверить схему
//   - проверить статус
//   - проверить наличие токена в хедерах

test.describe("[API][Smoke][Login form]]", () => {
  test("[Verifying login schema]", async ({ request }) => {
    const loginResponse = await request.post(baseUrl + endpoints.login, {
      data: credentials,
      headers: {
        "content-type": "application/json",
      },
    });

    const loginBody = await loginResponse.json();
    await validateResponse(loginResponse, {
      status: 200,
      schema: loginSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    const headers = loginResponse.headers();
    const token = headers["authorization"]!;
    expect(token).toBeTruthy();
  });
});
