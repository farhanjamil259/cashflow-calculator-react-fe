import React, { useState } from "react";
import { Col, Form, Input, InputNumber, Modal, Row, Switch, Table } from "antd";
import IInputs from "../../../../interfaces/IInputs";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import Text from "antd/lib/typography/Text";

// @ts-ignore
import CurrencyFormat from "react-currency-format";
import { AlertAction } from "../../../../redux/general/alert";
import { LoadingAction } from "../../../../redux/general/loading";
import { firstColumnWidth, secondColumnWidth, thirdColumnWidth } from "../../CommonVariable";
import ViewButton from "../sharedComponents/ViewButton";
import { pound } from "../../../../components/currencySumbol";
import { numberFormat } from "highcharts";

const { useForm } = Form;

const SAI = () => {
  const dispatch = useDispatch();
  const inputs: IInputs = useSelector((state: RootStateOrAny) => state.currentInputSetReducer);

  const [isModelVisible, setIsModelVisible] = useState(false);
  const [isModelVisible2, setIsModelVisible2] = useState(false);

  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const [form] = useForm();

  const [sai, setSai] = useState(
    JSON.parse(JSON.stringify(inputs.assets.savings_and_investments.individual_savings_account))
  );

  const [gia, setGia] = useState(
    JSON.parse(JSON.stringify(inputs.assets.savings_and_investments.general_investment_account))
  );

  const columns: any = [
    {
      dataIndex: "name",
      width: firstColumnWidth,
    },
    {
      dataIndex: "original_balance",
      width: secondColumnWidth,
      align: "right",
      render: (text: any) => (
        <Text>
          {pound}
          {numberFormat(text, 0, ".", ",")}
        </Text>
      ),
    },
    {
      dataIndex: "action",
      width: thirdColumnWidth,
      render: () => <ViewButton onClick={() => setIsModelVisible(true)} />,
    },
  ];

  const columns2: any = [
    {
      dataIndex: "name",
      width: firstColumnWidth,
    },
    {
      dataIndex: "original_balance",
      width: secondColumnWidth,
      align: "right",
      render: (text: any) => (
        <Text>
          {pound}
          {numberFormat(text, 0, ".", ",")}
        </Text>
      ),
    },
    {
      dataIndex: "action",
      width: thirdColumnWidth,
      render: () => <ViewButton onClick={() => setIsModelVisible2(true)} />,
    },
  ];

  const data = inputs.assets.savings_and_investments.individual_savings_account;
  const data2 = inputs.assets.savings_and_investments.general_investment_account;

  return (
    <div>
      <Text strong> Individual Savings Accounts </Text>
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
            },
            hidden: record.original_balance > 0 ? false : true,
            style: {
              cursor: "pointer",
            },
          };
        }}
      />
      <Text strong> General Investment Accounts </Text>
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
              setActiveItemIndex(rowIndex!);
              setIsModelVisible2(true);
            },
            hidden: record.original_balance > 0 ? false : true,
            style: {
              cursor: "pointer",
            },
          };
        }}
      />
      <Modal
        title="Individual Savings Account"
        visible={isModelVisible}
        okText="Ok"
        cancelText="Close"
        onOk={() => setIsModelVisible(false)}
        onCancel={() => setIsModelVisible(false)}
      >
        <Form form={form} labelAlign="left" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Form.Item label="Name of:">
            <Text>
              {inputs.assets.savings_and_investments.individual_savings_account[activeItemIndex].name}
            </Text>
          </Form.Item>
          <Form.Item label="Original Balance" rules={[{ required: true, message: "This is required" }]}>
            <Text>
              <CurrencyFormat
                value={
                  inputs.assets.savings_and_investments.individual_savings_account[activeItemIndex]
                    .original_balance
                }
                displayType={"text"}
                thousandSeparator={true}
                decimalScale={2}
                prefix={"£ "}
              />
            </Text>
          </Form.Item>
          <Form.Item label="Growth Rate">
            <Text>
              <CurrencyFormat
                value={
                  inputs.assets.savings_and_investments.individual_savings_account[activeItemIndex]
                    .growth_rate * 100
                }
                displayType={"text"}
                suffix={"%"}
              />
            </Text>
          </Form.Item>
          <Form.Item label="Annual Contribution">
            <Text>
              {
                inputs.assets.savings_and_investments.individual_savings_account[activeItemIndex]
                  .annual_contribution
              }
            </Text>
          </Form.Item>
          <Form.Item label="Contribution start year">
            <Text>
              {
                inputs.assets.savings_and_investments.individual_savings_account[activeItemIndex]
                  .contribution_start_year
              }
            </Text>
          </Form.Item>
          <Form.Item label="Contribution end year">
            <Text>
              {
                inputs.assets.savings_and_investments.individual_savings_account[activeItemIndex]
                  .contribution_end_year
              }
            </Text>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="General Investment Accounts"
        visible={isModelVisible2}
        okText="Ok"
        cancelText="Close"
        onOk={() => setIsModelVisible(false)}
        onCancel={() => setIsModelVisible2(false)}
      >
        <Form form={form} labelAlign="left" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Form.Item label="Name of:">
            <Text>
              {inputs.assets.savings_and_investments.general_investment_account[activeItemIndex].name}
            </Text>
          </Form.Item>
          <Form.Item label="Original Balance" rules={[{ required: true, message: "This is required" }]}>
            <Text>
              <CurrencyFormat
                value={
                  inputs.assets.savings_and_investments.general_investment_account[activeItemIndex]
                    .original_balance
                }
                displayType={"text"}
                thousandSeparator={true}
                decimalScale={2}
                prefix={"£ "}
              />
            </Text>
          </Form.Item>
          <Form.Item label="Growth Rate">
            <Text>
              <CurrencyFormat
                value={
                  inputs.assets.savings_and_investments.general_investment_account[activeItemIndex]
                    .growth_rate * 100
                }
                displayType={"text"}
                suffix={"%"}
              />
            </Text>
          </Form.Item>
          <Form.Item label="Annual Contribution">
            <Text>
              {
                inputs.assets.savings_and_investments.general_investment_account[activeItemIndex]
                  .annual_contribution
              }
            </Text>
          </Form.Item>
          <Form.Item label="Contribution start year">
            <Text>
              {
                inputs.assets.savings_and_investments.general_investment_account[activeItemIndex]
                  .contribution_start_year
              }
            </Text>
          </Form.Item>
          <Form.Item label="Contribution end year">
            <Text>
              {
                inputs.assets.savings_and_investments.general_investment_account[activeItemIndex]
                  .contribution_end_year
              }
            </Text>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SAI;
