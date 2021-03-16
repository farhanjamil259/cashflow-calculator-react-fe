import React, { useState } from "react";
import {  Form,   Modal,   Table } from "antd";
// @ts-ignore
import CurrencyFormat from "react-currency-format";
import { RootStateOrAny,  useSelector } from "react-redux";
import IInputs from "../../../../interfaces/IInputs";
import Text from "antd/lib/typography/Text";
import { firstColumnWidth, secondColumnWidth } from "../../CommonVariable";
import ViewButton from "../sharedComponents/ViewButton";
import { pound } from "../../../../components/currencySumbol";
import { numberFormat } from "highcharts";

const { useForm } = Form;

const PensionPlan = () => {
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
      render: () => <ViewButton onClick={() => setIsModelVisible(true)} />,
    },
  ];

  const data = inputs.assets.non_employment_defined_contribution_pension_plans;

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
            },
            hidden:
              !(inputs.current_year <= record.contribution_end_year &&
                  inputs.current_year >= record.contribution_start_year),
          };
        }}
      />
      <Modal
        title="Pension details"
        visible={isModelVisible}
        cancelText="Close"
        okText="Ok"
        onOk={() => setIsModelVisible(false)}
        onCancel={() => setIsModelVisible(false)}
      >
        <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} labelAlign="left">
          <Form.Item label="Pension of:">
            <Text>
              {inputs.assets.non_employment_defined_contribution_pension_plans[activeItemIndex].name}
            </Text>
          </Form.Item>
          <Form.Item label="Original Balance" rules={[{ required: true, message: "This is required" }]}>
            <Text>
              <CurrencyFormat
                value={
                  inputs.assets.non_employment_defined_contribution_pension_plans[activeItemIndex]
                    .original_balance
                }
                displayType={"text"}
                thousandSeparator={true}
                prefix={"£"}
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
                decimalScale={2}
                suffix={"%"}
              />
            </Text>
          </Form.Item>
          <Form.Item label="Annual Contribution">
            <Text>
              {
                inputs.assets.non_employment_defined_contribution_pension_plans[activeItemIndex]
                  .annual_contribution
              }
            </Text>
          </Form.Item>
          <Form.Item label="Contribution start year">
            <Text>
              {
                inputs.assets.non_employment_defined_contribution_pension_plans[activeItemIndex]
                  .contribution_start_year
              }
            </Text>
          </Form.Item>
          <Form.Item label="Contribution end year">
            <Text>
              {
                inputs.assets.non_employment_defined_contribution_pension_plans[activeItemIndex]
                  .contribution_end_year
              }
            </Text>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PensionPlan;
