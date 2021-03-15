import React, { useState } from "react";
import { Col, Form, InputNumber, Modal, Row, Switch, Table, Typography } from "antd";
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

const ChildrenEducation = () => {
  const dispatch = useDispatch();
  const inputs: IInputs = useSelector((state: RootStateOrAny) => state.currentInputSetReducer);

  const [isModelVisiblePrimary, setIsModelVisiblePrimary] = useState(false);
  const [isModelVisibleSecondary, setIsModelVisibleSecondary] = useState(false);
  const [isModelVisibleUniversity, setIsModelVisibleUniversity] = useState(false);

  const [form] = useForm();

  const [primarySchool, setPrimarySchool] = useState(
    JSON.parse(JSON.stringify(inputs.household_expenses.children_education_expenses.primary_school_fees))
  );
  const [secondarySchool, setSecondarySchool] = useState(
    JSON.parse(JSON.stringify(inputs.household_expenses.children_education_expenses.seconday_school_fees))
  );
  const [university, setUniversity] = useState(
    JSON.parse(JSON.stringify(inputs.household_expenses.children_education_expenses.university_fees))
  );

  const columns: any = [
    {
      dataIndex: "name",
      width: firstColumnWidth,
    },
    {
      dataIndex: "annual_expense",
      width: secondColumnWidth,
      align: "right",
      render: (text: any, record: any, index: any) => (
        <Text>
          {pound}
          {inputs.children[0].primary_school_year >= inputs.current_year &&
          inputs.children[0].secondary_school_year <= inputs.current_year
            ? numberFormat(text, 0, ".", ",")
            : inputs.children[0].secondary_school_year >= inputs.current_year &&
              inputs.children[0].university_year <= inputs.current_year
            ? numberFormat(text, 0, ".", ",")
            : inputs.children[0].university_year >= inputs.current_year &&
              inputs.children[0].graduation_year <= inputs.current_year
            ? numberFormat(text, 0, ".", ",")
            : 0}
        </Text>
      ),
    },
    {
      dataIndex: "action",
      width: thirdColumnWidth,
      render: (text: any, record: any) => (
        <ViewButton
          onClick={() => {
            if (record.name === "Primary School Fees") {
              setIsModelVisiblePrimary(true);
            }
            if (record.name === "Secondary School Fees") {
              setIsModelVisibleSecondary(true);
            }
            if (record.name === "University Fees") {
              setIsModelVisibleUniversity(true);
            }
          }}
        />
      ),
    },
  ];

  const data = [
    {
      name: "Primary School Fees",
      annual_expense:
        inputs.household_expenses.children_education_expenses.primary_school_fees.annual_fee_in_todays_terms,
      inflation: inputs.household_expenses.children_education_expenses.primary_school_fees.inflation,
    },
    {
      name: "Secondary School Fees",
      annual_expense:
        inputs.household_expenses.children_education_expenses.seconday_school_fees.annual_fee_in_todays_terms,
      inflation: inputs.household_expenses.children_education_expenses.seconday_school_fees.inflation,
    },
    {
      name: "University Fees",
      annual_expense:
        inputs.household_expenses.children_education_expenses.university_fees.annual_fee_in_todays_terms,
      inflation: inputs.household_expenses.children_education_expenses.university_fees.inflation,
    },
  ];

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
              console.log(record);
              setIsModelVisiblePrimary(true);
            },
            hidden:
              inputs.children[0].primary_school_year >= inputs.current_year &&
              inputs.children[0].secondary_school_year <= inputs.current_year &&
              inputs.children[0].university_year
                ? true
                : true,
          };
        }}
      />
      <Modal
        title="Children Education Expense"
        visible={isModelVisiblePrimary}
        cancelText="Close"
        okText="Ok"
        onOk={() => setIsModelVisiblePrimary(false)}
        onCancel={() => setIsModelVisiblePrimary(false)}
      >
        <Form form={form} labelAlign="left" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
          <Form.Item label="Expense Name " rules={[{ required: true, message: "This is required" }]}>
            <Text>Primary School Fees</Text>
          </Form.Item>
          <Form.Item label="Annual Fee in Todays Terms">
            <Text>
              <CurrencyFormat
                value={
                  inputs.household_expenses.children_education_expenses.primary_school_fees
                    .annual_fee_in_todays_terms
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
                  inputs.household_expenses.children_education_expenses.primary_school_fees.inflation * 100
                }
                displayType={"text"}
                decimalScale={2}
                suffix={"%"}
              />
            </Text>
          </Form.Item>
        </Form>
      </Modal>
      {/*Secondary School Modal*/}
      <Modal
        title="Children Education Expense"
        visible={isModelVisibleSecondary}
        cancelText="Close"
        okText="Ok"
        onOk={() => setIsModelVisibleSecondary(false)}
        onCancel={() => setIsModelVisibleSecondary(false)}
      >
        <Form form={form} labelAlign="left" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
          <Form.Item label="Expense Name " rules={[{ required: true, message: "This is required" }]}>
            <Text>Secondary School Fees</Text>
          </Form.Item>
          <Form.Item label="Annual Fee in Todays Terms">
            <Text>
              <CurrencyFormat
                value={
                  inputs.household_expenses.children_education_expenses.seconday_school_fees
                    .annual_fee_in_todays_terms
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
                  inputs.household_expenses.children_education_expenses.seconday_school_fees.inflation * 100
                }
                displayType={"text"}
                decimalScale={2}
                suffix={"%"}
              />
            </Text>
          </Form.Item>
        </Form>
      </Modal>
      {/*University School Modal*/}
      <Modal
        title="Children Education Expense"
        visible={isModelVisibleUniversity}
        cancelText="Close"
        okText="Ok"
        onOk={() => setIsModelVisibleUniversity(false)}
        onCancel={() => setIsModelVisibleUniversity(false)}
      >
        <Form form={form} labelAlign="left" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
          <Form.Item label="Expense Name " rules={[{ required: true, message: "This is required" }]}>
            <Text>University Fees</Text>
          </Form.Item>
          <Form.Item label="Annual Fee in Todays Terms">
            <Text>
              <CurrencyFormat
                value={
                  inputs.household_expenses.children_education_expenses.university_fees
                    .annual_fee_in_todays_terms
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
                value={inputs.household_expenses.children_education_expenses.university_fees.inflation * 100}
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

export default ChildrenEducation;
