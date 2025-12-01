import { ID, IResponseFileds } from "./core.types";
import { ICreatedOn } from "./product.types";

export interface IUser extends ID, ICreatedOn {
  username: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

export interface ILoginResponse extends IResponseFileds {
  User: IUser;
}
