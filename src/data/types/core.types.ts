export interface ID {
  _id: string;
}

export interface IResponseFileds {
  IsSuccess: boolean;
  ErrorMessage: null | string;
}

export interface IrequestOptions {
  baseUrl: string;
  url: string;
  method: "get" | "post" | "put" | "delete";
  data?: Object;
  headers?: Record<string, string>;
}

export interface IResponse <T extends object | null> {
  status: number;
  headers: Record <string,string>;
  body: T;
}

export type SortOrder = "asc" | "desc";


