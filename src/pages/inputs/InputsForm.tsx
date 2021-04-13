import React, { cloneElement, Fragment, useEffect, useState } from "react";
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
import axios from "axios";
import { inputsRoute } from "../../routes/apiRoutes";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { AlertAction } from "../../redux/general/alert";
import { GetInputsAction } from "../../redux/inputs/inputs";
import { useHistory } from "react-router";

const { Title, Text } = Typography;
const { Option } = Select;

const { Link } = Anchor;

const InputsForm = () => {
  const activeClient = useSelector((state: RootStateOrAny) => state.activeClientReducer);

  const [targetOffset, setTargetOffset] = useState<number | undefined>(undefined);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setTargetOffset(window.innerHeight / 3);
  }, []);

  const [loading, setLoading] = useState(false);

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
                name: "Drawdown",
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
            annual_expense: 0,
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
            annual_expense: 0,
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
            annual_expense: 0,
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
            annual_expense: 0,
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
            annual_expense: 0,
            rate_after_retirement: 1,
          },
        ],
        total: 0,
      },
      insurance_policies: {
        life_insurance: [
          {
            name: "Life Insurance - ",
            annual_expense: 0,
            inflation: 0,
            rate_after_retirement: 0,
          },
        ],
        critical_illness_cover: [
          {
            name: "Critical Illness Cover - ",
            annual_expense: 0,
            inflation: 0,
            rate_after_retirement: 0,
          },
        ],
        family_income_benefit: [
          {
            name: "Family Income Benifit - ",
            annual_expense: 0,
            inflation: 0,
            rate_after_retirement: 0,
          },
        ],
      },

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
    setLoading(true);
    const config = {};
    const res = await axios.post(inputsRoute + activeClient._id, initialInputs, {});
    if (res.status === 200) {
      await dispatch(AlertAction("Plan successfully created", "success"));
      await dispatch(GetInputsAction(activeClient._id));
      history.push("/dashboard/clientDashboard");
    }
  };

  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Form layout="vertical" size="middle" onFinish={handleFinish}>
        <Row>
          <Col xl={4} lg={0} md={0} sm={0} xs={0}>
            <Anchor style={{ margin: "16px", background: "transparent" }} targetOffset={targetOffset}>
              <Link href="#client-information" title="Client Information" />
              <Link href="#input-set-details" title="Plan Details" />
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
                <Link href="#individual-savings-account" title="Individual Savings Account" />
                <Link href="#general-investment-account" title="General Investment Account" />
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
            {/* Plan information */}
            <Card id="input-set-details" title="Plan Information" style={{ margin: "16px" }}>
              <Row>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Plan Name">
                    <TextInput
                      placeholder="Plan Name"
                      onBlur={(e) => {
                        if (e) {
                          const clone = { ...initialInputs };
                          clone.input_set_name = e;
                          setInitialInputs(clone);
                        } else {
                          const clone = { ...initialInputs };
                          clone.input_set_name = "";
                          setInitialInputs(clone);
                        }
                      }}
                      value={initialInputs.input_set_name}
                    />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Current Year">
                    <DateInput
                      onBlur={(date, dateString) => {
                        if (dateString) {
                          const clone = { ...initialInputs };
                          clone.current_year = +dateString;
                          setInitialInputs(clone);
                        } else {
                          const clone = { ...initialInputs };
                          clone.current_year = 2024;
                          setInitialInputs(clone);
                        }
                      }}
                      value={initialInputs.current_year.toString()}
                    />
                  </Form.Item>
                </Col>
              </Row>
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
                    clone.household_expenses.insurance_policies.life_insurance.push({
                      name: "Life Insurance - ",
                      annual_expense: 0,
                      inflation: 0,
                      rate_after_retirement: 0,
                    });
                    clone.household_expenses.insurance_policies.critical_illness_cover.push({
                      name: "Critical Illness Cover - ",
                      annual_expense: 0,
                      inflation: 0,
                      rate_after_retirement: 0,
                    });
                    clone.household_expenses.insurance_policies.family_income_benefit.push({
                      name: "Family Income Benifit - ",
                      annual_expense: 0,
                      inflation: 0,
                      rate_after_retirement: 0,
                    });

                    setInitialInputs(clone);
                  }}
                >
                  <PlusCircleOutlined />
                </Button>
              </Divider>
              {initialInputs.household_owners.map((o, i) => {
                return (
                  <Row key={"owner" + i}>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Owner Name">
                        <TextInput
                          placeholder="Name"
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_owners[i].name = e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_owners[i].name = "";
                              setInitialInputs(clone);
                            }
                          }}
                          value={initialInputs.household_owners[i].name}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Birth Year">
                        <DateInput
                          onBlur={(date, dateString) => {
                            if (dateString) {
                              const clone = { ...initialInputs };
                              clone.household_owners[i].birth_year = +dateString;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_owners[i].birth_year = 1989;
                              setInitialInputs(clone);
                            }
                          }}
                          value={initialInputs.household_owners[i].birth_year.toString()}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Retirement Age">
                        <InputNumber
                          className="custom-input-fields"
                          name="retirement_age"
                          value={initialInputs.household_owners[i].retirement_age.toString()}
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_owners[i].retirement_age = +e.target.value;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_owners[i].retirement_age = 65;
                              setInitialInputs(clone);
                            }
                          }}
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
                  <Row key={"children" + i}>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Child Name">
                        <TextInput
                          placeholder="Name"
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.children[i].name = e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.children[i].name = "";
                              setInitialInputs(clone);
                            }
                          }}
                          value={initialInputs.children[i].name}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Birth Year">
                        <DateInput
                          onBlur={(date, dateString) => {
                            if (dateString) {
                              const clone = { ...initialInputs };
                              clone.children[i].birth_year = +dateString;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.children[i].birth_year = 2024;
                              setInitialInputs(clone);
                            }
                          }}
                          value={initialInputs.children[i].birth_year.toString()}
                        />
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
                    clone.liabilities.mortgages.push({
                      interest_rate: 0,
                      mortgage_period: 0,
                      number_of_payments_per_year: 12,
                    });
                    setInitialInputs(clone);
                  }}
                >
                  <PlusCircleOutlined />
                </Button>
              </Divider>

              {initialInputs.assets.properties.map((p, i) => {
                return (
                  <Row key={"properties" + i}>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Property Name">
                        <TextInput
                          placeholder="Name"
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.assets.properties[i].name = e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.assets.properties[i].name = "";
                              setInitialInputs(clone);
                            }
                          }}
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
                              clone.assets.properties[i].original_price = +e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.assets.properties[i].original_price = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={initialInputs.assets.properties[i].original_price.toString()}
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
                        <DateInput
                          onBlur={(date, dateString) => {
                            if (dateString) {
                              const clone = { ...initialInputs };
                              clone.assets.properties[i].start_year = +dateString;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.assets.properties[i].start_year = 2025;
                              setInitialInputs(clone);
                            }
                          }}
                          value={initialInputs.assets.properties[i].start_year.toString()}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Sell in future?">
                        <Select
                          defaultValue="no"
                          className="custom-input-fields"
                          value={initialInputs.assets.properties[i].sell_in_future ? "yes" : "no"}
                          onChange={(e) => {
                            const clone = { ...initialInputs };
                            clone.assets.properties[i].sell_in_future = e === "no" ? false : true;
                            setInitialInputs(clone);
                          }}
                        >
                          <Option value="yes">Yes</Option>
                          <Option value="no">No</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item label="Sell/ End Year">
                        <DateInput
                          onBlur={(date, dateString) => {
                            const clone = { ...initialInputs };
                            clone.assets.properties[i].end_year = +dateString;
                            setInitialInputs(clone);
                          }}
                          value={initialInputs.assets.properties[i].end_year.toString()}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Type of Property">
                        <Select
                          defaultValue="Main Home"
                          className="custom-input-fields"
                          value={initialInputs.assets.properties[i].type_of_property}
                          onChange={(e) => {
                            const clone = { ...initialInputs };
                            clone.assets.properties[i].type_of_property = e;
                            setInitialInputs(clone);
                          }}
                        >
                          <Option value="Main Home">Main Home</Option>
                          <Option value="Other Residential">Other Residential</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="On Mortgage?">
                        <Select
                          defaultValue="no"
                          className="custom-input-fields"
                          value={initialInputs.assets.properties[i].on_mortgage ? "yes" : "no"}
                          onChange={(e) => {
                            const clone = { ...initialInputs };
                            clone.assets.properties[i].on_mortgage = e === "no" ? false : true;
                            setInitialInputs(clone);
                          }}
                        >
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
                    <MoneyInput
                      onBlur={(e) => {
                        if (e) {
                          const clone = { ...initialInputs };
                          clone.assets.bank_accounts.original_balance = +e;
                          setInitialInputs(clone);
                        } else {
                          const clone = { ...initialInputs };
                          clone.assets.bank_accounts.original_balance = 0;
                          setInitialInputs(clone);
                        }
                      }}
                      value={`${initialInputs.assets.bank_accounts.original_balance}`}
                    />
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Min. Balance Acceptable">
                    <MoneyInput
                      onBlur={(e) => {
                        if (e) {
                          const clone = { ...initialInputs };
                          clone.assets.bank_accounts.minimum_cash_balance_acceptable = +e;
                          setInitialInputs(clone);
                        } else {
                          const clone = { ...initialInputs };
                          clone.assets.bank_accounts.minimum_cash_balance_acceptable = 0;
                          setInitialInputs(clone);
                        }
                      }}
                      value={`${initialInputs.assets.bank_accounts.minimum_cash_balance_acceptable}`}
                    />
                  </Form.Item>
                </Col>
              </Row>
              {/* Savings and Investments  */}
              <div id="savings-and-investments" />
              <Divider orientation="left">Savings and Investments</Divider>
              <Title level={5}>Individual Saving Account </Title>
              {initialInputs.assets.savings_and_investments.individual_savings_account.map((o, i) => {
                return (
                  <Row key={"individual" + i}>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label=" ">
                        <Text strong>{initialInputs.household_owners[i].name}</Text>
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Original Balance">
                        <MoneyInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.assets.savings_and_investments.individual_savings_account[
                                i
                              ].original_balance = +e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.assets.savings_and_investments.individual_savings_account[
                                i
                              ].original_balance = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.assets.savings_and_investments.individual_savings_account[i].original_balance}`}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Annual Contributions">
                        <MoneyInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.assets.savings_and_investments.individual_savings_account[
                                i
                              ].annual_contribution = +e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.assets.savings_and_investments.individual_savings_account[
                                i
                              ].annual_contribution = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.assets.savings_and_investments.individual_savings_account[i].annual_contribution}`}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                );
              })}

              <Title level={5}>General Investment Account </Title>
              {initialInputs.assets.savings_and_investments.general_investment_account.map((o, i) => {
                return (
                  <Row key={"General" + i}>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label=" ">
                        <Text strong>{initialInputs.household_owners[i].name}</Text>
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Original Balance">
                        <MoneyInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.assets.savings_and_investments.general_investment_account[
                                i
                              ].original_balance = +e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.assets.savings_and_investments.general_investment_account[
                                i
                              ].original_balance = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.assets.savings_and_investments.general_investment_account[i].original_balance}`}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Annual Contributions">
                        <MoneyInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.assets.savings_and_investments.general_investment_account[
                                i
                              ].annual_contribution = +e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.assets.savings_and_investments.general_investment_account[
                                i
                              ].annual_contribution = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.assets.savings_and_investments.general_investment_account[i].annual_contribution}`}
                        />
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
                  <Row key={"nonEmployment" + i}>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label=" ">
                        <Text strong>{initialInputs.household_owners[i].name}</Text>
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Original Balance">
                        <MoneyInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.assets.non_employment_defined_contribution_pension_plans[
                                i
                              ].original_balance = +e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.assets.non_employment_defined_contribution_pension_plans[
                                i
                              ].original_balance = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.assets.non_employment_defined_contribution_pension_plans[i].original_balance}`}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Annual Contributions">
                        <MoneyInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.assets.non_employment_defined_contribution_pension_plans[
                                i
                              ].annual_contribution = +e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.assets.non_employment_defined_contribution_pension_plans[
                                i
                              ].annual_contribution = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.assets.non_employment_defined_contribution_pension_plans[i].annual_contribution}`}
                        />
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

              {initialInputs.liabilities.mortgages.map((p, i) => {
                if (initialInputs.assets.properties[i].on_mortgage) {
                  return (
                    <Row key={"mortgages" + i}>
                      <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                        <Form.Item label=" ">
                          <Text strong>{initialInputs.assets.properties[i].name}</Text>
                        </Form.Item>
                      </Col>
                      <Col lg={3} md={3} sm={24} xs={24} className="custom-input-fields">
                        <Form.Item label="Mortgage Rate">
                          <RateInput
                            onBlur={(e) => {
                              if (e) {
                                const clone = { ...initialInputs };
                                clone.assets.properties[i].mortgage_rate = e;
                                setInitialInputs(clone);
                              } else {
                                const clone = { ...initialInputs };
                                clone.assets.properties[i].mortgage_rate = 0;
                                setInitialInputs(clone);
                              }
                            }}
                            value={`${initialInputs.assets.properties[i].mortgage_rate}`}
                          />
                        </Form.Item>
                      </Col>
                      <Col lg={3} md={3} sm={24} xs={24} className="custom-input-fields">
                        <Form.Item label="Interest Rate">
                          <RateInput
                            onBlur={(e) => {
                              if (e) {
                                const clone = { ...initialInputs };
                                clone.liabilities.mortgages[i].interest_rate = e;
                                setInitialInputs(clone);
                              } else {
                                const clone = { ...initialInputs };
                                clone.liabilities.mortgages[i].interest_rate = 0;
                                setInitialInputs(clone);
                              }
                            }}
                            value={`${initialInputs.liabilities.mortgages[i].interest_rate}`}
                          />
                        </Form.Item>
                      </Col>
                      <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                        <Form.Item label="Mortgage Period (yrs)">
                          <InputNumber
                            className="custom-input-fields"
                            onBlur={(e) => {
                              const clone = { ...initialInputs };
                              clone.liabilities.mortgages[i].mortgage_period = +e.target.value;
                              setInitialInputs(clone);
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                        <Form.Item label="# of Annual Payments">
                          <Select
                            defaultValue="12"
                            className="custom-input-fields"
                            value={`${initialInputs.liabilities.mortgages[i].number_of_payments_per_year}`}
                            onChange={(e) => {
                              const clone = { ...initialInputs };
                              clone.liabilities.mortgages[i].number_of_payments_per_year = +e;
                              setInitialInputs(clone);
                            }}
                          >
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
                  );
                } else {
                  return "";
                }
              })}
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
                      loan_period: 0,
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
                  <Row key={"otherLoans" + i}>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Loan Name">
                        <TextInput
                          placeholder="Name"
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.liabilities.other_loans[i].name = e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.liabilities.other_loans[i].name = "";
                              setInitialInputs(clone);
                            }
                          }}
                          value={initialInputs.liabilities.other_loans[i].name}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={3} md={3} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Original Balance">
                        <MoneyInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.liabilities.other_loans[i].original_balance = +e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.liabilities.other_loans[i].original_balance = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.liabilities.other_loans[i].original_balance}`}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={3} md={3} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Interest Rate">
                        <RateInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.liabilities.other_loans[i].interest_rate = e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.liabilities.other_loans[i].interest_rate = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.liabilities.other_loans[i].interest_rate}`}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Start Year">
                        <DateInput
                          onBlur={(date, dateString) => {
                            const clone = { ...initialInputs };
                            clone.liabilities.other_loans[i].start_year = +dateString;
                            setInitialInputs(clone);
                          }}
                          value={initialInputs.liabilities.other_loans[i].start_year.toString()}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Loan Period (yrs)">
                        <InputNumber className="custom-input-fields" />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="# of Payments/yr">
                        <Select
                          defaultValue="12"
                          className="custom-input-fields"
                          value={`${initialInputs.liabilities.other_loans[i].number_of_payments_per_year}`}
                          onChange={(e) => {
                            const clone = { ...initialInputs };
                            clone.liabilities.other_loans[i].number_of_payments_per_year = +e;
                            setInitialInputs(clone);
                          }}
                        >
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
                  <Form.Item label=" ">
                    <Text strong>{initialInputs.liabilities.credit_card.name}</Text>
                  </Form.Item>
                </Col>
                <Col lg={3} md={3} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Original Balance">
                    <MoneyInput
                      onBlur={(e) => {
                        if (e) {
                          const clone = { ...initialInputs };
                          clone.liabilities.credit_card.original_balance = +e;
                          setInitialInputs(clone);
                        } else {
                          const clone = { ...initialInputs };
                          clone.liabilities.credit_card.original_balance = 0;
                          setInitialInputs(clone);
                        }
                      }}
                      value={`${initialInputs.liabilities.credit_card.original_balance}`}
                    />
                  </Form.Item>
                </Col>
                <Col lg={3} md={3} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label="Interest Rate">
                    <RateInput
                      onBlur={(e) => {
                        if (e) {
                          const clone = { ...initialInputs };
                          clone.liabilities.credit_card.interest_rate = e;
                          setInitialInputs(clone);
                        } else {
                          const clone = { ...initialInputs };
                          clone.liabilities.credit_card.interest_rate = 0;
                          setInitialInputs(clone);
                        }
                      }}
                      value={`${initialInputs.liabilities.credit_card.interest_rate}`}
                    />
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
                  <Row key={"employment" + i}>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label=" ">
                        <Text strong>{initialInputs.household_owners[i].name}</Text>
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Gross annual amount:">
                        <MoneyInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_income.employment_income[i].gross_anual_amount = +e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_income.employment_income[i].gross_anual_amount = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.household_income.employment_income[i].gross_anual_amount}`}
                        />
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
                  <Row key={"selfEmployment" + i}>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label=" ">
                        <Text strong>{initialInputs.household_owners[i].name} </Text>
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Gross annual amount:">
                        <MoneyInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_income.self_employment_income[i].gross_anual_amount = +e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_income.self_employment_income[i].gross_anual_amount = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.household_income.self_employment_income[i].gross_anual_amount}`}
                        />
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
                    <MoneyInput
                      onBlur={(e) => {
                        if (e) {
                          const clone = { ...initialInputs };
                          clone.household_income.rental_income.joint_annual_rental_income = +e;
                          setInitialInputs(clone);
                        } else {
                          const clone = { ...initialInputs };
                          clone.household_income.rental_income.joint_annual_rental_income = 0;
                          setInitialInputs(clone);
                        }
                      }}
                      value={`${initialInputs.household_income.rental_income.joint_annual_rental_income}`}
                    />
                  </Form.Item>
                </Col>
              </Row>

              {initialInputs.household_income.rental_income.details.map((s, i) => {
                return (
                  <Row key={"rental" + i}>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label=" ">
                        <Text strong>{initialInputs.household_owners[i].name}</Text>
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Share of income:">
                        <RateInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_income.rental_income.details[i].share_of_rental_income = e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_income.rental_income.details[i].share_of_rental_income = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.household_income.rental_income.details[i].share_of_rental_income}`}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Start year:">
                        <DateInput
                          onBlur={(date, dateString) => {
                            const clone = { ...initialInputs };
                            clone.household_income.rental_income.details[i].start_year = +dateString;
                            setInitialInputs(clone);
                          }}
                          value={initialInputs.household_income.rental_income.details[
                            i
                          ].start_year.toString()}
                        />
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
                  <Row key={"dividend" + i}>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label=" ">
                        <Text strong>{initialInputs.household_owners[i].name}</Text>
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Annual amount:">
                        <MoneyInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_income.dividend_income[i].anual_amount = +e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_income.dividend_income[i].anual_amount = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.household_income.dividend_income[i].anual_amount}`}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Start year:">
                        <DateInput
                          onBlur={(date, dateString) => {
                            const clone = { ...initialInputs };
                            clone.household_income.dividend_income[i].start_year = +dateString;
                            setInitialInputs(clone);
                          }}
                          value={initialInputs.household_income.dividend_income[i].start_year.toString()}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="End year:">
                        <DateInput
                          onBlur={(date, dateString) => {
                            const clone = { ...initialInputs };
                            clone.household_income.dividend_income[i].end_year = +dateString;
                            setInitialInputs(clone);
                          }}
                          value={initialInputs.household_income.dividend_income[i].end_year.toString()}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                );
              })}

              {/* Drawdowns */}
              <div id="individual-savings-account" />
              <Divider orientation="left">Individual Savings Account - Drawdowns</Divider>

              {initialInputs.household_income.savings_and_investments_drawdowns.individual_savings_accounts.map(
                (s, i) => {
                  return (
                    <div>
                      <Row key={"individualSavings" + i}>
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
                          <Row key={"IndividualDraw" + index}>
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
                                <MoneyInput
                                  onBlur={(e) => {
                                    if (e) {
                                      const clone = { ...initialInputs };
                                      clone.household_income.savings_and_investments_drawdowns.individual_savings_accounts[
                                        i
                                      ].drawdowns[index].amount_to_drawn_down = +e;
                                      setInitialInputs(clone);
                                    } else {
                                      const clone = { ...initialInputs };
                                      clone.household_income.savings_and_investments_drawdowns.individual_savings_accounts[
                                        i
                                      ].drawdowns[index].amount_to_drawn_down = 0;
                                      setInitialInputs(clone);
                                    }
                                  }}
                                  value={`${initialInputs.household_income.savings_and_investments_drawdowns.individual_savings_accounts[i].drawdowns[index].amount_to_drawn_down}`}
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                              <Form.Item label="Start year:">
                                <DateInput
                                  onBlur={(date, dateString) => {
                                    const clone = { ...initialInputs };
                                    clone.household_income.savings_and_investments_drawdowns.individual_savings_accounts[
                                      i
                                    ].drawdowns[index].start_year = +dateString;
                                    setInitialInputs(clone);
                                  }}
                                  value={initialInputs.household_income.savings_and_investments_drawdowns.individual_savings_accounts[
                                    i
                                  ].drawdowns[index].start_year.toString()}
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                              <Form.Item label="End year:">
                                <DateInput
                                  onBlur={(date, dateString) => {
                                    const clone = { ...initialInputs };
                                    clone.household_income.savings_and_investments_drawdowns.individual_savings_accounts[
                                      i
                                    ].drawdowns[index].end_year = +dateString;
                                    setInitialInputs(clone);
                                  }}
                                  value={initialInputs.household_income.savings_and_investments_drawdowns.individual_savings_accounts[
                                    i
                                  ].drawdowns[index].end_year.toString()}
                                />
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
              <div id="general-investment-account" />
              <Divider orientation="left">General Investment Account - Drawdowns </Divider>

              {initialInputs.household_income.savings_and_investments_drawdowns.individual_savings_accounts.map(
                (s, i) => {
                  return (
                    <div>
                      <Row key={"GeneralInvestment" + i}>
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
                                    name: "Drawdown",
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
                      ].drawdowns.map((d, index) => {
                        return (
                          <Row key={"generalDraw" + index}>
                            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                              <Form.Item label=" ">
                                <Text>{`${
                                  initialInputs.household_income.savings_and_investments_drawdowns
                                    .general_investment_accounts[i].drawdowns[index].name
                                } ${index + 1}`}</Text>
                              </Form.Item>
                            </Col>
                            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                              <Form.Item label="Drawdown:">
                                <MoneyInput
                                  onBlur={(e) => {
                                    if (e) {
                                      const clone = { ...initialInputs };
                                      clone.household_income.savings_and_investments_drawdowns.general_investment_accounts[
                                        i
                                      ].drawdowns[index].amount_to_drawn_down = +e;
                                      setInitialInputs(clone);
                                    } else {
                                      const clone = { ...initialInputs };
                                      clone.household_income.savings_and_investments_drawdowns.general_investment_accounts[
                                        i
                                      ].drawdowns[index].amount_to_drawn_down = 0;
                                      setInitialInputs(clone);
                                    }
                                  }}
                                  value={`${initialInputs.household_income.savings_and_investments_drawdowns.general_investment_accounts[i].drawdowns[index].amount_to_drawn_down}`}
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                              <Form.Item label="Start year:">
                                <DateInput
                                  onBlur={(date, dateString) => {
                                    const clone = { ...initialInputs };
                                    clone.household_income.savings_and_investments_drawdowns.general_investment_accounts[
                                      i
                                    ].drawdowns[index].start_year = +dateString;
                                    setInitialInputs(clone);
                                  }}
                                  value={initialInputs.household_income.savings_and_investments_drawdowns.general_investment_accounts[
                                    i
                                  ].drawdowns[index].start_year.toString()}
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                              <Form.Item label="End year:">
                                <DateInput
                                  onBlur={(date, dateString) => {
                                    const clone = { ...initialInputs };
                                    clone.household_income.savings_and_investments_drawdowns.general_investment_accounts[
                                      i
                                    ].drawdowns[index].end_year = +dateString;
                                    setInitialInputs(clone);
                                  }}
                                  value={initialInputs.household_income.savings_and_investments_drawdowns.general_investment_accounts[
                                    i
                                  ].drawdowns[index].end_year.toString()}
                                />
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
                  <Row key={"definedBenifit" + i}>
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
                        <MoneyInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_income.pension_income.defined_benifit_pension_plans[
                                i
                              ].estimated_lump_sum = +e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_income.pension_income.defined_benifit_pension_plans[
                                i
                              ].estimated_lump_sum = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.household_income.pension_income.defined_benifit_pension_plans[i].estimated_lump_sum}`}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Est. annual pension:">
                        <MoneyInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_income.pension_income.defined_benifit_pension_plans[
                                i
                              ].estimated_annual_pension = +e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_income.pension_income.defined_benifit_pension_plans[
                                i
                              ].estimated_annual_pension = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.household_income.pension_income.defined_benifit_pension_plans[i].estimated_annual_pension}`}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Annual increase">
                        <RateInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_income.pension_income.defined_benifit_pension_plans[
                                i
                              ].annual_increase = e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_income.pension_income.defined_benifit_pension_plans[
                                i
                              ].annual_increase = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.household_income.pension_income.defined_benifit_pension_plans[i].annual_increase}`}
                        />
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
                    <Row key={"definedContribution" + i}>
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
                          <MoneyInput
                            onBlur={(e) => {
                              if (e) {
                                const clone = { ...initialInputs };
                                clone.household_income.pension_income.defined_contribution_pension_plans[
                                  i
                                ].drawdown_option_annual_amount = +e;
                                setInitialInputs(clone);
                              } else {
                                const clone = { ...initialInputs };
                                clone.household_income.pension_income.defined_contribution_pension_plans[
                                  i
                                ].drawdown_option_annual_amount = 0;
                                setInitialInputs(clone);
                              }
                            }}
                            value={`${initialInputs.household_income.pension_income.defined_contribution_pension_plans[i].drawdown_option_annual_amount}`}
                          />
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
                <Button
                  type="link"
                  onClick={() => {
                    const clone = { ...initialInputs };
                    clone.household_expenses.housing.details.push({
                      id: uuid(),
                      name: "Rent",
                      annual_expense: 0,
                      start_year: 0,
                      end_year: 0,
                      rate_after_retirement: 1,
                      type: "property",
                    });
                    setInitialInputs(clone);
                  }}
                >
                  <PlusCircleOutlined />
                </Button>
              </Divider>

              {initialInputs.household_expenses.housing.details.map((e, i) => {
                return (
                  <Row key={"housing" + i}>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Expense:">
                        <TextInput
                          placeholder="Name"
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_expenses.housing.details[i].name = e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_expenses.housing.details[i].name = "";
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.household_expenses.housing.details[i].name}`}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Annual expense:">
                        <MoneyInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_expenses.housing.details[i].annual_expense = +e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_expenses.housing.details[i].annual_expense = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.household_expenses.housing.details[i].annual_expense}`}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="% After retirement: ">
                        <RateInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_expenses.housing.details[i].rate_after_retirement = e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_expenses.housing.details[i].rate_after_retirement = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.household_expenses.housing.details[i].rate_after_retirement}`}
                        />
                      </Form.Item>
                    </Col>
                    {initialInputs.household_expenses.housing.details[i].name === "Rent" ? (
                      <Fragment>
                        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                          <Form.Item label="Start Year:">
                            <DateInput
                              onBlur={(date, dateString) => {
                                const clone = { ...initialInputs };
                                clone.household_expenses.housing.details[i].start_year = +dateString;
                                setInitialInputs(clone);
                              }}
                              value={initialInputs.household_expenses.housing.details[
                                i
                              ].start_year.toString()}
                            />
                          </Form.Item>
                        </Col>
                        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                          <Form.Item label="End Year">
                            <DateInput
                              onBlur={(date, dateString) => {
                                const clone = { ...initialInputs };
                                clone.household_expenses.housing.details[i].end_year = +dateString;
                                setInitialInputs(clone);
                              }}
                              value={initialInputs.household_expenses.housing.details[i].end_year.toString()}
                            />
                          </Form.Item>
                        </Col>
                      </Fragment>
                    ) : (
                      ""
                    )}
                  </Row>
                );
              })}
              <Row>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <Text>Total:</Text>
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <InputNumber
                      value={initialInputs.household_expenses.housing.details.reduce(
                        (a: number, b) => a + b.annual_expense,
                        0
                      )}
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
                <Button
                  type="link"
                  onClick={() => {
                    const clone = { ...initialInputs };
                    clone.household_expenses.consumables.details.push({
                      id: uuid(),
                      name: "Eating Out",
                      annual_expense: 0,
                      rate_after_retirement: 1,
                    });
                    setInitialInputs(clone);
                  }}
                >
                  <PlusCircleOutlined />
                </Button>
              </Divider>
              {initialInputs.household_expenses.consumables.details.map((e, i) => {
                return (
                  <Row key={"consumables" + i}>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Expense:">
                        <TextInput
                          placeholder="Name"
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_expenses.consumables.details[i].name = e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_expenses.consumables.details[i].name = "";
                              setInitialInputs(clone);
                            }
                          }}
                          value={initialInputs.household_expenses.consumables.details[i].name}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Annual expense:">
                        <MoneyInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_expenses.consumables.details[i].annual_expense = +e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_expenses.consumables.details[i].annual_expense = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.household_expenses.consumables.details[i].annual_expense}`}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="% After retirement">
                        <RateInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_expenses.consumables.details[i].rate_after_retirement = e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_expenses.consumables.details[i].rate_after_retirement = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.household_expenses.consumables.details[i].rate_after_retirement}`}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                );
              })}

              <Row>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <Text>Total:</Text>
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <InputNumber
                      value={initialInputs.household_expenses.consumables.details.reduce(
                        (a: number, b) => a + b.annual_expense,
                        0
                      )}
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
                <Button
                  type="link"
                  onClick={() => {
                    const clone = { ...initialInputs };
                    clone.household_expenses.travel.details.push({
                      id: uuid(),
                      name: "Travel Card",
                      annual_expense: 0,
                      rate_after_retirement: 1,
                    });
                    setInitialInputs(clone);
                  }}
                >
                  <PlusCircleOutlined />
                </Button>
              </Divider>

              {initialInputs.household_expenses.travel.details.map((e, i) => {
                return (
                  <Row key={"travel" + i}>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Expense:">
                        <TextInput
                          placeholder="Name"
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_expenses.travel.details[i].name = e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_expenses.travel.details[i].name = "";
                              setInitialInputs(clone);
                            }
                          }}
                          value={initialInputs.household_expenses.travel.details[i].name}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Annual expense:">
                        <MoneyInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_expenses.travel.details[i].annual_expense = +e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_expenses.travel.details[i].annual_expense = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.household_expenses.travel.details[i].annual_expense}`}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="% After retirement">
                        <RateInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_expenses.travel.details[i].rate_after_retirement = e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_expenses.travel.details[i].rate_after_retirement = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.household_expenses.travel.details[i].rate_after_retirement}`}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                );
              })}

              <Row>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <Text>Total:</Text>
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <InputNumber
                      value={initialInputs.household_expenses.travel.details.reduce(
                        (a: number, b) => a + b.annual_expense,
                        0
                      )}
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
                <Button
                  type="link"
                  onClick={() => {
                    const clone = { ...initialInputs };
                    clone.household_expenses.shopping.details.push({
                      id: uuid(),
                      name: "Clothing and Accessories",
                      annual_expense: 0,
                      rate_after_retirement: 1,
                    });
                    setInitialInputs(clone);
                  }}
                >
                  <PlusCircleOutlined />
                </Button>
              </Divider>
              {initialInputs.household_expenses.shopping.details.map((e, i) => {
                return (
                  <Row key={"shopping" + i}>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Expense:">
                        <TextInput
                          placeholder="Name"
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_expenses.shopping.details[i].name = e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_expenses.shopping.details[i].name = "";
                              setInitialInputs(clone);
                            }
                          }}
                          value={initialInputs.household_expenses.shopping.details[i].name}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Annual expense:">
                        <MoneyInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_expenses.shopping.details[i].annual_expense = +e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_expenses.shopping.details[i].annual_expense = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.household_expenses.shopping.details[i].annual_expense}`}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="% After retirement">
                        <RateInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_expenses.shopping.details[i].rate_after_retirement = e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_expenses.shopping.details[i].rate_after_retirement = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.household_expenses.shopping.details[i].rate_after_retirement}`}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                );
              })}

              <Row>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <Text>Total:</Text>
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <InputNumber
                      value={initialInputs.household_expenses.shopping.details.reduce(
                        (a: number, b) => a + b.annual_expense,
                        0
                      )}
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
                <Button
                  type="link"
                  onClick={() => {
                    const clone = { ...initialInputs };
                    clone.household_expenses.entertainment.details.push({
                      id: uuid(),
                      name: "Drinks",
                      annual_expense: 0,
                      rate_after_retirement: 1,
                    });
                    setInitialInputs(clone);
                  }}
                >
                  <PlusCircleOutlined />
                </Button>
              </Divider>

              {initialInputs.household_expenses.entertainment.details.map((e, i) => {
                return (
                  <Row key={"entertaiment" + i}>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Expense:">
                        <TextInput
                          placeholder="Name"
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_expenses.entertainment.details[i].name = e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_expenses.entertainment.details[i].name = "";
                              setInitialInputs(clone);
                            }
                          }}
                          value={initialInputs.household_expenses.entertainment.details[i].name}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Annual expense:">
                        <MoneyInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_expenses.entertainment.details[i].annual_expense = +e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_expenses.entertainment.details[i].annual_expense = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.household_expenses.entertainment.details[i].annual_expense}`}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="% After retirement">
                        <RateInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_expenses.entertainment.details[i].rate_after_retirement = e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_expenses.entertainment.details[i].rate_after_retirement = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.household_expenses.entertainment.details[i].rate_after_retirement}`}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                );
              })}

              <Row>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <Text>Total:</Text>
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <InputNumber
                      value={initialInputs.household_expenses.entertainment.details.reduce(
                        (a: number, b) => a + b.annual_expense,
                        0
                      )}
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
                <Button
                  type="link"
                  onClick={() => {
                    const clone = { ...initialInputs };
                    clone.household_expenses.holiday.details.push({
                      id: uuid(),
                      name: "Flights",
                      annual_expense: 0,
                      rate_after_retirement: 1,
                    });
                    setInitialInputs(clone);
                  }}
                >
                  <PlusCircleOutlined />
                </Button>
              </Divider>

              {initialInputs.household_expenses.holiday.details.map((e, i) => {
                return (
                  <Row key={"holiday" + i}>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Expense:">
                        <TextInput
                          placeholder="Name"
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_expenses.holiday.details[i].name = e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_expenses.holiday.details[i].name = "";
                              setInitialInputs(clone);
                            }
                          }}
                          value={initialInputs.household_expenses.holiday.details[i].name}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Annual expense:">
                        <MoneyInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_expenses.holiday.details[i].annual_expense = +e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_expenses.holiday.details[i].annual_expense = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.household_expenses.holiday.details[i].annual_expense}`}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="% After retirement">
                        <RateInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_expenses.holiday.details[i].rate_after_retirement = e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_expenses.holiday.details[i].rate_after_retirement = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.household_expenses.holiday.details[i].rate_after_retirement}`}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                );
              })}

              <Row>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <Text>Total:</Text>
                  </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                  <Form.Item label=" ">
                    <InputNumber
                      value={initialInputs.household_expenses.holiday.details.reduce(
                        (a: number, b) => a + b.annual_expense,
                        0
                      )}
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
              {initialInputs.household_expenses.insurance_policies.life_insurance.map((p, i) => {
                return (
                  <Row key={"life-insurance" + i}>
                    <Col lg={6} md={6} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label=" ">
                        <Text>
                          Life Insurance <Text strong>{initialInputs.household_owners[i].name}</Text>
                        </Text>
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Annual Expense:">
                        <MoneyInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_expenses.insurance_policies.life_insurance[
                                i
                              ].annual_expense = e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_expenses.insurance_policies.life_insurance[
                                i
                              ].annual_expense = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.household_expenses.insurance_policies.life_insurance[i].annual_expense}`}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Inflation:">
                        <RateInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_expenses.insurance_policies.life_insurance[i].inflation = e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_expenses.insurance_policies.life_insurance[i].inflation = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.household_expenses.insurance_policies.life_insurance[i].inflation}`}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="% After retirement:">
                        <RateInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_expenses.insurance_policies.life_insurance[i].inflation = e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_expenses.insurance_policies.life_insurance[
                                i
                              ].rate_after_retirement = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.household_expenses.insurance_policies.life_insurance[i].rate_after_retirement}`}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                );
              })}

              {initialInputs.household_expenses.insurance_policies.critical_illness_cover.map((p, i) => {
                return (
                  <Row key={"critical-illness" + i}>
                    <Col lg={6} md={6} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label=" ">
                        <Text>
                          Critical Illness Cover <Text strong>{initialInputs.household_owners[i].name}</Text>
                        </Text>
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Annual Expense:">
                        <MoneyInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_expenses.insurance_policies.critical_illness_cover[
                                i
                              ].annual_expense = e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_expenses.insurance_policies.critical_illness_cover[
                                i
                              ].annual_expense = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.household_expenses.insurance_policies.critical_illness_cover[i].annual_expense}`}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Inflation:">
                        <RateInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_expenses.insurance_policies.critical_illness_cover[
                                i
                              ].inflation = e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_expenses.insurance_policies.critical_illness_cover[
                                i
                              ].inflation = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.household_expenses.insurance_policies.critical_illness_cover[i].inflation}`}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="% After retirement:">
                        <RateInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_expenses.insurance_policies.critical_illness_cover[
                                i
                              ].inflation = e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_expenses.insurance_policies.critical_illness_cover[
                                i
                              ].rate_after_retirement = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.household_expenses.insurance_policies.critical_illness_cover[i].rate_after_retirement}`}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                );
              })}

              {initialInputs.household_expenses.insurance_policies.family_income_benefit.map((p, i) => {
                return (
                  <Row key={"family-income-benefit" + i}>
                    <Col lg={6} md={6} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label=" ">
                        <Text>
                          Family Income Benifit <Text strong>{initialInputs.household_owners[i].name}</Text>
                        </Text>
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Annual Expense:">
                        <MoneyInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_expenses.insurance_policies.family_income_benefit[
                                i
                              ].annual_expense = e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_expenses.insurance_policies.family_income_benefit[
                                i
                              ].annual_expense = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.household_expenses.insurance_policies.family_income_benefit[i].annual_expense}`}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Inflation:">
                        <RateInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_expenses.insurance_policies.family_income_benefit[
                                i
                              ].inflation = e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_expenses.insurance_policies.family_income_benefit[
                                i
                              ].inflation = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.household_expenses.insurance_policies.family_income_benefit[i].inflation}`}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="% After retirement:">
                        <RateInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_expenses.insurance_policies.family_income_benefit[
                                i
                              ].inflation = e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_expenses.insurance_policies.family_income_benefit[
                                i
                              ].rate_after_retirement = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.household_expenses.insurance_policies.family_income_benefit[i].rate_after_retirement}`}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                );
              })}

              {/* One-Off Expenses */}
              <div id="one-off-expenses" />
              <Divider orientation="left">
                One-Off Expenses
                <Button
                  type="link"
                  onClick={() => {
                    const clone = { ...initialInputs };
                    clone.household_expenses.one_off_expenses.push({
                      id: uuid(),
                      name: "Main House Renovation",
                      annual_payment_in_todays_terms: 0,
                      inflation: 0,
                      start_year: 2039,
                      end_year: 2041,
                    });
                    setInitialInputs(clone);
                  }}
                >
                  <PlusCircleOutlined />
                </Button>
              </Divider>

              {initialInputs.household_expenses.one_off_expenses.map((e, i) => {
                return (
                  <Row key={"oneOffExpenses" + i}>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Expense:">
                        <TextInput
                          placeholder="Name"
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_expenses.one_off_expenses[i].name = e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_expenses.one_off_expenses[i].name = "";
                              setInitialInputs(clone);
                            }
                          }}
                          value={initialInputs.household_expenses.one_off_expenses[i].name}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Annual expense">
                        <MoneyInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_expenses.one_off_expenses[
                                i
                              ].annual_payment_in_todays_terms = +e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_expenses.one_off_expenses[i].annual_payment_in_todays_terms = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.household_expenses.one_off_expenses[i].annual_payment_in_todays_terms}`}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Inflation:">
                        <RateInput
                          onBlur={(e) => {
                            if (e) {
                              const clone = { ...initialInputs };
                              clone.household_expenses.one_off_expenses[i].inflation = e;
                              setInitialInputs(clone);
                            } else {
                              const clone = { ...initialInputs };
                              clone.household_expenses.one_off_expenses[i].inflation = 0;
                              setInitialInputs(clone);
                            }
                          }}
                          value={`${initialInputs.household_expenses.one_off_expenses[i].inflation}`}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="Start year:">
                        <DateInput
                          onBlur={(date, dateString) => {
                            const clone = { ...initialInputs };
                            clone.household_expenses.one_off_expenses[i].start_year = +dateString;
                            setInitialInputs(clone);
                          }}
                          value={initialInputs.household_expenses.one_off_expenses[i].start_year.toString()}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                      <Form.Item label="End year:">
                        <DateInput
                          onBlur={(date, dateString) => {
                            const clone = { ...initialInputs };
                            clone.household_expenses.one_off_expenses[i].end_year = +dateString;
                            setInitialInputs(clone);
                          }}
                          value={initialInputs.household_expenses.one_off_expenses[i].end_year.toString()}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                );
              })}
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
                    <MoneyInput
                      onBlur={(e) => {
                        if (e) {
                          const clone = { ...initialInputs };
                          clone.household_expenses.children_education_expenses.primary_school_fees.annual_fee_in_todays_terms = +e;
                          setInitialInputs(clone);
                        } else {
                          const clone = { ...initialInputs };
                          clone.household_expenses.children_education_expenses.primary_school_fees.annual_fee_in_todays_terms = 0;
                          setInitialInputs(clone);
                        }
                      }}
                      value={`${initialInputs.household_expenses.children_education_expenses.primary_school_fees.annual_fee_in_todays_terms}`}
                    />
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
                    <MoneyInput
                      onBlur={(e) => {
                        if (e) {
                          const clone = { ...initialInputs };
                          clone.household_expenses.children_education_expenses.seconday_school_fees.annual_fee_in_todays_terms = +e;
                          setInitialInputs(clone);
                        } else {
                          const clone = { ...initialInputs };
                          clone.household_expenses.children_education_expenses.seconday_school_fees.annual_fee_in_todays_terms = 0;
                          setInitialInputs(clone);
                        }
                      }}
                      value={`${initialInputs.household_expenses.children_education_expenses.seconday_school_fees.annual_fee_in_todays_terms}`}
                    />
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
                    <MoneyInput
                      onBlur={(e) => {
                        if (e) {
                          const clone = { ...initialInputs };
                          clone.household_expenses.children_education_expenses.university_fees.annual_fee_in_todays_terms = +e;
                          setInitialInputs(clone);
                        } else {
                          const clone = { ...initialInputs };
                          clone.household_expenses.children_education_expenses.university_fees.annual_fee_in_todays_terms = 0;
                          setInitialInputs(clone);
                        }
                      }}
                      value={`${initialInputs.household_expenses.children_education_expenses.university_fees.annual_fee_in_todays_terms}`}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Row end */}
          </Col>
        </Row>

        <Row justify="end">
          <Affix offsetBottom={50} style={{ marginRight: "50px" }}>
            <Button htmlType="submit" type="primary" size="large" loading={loading}>
              Submit
            </Button>
          </Affix>
        </Row>
      </Form>
    </Layout>
  );
};

export default InputsForm;
