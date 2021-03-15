import React, { Fragment, useState } from "react";
import { Col, Form, Input, InputNumber, Modal, Row, Select, Switch, Table } from "antd";
// @ts-ignore
import CurrencyFormat from "react-currency-format";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import IInputs from "../../../../interfaces/IInputs";
import { AlertAction } from "../../../../redux/general/alert";
import { LoadingAction } from "../../../../redux/general/loading";
import Text from "antd/lib/typography/Text";
import { firstColumnWidth, secondColumnWidth, thirdColumnWidth } from "../../CommonVariable";
import ViewButton from "../sharedComponents/ViewButton";
import { pound } from "../../../../components/currencySumbol";
import { numberFormat } from "highcharts";

const { useForm } = Form;
const { Option } = Select;

const Mortgages = () => {
  const dispatch = useDispatch();
  const inputs: IInputs = useSelector((state: RootStateOrAny) => state.currentInputSetReducer);

  const [isModelVisible, setIsModelVisible] = useState(false);

  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const [form] = useForm();

  const [mortgages, setMortgages] = useState(JSON.parse(JSON.stringify(inputs.liabilities.mortgages)));

  const columns: any = [
    {
      dataIndex: "name",
      width: firstColumnWidth,
    },
    {
      dataIndex: "original_balance",
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

  const data = inputs.liabilities.mortgages;

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
              inputs.current_year <= record.end_year && inputs.current_year >= record.start_year
                ? false
                : true,
            style: {
              cursor: "pointer",
            },
          };
        }}
      />

      <Modal
        title="Mortgages Details"
        visible={isModelVisible}
        cancelText="Close"
        okText="Ok"
        onOk={() => setIsModelVisible(false)}
        onCancel={() => setIsModelVisible(false)}
      >
        <Form form={form} labelAlign="left" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
          <Form.Item label="Mortgages of:">
            <Text>{inputs.liabilities.mortgages[activeItemIndex].name}</Text>
          </Form.Item>
          <Form.Item label="Original Balance" rules={[{ required: true, message: "This is required" }]}>
            <Text>
              <CurrencyFormat
                value={inputs.liabilities.mortgages[activeItemIndex].original_balance}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"£ "}
              />
            </Text>
          </Form.Item>
          <Form.Item label="Interest Rate" rules={[{ required: true, message: "This is required" }]}>
            <Text>
              <CurrencyFormat
                value={inputs.liabilities.mortgages[activeItemIndex].interest_rate * 100}
                displayType={"text"}
                decimalScale={2}
                suffix={" %"}
              />
            </Text>
          </Form.Item>
          <Form.Item label="Start year">
            <Text>{inputs.liabilities.mortgages[activeItemIndex].start_year}</Text>
          </Form.Item>
          <Form.Item label="Start year fro model">
            <Text>{inputs.liabilities.mortgages[activeItemIndex].start_year_for_model}</Text>
          </Form.Item>
          <Form.Item label="Mortgages Period" rules={[{ required: true, message: "This is required" }]}>
            <Text>
              <CurrencyFormat
                value={inputs.liabilities.mortgages[activeItemIndex].mortgage_period}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" Year"}
              />
            </Text>
          </Form.Item>
          <Form.Item label="End year">
            <Text>{inputs.liabilities.mortgages[activeItemIndex].end_year}</Text>
          </Form.Item>
          <Form.Item label="Number of payments per year">
            <Text>
              <CurrencyFormat
                value={inputs.liabilities.mortgages[activeItemIndex].number_of_payments_per_year}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" Year"}
              />
            </Text>
          </Form.Item>
          <Form.Item label="Annual Payment">
            <Text>
              <CurrencyFormat
                value={Math.round(inputs.liabilities.mortgages[activeItemIndex].annual_payment)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"£ "}
              />
            </Text>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default Mortgages;
