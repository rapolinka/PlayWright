import { ID } from "../core.types";
import { IProduct } from "../product.types";

export interface IOrderProduct extends Required<IProduct>, Required<ID> {
  received: boolean;
}
