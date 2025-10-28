import { ICredentials } from "data/types/credentils.types";
import "dotenv/config";

export const SALES_PORTAL_URL = process.env.SALES_PORTAL_URL!;
export const credentials: ICredentials = {
  username: process.env.USER_NAME!,
  password: process.env.USER_PASSWORD!,
};
