import { IResponseFileds, IResponse } from "data/types/core.types";
import { expect } from "fixtures";
import { validateJsonSchema } from "./schema.utils";

export function validateResponse<T extends IResponseFileds | null>(
  response: IResponse<T>,
  expected: {
    status: number;
    schema?: object;
    IsSuccess?: boolean;
    ErrorMessage?: string | null;
  }
) {
  expect.soft(response.status, `Status code should be ${response.status}`).toBe(expected.status);
  if (expected.ErrorMessage)
    expect.soft(response.body!.ErrorMessage, `ErrorMessage should be ${expected.ErrorMessage}`).toBe(expected.ErrorMessage);
  if (expected.IsSuccess)
    expect.soft(response.body!.IsSuccess, `IsSuccess should be ${expected.IsSuccess}`).toBe(expected.IsSuccess);
  if (expected.schema) validateJsonSchema(response.body!, expected.schema);
}
