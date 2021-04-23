import axios from "axios";

import {
  additional_tax,
  aggregated_bank_accounts,
  bank_account,
  children_education_expenses,
  consumable_expenses,
  dividend_income,
  employment_income,
  entertainment_expenses,
  expenses,
  financial_expenses,
  holiday_expenses,
  housing_expenses,
  liabilities,
  one_off_expenses,
  other_income,
  pension_income,
  pension_plans,
  rental_income,
  residential_income,
  savings_and_investment_drawdowns,
  savings_and_investments,
  self_employment_income,
  shopping_expenses,
  shortfall,
  travel_expenses,
} from "./finalData";

import { summaryRoute } from "../routes/apiRoutes";
import IChartsData from "../interfaces/IChartsData";

const planId = "6082af307943cd1bccd0fb4e";

const testRoute = summaryRoute + planId;

//Cashflow tests
test("Cashflow employment_income", async () => {
  let res = await axios.get(testRoute);
  const data: IChartsData = res.data;
  expect(data.cashflow.employment_income).toEqual(employment_income);
});

test("Cashflow self_employment_income", async () => {
  let res = await axios.get(testRoute);
  const data: IChartsData = res.data;
  expect(data.cashflow.self_employment_income).toEqual(self_employment_income);
});

test("Cashflow rental_income", async () => {
  let res = await axios.get(testRoute);
  const data: IChartsData = res.data;
  expect(data.cashflow.rental_income).toEqual(rental_income);
});

test("Cashflow dividend_income", async () => {
  let res = await axios.get(testRoute);
  const data: IChartsData = res.data;
  expect(data.cashflow.dividend_income).toEqual(dividend_income);
});

test("Cashflow savings_and_investments_drawdowns", async () => {
  let res = await axios.get(testRoute);
  const data: IChartsData = res.data;
  expect(data.cashflow.savings_and_investments_drawdowns).toEqual(savings_and_investment_drawdowns);
});

test("Cashflow pension_income", async () => {
  let res = await axios.get(testRoute);
  const data: IChartsData = res.data;
  expect(data.cashflow.pension_income).toEqual(pension_income);
});

test("Cashflow residential_property_sales_proceeds", async () => {
  let res = await axios.get(testRoute);
  const data: IChartsData = res.data;
  expect(data.cashflow.residential_property_sales_proceeds).toEqual(residential_income);
});

test("Cashflow other_income", async () => {
  let res = await axios.get(testRoute);
  const data: IChartsData = res.data;
  expect(data.cashflow.other_income).toEqual(other_income);
});

test("Cashflow bank_account", async () => {
  let res = await axios.get(testRoute);
  const data: IChartsData = res.data;
  expect(data.cashflow.bank_accounts).toEqual(bank_account);
});

test("Cashflow expenses", async () => {
  let res = await axios.get(testRoute);
  const data: IChartsData = res.data;
  expect(data.cashflow.expenses).toEqual(expenses);
});

test("Cashflow shortfall", async () => {
  let res = await axios.get(testRoute);
  const data: IChartsData = res.data;

  expect(data.cashflow.shortfall).toEqual(shortfall);
});

//Assets and Liabilities tests
test("Assets and Liabilities aggregated_bank_accounts", async () => {
  let res = await axios.get(testRoute);
  const data: IChartsData = res.data;
  expect(data.assets_and_liabilities.aggregated_bank_accounts).toEqual(aggregated_bank_accounts);
});

test("Assets and Liabilities savings_and_investments", async () => {
  let res = await axios.get(testRoute);
  const data: IChartsData = res.data;

  expect(data.assets_and_liabilities.savings_and_investments).toEqual(savings_and_investments);
});

test("Assets and Liabilities pension_plans", async () => {
  let res = await axios.get(testRoute);
  const data: IChartsData = res.data;
  expect(data.assets_and_liabilities.pension_plans).toEqual(pension_plans);
});

test("Assets and Liabilities liabilities", async () => {
  let res = await axios.get(testRoute);
  const data: IChartsData = res.data;
  expect(data.assets_and_liabilities.liabilities).toEqual(liabilities);
});

//Expenses
test("Expenses housing_expenses", async () => {
  let res = await axios.get(testRoute);
  const data: IChartsData = res.data;
  expect(data.expenses.housing).toEqual(housing_expenses);
});

test("Expenses consumable_expenses", async () => {
  let res = await axios.get(testRoute);
  const data: IChartsData = res.data;
  expect(data.expenses.consumables).toEqual(consumable_expenses);
});

test("Expenses travel_expenses", async () => {
  let res = await axios.get(testRoute);
  const data: IChartsData = res.data;
  expect(data.expenses.travel).toEqual(travel_expenses);
});

test("Expenses shopping_expenses", async () => {
  let res = await axios.get(testRoute);
  const data: IChartsData = res.data;
  expect(data.expenses.shopping).toEqual(shopping_expenses);
});

test("Expenses entertainment_expenses", async () => {
  let res = await axios.get(testRoute);
  const data: IChartsData = res.data;
  expect(data.expenses.entertainment).toEqual(entertainment_expenses);
});

test("Expenses holiday_expenses", async () => {
  let res = await axios.get(testRoute);
  const data: IChartsData = res.data;
  expect(data.expenses.holiday).toEqual(holiday_expenses);
});

test("Expenses one_off_expenses", async () => {
  let res = await axios.get(testRoute);
  const data: IChartsData = res.data;
  expect(data.expenses.one_off).toEqual(one_off_expenses);
});

test("Expenses children_education_expenses", async () => {
  let res = await axios.get(testRoute);
  const data: IChartsData = res.data;
  expect(data.expenses.children_education).toEqual(children_education_expenses);
});

test("Expenses financial_expenses", async () => {
  let res = await axios.get(testRoute);
  const data: IChartsData = res.data;
  expect(data.expenses.financial).toEqual(financial_expenses);
});
test("Expenses additional_tax", async () => {
  let res = await axios.get(testRoute);
  const data: IChartsData = res.data;
  expect(data.expenses.additional_tax_charge).toEqual(additional_tax);
});
