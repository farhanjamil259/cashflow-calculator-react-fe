import { Card, Layout, Row, Col, Form, Typography, Button } from "antd";
import React, { useState, useEffect } from "react";
import MoneyInput from "./controls/MoneyInput";
import TextInput from "../inputs/controls/TextInput";
import RateInput from "./controls/RateInput";
import IAssumptions from "../../interfaces/IAssumptions";
import { RootStateOrAny, useSelector } from "react-redux";
import IForecastSummary from "../../interfaces/IForecastSummary";

const { Text } = Typography;

const AssumptionFrom = () => {
  const assumptions: IAssumptions = useSelector((state: RootStateOrAny) => state.assumptionReducer);

  const [initialInputs, setInitialInputs] = useState<IAssumptions>({
    sdlt_thresholds: {
      c5: {
        threshold: 0,
        taxrate: 0,
      },
      c6: {
        threshold: 0,
        taxrate: 0,
      },
      c7: {
        threshold: 0,
        taxrate: 0,
      },
      c8: {
        threshold: 0,
        taxrate: 0,
      },
      c9: {
        threshold: 0,
        taxrate: 0,
      },
    },
    isaa: {
      annual_contribution_allowance: {
        allowance: 0,
        rate: 0,
      },
    },
    pension_contribution_allowance: {
      contribution_annual_allowance: {
        allowance: 0,
        rate: 0,
      },
      lifetime_allowance: {
        allowance: 0,
        rate: 0,
      },
      contribution_annual_allowance_floor: {
        allowance: 0,
        rate: 0,
      },
    },
    pension_contribution_allowance_tapering: {
      threshold_income: {
        threshold: 0,
        rate: 0,
      },
      lifetime_allowance: {
        threshold: 0,
        rate: 0,
      },
    },
    income_tax_rate_thresholds: {
      personal_allowance: {
        threshold: 0,
        rate: 0,
      },
      basic_rate: {
        threshold: 0,
        rate: 0,
      },
      higher_rate: {
        threshold: 0,
        rate: 0,
      },
      additional_rate: {
        threshold: 0,
        rate: 0,
      },
    },
    income_limits: {
      income_limit_for_personal_allowance: {
        threshold: 0,
        rate: 0,
      },
    },
    employement_minimum_pension_contributions: {
      minimum_contributions: {
        member: 0,
        employer: 0,
      },
    },
    employment_nic_thresholds: {
      lower_earnings: {
        threshold: 0,
        rate: 0,
      },
      primary_threshold: {
        threshold: 0,
        rate: 0,
      },
      upper_earnings_limit: {
        threshold: 0,
        rate: 0,
      },
    },
    self_employment_nic_class_2_threshold: {
      small_profit_rate: {
        threshold: 0,
        rate: 0,
      },
    },
    self_employment_nic_class_4_threshold: {
      lower_profits_limit: {
        threshold: 0,
        rate: 0,
      },
      upper_earnings_limit: {
        threshold: 0,
        rate: 0,
      },
    },
    dividend_tax_rate_thresholds: {
      personal_allowance: {
        threshold: 0,
        rate: 0,
      },
      basic_rate: {
        threshold: 0,
        rate: 0,
      },
      higher_rate: {
        threshold: 0,
        rate: 0,
      },
      additional_rate: {
        threshold: 0,
        rate: 0,
      },
    },
    residential_property_captical_gains_tax_rate_thresholds: {
      basic_rate: {
        threshold: 0,
        rate: 0,
      },
      higher_and_additional_rate: {
        threshold: 0,
        rate: 0,
      },
    },
    other_assets_capital_gains_tax_rate_thresholds: {
      basic_rate: {
        threshold: 0,
        rate: 0,
      },
      higher_and_additional_rate: {
        threshold: 0,
        rate: 0,
      },
    },
    income_limits_2: {
      capital_gains_tax_annual_exempt_amount: {
        threshold: 0,
      },
    },
    market_data: {
      property_price_inflation: {
        notes: "",
        rate: 0,
      },
      cash_and_money_market_yield: {
        notes: "",
        rate: 0,
      },
      savings_and_investment_growth_rate: {
        notes: "",
        rate: 0,
      },
      earning_growth_rate: {
        notes: "",
        rate: 0,
      },
      retain_price_index: {
        notes: "",
        rate: 0,
      },
      consumer_price_index: {
        notes: "",
        rate: 0,
      },
      annuity: {
        notes: "",
        rate: 0,
      },
      private_school_fee_inflation: {
        notes: "",
        rate: 0,
      },
    },
    inputs_assumptions: {
      end_of_forecast_age: 100,
      primary_school_age: 5,
      secondary_school_age: 11,
      university_age: 18,
      graduation_age: 21,
      bank_account_growth_rate: 0,
      credit_card_interest_rate: 0.2,
      state_pension_annual_amount: 8300,
      state_pension_age: 67,
    },
  });

  useEffect(() => {
    setInitialInputs(assumptions);
  }, [assumptions]);

  const handleFinish = () => {
    console.log(initialInputs);
  };

  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Row justify="center">
        <Col span={12}>
          <Card title="Assumption Form">
            <Form layout="vertical" size="middle" onFinish={handleFinish}>
              {/*  SDLT Thresholds */}
              <Card style={{ margin: "16px" }}>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>SDLT Thresholds</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Threshold</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Tex Rate</Text>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Up to first threshold</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <MoneyInput
                        value={`${initialInputs.sdlt_thresholds.c5.threshold}`}
                        onBlur={(e) => {
                          if (e) {
                            setInitialInputs({
                              ...initialInputs,
                              sdlt_thresholds: {
                                ...initialInputs.sdlt_thresholds,
                                c5: {
                                  ...initialInputs.sdlt_thresholds.c5,
                                  threshold: e,
                                },
                              },
                            });
                          } else {
                            setInitialInputs({
                              ...initialInputs,
                              sdlt_thresholds: {
                                ...initialInputs.sdlt_thresholds,
                                c5: {
                                  ...initialInputs.sdlt_thresholds.c5,
                                  threshold: 0,
                                },
                              },
                            });
                          }
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Up to Second threshold</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <MoneyInput
                        value={`${initialInputs.sdlt_thresholds.c6.threshold}`}
                        onBlur={(e) => {
                          setInitialInputs({
                            ...initialInputs,
                            sdlt_thresholds: {
                              ...initialInputs.sdlt_thresholds,
                              c6: {
                                ...initialInputs.sdlt_thresholds.c6,
                                threshold: e,
                              },
                            },
                          });
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Up to third threshold</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <MoneyInput
                        value={`${initialInputs.sdlt_thresholds.c7.threshold}`}
                        onBlur={(e) => {
                          setInitialInputs({
                            ...initialInputs,
                            sdlt_thresholds: {
                              ...initialInputs.sdlt_thresholds,
                              c7: {
                                ...initialInputs.sdlt_thresholds.c7,
                                threshold: e,
                              },
                            },
                          });
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Up to fourth threshold</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <MoneyInput
                        value={`${initialInputs.sdlt_thresholds.c8.threshold}`}
                        onBlur={(e) => {
                          setInitialInputs({
                            ...initialInputs,
                            sdlt_thresholds: {
                              ...initialInputs.sdlt_thresholds,
                              c8: {
                                ...initialInputs.sdlt_thresholds.c8,
                                threshold: e,
                              },
                            },
                          });
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>The remaining amount</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <MoneyInput
                        onBlur={(e) => {
                          const clone = initialInputs;
                          clone.sdlt_thresholds.c9.threshold = +e.target.value.replace(/£\s?|(,*)/g, "");
                          setInitialInputs(clone);
                        }}
                        value={initialInputs.sdlt_thresholds.c6.threshold.toString()}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              {/*  Individual Savings Account (ISA) Allowances */}
              <Card style={{ margin: "16px" }}>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Individual Savings Account (ISA) Allowances</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Allowance</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Growth Rate</Text>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Annual Contribution Allowance</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <MoneyInput
                        onBlur={(e) => {
                          console.log(e);
                        }}
                        value="123"
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              {/*  Pension Contribution Allowances   */}
              <Card style={{ margin: "16px" }}>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Pension Contribution Allowances</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Lifetime</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Growth Rate</Text>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Contribution Annual Allowance</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <MoneyInput
                        onBlur={(e) => {
                          const clone = initialInputs;
                          clone.pension_contribution_allowance.contribution_annual_allowance.allowance = +e.target.value.replace(
                            /£\s?|(,*)/g,
                            ""
                          );
                          setInitialInputs(clone);
                        }}
                        value={initialInputs.pension_contribution_allowance.contribution_annual_allowance.allowance.toString()}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Lifetime Allowance</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <MoneyInput
                        onBlur={(e) => {
                          const clone = initialInputs;
                          clone.pension_contribution_allowance.lifetime_allowance.allowance = +e.target.value.replace(
                            /£\s?|(,*)/g,
                            ""
                          );
                          setInitialInputs(clone);
                        }}
                        value={initialInputs.pension_contribution_allowance.lifetime_allowance.allowance.toString()}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Contribution Annual Allowance Floor</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <MoneyInput
                        onBlur={(e) => {
                          const clone = initialInputs;
                          clone.pension_contribution_allowance.contribution_annual_allowance_floor.allowance = +e.target.value.replace(
                            /£\s?|(,*)/g,
                            ""
                          );
                          setInitialInputs(clone);
                        }}
                        value={initialInputs.pension_contribution_allowance.contribution_annual_allowance_floor.allowance.toString()}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              {/*  Pension Contribution Allowance Tapering*/}
              <Card style={{ margin: "16px" }}>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Pension Contribution Allowance Tapering</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Threshold</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Reduction Rate</Text>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Threshold Income</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <MoneyInput
                        onBlur={(e) => {
                          console.log(e);
                        }}
                        value="123"
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Adjusted Income</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <MoneyInput
                        onBlur={(e) => {
                          console.log(e);
                        }}
                        value="123"
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              {/* Income Tax Rate Thresholds*/}
              <Card style={{ margin: "16px" }}>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Income Tax Rate Thresholds</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Threshold</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Tax Rate</Text>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Personal Allowance</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <MoneyInput
                        onBlur={(e) => {
                          console.log(e);
                        }}
                        value="123"
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Basic Rate</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <MoneyInput
                        onBlur={(e) => {
                          console.log(e);
                        }}
                        value="123"
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Higher Rate</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <MoneyInput
                        onBlur={(e) => {
                          console.log(e);
                        }}
                        value="123"
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Additional Rate</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <MoneyInput
                        onBlur={(e) => {
                          console.log(e);
                        }}
                        value="123"
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              {/* Income Limits*/}
              <Card style={{ margin: "16px" }}>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Income Limits</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Threshold</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Reduction Rate</Text>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Income Limit for Personal Allowance</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <MoneyInput
                        onBlur={(e) => {
                          console.log(e);
                        }}
                        value="123"
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              {/* Employment Minimum Pension Contributions*/}
              <Card style={{ margin: "16px" }}>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Employment Minimum Pension Contributions</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Member's</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Employer's</Text>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Minimum Contributions</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              {/* Employment NIC Thresholds*/}
              <Card style={{ margin: "16px" }}>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Employment NIC Thresholds</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Threshold</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Tax Rate</Text>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Lower Earnings</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <MoneyInput
                        onBlur={(e) => {
                          console.log(e);
                        }}
                        value="123"
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Primary Threshold</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <MoneyInput
                        onBlur={(e) => {
                          console.log(e);
                        }}
                        value="123"
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Upper Earning Limit</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <MoneyInput
                        onBlur={(e) => {
                          console.log(e);
                        }}
                        value="123"
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              {/* Self-Employment NIC Class 2 Threshold*/}
              <Card style={{ margin: "16px" }}>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Self-Employment NIC Class 2 Threshold</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Threshold</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Tax Rate</Text>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Small Profit Rate</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <MoneyInput
                        onBlur={(e) => {
                          console.log(e);
                        }}
                        value="123"
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              {/* Self-Employment NIC Class 4 Threshold*/}
              <Card style={{ margin: "16px" }}>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Self-Employment NIC Class 4 Threshold</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Threshold</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Tax Rate</Text>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Lower Profits Limit</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <MoneyInput
                        onBlur={(e) => {
                          console.log(e);
                        }}
                        value="123"
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Upper Earnings Limit</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <MoneyInput
                        onBlur={(e) => {
                          console.log(e);
                        }}
                        value="123"
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              {/* Dividend Tax Rate Thresholds */}
              <Card style={{ margin: "16px" }}>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Dividend Tax Rate Thresholds</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Threshold</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Tax Rate</Text>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Personal Allowance</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <MoneyInput
                        onBlur={(e) => {
                          console.log(e);
                        }}
                        value="123"
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Basic Rate</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <MoneyInput
                        onBlur={(e) => {
                          console.log(e);
                        }}
                        value="123"
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Higher Rate</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <MoneyInput
                        onBlur={(e) => {
                          console.log(e);
                        }}
                        value="123"
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Additional Rate</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <MoneyInput
                        onBlur={(e) => {
                          console.log(e);
                        }}
                        value="123"
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              {/* Residential Property Capital Gains Tax Rate Thresholds */}
              <Card style={{ margin: "16px" }}>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Residential Property Capital Gains Tax Rate Thresholds </Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Threshold</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Tax Rate</Text>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Basic Rate</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <MoneyInput
                        onBlur={(e) => {
                          console.log(e);
                        }}
                        value="123"
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Higher and Additional Rate</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <MoneyInput
                        onBlur={(e) => {
                          console.log(e);
                        }}
                        value="123"
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              {/* Other Assets Capital Gains Tax Rate Thresholds */}
              <Card style={{ margin: "16px" }}>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Other Assets Capital Gains Tax Rate Thresholds</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Threshold</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Tax Rate</Text>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Basic Rate</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <MoneyInput
                        onBlur={(e) => {
                          console.log(e);
                        }}
                        value="123"
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Higher and Additional Rate</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <MoneyInput
                        onBlur={(e) => {
                          console.log(e);
                        }}
                        value="123"
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              {/* Income Limits */}
              <Card style={{ margin: "16px" }}>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Income Limits </Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Threshold</Text>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Capital Gains Tax Annual Exempt Amount</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <MoneyInput
                        onBlur={(e) => {
                          console.log(e);
                        }}
                        value="123"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              {/* Market Data Assumptions */}
              <Card style={{ margin: "16px" }}>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Market Data Assumptions </Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Average Rate</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Notes</Text>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Property Price Inflation</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <TextInput />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Cash and Money Markets Yield</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <TextInput />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Savings and Investment Growth Rate</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <TextInput />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Earnings Growth Rate</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <TextInput />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Retail Price Index</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <TextInput />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Consumer Price Index</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <TextInput />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Annuity(Age 65, Single Life, Level, No Guarantee)</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <TextInput />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={9} md={9} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <Text strong>Private School Fee Inflation</Text>
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <RateInput />
                    </Form.Item>
                  </Col>
                  <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item>
                      <TextInput />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              <Row justify="end">
                <Button htmlType="submit" type="primary" size="large">
                  Submit
                </Button>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default AssumptionFrom;
