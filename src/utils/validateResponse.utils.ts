import { APIResponse, expect } from "@playwright/test";
import { IResponse, IResponseFileds } from "data/types/core.types";
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
  expect.soft(response.status).toBe(expected.status);
  if (expected.ErrorMessage)
    expect.soft(response.body!.ErrorMessage).toBe(expected.ErrorMessage);
  if (expected.IsSuccess)
    expect.soft(response.body!.IsSuccess).toBe(expected.IsSuccess);
  if (expected.schema) validateJsonSchema(response.body!, expected.schema);
}
