export const obligatoryFiledsSchema = {
  IsSuccess: { type: "boolean" },
  ErrorMessage: {
    type: ["string", "null"],
  },
};

export const obligatoryRequiredfileds = ["IsSuccess", "ErrorMessage"];

