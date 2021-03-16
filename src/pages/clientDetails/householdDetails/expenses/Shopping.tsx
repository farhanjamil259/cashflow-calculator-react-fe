import React, { useState } from "react";
import {  Form,   Modal,   Table, Typography } from "antd";
// @ts-ignore
import CurrencyFormat from "react-currency-format";
import { RootStateOrAny,  useSelector } from "react-redux";
import IInputs from "../../../../interfaces/IInputs";
import { firstColumnWidth, secondColumnWidth, thirdColumnWidth } from "../../CommonVariable";
import ViewButton from "../sharedComponents/ViewButton";
import { pound } from "../../../../components/currencySumbol";
import { numberFormat } from "highcharts";

const { Text } = Typography;
const { useForm } = Form;

const Shopping = () => {

  const inputs: IInputs = useSelector((state: RootStateOrAny) => state.currentInputSetReducer);

  const [isModelVisible, setIsModelVisible] = useState(false);

  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const [form] = useForm();

  const columns: any = [
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
      render: () => <ViewButton onClick={() => setIsModelVisible(true)} />,
    },
  ];

  const data = inputs.household_expenses.shopping.details;

  return (
    <div>
      <Table
        size="small"
        columns={columns}
        dataSource={data}
        showHeader={false}
        pagination={false}
        bordered={false}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              setActiveItemIndex(rowIndex!);
              setIsModelVisible(true);
              // console.log(properties[activeItemIndex]);
            },
            hidden: record.annual_expense <= 0,
            style: { cursor: "pointer" },
          };
        }}
      />
      <Modal
        title="Shopping Expense Details"
        visible={isModelVisible}
        cancelText="Close"
        okText="Ok"
        onOk={() => setIsModelVisible(false)}
        onCancel={() => setIsModelVisible(false)}
      >
        <Form form={form} labelAlign="left" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Form.Item label="Expense Name">
            <Text>{inputs.household_expenses.shopping.details[activeItemIndex].name}</Text>
          </Form.Item>
          <Form.Item label="Annual Expense">
            <Text>
              <CurrencyFormat
                value={inputs.household_expenses.shopping.details[activeItemIndex].annual_expense}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"£ "}
              />
            </Text>
          </Form.Item>
          <Form.Item label="Inflation" rules={[{ required: true, message: "This is required" }]}>
            <Text>
              <CurrencyFormat
                value={inputs.household_expenses.shopping.details[activeItemIndex].inflation * 100}
                displayType={"text"}
                decimalScale={2}
                suffix={"%"}
              />
            </Text>
          </Form.Item>
          <Form.Item label="Start year">
            <Text>{inputs.household_expenses.shopping.details[activeItemIndex].start_year}</Text>
          </Form.Item>
          <Form.Item label="End year">
            <Text>{inputs.household_expenses.shopping.details[activeItemIndex].end_year}</Text>
          </Form.Item>
          <Form.Item label="% After Retirement">
            <Text>
              <CurrencyFormat
                value={
                  inputs.household_expenses.shopping.details[activeItemIndex].rate_after_retirement * 100
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

export default Shopping;
