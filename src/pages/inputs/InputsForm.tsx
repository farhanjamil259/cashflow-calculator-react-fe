import React, { cloneElement, useEffect, useState } from "react";
import { Affix, Anchor, Button, Card, Col, Divider, Form, InputNumber, Row, Typography, Select } from "antd";
import Layout from "antd/lib/layout/layout";

import { v4 as uuid } from "uuid";

import "./InputsForm.css";
import { IInputs } from "../../interfaces/ISubInputs";
import { PlusCircleOutlined } from "@ant-design/icons/lib/icons";
import DateInput from "./controls/DateInput";
import MoneyInput from "./controls/MoneyInput";
import RateInput from "./controls/RateInput";
import TextInput from "./controls/TextInput";

const { Title, Text } = Typography;
const { Option } = Select;

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
                name: "Drawdown",
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

  const handleFinish = async () => {
    console.log(initialInputs);
  };

  return (
    <Layout style={{ backgroundColor: "white" }}>
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
                <Link
                  href="#Non-Employment-Defined-Contribution-Pension-Plans"
                  title="Defined Contribution Pension Plans"
                />
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
            {/* client information */}
            <Card id="client-information" title="Client Information" style={{ margin: "16px" }}>
              Marry
            </Card>
            {/* People  */}
            <Card title="People" id="people" style={{ margin: "16px" }}>
              {/* Owners */}
              <div id="owners" />
              <Divider orientation="left">
                Owners
                <Button
                  type="link"
                  onClick={() => {
                    const clone = { ...initialInputs };
                    clone.household_owners.push({
                      id: uuid(),
                      name: "",
                      birth_year: 1993,
                      retirement_age: 65,
                    });
                    clone.assets.savings_and_investments.individual_savings_account.push({
                      original_balance: 0,
                      annual_contribution: 0,
                    });
                    clone.assets.savings_and_investments.general_investment_account.push({
                      original_balance: 0,
                      annual_contribution: 0,
                    });
                    clone.assets.non_employment_defined_contribution_pension_plans.push({
                      original_balance: 0,
                      annual_contribution: 0,
                    });
                    clone.household_income.employment_income.push({
                      gross_anual_amount: 0,
                    });
                    clone.household_income.self_employment_income.push({
                      gross_anual_amount: 0,
                    });
                    clone.household_income.rental_income.details.push({
                      share_of_rental_income: 0.5,
                      start_year: 2061,
                    });
                    clone.household_income.dividend_income.push({
                      anual_amount: 0,
                      start_year: 2021,
                      end_year: 2050,
                    });
                    clone.household_income.savings_and_investments_drawdowns.individual_savings_accounts.push(
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
                      }
                    );
                    clone.household_income.savings_and_investments_drawdowns.general_investment_accounts.push(
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
                      }
                    );
                    clone.household_income.pension_income.defined_benifit_pension_plans.push({
                      option_taken: "Lump Sum",
                      estimated_lump_sum: 0,
                      estimated_annual_pension: 0,
                      annual_increase: 0,
                    });
                    clone.household_income.pension_income.defined_contribution_pension_plans.push({
                      option_taken: "Drawdown",
                      drawdown_option_annual_amount: 0,
                    });
                    setInitialInputs(clone);
                  }}
                >
                  <PlusCircleOutlined />
                </Button>
              </Divider>
              {initialInputs.household_owners.map((o, i) => {
                return (
                  <Row>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Owner Name">
                        <TextInput
                          placeholder="Name"
                          onBlur={(e) => {
                            const clone = { ...initialInputs };
                            clone.household_owners[i].name = e;
                            setInitialInputs(clone);
                          }}
                          value={initialInputs.household_owners[i].name}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Birth Year">
                        <DateInput />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Retirement Age">
                        <InputNumber
                          className="custom-input-fields"
                          placeholder="65"
                          name="retirement_age"
                          onBlur={(e) => {}}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                );
              })}

              {/* Children */}
              <div id="children" />
              <Divider orientation="left">
                Children
                <Button
                  type="link"
                  onClick={() => {
                    const clone = { ...initialInputs };
                    clone.children.push({
                      id: uuid(),
                      name: "",
                      birth_year: 2024,
                    });
                    setInitialInputs(clone);
                  }}
                >
                  <PlusCircleOutlined />
                </Button>
              </Divider>
              {initialInputs.children.map((c, i) => {
                return (
                  <Row>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Child Name">
                        <TextInput
                          placeholder="Name"
                          onBlur={(e) => {}}
                          value={initialInputs.children[i].name}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Birth Year">
                        <DateInput />
                      </Form.Item>
                    </Col>
                  </Row>
                );
              })}
            </Card>

            {/* Assets */}
            <Card title="Assets" id="assets" style={{ margin: "16px", borderColor: "#4fc3f7" }}>
              {/* Properties */}
              <div id="properties" />
              <Divider orientation="left">
                Properties
                <Button
                  type="link"
                  onClick={() => {
                    const clone = { ...initialInputs };
                    clone.assets.properties.push({
                      id: uuid(),
                      name: "",
                      original_price: 0,
                      start_year: 2025,
                      sell_in_future: true,
                      end_year: 2050,
                      type_of_property: "Main Home",
                      on_mortgage: false,
                      mortgage_rate: 0,
                    });
                    setInitialInputs(clone);
                  }}
                >
                  <PlusCircleOutlined />
                </Button>
              </Divider>

              {initialInputs.assets.properties.map((p, i) => {
                return (
                  <Row>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Property Name">
                        <TextInput
                          placeholder="Name"
                          onBlur={(e) => {}}
                          value={initialInputs.assets.properties[i].name}
                        />
                      </Form.Item>
                    </Col>

                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Original Price">
                        <MoneyInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.assets.properties[0].original_price = e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.assets.properties[0].original_price = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={initialInputs.assets.properties[0].original_price.toString()}
                        />
                      </Form.Item>
                    </Col>

                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Today's Value">
                        <Text strong>£123412</Text>
                      </Form.Item>
                    </Col>

                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Start Year">
                        <DateInput />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Sell in future?">
                        <Select defaultValue="no" className="custom-input-fields">
                          <Option value="yes">Yes</Option>
                          <Option value="no">No</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item label="Sell/ End Year">
                        <DateInput />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Type of Property">
                        <Select defaultValue="no" className="custom-input-fields">
                          <Option value="yes">Yes</Option>
                          <Option value="no">No</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="On Mortgage?">
                        <Select defaultValue="no" className="custom-input-fields">
                          <Option value="yes">Yes</Option>
                          <Option value="no">No</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                );
              })}
              {/* Bank Accounts */}
              <div id="bank-account" />
              <Divider orientation="left">Bank Accounts</Divider>
              <Row>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <Text>Aggregated Bank Accounts</Text>
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Original Balance">
                    <MoneyInput onBlur={(e) => {}} value="12" />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Min. Balance Acceptable">
                    <MoneyInput onBlur={(e) => {}} value="12" />
                  </Form.Item>
                </Col>
              </Row>
              {/* Savings and Investments  */}
              <div id="savings-and-investments" />
              <Divider orientation="left">Savings and Investments</Divider>
              <Title level={5}>Individual Saving Account </Title>
              {initialInputs.assets.savings_and_investments.individual_savings_account.map((o, i) => {
                return (
                  <Row>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label=" ">
                        <Text strong>{initialInputs.household_owners[i].name}</Text>
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Original Balance">
                        <MoneyInput onBlur={(e) => {}} value="12" />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Annual Contributions">
                        <MoneyInput onBlur={(e) => {}} value="12" />
                      </Form.Item>
                    </Col>
                  </Row>
                );
              })}

              <Title level={5}>General Investment Account </Title>
              {initialInputs.assets.savings_and_investments.general_investment_account.map((o, i) => {
                return (
                  <Row>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label=" ">
                        <Text strong>{initialInputs.household_owners[i].name}</Text>
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Original Balance">
                        <MoneyInput onBlur={(e) => {}} value="12" />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Annual Contributions">
                        <MoneyInput onBlur={(e) => {}} value="12" />
                      </Form.Item>
                    </Col>
                  </Row>
                );
              })}

              {/* Non-Employment Defined Contribution Pension Plans */}
              <div id="Non-Employment-Defined-Contribution-Pension-Plans" />
              <Divider orientation="left">Non-Employment Defined Contribution Pension Plans</Divider>
              {initialInputs.assets.non_employment_defined_contribution_pension_plans.map((s, i) => {
                return (
                  <Row>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label=" ">
                        <Text strong>{initialInputs.household_owners[i].name}</Text>
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Original Balance">
                        <MoneyInput onBlur={(e) => {}} value="12" />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Annual Contributions">
                        <MoneyInput onBlur={(e) => {}} value="12" />
                      </Form.Item>
                    </Col>
                  </Row>
                );
              })}
            </Card>

            {/* Liabilities */}
            <Card title="Liabilities" id="liabilities" style={{ margin: "16px", borderColor: "#9575cd" }}>
              {/* Mortgages */}
              <div id="mortgages" />
              <Divider orientation="left">Mortgages</Divider>

              <Row>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <Text>property name</Text>
                  </Form.Item>
                </Col>
                <Col lg={3} md={3} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Mortgage Rate">
                    <RateInput />
                  </Form.Item>
                </Col>
                <Col lg={3} md={3} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Interest Rate">
                    <RateInput />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Mortgage Period (yrs)">
                    <InputNumber className="custom-input-fields" placeholder="30" />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="# of Annual Payments">
                    <Select defaultValue="12" className="custom-input-fields">
                      <Option value="1">1</Option>
                      <Option value="2">2</Option>
                      <Option value="4">4</Option>
                      <Option value="6">6</Option>
                      <Option value="12">12</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Annual Payments">
                    <Text strong>$ 123123</Text>
                  </Form.Item>
                </Col>
              </Row>

              {/* Other Loans */}
              <div id="other-loans" />
              <Divider orientation="left">
                Other Loans
                <Button
                  type="link"
                  onClick={() => {
                    const clone = { ...initialInputs };
                    clone.liabilities.other_loans.push({
                      id: uuid(),
                      name: "",
                      original_balance: 0,
                      interest_rate: 0,
                      start_year: 2019,
                      loan_period: 10,
                      number_of_payments_per_year: 12,
                    });
                    setInitialInputs(clone);
                  }}
                >
                  <PlusCircleOutlined />
                </Button>
              </Divider>

              {initialInputs.liabilities.other_loans.map((o, i) => {
                return (
                  <Row>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Loan Name">
                        <TextInput
                          placeholder="Name"
                          onBlur={(e) => {}}
                          value={initialInputs.liabilities.other_loans[i].name}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={3} md={3} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Original Balance">
                        <MoneyInput onBlur={(e) => {}} value="12" />
                      </Form.Item>
                    </Col>
                    <Col lg={3} md={3} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Interest Rate">
                        <RateInput />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Start Year">
                        <DateInput />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Loan Period (yrs)">
                        <InputNumber className="custom-input-fields" />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="# of Payments/yr">
                        <Select defaultValue="12" className="custom-input-fields">
                          <Option value="1">1</Option>
                          <Option value="2">2</Option>
                          <Option value="4">4</Option>
                          <Option value="6">6</Option>
                          <Option value="12">12</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                );
              })}
              {/* Credit Card */}
              <div id="credit-card" />
              <Divider orientation="left">Credit Card</Divider>
              <Row>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Card Name">
                    <TextInput placeholder="Name" onBlur={(e) => {}} />
                  </Form.Item>
                </Col>
                <Col lg={3} md={3} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Original Balance">
                    <MoneyInput onBlur={(e) => {}} value="12" />
                  </Form.Item>
                </Col>
                <Col lg={3} md={3} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Interest Rate">
                    <RateInput />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Income */}

            <Card title="Income" id="income" style={{ margin: "16px", borderColor: "#81c784" }}>
              {/* Employment Income */}
              <div id="employment-income" />
              <Divider orientation="left">Employment Income</Divider>

              {initialInputs.household_income.employment_income.map((o, i) => {
                return (
                  <Row>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label=" ">
                        <Text strong>{initialInputs.household_owners[i].name}</Text>
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Gross annual amount:">
                        <MoneyInput onBlur={(e) => {}} value="12" />
                      </Form.Item>
                    </Col>
                  </Row>
                );
              })}

              {/* Self-Employment Income */}
              <div id="self-employment-income" />
              <Divider orientation="left">Self-Employment Income</Divider>
              {initialInputs.household_income.self_employment_income.map((s, i) => {
                return (
                  <Row>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label=" ">
                        <Text strong>{initialInputs.household_owners[i].name} </Text>
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Gross annual amount:">
                        <MoneyInput onBlur={(e) => {}} value="12" />
                      </Form.Item>
                    </Col>
                  </Row>
                );
              })}

              {/* Rental Income */}
              <div id="rental-income" />
              <Divider orientation="left">Rental Income</Divider>
              <Row>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <Text>Joint annual rental income</Text>
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <MoneyInput onBlur={(e) => {}} value="12" />
                  </Form.Item>
                </Col>
              </Row>

              {initialInputs.household_income.rental_income.details.map((s, i) => {
                return (
                  <Row>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label=" ">
                        <Text strong>{initialInputs.household_owners[i].name}</Text>
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Share of income:">
                        <RateInput />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Start year:">
                        <DateInput />
                      </Form.Item>
                    </Col>
                  </Row>
                );
              })}

              {/* Dividend Income */}

              <div id="dividend-income" />
              <Divider orientation="left">Dividend Income</Divider>

              {initialInputs.household_income.dividend_income.map((s, i) => {
                return (
                  <Row>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label=" ">
                        <Text strong>{initialInputs.household_owners[i].name}</Text>
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Annual amount:">
                        <MoneyInput onBlur={(e) => {}} value="12" />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Start year:">
                        <DateInput />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="End year:">
                        <DateInput />
                      </Form.Item>
                    </Col>
                  </Row>
                );
              })}

              {/* Drawdowns */}
              <div id="drawdowns" />
              <Divider orientation="left">Individual Savings Account - Drawdowns</Divider>

              {initialInputs.household_income.savings_and_investments_drawdowns.individual_savings_accounts.map(
                (s, i) => {
                  return (
                    <div>
                      <Row>
                        <Col lg={24} md={24} sm={24} xs={24} className="custom-input-fields">
                          <Form.Item label=" ">
                            <Text>
                              Individual Savings Account (ISA) -{" "}
                              <Text strong>{initialInputs.household_owners[i].name}</Text>
                              <Button
                                type="link"
                                onClick={() => {
                                  const clone = { ...initialInputs };
                                  clone.household_income.savings_and_investments_drawdowns.individual_savings_accounts[
                                    i
                                  ].drawdowns.push({
                                    id: uuid(),
                                    name: "Drawdown",
                                    amount_to_drawn_down: 0,
                                    start_year: 2021,
                                    end_year: 2033,
                                  });
                                  setInitialInputs(clone);
                                }}
                              >
                                <PlusCircleOutlined />
                              </Button>
                            </Text>
                          </Form.Item>
                        </Col>
                      </Row>

                      {initialInputs.household_income.savings_and_investments_drawdowns.individual_savings_accounts[
                        i
                      ].drawdowns.map((d, index) => {
                        return (
                          <Row>
                            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                              <Form.Item label=" ">
                                <Text>
                                  {`${
                                    initialInputs.household_income.savings_and_investments_drawdowns
                                      .individual_savings_accounts[i].drawdowns[index].name
                                  } ${index + 1}`}
                                </Text>
                              </Form.Item>
                            </Col>
                            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                              <Form.Item label="Drawdown:">
                                <MoneyInput onBlur={(e) => {}} value="12" />
                              </Form.Item>
                            </Col>
                            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                              <Form.Item label="Start year:">
                                <DateInput />
                              </Form.Item>
                            </Col>
                            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                              <Form.Item label="End year:">
                                <DateInput />
                              </Form.Item>
                            </Col>
                          </Row>
                        );
                      })}
                    </div>
                  );
                }
              )}

              {/* General Investment Account */}
              <div id="drawdowns" />
              <Divider orientation="left">General Investment Account - Drawdowns </Divider>

              {initialInputs.household_income.savings_and_investments_drawdowns.individual_savings_accounts.map(
                (s, i) => {
                  return (
                    <div>
                      <Row>
                        <Col lg={24} md={24} sm={24} xs={24} className="custom-input-fields">
                          <Form.Item label=" ">
                            <Text>
                              General Investment Account (GIA) -{" "}
                              <Text strong>{initialInputs.household_owners[i].name}</Text>
                              <Button
                                type="link"
                                onClick={() => {
                                  const clone = { ...initialInputs };
                                  clone.household_income.savings_and_investments_drawdowns.general_investment_accounts[
                                    i
                                  ].drawdowns.push({
                                    id: uuid(),
                                    name: "Drawdown 1",
                                    amount_to_drawn_down: 0,
                                    start_year: 2055,
                                    end_year: 2095,
                                  });
                                  setInitialInputs(clone);
                                }}
                              >
                                <PlusCircleOutlined />
                              </Button>
                            </Text>
                          </Form.Item>
                        </Col>
                      </Row>

                      {initialInputs.household_income.savings_and_investments_drawdowns.general_investment_accounts[
                        i
                      ].drawdowns.map((d, i) => {
                        return (
                          <Row>
                            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                              <Form.Item label=" ">
                                <Text>Draw Name</Text>
                              </Form.Item>
                            </Col>
                            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                              <Form.Item label="Drawdown:">
                                <MoneyInput onBlur={(e) => {}} value="12" />
                              </Form.Item>
                            </Col>
                            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                              <Form.Item label="Start year:">
                                <DateInput />
                              </Form.Item>
                            </Col>
                            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                              <Form.Item label="End year:">
                                <DateInput />
                              </Form.Item>
                            </Col>
                          </Row>
                        );
                      })}
                    </div>
                  );
                }
              )}

              <div id="pension-plans" />
              {/* Pension Plans */}
              <Divider orientation="left">Pension Plans</Divider>
              <Row>
                <Col lg={24} md={24} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <Text>Defined Benefit Pension Plan</Text>
                  </Form.Item>
                </Col>
              </Row>

              {initialInputs.household_income.pension_income.defined_benifit_pension_plans.map((s, i) => {
                return (
                  <Row>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label=" ">
                        <Text
                          strong
                          editable={{
                            onChange: (e) => {},
                          }}
                        >
                          {initialInputs.household_owners[i].name}
                        </Text>
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Option taken:">
                        <Select defaultValue="Lump Sum" className="custom-input-fields" onChange={(e) => {}}>
                          <Option value="Lump Sum">Lump Sum</Option>
                          <Option value="Annual">Annual</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Estimated lump sum:">
                        <MoneyInput onBlur={(e) => {}} value="12" />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Est. annual pension:">
                        <MoneyInput onBlur={(e) => {}} value="12" />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Annual increase">
                        <RateInput />
                      </Form.Item>
                    </Col>
                  </Row>
                );
              })}

              <Row>
                <Col lg={24} md={24} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <Text>Defined Contribution Pension Plan</Text>
                  </Form.Item>
                </Col>
              </Row>

              {initialInputs.household_income.pension_income.defined_contribution_pension_plans.map(
                (s, i) => {
                  return (
                    <Row>
                      <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                        <Form.Item label=" ">
                          <Text
                            strong
                            editable={{
                              onChange: (e) => {},
                            }}
                          >
                            {initialInputs.household_owners[i].name}
                          </Text>
                        </Form.Item>
                      </Col>
                      <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                        <Form.Item label="Option taken:">
                          <Select
                            defaultValue="Lump Sum"
                            className="custom-input-fields"
                            onChange={(e) => {}}
                          >
                            <Option value="Lump Sum">Lump Sum</Option>
                            <Option value="Annual">Annual</Option>
                            <Option value="Drawdown">Drawdown</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                        <Form.Item label="Annual Amount:">
                          <MoneyInput onBlur={(e) => {}} value="12" />
                        </Form.Item>
                      </Col>
                    </Row>
                  );
                }
              )}
              {/* Other Income */}
              <div id="other-income" />
              <Divider orientation="left">Other Income</Divider>
              <Row>
                <Col lg={24} md={24} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <Text>Other Taxable Income</Text>
                    <br />
                    <Text>Other Non-Taxable Income</Text>
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Expenses */}

            <Card title="Expenses" id="expenses" style={{ margin: "16px", borderColor: "#e57373" }}>
              {/* Housing */}
              <div id="housing" />
              <Divider orientation="left">
                Housing
                <Button type="link" onClick={() => {}}>
                  <PlusCircleOutlined />
                </Button>
              </Divider>
              <Row>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Expense:">
                    <TextInput placeholder="Name" onBlur={(e) => {}} />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Annual expense:">
                    <MoneyInput onBlur={(e) => {}} value="12" />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="% After retirement: ">
                    <RateInput />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Start Year:">
                    <DateInput />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="End Year">
                    <DateInput />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <Text>Total:</Text>
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <InputNumber
                      // value={housingTotal}
                      formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      disabled
                      className="custom-input-fields"
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* Consumables */}
              <div id="consumables" />
              <Divider orientation="left">
                Consumables
                <Button type="link" onClick={() => {}}>
                  <PlusCircleOutlined />
                </Button>
              </Divider>

              <Row>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Expense:">
                    <TextInput placeholder="Name" onBlur={(e) => {}} />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Annual expense:">
                    <MoneyInput onBlur={(e) => {}} value="12" />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="% After retirement">
                    <RateInput />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <Text>Total:</Text>
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <InputNumber
                      // value={consumablesTotal}
                      formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      disabled
                      className="custom-input-fields"
                    />
                  </Form.Item>
                </Col>
              </Row>
              {/* Travel */}
              <div id="travel" />
              <Divider orientation="left">
                Travel
                <Button type="link" onClick={() => {}}>
                  <PlusCircleOutlined />
                </Button>
              </Divider>

              <Row>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Expense:">
                    <TextInput placeholder="Name" onBlur={(e) => {}} />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Annual expense:">
                    <MoneyInput onBlur={(e) => {}} value="12" />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="% After retirement">
                    <RateInput />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <Text>Total:</Text>
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <InputNumber
                      // value={travelTotal}
                      formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      disabled
                      className="custom-input-fields"
                    />
                  </Form.Item>
                </Col>
              </Row>
              {/* Shopping */}
              <div id="shopping" />
              <Divider orientation="left">
                Shopping
                <Button type="link" onClick={() => {}}>
                  <PlusCircleOutlined />
                </Button>
              </Divider>

              <Row>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Expense:">
                    <TextInput placeholder="Name" onBlur={(e) => {}} />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Annual expense:">
                    <MoneyInput onBlur={(e) => {}} value="12" />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="% After retirement">
                    <RateInput />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <Text>Total:</Text>
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <InputNumber
                      // value={shoppingTotal}
                      formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      disabled
                      className="custom-input-fields"
                    />
                  </Form.Item>
                </Col>
              </Row>
              {/* Entertainment */}
              <div id="entertainment" />
              <Divider orientation="left">
                Entertainment
                <Button type="link" onClick={() => {}}>
                  <PlusCircleOutlined />
                </Button>
              </Divider>

              <Row>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Expense:">
                    <TextInput placeholder="Name" onBlur={(e) => {}} />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Annual expense:">
                    <MoneyInput onBlur={(e) => {}} value="12" />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="% After retirement">
                    <RateInput />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <Text>Total:</Text>
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <InputNumber
                      // value={entertainmentTotal}
                      formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      disabled
                      className="custom-input-fields"
                    />
                  </Form.Item>
                </Col>
              </Row>
              {/* Holiday */}
              <div id="holiday" />
              <Divider orientation="left">
                Holiday
                <Button type="link" onClick={() => {}}>
                  <PlusCircleOutlined />
                </Button>
              </Divider>

              <Row key={"holiday"}>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Expense:">
                    <TextInput placeholder="Name" onBlur={(e) => {}} />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Annual expense:">
                    <MoneyInput onBlur={(e) => {}} value="12" />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="% After retirement">
                    <RateInput />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <Text>Total:</Text>
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <InputNumber
                      // value={holidayTotal}
                      formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      disabled
                      className="custom-input-fields"
                    />
                  </Form.Item>
                </Col>
              </Row>
              {/* Insurance Policies */}
              <div id="insurance-policies" />
              <Divider orientation="left">Insurance Policies</Divider>
              <Row>
                <Col lg={6} md={6} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <Text>
                      Life Insurance <Text strong>Owner Name</Text>
                    </Text>
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Annual Expense:">
                    <MoneyInput onBlur={(e) => {}} value="12" />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Inflation:">
                    <RateInput />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="% After retirement:">
                    <RateInput />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col lg={6} md={6} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <Text>
                      Life Insurance <Text strong></Text>
                    </Text>
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Annual Expense:">
                    <MoneyInput onBlur={(e) => {}} value="12" />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Inflation:">
                    <RateInput />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="% After retirement:">
                    <RateInput />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col lg={6} md={6} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <Text>
                      Critical Illness Cover <Text strong>Owner Name</Text>
                    </Text>
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Annual Expense:">
                    <MoneyInput onBlur={(e) => {}} value="12" />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Inflation:">
                    <RateInput />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="% After retirement:">
                    <RateInput />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col lg={6} md={6} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <Text>
                      Critical Illness Cover <Text strong>Owen Name</Text>
                    </Text>
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Annual Expense:">
                    <MoneyInput onBlur={(e) => {}} value="12" />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Inflation:">
                    <RateInput />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="% After retirement:">
                    <RateInput />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col lg={6} md={6} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <Text>
                      Family Income Benifit <Text strong>Owner Name</Text>
                    </Text>
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Annual Expense:">
                    <MoneyInput onBlur={(e) => {}} value="12" />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Inflation:">
                    <RateInput />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="% After retirement:">
                    <RateInput />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <Text>
                      Family Income Benifit <Text strong>Owner Name</Text>
                    </Text>
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Annual Expense:">
                    <MoneyInput onBlur={(e) => {}} value="12" />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Inflation:">
                    <RateInput />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="% After retirement:">
                    <RateInput />
                  </Form.Item>
                </Col>
              </Row>

              {/* One-Off Expenses */}
              <div id="one-off-expenses" />
              <Divider orientation="left">
                One-Off Expenses
                <Button type="link" onClick={() => {}}>
                  <PlusCircleOutlined />
                </Button>
              </Divider>

              <Row key={"oneOffExpenses"}>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Expense:">
                    <TextInput placeholder="Name" onBlur={(e) => {}} />
                  </Form.Item>
                </Col>
                <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Annual expense">
                    <MoneyInput onBlur={(e) => {}} value="12" />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Inflation:">
                    <RateInput />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Start year:">
                    <DateInput />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="End year:">
                    <DateInput />
                  </Form.Item>
                </Col>
              </Row>

              {/* Children Education Expenses */}
              <div id="children-education-expenses" />
              <Divider orientation="left">Children Education Expenses</Divider>

              <Row>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <Text>Primary School Fee</Text>
                  </Form.Item>
                </Col>
                <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Annual Fees">
                    <MoneyInput onBlur={(e) => {}} value="12" />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <Text>Seconday School Fee</Text>
                  </Form.Item>
                </Col>
                <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Annual Fees">
                    <MoneyInput onBlur={(e) => {}} value="12" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <Text>University Fee</Text>
                  </Form.Item>
                </Col>
                <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Annual Fees">
                    <MoneyInput onBlur={(e) => {}} value="12" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Row end */}
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
