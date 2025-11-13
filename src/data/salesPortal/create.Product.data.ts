import {  ICreateNegativeCase, ICreatePositiveCase } from "data/types/product.types";
import { MANUFACTURERS } from "./products/manufactures";


export const POSITIVE_CREATE_CASES: ICreatePositiveCase [] = [
  //name
  {
    title: "Verifying name input: min (3) characters",
    input: { name: "Dom", manufacturer: MANUFACTURERS.AMAZON, price: 199, amount: 5, notes: "Hede sd" },
  },
  {
    title: "Verifying name input: min (3) characters with 1 space between",
    input: { name: "Dom 2", manufacturer: MANUFACTURERS.AMAZON, price: 19, amount: 13, notes: "Hede dssdked sd" },
  },
  {
    title: "Verifying name input: max (40) characters",
    input: { name: "ddscdssdcdscdscdscdsrrrefscdscdscdscsdqj", manufacturer: MANUFACTURERS.AMAZON, price: 20, amount: 12, notes: "Hede sd" },
  },
  {
    title: "Verifying name input: max (40) characters with 1 space between",
    input: { name: "ddscdssdcdscdscdscd 1 rrefscdscdscdscsdf", manufacturer: MANUFACTURERS.APPLE, price: 1030, amount: 16, notes: "Hede sd" },
  },
  {
    title: "Verifying name input: upper-case",
    input: { name: "DOMIK 19", manufacturer: MANUFACTURERS.SONY, price: 19, amount: 19, notes: "Hede f sdsd ffdsf 12" },
  },
  //price
  {
    title: "Verifying price input: min (1) number",
    input: { name: "Sandwich 16", manufacturer: MANUFACTURERS.MICROSOFT, price: 1, amount: 345, notes: "Tor erer dfdfr dcdecdcscds rfrs e" },
  },
  {
    title: "Verifying price input: max (99999) number",
    input: { name: "Yu go ddoe ds", manufacturer: MANUFACTURERS.GOOGLE, price: 99999, amount: 127 },
  },
  //amount
  {
    title: "Verifying amount input: min (0) number",
    input: { name: "Zebra 23", manufacturer: MANUFACTURERS.MICROSOFT, price: 250, amount: 0, notes: "Bulk" },
  },
  {
    title: "Verifying amount input: max (999) number",
    input: { name: "Model1 Serious 2", manufacturer: MANUFACTURERS.SONY, price: 999, amount: 10 },
  },
  //price and amount
  {
    title: "Verifying price and amount inputs: max (99999) price, max (999) amount",
    input: { name: "Robot Tracie", manufacturer: MANUFACTURERS.TESLA, price: 99999, amount: 999 },
  },
  //notes
  {
    title: "Verifying note input: max (250) characters containing the same character with no spaces",
    input: {
      name: "Cheesy Case",
      manufacturer : MANUFACTURERS.AMAZON,
      price: 500,
      amount: 2,
      notes: "B".repeat(250),
    },
  },
  {
    title: "Verifying note input: max (250) characters",
    input: {
      name: "Notes Case",
      manufacturer : MANUFACTURERS.AMAZON,
      price: 500,
      amount: 2,
      notes: "Ff Hw!2.3tdhksc".repeat(15) + "e".repeat(5),
    },
  },
  {
    title: "Verifying note input: empty",
    input: {
      name: "Galaxy 14",
      manufacturer : MANUFACTURERS.SAMSUNG,
      price: 1234,
      amount: 2,
      notes: "",
    },
  },
];


export const NEGATIVE_CREATE_CASES: ICreateNegativeCase[] = [
  //name
  {
    title: "Verifying name input: empty",
    input: { name: "", manufacturer: MANUFACTURERS.AMAZON, price: 199, amount: 5, notes: "Hede sd" },
  },
  {
    title: "Verifying name input: leading spaces",
    input: { name: "  Dobby 13", manufacturer: MANUFACTURERS.GOOGLE, price: 10, amount: 5, notes: "Hede sd" },
  },
  {
    title: "Verifying name input: trailing spaces",
    input: { name: "Doby 13 ", manufacturer: MANUFACTURERS.GOOGLE, price: 1, amount: 53, notes: "Hededd sd" },
  },
  {
    title: "Verifying name input: leading and trailing spaces",
    input: { name: "Do by 13 ", manufacturer: MANUFACTURERS.GOOGLE, price: 12, amount: 531, notes: "Hededd dd d sd" },
  },
  {
    title: "Verifying name input: special symbols",
    input: { name: "Dol 12. T-urbo", manufacturer: MANUFACTURERS.AMAZON, price: 72, amount: 32, notes: "Hedcdc dedd dd d sd" },
  },
   {
    title: "Verifying name input: using only numbers",
    input: { name: "1267379", manufacturer: MANUFACTURERS.AMAZON, price: 72, amount: 32, notes: "Hedcdc dedd dd d sd" },
  },
  {
    title: "Verifying name input: using extra (more than 1) spaces between",
    input: { name: "Hero   2", manufacturer: MANUFACTURERS.TESLA, price: 712, amount: 22, notes: "dedd dd d sd" },
  },
  //price
   {
    title: "Verifying price input: empty",
    input: { name: "Tob 3", manufacturer: MANUFACTURERS.SAMSUNG, price: "", amount: 328, notes: "Hedcdc dedd dd d sd" },
  },
  {
    title: "Verifying price input: (0) price",
    input: { name: "Sony 3", manufacturer: MANUFACTURERS.SAMSUNG, price: 0, amount: 432, notes: "gagtt d dd d sd" },
  },
  {
    title: "Verifying price input: above (99999) range",
    input: { name: "Aaron", manufacturer: MANUFACTURERS.TESLA, price: 10004544000, amount: 228, notes: "cdc dedd dd d sd" },
  },
   {
    title: "Verifying price input: below (1) range",
    input: { name: "Nico", manufacturer: MANUFACTURERS.TESLA, price: 10004544000, amount: -228, notes: "cdc dedd dd d sd" },
  },
  {
    title: "Verifying price input:  containing (.) decimals",
    input: { name: "Joan", manufacturer: MANUFACTURERS.TESLA, price: 200.22, amount: 228, notes: "cdc dedd dd d sd" },
  },
  {
    title: "Verifying price input: as sring",
    input: { name: "Tob 3", manufacturer: MANUFACTURERS.TESLA, price: "125" , amount: 228, notes: "cdc dedd dd d sd" },
  },
  //amount
  {
    title: "Verifying  amount input: empty",
    input: { name: "Tob 3", manufacturer: MANUFACTURERS.TESLA, price: 123 , amount: "", notes: "cdc dedd dd d sd" },
  },
  {
    title: "Verifying amount input: below (0) range",
    input: { name: "Jacks 3", manufacturer: MANUFACTURERS.TESLA, price: 1000 , amount: -4, notes: "cdc dedd dd d sd" },
  },
  {
    title: "Verifying amount input: above (999) range",
    input: { name: "Tob Shee", manufacturer: MANUFACTURERS.TESLA, price: 1000 , amount: 199999, notes: "cdc dedd dd d sd"}, 
  },
  {
    title: "Verifying  amount: containing (.) decimals",
    input: { name: "Tob 3", manufacturer: MANUFACTURERS.TESLA, price: 202, amount: 2.5, notes: "cdc dedd dd d sd" },
  },
  {
    title: "Verifying amount input: as sring",
    input: { name: "Tob 3", manufacturer: MANUFACTURERS.TESLA, price: 125 , amount: "two", notes: "cdc dedd dd d sd" },
  },
  //notes
  {
    title: "Verifying note input: above (250) range",
    input: {
      name: "Dikii",
      manufacturer : MANUFACTURERS.AMAZON,
      price: 500,
      amount: 2,
      notes: "GH h".repeat(100),
    },
  },
];







