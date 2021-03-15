import React, { Fragment, useState } from "react";
import { Col, DatePicker, Form, Input, InputNumber, Modal, Row, Switch, Table, Typography } from "antd";
// @ts-ignore
import CurrencyFormat from "react-currency-format";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import IInputs from "../../../../interfaces/IInputs";
import { AlertAction } from "../../../../redux/general/alert";
import { LoadingAction } from "../../../../redux/general/loading";
import { firstColumnWidth, secondColumnWidth, thirdColumnWidth } from "../../CommonVariable";
import ViewButton from "../sharedComponents/ViewButton";
import { pound } from "../../../../components/currencySumbol";
import { numberFormat } from "highcharts";

const { Text } = Typography;
const { useForm } = Form;

const OneOff = () => {
  const dispatch = useDispatch();
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
      dataIndex: "annual_payment_in_todays_terms",
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

  const data = inputs.household_expenses.one_off_expenses;

  return (
    <Fragment>
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
              console.log(record);
              setActiveItemIndex(rowIndex!);
              setIsModelVisible(true);
            },
            hidden:
              inputs.current_year <= record.end_year && inputs.current_year >= record.start_year
                ? false
                : true,
            style: { cursor: "pointer" },
          };
        }}
      />
      <Modal
        title="One-off Expenses Details"
        visible={isModelVisible}
        cancelText="Close"
        okText="Ok"
        onOk={() => setIsModelVisible(false)}
        onCancel={() => setIsModelVisible(false)}
      >
        <Form form={form} labelAlign="left" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
          <Form.Item label="Expense Name">
            <Text>{inputs.household_expenses.one_off_expenses[activeItemIndex].name}</Text>
          </Form.Item>
          <Form.Item label="Annual Payment in Todays Terms">
            <Text>
              <CurrencyFormat
                value={
                  inputs.household_expenses.one_off_expenses[activeItemIndex].annual_payment_in_todays_terms
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
                value={inputs.household_expenses.one_off_expenses[activeItemIndex].inflation * 100}
                displayType={"text"}
                decimalScale={2}
                suffix={"%"}
              />
            </Text>
          </Form.Item>
          <Form.Item label="Start year">
            <Text>{inputs.household_expenses.one_off_expenses[activeItemIndex].start_year}</Text>
          </Form.Item>
          <Form.Item label="End year">
            <Text>{inputs.household_expenses.one_off_expenses[activeItemIndex].end_year}</Text>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default OneOff;
