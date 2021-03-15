import React, { Fragment, useState } from "react";
import { Col, Form, Input, InputNumber, Modal, Row, Switch, Table } from "antd";
// @ts-ignore
import CurrencyFormat from "react-currency-format";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import IInputs from "../../../../interfaces/IInputs";
import { AlertAction } from "../../../../redux/general/alert";
import { LoadingAction } from "../../../../redux/general/loading";
import Text from "antd/lib/typography/Text";
import { firstColumnWidth, secondColumnWidth } from "../../CommonVariable";
import ViewButton from "../sharedComponents/ViewButton";
import { pound } from "../../../../components/currencySumbol";
import { numberFormat } from "highcharts";

const { useForm } = Form;

const SelfEmployment = () => {
  const dispatch = useDispatch();
  const inputs: IInputs = useSelector((state: RootStateOrAny) => state.currentInputSetReducer);

  const [isModelVisible, setIsModelVisible] = useState(false);

  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const [form] = useForm();

  const [selfEmployment, setSelfEmployment] = useState(
    JSON.parse(JSON.stringify(inputs.household_income.self_employment_income))
  );

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
      render: (text: any, record: any) => <ViewButton onClick={() => setIsModelVisible(true)} />,
    },
  ];

  const data: any = inputs.household_income.self_employment_income;

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
              // console.log(selfEmployment[activeItemIndex]);
            },
            hidden: record.gross_anual_amount > 0 ? false : true,
            style: {
              cursor: "pointer",
            },
          };
        }}
      />
      <Modal
        title="Self-Employment Details"
        visible={isModelVisible}
        cancelText="Close"
        okText="Ok"
        onOk={() => setIsModelVisible(false)}
        onCancel={() => setIsModelVisible(false)}
      >
        <Form form={form} labelAlign="left" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
          <Form.Item label="Self-Employment Details">
            <Text>{inputs.household_income.self_employment_income[activeItemIndex].name}</Text>
          </Form.Item>
          <Form.Item label="Gross Annual Amount" rules={[{ required: true, message: "This is required" }]}>
            <Text>
              <CurrencyFormat
                value={inputs.household_income.self_employment_income[activeItemIndex].gross_anual_amount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"£ "}
              />
            </Text>
          </Form.Item>
          <Form.Item label="Inflation" rules={[{ required: true, message: "This is required" }]}>
            <Text>
              <CurrencyFormat
                value={inputs.household_income.self_employment_income[activeItemIndex].inflation * 100}
                displayType={"text"}
                decimalScale={2}
                suffix={"%"}
              />
            </Text>
          </Form.Item>
          <Form.Item label="Start year">
            <Text>{inputs.household_income.self_employment_income[activeItemIndex].start_year}</Text>
          </Form.Item>
          <Form.Item label="End year">
            <Text>{inputs.household_income.self_employment_income[activeItemIndex].end_year}</Text>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default SelfEmployment;
