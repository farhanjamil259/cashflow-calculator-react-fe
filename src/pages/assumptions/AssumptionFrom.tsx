import { Card, Layout, Row, Col, Form, Typography } from "antd";
import React from "react";
import MoneyInput from "../inputs/controls/MoneyInput";
import TextInput from "../inputs/controls/TextInput";
import RateInput from "./controls/RateInput";

const { Text } = Typography;

const AssumptionFrom = () => {
  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Row justify="center">
        <Col span={12}>
          <Card title="Assumption Form">
            <Form layout="vertical" size="middle">
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
                      <MoneyInput />
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
                      <MoneyInput />
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
                      <MoneyInput />
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
                      <MoneyInput />
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
                      <MoneyInput />
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
                      <MoneyInput />
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
                      <MoneyInput />
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
                      <MoneyInput />
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
                      <MoneyInput />
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
                      <MoneyInput />
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
                      <MoneyInput />
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
                      <MoneyInput />
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
                      <MoneyInput />
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
                      <MoneyInput />
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
                      <MoneyInput />
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
                      <MoneyInput />
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
                      <MoneyInput />
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
                      <MoneyInput />
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
                      <MoneyInput />
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
                      <MoneyInput />
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
                      <MoneyInput />
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
                      <MoneyInput />
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
                      <MoneyInput />
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
                      <MoneyInput />
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
                      <MoneyInput />
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
                      <MoneyInput />
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
                      <MoneyInput />
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
                      <MoneyInput />
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
                      <MoneyInput />
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
                      <MoneyInput />
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
                      <MoneyInput />
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
            </Form>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default AssumptionFrom;
