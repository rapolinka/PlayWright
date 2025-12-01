import { apiConfig } from "config/apiConfig";
import { credentials } from "config/env";
import { loginSchema } from "data/schemas/login/login.schema";
import { validateResponse } from "utils/validateResponse.utils";
import { test, expect } from "fixtures/api.fixture";
import { TAGS } from "data/tags";
const { baseUrl, endpoints } = apiConfig;

// Написать смоук API тест на логин
//   - создать и проверить схему
//   - проверить статус
//   - проверить наличие токена в хедерах

test.describe("[API][Smoke][Login form]]", () => {
  test("[Verifying login schema]",
    {
      tag: [TAGS.REGRESSION, TAGS.SMOKE, TAGS.API]
    }, async ({ loginApi }) => {
    const loginRepsonse = await loginApi.login(credentials);
    await validateResponse(loginRepsonse, {
      status: 200,
      schema: loginSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    const headers = loginRepsonse.headers;
    const token = headers["authorization"]!;
    expect(token, "Authorization token should be returned in login response").toBeTruthy();
  });
});
