import React, { Fragment, useState } from "react";
import {   Form,   Modal,   Table, Typography } from "antd";
// @ts-ignore
import CurrencyFormat from "react-currency-format";
import { RootStateOrAny,  useSelector } from "react-redux";
import IInputs from "../../../../interfaces/IInputs";

import { firstColumnWidth, secondColumnWidth } from "../../CommonVariable";
import ViewButton from "../sharedComponents/ViewButton";
import { numberFormat } from "highcharts";
import { pound } from "../../../../components/currencySumbol";

const { Text } = Typography;
const { useForm } = Form;

const SAI = () => {

  const inputs: IInputs = useSelector((state: RootStateOrAny) => state.currentInputSetReducer);

  const [isModelVisible, setIsModelVisible] = useState(false);
  const [isModelVisible2, setIsModelVisible2] = useState(false);

  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [activeOwnerIndex, setActiveOwnerIndex] = useState(0);

  const [form] = useForm();

  const columns: any = [
    {
      dataIndex: "name",
      width: firstColumnWidth,
    },
    {
      dataIndex: "amount_to_drawn_down",
      width: secondColumnWidth,
      align: "right",
      render: (text: any, record: any) => (
        <Text>
          {pound}
          {inputs.current_year <= record.end_year && inputs.current_year >= record.start_year
            ? numberFormat(text, 0, ".", ",")
            : 0}
        </Text>
      ),
    },
    {
      dataIndex: "action",
      render: (text: any, record: any) => <ViewButton onClick={() => setIsModelVisible(true)} />,
    },
  ];

  const columns2: any = [
    {
      dataIndex: "name",
      width: firstColumnWidth,
    },
    {
      dataIndex: "amount_to_drawn_down",
      width: secondColumnWidth,
      align: "right",
      render: (text: any, record: any) => (
        <Text>
          {pound}
          {inputs.current_year <= record.end_year && inputs.current_year >= record.start_year
            ? numberFormat(text, 0, ".", ",")
            : 0}
        </Text>
      ),
    },
    {
      dataIndex: "action",
      render: (text: any, record: any) => <ViewButton onClick={() => setIsModelVisible2(true)} />,
    },
  ];

  return (
    <Fragment>
      {inputs.household_income.savings_and_investments_drawdowns.individual_savings_accounts.map(
        (o: any, i: any) => {
          return (
            <div>
              <Text strong> {o.owner_name} </Text>
              <Table
                size="small"
                columns={columns}
                dataSource={o.drawdowns}
                showHeader={false}
                pagination={false}
                bordered={false}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      setActiveOwnerIndex(i);
                      setActiveItemIndex(rowIndex!);
                      setIsModelVisible(true);
                    },
                    hidden:
                      !(inputs.current_year <= record.end_year && inputs.current_year >= record.start_year),
                    style: {
                      cursor: "pointer",
                    },
                  };
                }}
                rowKey={(record) => record._id}
              />
            </div>
          );
        }
      )}

      {inputs.household_income.savings_and_investments_drawdowns.general_investment_accounts.map(
        (o: any, i: any) => {
          return (
            <div>
              <Text strong> {o.owner_name} </Text>
              <Table
                size="small"
                columns={columns2}
                dataSource={o.drawdowns}
                showHeader={false}
                pagination={false}
                bordered={false}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      setActiveOwnerIndex(i);
                      setActiveItemIndex(rowIndex!);
                      setIsModelVisible2(true);
                    },
                    hidden:
                      !(inputs.current_year <= record.end_year && inputs.current_year >= record.start_year),
                    style: {
                      cursor: "pointer",
                    },
                  };
                }}
                rowKey={(record) => record._id}
              />
            </div>
          );
        }
      )}

      <Modal
        title="Individual Savings Accounts Drawdowns"
        visible={isModelVisible}
        cancelText="Close"
        okText="Ok"
        onOk={() => setIsModelVisible(false)}
        onCancel={() => setIsModelVisible(false)}
      >
        <Form form={form} labelAlign="left" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Form.Item label="Drawdown Name">
            <Text>
              {
                inputs.household_income.savings_and_investments_drawdowns.individual_savings_accounts[
                  activeOwnerIndex
                ].drawdowns[activeItemIndex].name
              }
            </Text>
          </Form.Item>
          <Form.Item label="Annual Amount" rules={[{ required: true, message: "This is required" }]}>
            <Text>
              <CurrencyFormat
                value={
                  inputs.household_income.savings_and_investments_drawdowns.individual_savings_accounts[
                    activeOwnerIndex
                  ].drawdowns[activeItemIndex].amount_to_drawn_down
                }
                displayType={"text"}
                thousandSeparator={true}
                prefix={"£ "}
              />
            </Text>
          </Form.Item>

          <Form.Item label="Start year">
            <Text>
              {
                inputs.household_income.savings_and_investments_drawdowns.individual_savings_accounts[
                  activeOwnerIndex
                ].drawdowns[activeItemIndex].start_year
              }
            </Text>
          </Form.Item>
          <Form.Item label="End year">
            <Text>
              {
                inputs.household_income.savings_and_investments_drawdowns.individual_savings_accounts[
                  activeOwnerIndex
                ].drawdowns[activeItemIndex].end_year
              }
            </Text>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="General Investments Accounts Drawdowns"
        visible={isModelVisible2}
        cancelText="Close"
        okText="Ok"
        onOk={() => setIsModelVisible2(false)}
        onCancel={() => setIsModelVisible2(false)}
      >
        <Form form={form} labelAlign="left" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Form.Item label="Drawdown Name">
            <Text>
              {
                inputs.household_income.savings_and_investments_drawdowns.general_investment_accounts[
                  activeOwnerIndex
                ].drawdowns[activeItemIndex].name
              }
            </Text>
          </Form.Item>
          <Form.Item label="Annual Amount" rules={[{ required: true, message: "This is required" }]}>
            <Text>
              <CurrencyFormat
                value={
                  inputs.household_income.savings_and_investments_drawdowns.general_investment_accounts[
                    activeOwnerIndex
                  ].drawdowns[activeItemIndex].amount_to_drawn_down
                }
                displayType={"text"}
                thousandSeparator={true}
                prefix={"£ "}
              />
            </Text>
          </Form.Item>

          <Form.Item label="Start year">
            <Text>
              {
                inputs.household_income.savings_and_investments_drawdowns.general_investment_accounts[
                  activeOwnerIndex
                ].drawdowns[activeItemIndex].start_year
              }
            </Text>
          </Form.Item>
          <Form.Item label="End year">
            <Text>
              {
                inputs.household_income.savings_and_investments_drawdowns.general_investment_accounts[
                  activeOwnerIndex
                ].drawdowns[activeItemIndex].end_year
              }
            </Text>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default SAI;
