import { MANUFACTURERS } from "data/salesPortal/products/manufactures";
import {
  obligatoryFiledsSchema,
  obligatoryRequiredfileds,
} from "./core.schema";

export const productSchema = {
  type: "object",
  properties: {
    _id: { type: "string" },
    name: { type: "string" },
    amount: { type: "number" },
    price: { type: "number" },
    manufacturer: { type: "string", enum: Object.values(MANUFACTURERS) },
    createdOn: { type: "string" },
    notes: { type: "string" },
  },
   required: ["_id", "name", "amount", "price", "manufacturer", "createdOn"],
};

export const createProductSchema = {
  type: "object",
  properties: {
    Product: productSchema,
    ...obligatoryFiledsSchema,
  },
  required: ["Product", ...obligatoryRequiredfileds],
};

export const allProductsSchema = {
  type: "object",
  properties: {
    Products: {
      type: "array",
      items: productSchema,
    },
  },
  required: ["Products"],
};

export const invalidProductSchema = {
  type: "object",
  properties: {
    Product: {
      name: { type: "string" },
      manufacturer: { type: "string", enum: Object.values(MANUFACTURERS) },
      price: { type: "number" },
      amount: "number",
      notes:{ type: "number" },
    }
 },
 required: ["name", "manufacturer", "price", "amount", "notes"],
};

export const onligatoryFieldsSchema = {
  type: "object",
  properties: {
    ...obligatoryFiledsSchema,
  },
  required: [ ...obligatoryRequiredfileds],
}

