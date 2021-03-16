import React, { Fragment, useState } from "react";
import {  Form,   Modal,   Table } from "antd";

// @ts-ignore
import CurrencyFormat from "react-currency-format";
import { RootStateOrAny,  useSelector } from "react-redux";
import IInputs from "../../../../interfaces/IInputs";

import Text from "antd/lib/typography/Text";
import { firstColumnWidth, secondColumnWidth, thirdColumnWidth } from "../../CommonVariable";
import ViewButton from "../sharedComponents/ViewButton";
import { numberFormat } from "highcharts";
import { pound } from "../../../../components/currencySumbol";

const { useForm } = Form;

const Employment = () => {
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
      dataIndex: "gross_anual_amount",
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
      render: (text: any, record: any) => <ViewButton onClick={() => setIsModelVisible(true)} />,
    },
  ];

  const data = inputs.household_income.employment_income;

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
            onClick: (event) => {
              setActiveItemIndex(rowIndex!);
              setIsModelVisible(true);
              // console.log(properties[activeItemIndex]);
            },
            hidden: record.gross_anual_amount <= 0,
            style: {
              cursor: "pointer",
            },
          };
        }}
      />
      <Modal
        title="Employment Details"
        visible={isModelVisible}
        cancelText="Close"
        okText="Ok"
        onOk={() => setIsModelVisible(false)}
        onCancel={() => setIsModelVisible(false)}
      >
        <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Form.Item label="Employment of:">
            <Text>{inputs.household_income.employment_income[activeItemIndex].name}</Text>
          </Form.Item>
          <Form.Item label="Gross Annual Amount" rules={[{ required: true, message: "This is required" }]}>
            <Text>
              <CurrencyFormat
                value={inputs.household_income.employment_income[activeItemIndex].gross_anual_amount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"£ "}
              />
            </Text>
          </Form.Item>
          <Form.Item label="Inflation" rules={[{ required: true, message: "This is required" }]}>
            <Text>{inputs.household_income.employment_income[activeItemIndex].inflation * 100}%</Text>
          </Form.Item>
          <Form.Item label="Start year">
            <Text>{inputs.household_income.employment_income[activeItemIndex].start_year}</Text>
          </Form.Item>
          <Form.Item label="End year">
            <Text>{inputs.household_income.employment_income[activeItemIndex].end_year}</Text>
          </Form.Item>
          <Form.Item label="Member's Contribution">
            <Text>
              {inputs.household_income.employment_income[activeItemIndex].member_contribution * 100}%
            </Text>
          </Form.Item>
          <Form.Item label="Employer's Contribution">
            <Text>
              {inputs.household_income.employment_income[activeItemIndex].employer_contribution * 100}%
            </Text>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default Employment;
