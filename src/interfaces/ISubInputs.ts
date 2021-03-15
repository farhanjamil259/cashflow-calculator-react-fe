export interface ISetDetails {
  input_set_name: string;
  current_year: number;
}

export interface IOwner {
  id: string;
  name: string;
  birth_year: number;
  retirement_age: number;
}

export interface IChild {
  id: string;
  name: string;
  birth_year: number;
}

export interface IProperty {
  id: string;
  name: string;
  original_price: number;
  start_year: number;
  sell_in_future: boolean;
  end_year: number;
  type_of_property: "Main Home" | "Second Property";
  on_mortgage: boolean;
  mortgage_rate: number;
}

export interface IBankAccount {
  original_balance: number;
  minimum_cash_balance_acceptable: number;
}

export interface IIndividualSavingsAccounts {
  original_balance: number;
  annual_contribution: number;
}

export interface IGeneralInvestmentAccount {
  original_balance: number;
  annual_contribution: number;
}

export interface ISavingsAndInvestments {
  individual_savings_account: Array<IIndividualSavingsAccounts>;
  general_investment_account: Array<IGeneralInvestmentAccount>;
}

export interface INonEmploymentDefinedContributionPensionPlan {
  original_balance: number;
  annual_contribution: number;
}

export interface IMortgage {
  interest_rate: number;
  mortgage_period: number;
  number_of_payments_per_year: number;
}

export interface IOtherLoans {
  id: string;
  name: string;
  original_balance: number;
  interest_rate: number;
  start_year: number;
  loan_period: number;
  number_of_payments_per_year: number;
}

export interface ICreditCards {
  id: string;
  name: string;
  original_balance: number;
  interest_rate: number;
}

export interface IEmploymentIncome {
  gross_anual_amount: number;
}

export interface ISelfEmploymentIncome {
  gross_anual_amount: number;
}

export interface IRentalIncomeDetails {
  share_of_rental_income: number;
  start_year: number;
}

export interface IRentalIncome {
  joint_annual_rental_income: number;
  details: Array<IRentalIncomeDetails>;
}

export interface IDividendIncome {
  anual_amount: number;
  start_year: number;
  end_year: number;
}

export interface IDrawdowns {
  id: string;
  name: string;
  amount_to_drawn_down: number;
  start_year: number;
  end_year: number;
}

export interface IIndividualSavingAccountDrawdowns {
  owner_name: string;
  drawdowns: Array<IDrawdowns>;
}

export interface IGeneralInvestmentAccountDrawdowns {
  owner_name: string;
  drawdowns: Array<IDrawdowns>;
}

export interface ISavingsAndInvestmentSDrawdowns {
  individual_savings_accounts: Array<IIndividualSavingAccountDrawdowns>;
  general_investment_accounts: Array<IGeneralInvestmentAccountDrawdowns>;
}

export interface IPensionIncomeDefinedBenifitPensionPlan {
  option_taken: "Lump Sum" | "Annual";
  estimated_lump_sum: number;
  estimated_annual_pension: number;
  annual_increase: number;
}

export interface IPensionIncomeDefinedContributionPensionPlans {
  option_taken: "Lump Sum" | "Annual" | "Drawdown";
  drawdown_option_annual_amount: number;
}

export interface ITaxableIncome {
  name: string;
  gross_annual_amount: number;
  inflation: number;
  start_year: number;
  end_year: number;
}

export interface IHousingDetails {
  id: string;
  name: string;
  annual_expense: number;
  start_year: number;
  end_year: number;
  rate_after_retirement: number;
  type: string;
}

export interface IExpenseDetails {
  id: string;
  name: string;
  annual_expense: number;
  rate_after_retirement: number;
}

export interface IInsurancePolicies {
  name: string;
  annual_expense: number;
  inflation: number;
  rate_after_retirement: number;
}

export interface IOneOffExpenses {
  id: string;
  name: string;
  annual_payment_in_todays_terms: number;
  inflation: number;
  start_year: number;
  end_year: number;
}

export interface ISchoolFees {
  annual_fee_in_todays_terms: number;
  inflation: number;
}

export interface IInputs {
  user_id: string;
  input_set_name: string;
  current_year: number;
  household_owners: Array<IOwner>;
  children: Array<IChild>;
  assets: {
    properties: Array<IProperty>;
    bank_accounts: IBankAccount;
    savings_and_investments: ISavingsAndInvestments;
    non_employment_defined_contribution_pension_plans: Array<INonEmploymentDefinedContributionPensionPlan>;
  };
  liabilities: {
    mortgages: Array<IMortgage>;
    other_loans: Array<IOtherLoans>;
    credit_card: ICreditCards;
  };
  household_income: {
    employment_income: Array<IEmploymentIncome>;
    self_employment_income: Array<ISelfEmploymentIncome>;
    rental_income: IRentalIncome;
    dividend_income: Array<IDividendIncome>;
    savings_and_investments_drawdowns: ISavingsAndInvestmentSDrawdowns;
    pension_income: {
      defined_benifit_pension_plans: Array<IPensionIncomeDefinedBenifitPensionPlan>;
      defined_contribution_pension_plans: Array<IPensionIncomeDefinedContributionPensionPlans>;
    };
    other_income: {
      other_taxable_income: Array<ITaxableIncome>;
      other_non_taxable_income: Array<ITaxableIncome>;
    };
  };
  household_expenses: {
    blanket_inflation_rate: number;
    housing: {
      details: Array<IHousingDetails>;
      total: number;
    };
    consumables: {
      details: Array<IExpenseDetails>;
      total: number;
    };
    travel: {
      details: Array<IExpenseDetails>;
      total: number;
    };
    shopping: {
      details: Array<IExpenseDetails>;
      total: number;
    };
    entertainment: {
      details: Array<IExpenseDetails>;
      total: number;
    };
    holiday: {
      details: Array<IExpenseDetails>;
      total: number;
    };
    insurance_policies: Array<IInsurancePolicies>;
    one_off_expenses: Array<IOneOffExpenses>;
    children_education_expenses: {
      primary_school_fees: ISchoolFees;
      seconday_school_fees: ISchoolFees;
      university_fees: ISchoolFees;
    };
  };
}
