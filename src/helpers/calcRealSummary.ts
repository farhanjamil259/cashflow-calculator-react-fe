import IAssumptions from "../interfaces/IAssumptions";
import IChartsData from "../interfaces/IChartsData";

const CalcRealSummary = (summary: IChartsData, assumptions: IAssumptions) => {
  const realFormula = (val: number, index: number) => {
    let newVal: number;

    newVal =
      val *
      (1 /
        (1 +
          Math.max(
            assumptions.market_data.retain_price_index.rate,
            assumptions.market_data.consumer_price_index.rate
          )) **
          index);

    return newVal;
  };

  const realSummary: IChartsData = {
    type: "Real",
    years: [...summary.years],
    retirement_ages: [...summary.retirement_ages],
    ages: {
      owners: [...summary.ages.owners],
      children: [...summary.ages.children],
    },
    cashflow: {
      employment_income: summary.cashflow.employment_income.map((income, i) => {
        return realFormula(income, i);
      }),

      self_employment_income: summary.cashflow.self_employment_income.map((income, i) => {
        return realFormula(income, i);
      }),
      rental_income: summary.cashflow.rental_income.map((income, i) => {
        return realFormula(income, i);
      }),
      dividend_income: summary.cashflow.dividend_income.map((income, i) => {
        return realFormula(income, i);
      }),
      savings_and_investments_drawdowns: summary.cashflow.savings_and_investments_drawdowns.map(
        (income, i) => {
          return realFormula(income, i);
        }
      ),
      pension_income: summary.cashflow.pension_income.map((income, i) => {
        return realFormula(income, i);
      }),
      residential_property_sales_proceeds: summary.cashflow.residential_property_sales_proceeds.map(
        (income, i) => {
          return realFormula(income, i);
        }
      ),
      other_income: summary.cashflow.other_income.map((income, i) => {
        return realFormula(income, i);
      }),
      bank_accounts: summary.cashflow.bank_accounts.map((income, i) => {
        return realFormula(income, i);
      }),
      expenses: summary.cashflow.expenses.map((income, i) => {
        return realFormula(income, i);
      }),
      shortfall: summary.cashflow.shortfall.map((income, i) => {
        return realFormula(income, i);
      }),
    },
    assets_and_liabilities: {
      aggregated_bank_accounts: summary.assets_and_liabilities.aggregated_bank_accounts.map((income, i) => {
        return realFormula(income, i);
      }),
      savings_and_investments: summary.assets_and_liabilities.savings_and_investments.map((income, i) => {
        return realFormula(income, i);
      }),
      pension_plans: summary.assets_and_liabilities.pension_plans.map((income, i) => {
        return realFormula(income, i);
      }),
      liabilities: summary.assets_and_liabilities.liabilities.map((income, i) => {
        return realFormula(income, i);
      }),
    },
    income: {
      employment_income: summary.cashflow.employment_income.map((income, i) => {
        return realFormula(income, i);
      }),
      self_employment_income: summary.cashflow.self_employment_income.map((income, i) => {
        return realFormula(income, i);
      }),
      rental_income: summary.cashflow.rental_income.map((income, i) => {
        return realFormula(income, i);
      }),
      dividend_income: summary.cashflow.dividend_income.map((income, i) => {
        return realFormula(income, i);
      }),
      savings_and_investments_drawdowns: summary.cashflow.savings_and_investments_drawdowns.map(
        (income, i) => {
          return realFormula(income, i);
        }
      ),
      pension_income: summary.cashflow.pension_income.map((income, i) => {
        return realFormula(income, i);
      }),
      other_income: summary.cashflow.other_income.map((income, i) => {
        return realFormula(income, i);
      }),
      bank_accounts: summary.cashflow.bank_accounts.map((income, i) => {
        return realFormula(income, i);
      }),
      total_income: summary.income.total_income.map((income, i) => {
        return realFormula(income, i);
      }),
    },
    expenses: {
      housing: summary.expenses.housing.map((income, i) => {
        return realFormula(income, i);
      }),
      consumables: summary.expenses.consumables.map((income, i) => {
        return realFormula(income, i);
      }),
      travel: summary.expenses.travel.map((income, i) => {
        return realFormula(income, i);
      }),
      shopping: summary.expenses.shopping.map((income, i) => {
        return realFormula(income, i);
      }),
      entertainment: summary.expenses.entertainment.map((income, i) => {
        return realFormula(income, i);
      }),
      holiday: summary.expenses.holiday.map((income, i) => {
        return realFormula(income, i);
      }),
      one_off: summary.expenses.one_off.map((income, i) => {
        return realFormula(income, i);
      }),
      children_education: summary.expenses.children_education.map((income, i) => {
        return realFormula(income, i);
      }),
      financial: summary.expenses.financial.map((income, i) => {
        return realFormula(income, i);
      }),
      additional_tax_charge: summary.expenses.additional_tax_charge.map((income, i) => {
        return realFormula(income, i);
      }),
    },
  };
  return realSummary;
};

export default CalcRealSummary;
