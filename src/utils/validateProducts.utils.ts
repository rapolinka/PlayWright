import { expect } from "@playwright/test";
import { IProductFromResponse } from "data/types/product.types";

export async function checkCreatedProductInProductInList(
  products: IProductFromResponse[],
  expected: Pick<IProductFromResponse, "name" | "price" | "manufacturer" | "amount">
): Promise<IProductFromResponse> {
  
  expect(products.length, "Products array is not empty").toBeGreaterThan(0);

  const productFound  = products.find((p) => p.name === expected.name);

  expect(productFound, `Such "${expected.name}" name exists in the product list table `).toBeTruthy();

  if (expected.price) {
    expect(productFound!.price, `Such ${expected.price}  price exists in the product list table for  ${expected.name}` ).toBe(expected.price);
  }
  if (expected.manufacturer) {
    expect(productFound!.manufacturer, `Such ${expected.manufacturer} manufacturer exists in the product list table for  ${expected.name}`).toBe(expected.manufacturer);
  }
  if (expected.amount) {
    expect(productFound!.amount, `Such ${expected.amount} amount exists in the product list table for  ${expected.name}`).toBe(expected.amount);
  }
  return productFound!;
}