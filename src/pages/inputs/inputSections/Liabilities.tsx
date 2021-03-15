import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Card, Col, DatePicker, Divider, Form, Input, InputNumber, Row, Select } from "antd";

import Text from "antd/lib/typography/Text";
import React from "react";
import { ICreditCards, IMortgage, IOtherLoans, IProperty } from "../../../interfaces/ISubInputs";

const { Option } = Select;
/*eslint no-useless-escape: "off"*/
const Liabilities = (props: any) => {
  const properties: IProperty[] = props.properties;
  const mortgages: IMortgage[] = props.mortgages;
  const otherLoans: IOtherLoans[] = props.otherLoans;
  const creditCard: ICreditCards = props.creditCard;

  return (
    <Card title="Liabilities" id="liabilities" style={{ margin: "16px", borderColor: "#9575cd" }}>
      {/* Mortgages */}
      <div id="mortgages" />
      <Divider orientation="left">Mortgages</Divider>
      {properties.map((p: any, i: number) => {
        if (p.on_mortgage) {
          return (
            <Row key={i + "mortgage123"}>
              <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                <Form.Item label=" ">
                  <Text>{p.name}</Text>
                </Form.Item>
              </Col>
              <Col lg={3} md={3} sm={24} xs={24} className="custom-input-fields">
                <Form.Item label="Mortgage Rate">
                  <InputNumber
                    min={0}
                    max={100}
                    formatter={(value) => `${value}%`}
                    parser={(value: any) => value!.replace("%", "")}
                    className="custom-input-fields"
                    onBlur={(e) => {
                      const clone: IProperty[] = [...properties];

                      clone[i].mortgage_rate = +e.target.value.replace("%", "") / 100;
                      props.onPropertyChange(clone);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col lg={3} md={3} sm={24} xs={24} className="custom-input-fields">
                <Form.Item label="Interest Rate">
                  <InputNumber
                    min={0}
                    max={100}
                    formatter={(value) => `${value}%`}
                    parser={(value: any) => value!.replace("%", "")}
                    className="custom-input-fields"
                    onBlur={(e) => {
                      const clone: IMortgage[] = [...mortgages];

                      clone[i].interest_rate = +e.target.value.replace("%", "") / 100;

                      props.onMortgageChange(clone);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                <Form.Item label="Mortgage Period (yrs)">
                  <InputNumber
                    className="custom-input-fields"
                    placeholder="30"
                    onBlur={(e) => {
                      const clone: IMortgage[] = [...mortgages];

                      clone[i].mortgage_period = +e.target.value;
                      props.onMortgageChange(clone);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                <Form.Item label="# of Annual Payments">
                  <Select
                    defaultValue="12"
                    className="custom-input-fields"
                    onChange={(e) => {
                      const clone: IMortgage[] = [...mortgages];
                      clone[i].number_of_payments_per_year = +e;
                      props.onMortgageChange(clone);
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
        }
        return <div key={i + "dummydivmortgage"} />;
      })}

      {/* Other Loans */}
      <div id="other-loans" />
      <Divider orientation="left">
        Other Loans
        <Button
          type="link"
          onClick={() => {
            const clone: IOtherLoans[] = [...otherLoans];
            clone.push({
              id: "",
              name: "",
              original_balance: 0,
              interest_rate: 0,
              start_year: 0,
              loan_period: 0,
              number_of_payments_per_year: 12,
            });

            props.onOtherLoanAdd(clone);
          }}
        >
          <PlusCircleOutlined />
        </Button>
      </Divider>
      {otherLoans.map((loan: any, i: number) => {
        return (
          <Row key={i + "otherLoans"}>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="Loan Name">
                <Input
                  placeholder="car loan"
                  onBlur={(e) => {
                    const clone: IOtherLoans[] = [...otherLoans];
                    clone[i].name = e.target.value;
                    props.onOtherLoanChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={3} md={3} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="Original Balance">
                <InputNumber
                  formatter={(value) => "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value: any) => value!.replace(/£\s?|(,*)/g, "")}
                  className="custom-input-fields"
                  onBlur={(e) => {
                    const clone: IOtherLoans[] = [...otherLoans];

                    clone[i].original_balance = +e.target.value.replace(/£\s?|(,*)/g, "");
                    props.onOtherLoanChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={3} md={3} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="Interest Rate">
                <InputNumber
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value: any) => value!.replace("%", "")}
                  className="custom-input-fields"
                  onBlur={(e) => {
                    const clone: IOtherLoans[] = [...otherLoans];

                    clone[i].interest_rate = +e.target.value.replace("%", "") / 100;

                    console.log(+e.target.value.replace("%", "") / 100);
                    props.onOtherLoanChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="Start Year">
                <DatePicker
                  picker="year"
                  className="custom-input-fields"
                  onChange={(date: any, dateString: any) => {
                    const clone: IOtherLoans[] = [...otherLoans];
                    clone[i].start_year = +dateString;
                    props.onOtherLoanChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="Loan Period (yrs)">
                <InputNumber
                  className="custom-input-fields"
                  placeholder="30"
                  onBlur={(e) => {
                    const clone: IOtherLoans[] = [...otherLoans];
                    clone[i].loan_period = +e.target.value.replace(/£\s?|(,*)/g, "");
                    props.onOtherLoanChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="# of Payments/yr">
                <Select
                  defaultValue="12"
                  className="custom-input-fields"
                  onChange={(e) => {
                    const clone: IOtherLoans[] = [...otherLoans];
                    clone[i].number_of_payments_per_year = +e;
                    props.onOtherLoanChange(clone);
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
          <Form.Item label="Card Name">
            <Input
              placeholder="Credit Cards"
              onChange={(e) => {
                const clone: ICreditCards = creditCard;
                clone.name = e.target.value;
                props.onCreditCardChange(clone);
              }}
            />
          </Form.Item>
        </Col>
        <Col lg={3} md={3} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label="Original Balance">
            <InputNumber
              formatter={(value) => "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value: any) => value!.replace(/£\s?|(,*)/g, "")}
              className="custom-input-fields"
              onBlur={(e) => {
                const clone: ICreditCards = creditCard;

                clone.original_balance = +e.target.value.replace(/£\s?|(,*)/g, "");
                props.onCreditCardChange(clone);
              }}
            />
          </Form.Item>
        </Col>
        <Col lg={3} md={3} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label="Interest Rate">
            <InputNumber
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value: any) => value!.replace("%", "")}
              className="custom-input-fields"
              onBlur={(e) => {
                const clone: ICreditCards = creditCard;

                clone.interest_rate = +e.target.value.replace("%", "") / 100;

                console.log(+e.target.value.replace("%", "") / 100);
                props.onCreditCardChange(clone);
              }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default Liabilities;
