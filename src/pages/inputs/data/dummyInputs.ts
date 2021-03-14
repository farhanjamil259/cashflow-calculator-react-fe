import { v4 as uuid } from "uuid";
import {
  IInputs,
} from "../../../interfaces/ISubInputs";

const dummyInputs: IInputs = {
  user_id: "",
  input_set_name: "Input set for person " + Math.floor(Math.random() * 999),
  current_year: 2021,
  household_owners: [
    {
      id: uuid(),
      name: "Harry Myers",
      birth_year: 1989,
      retirement_age: 65,
    },
    {
      id: uuid(),
      name: "Sarah Myers",
      birth_year: 1994,
      retirement_age: 50,
    },
  ],
  children: [{ id: uuid(), name: "Colin Myers", birth_year: 2024 }],
  assets: {
    properties: [
      {
        id: uuid(),
        name: "Main House",
        original_price: 1000000,
        start_year: 2025,
        sell_in_future: true,
        end_year: 2050,
        type_of_property: "Main Home",
        on_mortgage: true,
        mortgage_rate: 0.9,
      },
      {
        id: uuid(),
        name: "Second Property",
        original_price: 1000000,
        start_year: 2050,
        sell_in_future: false,
        end_year: 2095,
        type_of_property: "Main Home",
        on_mortgage: true,
        mortgage_rate: 0.9,
      },
    ],
    bank_accounts: {
      original_balance: 50000,
      minimum_cash_balance_acceptable: 10000,
    },
    savings_and_investments: {
      individual_savings_account: [
        {
          original_balance: 100000,
          annual_contribution: 1000,
        },
        {
          original_balance: 40000,
          annual_contribution: 900,
        },
      ],
      general_investment_account: [
        {

          original_balance: 0,
          annual_contribution: 900,
        },
        {
          original_balance: 0,
          annual_contribution: 1000,
        },
      ],
    },

    non_employment_defined_contribution_pension_plans: [
      {
        original_balance: 40000,
        annual_contribution: 4000,
      },
      {
        original_balance: 10000,
        annual_contribution: 1000,
      },
    ],
  },
  liabilities: {
    mortgages: [
      {
        interest_rate: 0.035,
        mortgage_period: 20,
        number_of_payments_per_year: 12,
      },
      {
        interest_rate: 0.04,
        mortgage_period: 20,
        number_of_payments_per_year: 12,
      },
    ],
    other_loans: [
      {
        id: uuid(),
        name: "Car Loan",
        original_balance: 20000,
        interest_rate: 0.03,
        start_year: 2019,
        loan_period: 10,
        number_of_payments_per_year: 12,
      },
    ],
    credit_card: {
      id: uuid(),
      name: "Credit Card 1",
      original_balance: 5000,
      interest_rate: 0,
    },
  },
  household_income: {
    employment_income: [
      {
        gross_anual_amount: 120000,
      },
      {
        gross_anual_amount: 0,
      },
    ],
    self_employment_income: [
      {
        gross_anual_amount: 0,
      },
      {
        gross_anual_amount: 50000,
      },
    ],
    rental_income: {
      joint_annual_rental_income: 2400,
      details: [
        {
          share_of_rental_income: 0.5,
          start_year: 2061,
        },
        {
          share_of_rental_income: 0.5,
          start_year: 2061,
        },
      ],
    },
    dividend_income: [
      {
        anual_amount: 500,
        start_year: 2021,
        end_year: 2050,
      },
      {
        anual_amount: 5000,
        start_year: 2021,
        end_year: 2045,
      },
    ],
      savings_and_investments_drawdowns: {
          individual_savings_accounts: [
              {
                  owner_name: "Mr Optimistic",
                  drawdowns: [
                      {
                          id: uuid(),
                          name: "Drawdown 1",
                          amount_to_drawn_down: 3000,
                          start_year: 2021,
                          end_year: 2033
                      },
                      {
                          id: uuid(),
                          name: "Drawdown 2",
                          amount_to_drawn_down: 3000,
                          start_year: 2034,
                          end_year: 2054
                      },
                      {
                          id: uuid(),
                          name: "Drawdown 3",
                          amount_to_drawn_down: 15000,
                          start_year: 2055,
                          end_year: 2095
                      },
                      {
                          id: uuid(),
                          name: "Drawdown 4",
                          amount_to_drawn_down: 0,
                          start_year: 2032,
                          end_year: 2032
                      },
                      {
                          id: uuid(),
                          name: "Drawdown 5",
                          amount_to_drawn_down: 120000,
                          start_year: 2025,
                          end_year: 2025
                      }
                  ]
              },
              {
                owner_name  : "Mrs Optimistic",
                  drawdowns: [
                      {
                          id: uuid(),
                          name: "Drawdown 1",
                          amount_to_drawn_down: 500,
                          start_year: 2034,
                          end_year: 2049
                      },
                      {
                          id: uuid(),
                          name: "Drawdown 2",
                          amount_to_drawn_down: 10000,
                          start_year: 2050,
                          end_year: 2095
                      }
                  ]
              }
          ],
          general_investment_accounts: [
              {
                  owner_name: "Mr Optimistic",
                  drawdowns: [
                      {
                          id: uuid(),
                          name: "Drawdown 1",
                          amount_to_drawn_down: 20000,
                          start_year: 2055,
                          end_year: 2095
                      }
                  ]
              },
              {
                  owner_name: "Mrs Optimistic",
                  drawdowns: [
                      {
                          id: uuid(),
                          name: "Drawdown 1",
                          amount_to_drawn_down: 30000,
                          start_year: 2044,
                          end_year: 2059
                      }
                  ]
              }
          ]
      },
    pension_income: {
      defined_benifit_pension_plans: [
        {
          option_taken: "Lump Sum",
          estimated_lump_sum: 30000,
          estimated_annual_pension: 1000,
          annual_increase: 0,
        },
        {
          option_taken: "Lump Sum",
          estimated_lump_sum: 0,
          estimated_annual_pension: 0,
          annual_increase: 0,
        },
      ],
      defined_contribution_pension_plans: [
        {
          option_taken: "Drawdown",
          drawdown_option_annual_amount: 25000,
        },
        {
          option_taken: "Lump Sum",
          drawdown_option_annual_amount: 3000,
        },
      ],
    },
    other_income: {
      other_taxable_income: [],
      other_non_taxable_income: [],
    },
  },
  household_expenses: {
    blanket_inflation_rate: 0,
    housing: {
      details: [
        {
          id: uuid(),
          name: "Rent",
          annual_expense: 30000,
          start_year: 2021,
          end_year: 2044,
          rate_after_retirement: 0,
          type: "property",
        },
        {
          id: uuid(),
          name: "Council Tax",
          annual_expense: 1320,
          start_year: 0,
          end_year: 0,
          rate_after_retirement: 0.6,
          type: "tax",
        },
        {
          id: uuid(),
          name: "Utilities - Electricity",
          annual_expense: 600,
          start_year: 0,
          end_year: 0,
          rate_after_retirement: 1,
          type: "utility",
        },
        {
          id: uuid(),
          name: "Utilities - Heat",
          annual_expense: 600,
          start_year: 0,
          end_year: 0,
          rate_after_retirement: 1,
          type: "utility",
        },
        {
          id: uuid(),
          name: "Utilities - Water",
          annual_expense: 300,
          start_year: 0,
          end_year: 0,
          rate_after_retirement: 1,
          type: "utility",
        },
        {
          id: uuid(),
          name: "TV Licence and Subscriptions",
          annual_expense: 240,
          start_year: 0,
          end_year: 0,
          rate_after_retirement: 1,
          type: "digital",
        },
        {
          id: uuid(),
          name: "Internet",
          annual_expense: 240,
          start_year: 0,
          end_year: 0,
          rate_after_retirement: 1,
          type: "digital",
        },
        {
          id: uuid(),
          name: "Mobile",
          annual_expense: 360,
          start_year: 0,
          end_year: 0,
          rate_after_retirement: 1,
          type: "digital",
        },
      ],
      total: 0,
    },
    consumables: {
      details: [
        {
          id: uuid(),
          name: "Eating Out",
          annual_expense: 2000,
          rate_after_retirement: 1,
        },
        {
          id: uuid(),
          name: "Groceries",
          annual_expense: 4000,
          rate_after_retirement: 1,
        },
      ],
      total: 0,
    },
    travel: {
      details: [
        {
          id: uuid(),
          name: "Travel Card - Husband",
          annual_expense: 1600,
          rate_after_retirement: 0.2,
        },
        {
          id: uuid(),
          name: "Travel Card - Wife",
          annual_expense: 1600,
          rate_after_retirement: 0.2,
        },
        {
          id: uuid(),
          name: "Other Oyester Travel",
          annual_expense: 120,
          rate_after_retirement: 1,
        },
        {
          id: uuid(),
          name: "Fuel and Other Motor Expenses",
          annual_expense: 1000,
          rate_after_retirement: 1,
        },
        {
          id: uuid(),
          name: "Bus and Train Tickets",
          annual_expense: 240,
          rate_after_retirement: 1,
        },
        {
          id: uuid(),
          name: "Taxi and Uber",
          annual_expense: 120,
          rate_after_retirement: 1,
        },
      ],
      total: 0,
    },
    shopping: {
      details: [
        {
          id: uuid(),
          name: "Clothing and Accessories",
          annual_expense: 1000,
          rate_after_retirement: 0.7,
        },
        {
          id: uuid(),
          name: "Appliances and Furniture",
          annual_expense: 1000,
          rate_after_retirement: 1,
        },
        {
          id: uuid(),
          name: "Online Shopping",
          annual_expense: 500,
          rate_after_retirement: 0.7,
        },
        {
          id: uuid(),
          name: "Other Shopping Expenses",
          annual_expense: 200,
          rate_after_retirement: 1,
        },
      ],
      total: 0,
    },
    entertainment: {
      details: [
        {
          id: uuid(),
          name: "Drinks",
          annual_expense: 200,
          rate_after_retirement: 1,
        },
        {
          id: uuid(),
          name: "Cinema",
          annual_expense: 120,
          rate_after_retirement: 1,
        },
        {
          id: uuid(),
          name: "Day-Outs",
          annual_expense: 300,
          rate_after_retirement: 1,
        },
        {
          id: uuid(),
          name: "Other Entertainment Expenses",
          annual_expense: 200,
          rate_after_retirement: 0.7,
        },
      ],
      total: 0,
    },
    holiday: {
      details: [
        {
          id: uuid(),
          name: "Flights",
          annual_expense: 600,
          rate_after_retirement: 1,
        },
        {
          id: uuid(),
          name: "Accomodation",
          annual_expense: 600,
          rate_after_retirement: 1,
        },
        {
          id: uuid(),
          name: "Other Holiday Expenses",
          annual_expense: 600,
          rate_after_retirement: 1,
        },
      ],
      total: 0,
    },
    insurance_policies: [
      {
        name: "Life Insurance - ",
        annual_expense: 40,
        inflation: 0,
        rate_after_retirement: 0,
      },
      {
        name: "Life Insurance - ",
        annual_expense: 20,
        inflation: 0,
        rate_after_retirement: 0,
      },
      {
        name: "Critical Illness Cover - ",
        annual_expense: 0,
        inflation: 0,
        rate_after_retirement: 0,
      },
      {
        name: "Critical Illness Cover - ",
        annual_expense: 0,
        inflation: 0,
        rate_after_retirement: 0,
      },
      {
        name: "Family Income Benifit - ",
        annual_expense: 0,
        inflation: 0,
        rate_after_retirement: 0,
      },
      {
        name: "Family Income Benifit - ",
        annual_expense: 0,
        inflation: 0,
        rate_after_retirement: 0,
      },
    ],
    one_off_expenses: [
      {
        id: uuid(),
        name: "Main House Renovation",
        annual_payment_in_todays_terms: 2500,
        inflation: 0.0266,
        start_year: 2039,
        end_year: 2041,
      },
      {
        id: uuid(),
        name: "Optimistic Jr's Wedding",
        annual_payment_in_todays_terms: 3000,
        inflation: 0.0266,
        start_year: 2051,
        end_year: 2051,
      },
      {
        id: uuid(),
        name: "Donations",
        annual_payment_in_todays_terms: 2000,
        inflation: 0.01,
        start_year: 2021,
        end_year: 2091,
      },
    ],
    children_education_expenses: {
      primary_school_fees: {
        annual_fee_in_todays_terms: 13500,
        inflation: 0,
      },
      seconday_school_fees: {
        annual_fee_in_todays_terms: 13500,
        inflation: 0,
      },
      university_fees: {
        annual_fee_in_todays_terms: 9250,
        inflation: 0,
      },
    },
  },
};
export default dummyInputs;
