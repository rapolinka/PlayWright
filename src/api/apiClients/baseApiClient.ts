import {  IrequestOptions, IResponse } from "data/types/core.types";
import { IApiClient } from "./types";

export abstract class BaseApiClient implements IApiClient {
  abstract send<T extends object | null>(
    options: IrequestOptions
  ): Promise<IResponse<T>>;

   protected abstract transformResponse(): Promise<IResponse<object | null>>;
}
