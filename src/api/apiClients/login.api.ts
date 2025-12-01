import { apiConfig } from "config/apiConfig";
import { IrequestOptions } from "data/types/core.types";
import { ICredentials } from "data/types/credentils.types";
import { IApiClient } from "./types";
import { ILoginResponse } from "data/types/login.types";

export class LoginApi {
  constructor(private apiClinet: IApiClient) {}
  
  async login(credentials: ICredentials) {
    const options: IrequestOptions = {
      baseUrl: apiConfig.baseUrl,
      url: apiConfig.endpoints.login,
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      data: credentials,
    };
    return await this.apiClinet.send<ILoginResponse>(options);
  }
}
