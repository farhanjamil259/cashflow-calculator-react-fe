import React, { useState } from "react";
import { Form, Modal, Table, Typography } from "antd";
// @ts-ignore
import CurrencyFormat from "react-currency-format";
import { RootStateOrAny, useSelector } from "react-redux";
import IInputs from "../../../../interfaces/IInputs";
import { firstColumnWidth, secondColumnWidth, thirdColumnWidth } from "../../CommonVariable";
import ViewButton from "../sharedComponents/ViewButton";
import { pound } from "../../../../components/currencySumbol";
import { numberFormat } from "highcharts";

const { Text } = Typography;
const { useForm } = Form;

const InsurancePolicies = () => {
  const inputs: IInputs = useSelector((state: RootStateOrAny) => state.currentInputSetReducer);

  const [isModelVisible1, setIsModelVisible1] = useState(false);
  const [isModelVisible2, setIsModelVisible2] = useState(false);
  const [isModelVisible3, setIsModelVisible3] = useState(false);

  const [activeItemIndex1, setActiveItemIndex1] = useState(0);
  const [activeItemIndex2, setActiveItemIndex2] = useState(0);
  const [activeItemIndex3, setActiveItemIndex3] = useState(0);

  const [form] = useForm();

  const columns1: any = [
    {
      dataIndex: "name",
      width: firstColumnWidth,
    },
    {
      dataIndex: "annual_expense",
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
      width: thirdColumnWidth,
      render: () => <ViewButton onClick={() => setIsModelVisible1(true)} />,
    },
  ];

  const columns2: any = [
    {
      dataIndex: "name",
      width: firstColumnWidth,
    },
    {
      dataIndex: "annual_expense",
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
      width: thirdColumnWidth,
      render: () => <ViewButton onClick={() => setIsModelVisible2(true)} />,
    },
  ];

  const columns3: any = [
    {
      dataIndex: "name",
      width: firstColumnWidth,
    },
    {
      dataIndex: "annual_expense",
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
      width: thirdColumnWidth,
      render: () => <ViewButton onClick={() => setIsModelVisible3(true)} />,
    },
  ];

  const data1 = inputs.household_expenses.insurance_policies.life_insurance;
  const data2 = inputs.household_expenses.insurance_policies.critical_illness_cover;
  const data3 = inputs.household_expenses.insurance_policies.family_income_benefit;

  return (
    <div>
      <Table
        size="small"
        columns={columns1}
        dataSource={data1}
        showHeader={false}
        pagination={false}
        bordered={false}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              setActiveItemIndex1(rowIndex!);
              setIsModelVisible1(true);
              // console.log(properties[activeItemIndex]);
            },
            hidden: record.annual_expense <= 0,
            style: { cursor: "pointer" },
          };
        }}
      />
      <Modal
        title="Insurance Policy Details"
        visible={isModelVisible1}
        cancelText="Close"
        okText="Ok"
        onOk={() => setIsModelVisible1(false)}
        onCancel={() => setIsModelVisible1(false)}
      >
        <Form form={form} labelAlign="left" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Form.Item label="Expense Name">
            <Text>{inputs.household_expenses.insurance_policies.life_insurance[activeItemIndex1].name}</Text>
          </Form.Item>
          <Form.Item label="Annual Expense">
            <Text>
              <CurrencyFormat
                value={
                  inputs.household_expenses.insurance_policies.life_insurance[activeItemIndex1].annual_expense
                }
                displayType={"text"}
                thousandSeparator={true}
                prefix={"£ "}
              />
            </Text>
          </Form.Item>
          <Form.Item label="Inflation" rules={[{ required: true, message: "This is required" }]}>
            <Text>
              <CurrencyFormat
                value={
                  inputs.household_expenses.insurance_policies.life_insurance[activeItemIndex1].inflation *
                  100
                }
                displayType={"text"}
                decimalScale={2}
                suffix={"%"}
              />
            </Text>
          </Form.Item>
          <Form.Item label="Start year">
            <Text>
              {inputs.household_expenses.insurance_policies.life_insurance[activeItemIndex1].start_year}
            </Text>
          </Form.Item>
          <Form.Item label="End year">
            <Text>
              {inputs.household_expenses.insurance_policies.life_insurance[activeItemIndex1].end_year}
            </Text>
          </Form.Item>
          <Form.Item label="% After Retirement">
            <Text>
              <CurrencyFormat
                value={
                  inputs.household_expenses.insurance_policies.life_insurance[activeItemIndex1]
                    .rate_after_retirement * 100
                }
                displayType={"text"}
                decimalScale={2}
                suffix={"%"}
              />
            </Text>
          </Form.Item>
        </Form>
      </Modal>

      <Table
        size="small"
        columns={columns2}
        dataSource={data2}
        showHeader={false}
        pagination={false}
        bordered={false}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              setActiveItemIndex2(rowIndex!);
              setIsModelVisible2(true);
              // console.log(properties[activeItemIndex]);
            },
            hidden: record.annual_expense <= 0,
            style: { cursor: "pointer" },
          };
        }}
      />
      <Modal
        title="Insurance Policy Details"
        visible={isModelVisible2}
        cancelText="Close"
        okText="Ok"
        onOk={() => setIsModelVisible2(false)}
        onCancel={() => setIsModelVisible2(false)}
      >
        <Form form={form} labelAlign="left" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Form.Item label="Expense Name">
            <Text>
              {inputs.household_expenses.insurance_policies.critical_illness_cover[activeItemIndex2].name}
            </Text>
          </Form.Item>
          <Form.Item label="Annual Expense">
            <Text>
              <CurrencyFormat
                value={
                  inputs.household_expenses.insurance_policies.critical_illness_cover[activeItemIndex2]
                    .annual_expense
                }
                displayType={"text"}
                thousandSeparator={true}
                prefix={"£ "}
              />
            </Text>
          </Form.Item>
          <Form.Item label="Inflation" rules={[{ required: true, message: "This is required" }]}>
            <Text>
              <CurrencyFormat
                value={
                  inputs.household_expenses.insurance_policies.critical_illness_cover[activeItemIndex2]
                    .inflation * 100
                }
                displayType={"text"}
                decimalScale={2}
                suffix={"%"}
              />
            </Text>
          </Form.Item>
          <Form.Item label="Start year">
            <Text>
              {
                inputs.household_expenses.insurance_policies.critical_illness_cover[activeItemIndex2]
                  .start_year
              }
            </Text>
          </Form.Item>
          <Form.Item label="End year">
            <Text>
              {inputs.household_expenses.insurance_policies.critical_illness_cover[activeItemIndex2].end_year}
            </Text>
          </Form.Item>
          <Form.Item label="% After Retirement">
            <Text>
              <CurrencyFormat
                value={
                  inputs.household_expenses.insurance_policies.critical_illness_cover[activeItemIndex2]
                    .rate_after_retirement * 100
                }
                displayType={"text"}
                decimalScale={2}
                suffix={"%"}
              />
            </Text>
          </Form.Item>
        </Form>
      </Modal>

      <Table
        size="small"
        columns={columns3}
        dataSource={data3}
        showHeader={false}
        pagination={false}
        bordered={false}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              setActiveItemIndex3(rowIndex!);
              setIsModelVisible3(true);
              // console.log(properties[activeItemIndex]);
            },
            hidden: record.annual_expense <= 0,
            style: { cursor: "pointer" },
          };
        }}
      />
      <Modal
        title="Insurance Policy Details"
        visible={isModelVisible3}
        cancelText="Close"
        okText="Ok"
        onOk={() => setIsModelVisible3(false)}
        onCancel={() => setIsModelVisible3(false)}
      >
        <Form form={form} labelAlign="left" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Form.Item label="Expense Name">
            <Text>
              {inputs.household_expenses.insurance_policies.family_income_benefit[activeItemIndex3].name}
            </Text>
          </Form.Item>
          <Form.Item label="Annual Expense">
            <Text>
              <CurrencyFormat
                value={
                  inputs.household_expenses.insurance_policies.family_income_benefit[activeItemIndex3]
                    .annual_expense
                }
                displayType={"text"}
                thousandSeparator={true}
                prefix={"£ "}
              />
            </Text>
          </Form.Item>
          <Form.Item label="Inflation" rules={[{ required: true, message: "This is required" }]}>
            <Text>
              <CurrencyFormat
                value={
                  inputs.household_expenses.insurance_policies.family_income_benefit[activeItemIndex3]
                    .inflation * 100
                }
                displayType={"text"}
                decimalScale={2}
                suffix={"%"}
              />
            </Text>
          </Form.Item>
          <Form.Item label="Start year">
            <Text>
              {
                inputs.household_expenses.insurance_policies.critical_illness_cover[activeItemIndex3]
                  .start_year
              }
            </Text>
          </Form.Item>
          <Form.Item label="End year">
            <Text>
              {inputs.household_expenses.insurance_policies.critical_illness_cover[activeItemIndex3].end_year}
            </Text>
          </Form.Item>
          <Form.Item label="% After Retirement">
            <Text>
              <CurrencyFormat
                value={
                  inputs.household_expenses.insurance_policies.critical_illness_cover[activeItemIndex3]
                    .rate_after_retirement * 100
                }
                displayType={"text"}
                decimalScale={2}
                suffix={"%"}
              />
            </Text>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InsurancePolicies;
