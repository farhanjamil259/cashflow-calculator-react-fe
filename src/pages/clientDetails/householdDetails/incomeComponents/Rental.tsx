import React, { Fragment, useState } from "react";
import {   Form,   Modal,   Table, Typography } from "antd";

// @ts-ignore
import CurrencyFormat from "react-currency-format";
import { RootStateOrAny,  useSelector } from "react-redux";
import IInputs from "../../../../interfaces/IInputs";
import { firstColumnWidth, secondColumnWidth } from "../../CommonVariable";
import ViewButton from "../sharedComponents/ViewButton";
import { pound } from "../../../../components/currencySumbol";
import { numberFormat } from "highcharts";

const { Text } = Typography;
const { useForm } = Form;

const Rental = () => {
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
      render: (text: any, record: any) => <ViewButton onClick={() => setIsModelVisible(true)} />,
    },
  ];

  const data: any = inputs.household_income.rental_income.details;

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
              setActiveItemIndex(rowIndex!);
              setIsModelVisible(true);
              // console.log(properties[activeItemIndex]);
            },
            hidden:
              !(inputs.current_year <= record.end_year && inputs.current_year >= record.start_year),
            style: {
              cursor: "pointer",
            },
          };
        }}
      />

      <Modal
        title="Rental Income Details"
        visible={isModelVisible}
        cancelText="Close"
        okText="Ok"
        onOk={() => setIsModelVisible(false)}
        onCancel={() => setIsModelVisible(false)}
      >
        <Form form={form} labelAlign="left" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          {/*need to fix--not in State--------------------------------------------------------------------------*/}
          <Form.Item label="Joint Annual Rental">
            <Text>
              <CurrencyFormat
                value={inputs.household_income.rental_income.joint_annual_rental_income}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"£"}
              />
            </Text>
          </Form.Item>

          <Form.Item label="Rental Income of:">
            <Text>{inputs.household_income.rental_income.details[activeItemIndex].name}</Text>
          </Form.Item>
          <Form.Item label="Share of Rental Income">
            <Text>
              <CurrencyFormat
                value={
                  inputs.household_income.rental_income.details[activeItemIndex].share_of_rental_income * 100
                }
                displayType={"text"}
                decimalScale={2}
                suffix={"%"}
              />
            </Text>
          </Form.Item>
          <Form.Item label="Annual Amount">
            <Text>
              <CurrencyFormat
                value={inputs.household_income.rental_income.details[activeItemIndex].annual_amount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"£ "}
              />
            </Text>
          </Form.Item>
          <Form.Item label="Inflation" rules={[{ required: true, message: "This is required" }]}>
            <Text>
              <CurrencyFormat
                value={inputs.household_income.rental_income.details[activeItemIndex].inflation * 100}
                displayType={"text"}
                decimalScale={2}
                suffix={"%"}
              />
            </Text>
          </Form.Item>
          <Form.Item label="Start year">
            <Text>{inputs.household_income.rental_income.details[activeItemIndex].start_year}</Text>{" "}
          </Form.Item>
          <Form.Item label="End year">
            <Text>{inputs.household_income.rental_income.details[activeItemIndex].end_year}</Text>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default Rental;
