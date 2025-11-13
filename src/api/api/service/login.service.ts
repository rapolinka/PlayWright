import { expect } from "@playwright/test";
import { LoginApi } from "api/apiClients/login.api";
import { credentials } from "config/env";
import { loginSchema } from "data/schemas/login.schema";
import { ICredentials } from "data/types/credentils.types";
import { validateResponse } from "utils/validateResponse.utils";

export class LoginService {
  constructor(private loginApi: LoginApi) {}

  async loginAsAdmin(customCredentials?: ICredentials) {
    const response = await this.loginApi.login(
      customCredentials ?? credentials
    );

    validateResponse(response, {
      status: 200,
      schema: loginSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    const headers = response.headers;
    const token = headers["authorization"]!;
    expect(token).toBeTruthy();

    return token;
  }
}