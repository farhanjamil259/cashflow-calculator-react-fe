import React, { useEffect, useState } from "react";
import { Affix, Anchor, Button, Col, Form, Row } from "antd";
import Layout from "antd/lib/layout/layout";

import { v4 as uuid } from "uuid";

import "./InputsForm.css";
import { IInputs } from "../../interfaces/ISubInputs";

const { Link } = Anchor;

const InputsForm = () => {
  const [targetOffset, setTargetOffset] = useState<number | undefined>(undefined);

  useEffect(() => {
    setTargetOffset(window.innerHeight / 3);
  }, []);

  const [initialInputs, setInitialInputs] = useState<IInputs>({
    user_id: "",
    input_set_name: "",
    current_year: 2021,
    household_owners: [
      {
        id: uuid(),
        name: "",
        birth_year: 1989,
        retirement_age: 65,
      },
    ],
    children: [
      {
        id: uuid(),
        name: "",
        birth_year: 2024,
      },
    ],
    assets: {
      properties: [
        {
          id: uuid(),
          name: "",
          original_price: 0,
          start_year: 2025,
          sell_in_future: true,
          end_year: 2050,
          type_of_property: "Main Home",
          on_mortgage: false,
          mortgage_rate: 0,
        },
      ],
      bank_accounts: {
        original_balance: 0,
        minimum_cash_balance_acceptable: 0,
      },
      savings_and_investments: {
        individual_savings_account: [
          {
            original_balance: 0,
            annual_contribution: 0,
          },
        ],
        general_investment_account: [
          {
            original_balance: 0,
            annual_contribution: 0,
          },
        ],
      },

      non_employment_defined_contribution_pension_plans: [
        {
          original_balance: 0,
          annual_contribution: 0,
        },
      ],
    },
    liabilities: {
      mortgages: [
        {
          interest_rate: 0,
          mortgage_period: 0,
          number_of_payments_per_year: 12,
        },
      ],
      other_loans: [
        {
          id: uuid(),
          name: "",
          original_balance: 0,
          interest_rate: 0,
          start_year: 2019,
          loan_period: 10,
          number_of_payments_per_year: 12,
        },
      ],
      credit_card: {
        id: uuid(),
        name: "Credit Card",
        original_balance: 0,
        interest_rate: 0,
      },
    },
    household_income: {
      employment_income: [
        {
          gross_anual_amount: 0,
        },
      ],
      self_employment_income: [
        {
          gross_anual_amount: 0,
        },
      ],
      rental_income: {
        joint_annual_rental_income: 0,
        details: [
          {
            share_of_rental_income: 0.5,
            start_year: 2061,
          },
        ],
      },
      dividend_income: [
        {
          anual_amount: 0,
          start_year: 2021,
          end_year: 2050,
        },
      ],
      savings_and_investments_drawdowns: {
        individual_savings_accounts: [
          {
            owner_name: "",
            drawdowns: [
              {
                id: uuid(),
                name: "Drawdown 1",
                amount_to_drawn_down: 0,
                start_year: 2021,
                end_year: 2033,
              },
            ],
          },
        ],
        general_investment_accounts: [
          {
            owner_name: "",
            drawdowns: [
              {
                id: uuid(),
                name: "Drawdown 1",
                amount_to_drawn_down: 0,
                start_year: 2055,
                end_year: 2095,
              },
            ],
          },
        ],
      },
      pension_income: {
        defined_benifit_pension_plans: [
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
            drawdown_option_annual_amount: 0,
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
            annual_expense: 0,
            start_year: 2021,
            end_year: 2044,
            rate_after_retirement: 0,
            type: "property",
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
        ],
        total: 0,
      },
      insurance_policies: [],

      one_off_expenses: [
        {
          id: uuid(),
          name: "Main House Renovation",
          annual_payment_in_todays_terms: 0,
          inflation: 0,
          start_year: 2039,
          end_year: 2041,
        },
      ],
      children_education_expenses: {
        primary_school_fees: {
          annual_fee_in_todays_terms: 0,
          inflation: 0,
        },
        seconday_school_fees: {
          annual_fee_in_todays_terms: 0,
          inflation: 0,
        },
        university_fees: {
          annual_fee_in_todays_terms: 0,
          inflation: 0,
        },
      },
    },
  });

  const handleFinish = async () => {};

  return (
    <Layout style={{ marginTop: "16px" }}>
      <Form layout="vertical" size="middle" onFinish={handleFinish}>
        <Row>
          <Col xl={4} lg={0} md={0} sm={0} xs={0}>
            <Anchor style={{ margin: "16px", background: "transparent" }} targetOffset={targetOffset}>
              <Link href="#client-information" title="Client Information" />
              <Link href="#input-set-details" title="Input Set Details" />
              <Link href="#people" title="People">
                <Link href="#owners" title="Owners" />
                <Link href="#children" title="Children" />
              </Link>
              <Link href="#assets" title="Assets">
                <Link href="#properties" title="Properties" />
                <Link href="#bank-account" title="Bank Account" />
                <Link href="#savings-and-investments" title="Savings and Investments" />
                <Link href="#defined-contribution-pension-plans" title="Defined Contribution Pension Plans" />
              </Link>
              <Link href="#liabilities" title="Liabilities">
                <Link href="#mortgages" title="Mortgages" />
                <Link href="#other-loans" title="Other Loans" />
                <Link href="#credit-card" title="Credit Card" />
              </Link>
              <Link href="#income" title="Income">
                <Link href="#employment-income" title="Employment Income" />
                <Link href="#self-employment-income" title="Self-Employment Income" />
                <Link href="#rental-income" title="Rental Income" />
                <Link href="#dividend-income" title="Dividend Income" />
                <Link href="#drawdowns" title="Drawdowns" />
                <Link href="#pension-plans" title="Pension Plans" />
                <Link href="#other-income" title="Other Income" />
              </Link>
              <Link href="#expenses" title="Expenses">
                <Link href="#housing" title="Housing" />
                <Link href="#consumables" title="Consumables" />
                <Link href="#travel" title="Travel" />
                <Link href="#shopping" title="Shopping" />
                <Link href="#entertainment" title="Entertainment" />
                <Link href="#holiday" title="Holiday" />
                <Link href="#insurance-policies" title="Insurance Policies" />
                <Link href="#one-off-expenses" title="One-Off Expenses" />
                <Link href="#children-education-expenses" title="Children Education Expenses" />
              </Link>
            </Anchor>
          </Col>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            hello
          </Col>
        </Row>
        <Row justify="end">
          <Affix offsetBottom={50} style={{ marginRight: "50px" }}>
            <Button htmlType="submit" type="primary" size="large">
              Submit
            </Button>
          </Affix>
        </Row>
      </Form>
    </Layout>
  );
};

export default InputsForm;
