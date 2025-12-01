import {
  obligatoryFiledsSchema,
  obligatoryRequiredfileds,
} from "../core.schema";

export const userSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    _id: { type: "string" },
    username: { type: "string" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    roles: { type: "array", items: { type: "string" } },
    createdOn: { type: "string" },
  },
  required: ["_id", "username", "firstName", "lastName", "roles", "createdOn"],
};

export const loginSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    ...obligatoryFiledsSchema,
    User: userSchema,
  },
  required: [...obligatoryRequiredfileds, "User"],
};
