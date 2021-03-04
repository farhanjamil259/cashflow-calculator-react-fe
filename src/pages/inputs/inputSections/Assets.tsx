import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Card, Col, DatePicker, Divider, Form, Input, InputNumber, Row, Select } from "antd";

import Text from "antd/lib/typography/Text";
import {
    IBankAccount,
    INonEmploymentDefinedContributionPensionPlan, IMortgage,
    IOwner,
    IProperty,
    ISavingsAndInvestments,
    IIndividualSavingsAccounts,
} from "../../../interfaces/ISubInputs";

const { Option } = Select;

const Assets = (props: any) => {
  const owners: IOwner[] = props.owners;
  const properties: IProperty[] = props.properties;
  const bankAccounts: IBankAccount = props.bankAccounts;
  const savingsAndInvestments: ISavingsAndInvestments = props.savingsAndInvestments;
  const definedContributionPensionPlans: INonEmploymentDefinedContributionPensionPlan[] =
    props.definedContributionPensionPlans;
  const mortgages : IMortgage[] = props.mortgages
  return (
    <Card title="Assets" id="assets" style={{ margin: "16px", borderColor: "#4fc3f7" }}>
      {/* Properties */}
      <div id="properties"/>
      <Divider orientation="left">
        Properties
        <Button
          type="link"
          onClick={() => {
            const clone: IProperty[] = [...properties];
            const clone2 :IMortgage[] =[...mortgages]
            clone.push({
              id: "",
              name: "",
              original_price: 0,
              start_year: 0,
                sell_in_future : false,
                end_year : 0,
                type_of_property : "Main Home",
              on_mortgage: false,
              mortgage_rate: 0,
            });

            clone2.push({
                interest_rate :0,
                mortgage_period: 0,
                number_of_payments_per_year: 12
            })
            props.onPropertyAdd(clone, clone2);
          }}
        >
          <PlusCircleOutlined />
        </Button>
      </Divider>
      {properties.map((p: IProperty, i: number) => {
        return (
          <Row key={i + "property"}>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="Property Name">
                <Input
                  placeholder="Property Name"
                  onBlur={(e) => {
                    const clone: IProperty[] = [...properties];
                    clone[i].name = e.target.value;
                    props.onPropertyChange(clone);
                  }}
                />
              </Form.Item>
            </Col>

            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="Original Price">
                <InputNumber
                  formatter={(value) => "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value) => value!.replace(/£\s?|(,*)/g, "")}
                  className="custom-input-fields"
                  onBlur={(e) => {
                    const clone: IProperty[] = [...properties];

                    clone[i].original_price = +e.target.value.replace(/£\s?|(,*)/g, "");
                    props.onPropertyChange(clone);
                  }}
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
                <DatePicker
                  picker="year"
                  className="custom-input-fields"
                  onChange={(date: any, dateString: any) => {
                    const clone: IProperty[] = [...properties];
                    clone[i].start_year = +dateString;
                    props.onPropertyChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="On Mortgage?">
                <Select
                  defaultValue="no"
                  className="custom-input-fields"
                  onChange={(e: any) => {
                    const clone: IProperty[] = [...properties];
                    clone[i].on_mortgage = e === "yes";
                    console.log(clone);
                    props.onPropertyChange(clone);
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
      <div id="bank-account"/>
      <Divider orientation="left">Bank Accounts</Divider>
      <Row>
        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label=" ">
            <Text>Aggregated Bank Accounts</Text>
          </Form.Item>
        </Col>
        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label="Original Balance">
            <InputNumber
              formatter={(value) => "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value!.replace(/£\s?|(,*)/g, "")}
              className="custom-input-fields"
              onBlur={(e) => {
                const clone: IBankAccount = bankAccounts;

                clone.original_balance = +e.target.value.replace(/£\s?|(,*)/g, "");
                props.onBankAccountsChange(clone);
              }}
            />
          </Form.Item>
        </Col>
        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label="Min. Balance Acceptable">
            <InputNumber
              formatter={(value) => "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value!.replace(/£\s?|(,*)/g, "")}
              className="custom-input-fields"
              onBlur={(e) => {
                const clone: IBankAccount = bankAccounts;

                clone.minimum_cash_balance_acceptable = +e.target.value.replace(/£\s?|(,*)/g, "");
                props.onBankAccountsChange(clone);
                console.log(clone);
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      {/* Savings and Investments */}
      <div id="savings-and-investments"/>
      <Divider orientation="left">Savings and Investments</Divider>
      {savingsAndInvestments.individual_savings_account.map((sai: IIndividualSavingsAccounts, i: number) => {
        return (
          <Row key={i + "savings and investments"}>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label=" ">
                <Text strong>{owners[i].name}</Text>
              </Form.Item>
            </Col>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="Original Balance">
                <InputNumber
                  formatter={(value) => "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value) => value!.replace(/£\s?|(,*)/g, "")}
                  className="custom-input-fields"
                  onBlur={(e) => {
                    const clone: IIndividualSavingsAccounts[] = [...savingsAndInvestments.individual_savings_account];

                    clone[i].original_balance = +e.target.value.replace(/£\s?|(,*)/g, "");
                    props.onSavingsAndInvestmentsChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="Annual Contributions">
                <InputNumber
                  formatter={(value) => "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value) => value!.replace(/£\s?|(,*)/g, "")}
                  className="custom-input-fields"
                  onBlur={(e) => {
                    const clone: IIndividualSavingsAccounts[] = [...savingsAndInvestments.individual_savings_account];

                    clone[i].annual_contribution = +e.target.value.replace(/£\s?|(,*)/g, "");
                    props.onSavingsAndInvestmentsChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        );
      })}
      {/*  Defined Contribution Pension Plans */}
      <div id="defined-contribution-pension-plans"/>
      <Divider orientation="left">Defined Contribution Pension Plans</Divider>
      {definedContributionPensionPlans.map((d: INonEmploymentDefinedContributionPensionPlan, i: number) => {
        return (
          <Row key={i + "defined contributions pension plans"}>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label=" ">
                <Text strong>{owners[i].name}</Text>
              </Form.Item>
            </Col>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="Original Balance">
                <InputNumber
                  formatter={(value) => "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value) => value!.replace(/£\s?|(,*)/g, "")}
                  className="custom-input-fields"
                  onBlur={(e) => {
                    const clone: INonEmploymentDefinedContributionPensionPlan[] = [...definedContributionPensionPlans];

                    clone[i].original_balance = +e.target.value.replace(/£\s?|(,*)/g, "");
                    props.onDefinedContributionPensionPlansChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="Annual Contributions">
                <InputNumber
                  formatter={(value) => "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value) => value!.replace(/£\s?|(,*)/g, "")}
                  className="custom-input-fields"
                  onBlur={(e) => {
                    const clone: INonEmploymentDefinedContributionPensionPlan[] = [...definedContributionPensionPlans];

                    clone[i].annual_contribution = +e.target.value.replace(/£\s?|(,*)/g, "");
                    props.onDefinedContributionPensionPlansChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        );
      })}
    </Card>
  );
};

export default Assets;
