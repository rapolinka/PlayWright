import { IrequestOptions, IResponse } from "data/types/core.types";

export interface IApiClient {
  send<T extends object | null>(
    options: IrequestOptions
  ): Promise<IResponse<T>>;
}
