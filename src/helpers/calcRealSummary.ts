import IAssumptions from "../interfaces/IAssumptions";
import IForecastSummary from "../interfaces/IForecastSummary";

const CalcRealSummary = (summary: IForecastSummary[], assumptions: IAssumptions) => {
  const realSummary: IForecastSummary[] = summary.map((s, i) => {
    const realFormula = (val: number) => {
      let newVal: number;

      newVal =
        val *
        (1 /
          (1 +
            Math.max(
              assumptions.market_data.retain_price_index.rate,
              assumptions.market_data.consumer_price_index.rate
            )) **
            i);

      return newVal;
    };

    return {
      year: s.year,
      retirement_ages: s.retirement_ages,
      ages: {
        owner_ages: s.ages.owner_ages,
        children_ages: s.ages.children_ages,
      },
      assets_and_liabilities_analysis: {
        aggregated_bank_accounts: realFormula(s.assets_and_liabilities_analysis.aggregated_bank_accounts),
        total_savings_and_investments: realFormula(
          s.assets_and_liabilities_analysis.total_savings_and_investments
        ),
        total_pension_plans: realFormula(s.assets_and_liabilities_analysis.total_pension_plans),
        total_mortgages: realFormula(s.assets_and_liabilities_analysis.total_mortgages),
        total_other_loans: realFormula(s.assets_and_liabilities_analysis.total_other_loans),
        credit_card: realFormula(s.assets_and_liabilities_analysis.credit_card),
        net_asset_possition: realFormula(s.assets_and_liabilities_analysis.net_asset_possition),
      },
      cash_flow_analysis: {
        total_household_income: realFormula(s.cash_flow_analysis.total_household_income),
        total_household_expenses: realFormula(s.cash_flow_analysis.total_household_expenses),
        annual_cash_inflow_outflow: realFormula(s.cash_flow_analysis.annual_cash_inflow_outflow),
      },
      income_analysis: {
        total_employment_income: realFormula(s.income_analysis.total_employment_income),
        total_self_employment_income: realFormula(s.income_analysis.total_self_employment_income),
        total_rental_income: realFormula(s.income_analysis.total_rental_income),
        total_dividend_income: realFormula(s.income_analysis.total_dividend_income),
        total_savings_and_investments_drawdowns: realFormula(
          s.income_analysis.total_savings_and_investments_drawdowns
        ),
        total_pension_income: realFormula(s.income_analysis.total_pension_income),
        total_residential_sale_proceeds: realFormula(s.income_analysis.total_residential_sale_proceeds),
        total_other_income: realFormula(s.income_analysis.total_other_income),
        aggregated_bank_accounts: realFormula(s.income_analysis.aggregated_bank_accounts),
        total_income: realFormula(s.income_analysis.total_income),
      },
      expense_analysis: {
        total_housing_expenses: realFormula(s.expense_analysis.total_housing_expenses),
        total_consumables_expenses: realFormula(s.expense_analysis.total_consumables_expenses),
        total_travel_expenses: realFormula(s.expense_analysis.total_travel_expenses),
        total_shopping_expenses: realFormula(s.expense_analysis.total_shopping_expenses),
        total_entertainment_expenses: realFormula(s.expense_analysis.total_entertainment_expenses),
        total_holiday_expenses: realFormula(s.expense_analysis.total_holiday_expenses),
        total_one_off_expenses: realFormula(s.expense_analysis.total_one_off_expenses),
        total_children_education_expenses: realFormula(s.expense_analysis.total_children_education_expenses),
        total_financial_expenses: realFormula(s.expense_analysis.total_financial_expenses),
        total_additional_tax_charge: realFormula(s.expense_analysis.total_additional_tax_charge),
        total_expenses: realFormula(s.expense_analysis.total_expenses),
      },
      income_tax_analysis: {
        details: s.income_tax_analysis.details.map((income) => {
          return {
            name: income.name,
            income_tax_charge: realFormula(income.income_tax_charge),
            national_insurance: realFormula(income.national_insurance),
            total_tax_income: realFormula(income.total_tax_income),
            total_taxable_income: realFormula(income.total_taxable_income),
            effective_tax_rate: income.effective_tax_rate,
          };
        }),
        overall_effective_tax_rate: s.income_tax_analysis.overall_effective_tax_rate,
      },
      tax_and_expenses_as_a_percentage_of_income: {
        tax_and_expenses_as_a_percentage_of_income:
          s.tax_and_expenses_as_a_percentage_of_income.tax_and_expenses_as_a_percentage_of_income,
      },
      property_analysis: {
        property_details: s.property_analysis.property_details.map((pd) => {
          return {
            name: pd.name,
            amount: realFormula(pd.amount),
          };
        }),
        mortgage_details: s.property_analysis.mortgage_details.map((md) => {
          return {
            name: md.name,
            amount: realFormula(md.amount),
          };
        }),
        ltv_details: s.property_analysis.ltv_details.map((ltv) => {
          return {
            name: ltv.name,
            amount: ltv.amount,
          };
        }),
        net_position: s.property_analysis.net_position,
      },
    };
  });
  return realSummary;
};

export default CalcRealSummary;
