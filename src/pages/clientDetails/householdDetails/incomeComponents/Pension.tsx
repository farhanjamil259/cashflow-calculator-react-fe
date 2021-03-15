import React, { Fragment, useState } from "react";
import { Col, Form, Input, InputNumber, Modal, Row, Select, Switch, Table } from "antd";
import { firstColumnWidth, secondColumnWidth, thirdColumnWidth } from "../../CommonVariable";
import Text from "antd/lib/typography/Text";
// @ts-ignore
import CurrencyFormat from "react-currency-format";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import IInputs from "../../../../interfaces/IInputs";
import ViewButton from "../sharedComponents/ViewButton";
import { AlertAction } from "../../../../redux/general/alert";
import { LoadingAction } from "../../../../redux/general/loading";
import { pound } from "../../../../components/currencySumbol";
import { numberFormat } from "highcharts";

const { useForm } = Form;
const { Option } = Select;

const Pension = () => {
  const dispatch = useDispatch();
  const inputs: IInputs = useSelector((state: RootStateOrAny) => state.currentInputSetReducer);

  const [statePensionModel, setStatePensionModel] = useState(false);
  const [definedBenefitModel, setDefinedBenefitModel] = useState(false);
  const [definedContributionModel, setDefinedContributionModel] = useState(false);

  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const [form] = useForm();

  const [statePension, setStatePension] = useState(
    JSON.parse(JSON.stringify(inputs.household_income.pension_income.state_pension))
  );
  const [definedBenifit, setDefinedBenifit] = useState(
    JSON.parse(JSON.stringify(inputs.household_income.pension_income.defined_benifit_pension_plans))
  );
  const [definedContribution, setDefinedContribution] = useState(
    JSON.parse(JSON.stringify(inputs.household_income.pension_income.defined_contribution_pension_plans))
  );

  // State Pension
  const columnsStatePension: any = [
    {
      dataIndex: "name",
      width: firstColumnWidth,
    },
    {
      dataIndex: "annual_amount",
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
      render: (text: any, record: any) => <ViewButton onClick={() => setStatePensionModel(true)} />,
    },
  ];

  const dataStatePension = inputs.household_income.pension_income.state_pension;

  // Defined Benefit Pension Plans
  const columnsDefinedBenefit: any = [
    {
      dataIndex: "name",
      width: firstColumnWidth,
    },
    {
      dataIndex: "estimated_lump_sum",
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
      render: (text: any, record: any) => <ViewButton onClick={() => setDefinedBenefitModel(true)} />,
    },
  ];

  const dataDefinedBenefit = inputs.household_income.pension_income.defined_benifit_pension_plans;

  // Defined Contribution Pension Plans
  const columnsDefinedContribution: any = [
    {
      dataIndex: "name",
      width: firstColumnWidth,
    },

    {
      dataIndex: "drawdown_option_annual_amount",
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
      render: (text: any, record: any) => <ViewButton onClick={() => setDefinedContributionModel(true)} />,
    },
  ];

  const dataDefinedContribution = inputs.household_income.pension_income.defined_contribution_pension_plans;

  return (
    <Fragment>
      {/*State Pension */}
      <Text strong={true}>State Pension</Text>
      <Table
        size="small"
        columns={columnsStatePension}
        dataSource={dataStatePension}
        showHeader={false}
        pagination={false}
        bordered={false}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setActiveItemIndex(rowIndex!);
              setStatePensionModel(true);
              // console.log(properties[activeItemIndex]);
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
        title="State Pension Details"
        visible={statePensionModel}
        cancelText="Close"
        okText="Ok"
        onOk={() => setStatePensionModel(false)}
        onCancel={() => setStatePensionModel(false)}
      >
        <Form form={form} labelAlign={"left"} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Form.Item label="Pension of:">
            <Text>{inputs.household_income.pension_income.state_pension[activeItemIndex].name}</Text>
          </Form.Item>
          <Form.Item label="Annual Amount" rules={[{ required: true, message: "This is required" }]}>
            <Text>
              <CurrencyFormat
                value={inputs.household_income.pension_income.state_pension[activeItemIndex].annual_amount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"£ "}
              />
            </Text>
          </Form.Item>
          <Form.Item label="Inflation" rules={[{ required: true, message: "This is required" }]}>
            <Text>
              <CurrencyFormat
                value={inputs.household_income.pension_income.state_pension[activeItemIndex].inflation * 100}
                displayType={"text"}
                decimalScale={2}
                suffix={"%"}
              />
            </Text>
          </Form.Item>
          <Form.Item label="State Pension Age">
            <Text>
              {inputs.household_income.pension_income.state_pension[activeItemIndex].state_pension_age}
            </Text>
          </Form.Item>

          <Form.Item label="Start year">
            <Text>{inputs.household_income.pension_income.state_pension[activeItemIndex].start_year}</Text>
          </Form.Item>
          <Form.Item label="End year">
            <Text>{inputs.household_income.pension_income.state_pension[activeItemIndex].end_year}</Text>
          </Form.Item>
        </Form>
      </Modal>

      {/*Defined Benefit Pension Plans*/}
      <Text strong={true}>Defined Benefit Pension</Text>
      <Table
        size="small"
        columns={columnsDefinedBenefit}
        dataSource={dataDefinedBenefit}
        showHeader={false}
        pagination={false}
        bordered={false}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setActiveItemIndex(rowIndex!);
              setDefinedBenefitModel(true);
              // console.log(properties[activeItemIndex]);
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
        title="Defined Benifit Pension Details"
        visible={definedBenefitModel}
        cancelText="Close"
        okText="Ok"
        onOk={() => setDefinedBenefitModel(false)}
        onCancel={() => setDefinedBenefitModel(false)}
      >
        <Form form={form} labelAlign={"left"} labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
          <Form.Item label="Pension of:">
            <Text>
              {inputs.household_income.pension_income.defined_benifit_pension_plans[activeItemIndex].name}
            </Text>
          </Form.Item>
          <Form.Item label="Option Taken">
            <Text>
              {
                inputs.household_income.pension_income.defined_benifit_pension_plans[activeItemIndex]
                  .option_taken
              }
            </Text>
          </Form.Item>
          <Form.Item label="Estimated Lump Sum" rules={[{ required: true, message: "This is required" }]}>
            <Text>
              <CurrencyFormat
                value={
                  inputs.household_income.pension_income.defined_benifit_pension_plans[activeItemIndex]
                    .estimated_lump_sum
                }
                displayType={"text"}
                thousandSeparator={true}
                prefix={"£ "}
              />
            </Text>
          </Form.Item>
          <Form.Item
            label="Estimated Annual Pension"
            rules={[{ required: true, message: "This is required" }]}
          >
            <Text>
              <CurrencyFormat
                value={
                  inputs.household_income.pension_income.defined_benifit_pension_plans[activeItemIndex]
                    .estimated_annual_pension
                }
                displayType={"text"}
                thousandSeparator={true}
                prefix={"£ "}
              />
            </Text>
          </Form.Item>
          <Form.Item label="Annual Increase">
            <Text>
              <CurrencyFormat
                value={
                  inputs.household_income.pension_income.defined_benifit_pension_plans[activeItemIndex]
                    .annual_increase
                }
                displayType={"text"}
                decimalScale={2}
                suffix={"%"}
              />
            </Text>
          </Form.Item>

          <Form.Item label="Start year">
            <Text>{inputs.household_income.pension_income.state_pension[activeItemIndex].start_year}</Text>
          </Form.Item>
          <Form.Item label="End year">
            <Text>{inputs.household_income.pension_income.state_pension[activeItemIndex].end_year}</Text>
          </Form.Item>
        </Form>
      </Modal>

      {/*Defined Contribution Pension Plan*/}
      <Text strong={true}>Defined Contribution Pension Plan</Text>
      <Table
        size="small"
        columns={columnsDefinedContribution}
        dataSource={dataDefinedContribution}
        showHeader={false}
        pagination={false}
        bordered={false}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setActiveItemIndex(rowIndex!);
              setDefinedContribution(true);
              // console.log(properties[activeItemIndex]);
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
        title="Defined Contribution Pension Details"
        visible={definedContributionModel}
        cancelText="Close"
        okText="Ok"
        onOk={() => setDefinedContributionModel(false)}
        onCancel={() => setDefinedContributionModel(false)}
      >
        <Form form={form} labelAlign={"left"} labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
          <Form.Item label="Pension of:">
            <Text>
              {
                inputs.household_income.pension_income.defined_contribution_pension_plans[activeItemIndex]
                  .name
              }
            </Text>
          </Form.Item>
          <Form.Item label="Option Taken">
            <Text>
              {
                inputs.household_income.pension_income.defined_contribution_pension_plans[activeItemIndex]
                  .option_taken
              }
            </Text>
          </Form.Item>
          <Form.Item label="Annuity Option" rules={[{ required: true, message: "This is required" }]}>
            <Text>
              <CurrencyFormat
                value={
                  inputs.household_income.pension_income.defined_contribution_pension_plans[activeItemIndex]
                    .annuity_option_initial_drawdown * 100
                }
                displayType={"text"}
                decimalScale={2}
                suffix={"%"}
              />
            </Text>
          </Form.Item>

          <Form.Item label="Annuity Option Rate" rules={[{ required: true, message: "This is required" }]}>
            <Text>
              <CurrencyFormat
                value={
                  inputs.household_income.pension_income.defined_contribution_pension_plans[activeItemIndex]
                    .annuity_option_annual_annuity_rate * 100
                }
                displayType={"text"}
                decimalScale={2}
                suffix={"%"}
              />
            </Text>
          </Form.Item>

          <Form.Item label="Drawdown Annual Increase">
            <Text>
              <CurrencyFormat
                value={
                  inputs.household_income.pension_income.defined_contribution_pension_plans[activeItemIndex]
                    .drawdown_option_annual_amount
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
                inputs.household_income.pension_income.defined_contribution_pension_plans[activeItemIndex]
                  .start_year
              }
            </Text>
          </Form.Item>
          <Form.Item label="End year">
            <Text>
              {
                inputs.household_income.pension_income.defined_contribution_pension_plans[activeItemIndex]
                  .end_year
              }
            </Text>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default Pension;
