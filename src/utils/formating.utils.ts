import numeral from "numeral";

export const formatCurrency = (value: number) => `$${numeral(value).format("0.0a")}`;
