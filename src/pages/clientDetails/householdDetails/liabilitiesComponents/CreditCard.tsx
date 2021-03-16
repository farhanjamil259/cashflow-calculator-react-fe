import React, { Fragment, useState } from "react";
import {  Form,   Modal,   Table } from "antd";

// @ts-ignore
import CurrencyFormat from "react-currency-format";
import { RootStateOrAny,  useSelector } from "react-redux";
import IInputs from "../../../../interfaces/IInputs";

import Text from "antd/lib/typography/Text";
import { firstColumnWidth, secondColumnWidth, thirdColumnWidth } from "../../CommonVariable";
import ViewButton from "../sharedComponents/ViewButton";

const { useForm } = Form;

const CreditCard = () => {
  const inputs: IInputs = useSelector((state: RootStateOrAny) => state.currentInputSetReducer);

  const [isModelVisible, setIsModelVisible] = useState(false);


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
      render: (text: any, record: any) => (
        <Text>
          <CurrencyFormat value={text} displayType={"text"} thousandSeparator={true} prefix={"£"} />
        </Text>
      ),
    },
    {
      dataIndex: "action",
      width: thirdColumnWidth,
      render: (text: any, record: any) => <ViewButton onClick={() => setIsModelVisible(true)} />,
    },
  ];

  const data = [
    {
      name: inputs.liabilities.credit_card.name,
      original_balance: inputs.liabilities.credit_card.original_balance,
    },
  ];

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

              setIsModelVisible(true);
              // console.log(properties[activeItemIndex]);
            },
            hidden: record.original_balance <= 0,
          };
        }}
      />
      <Modal
        title="Credit Card"
        visible={isModelVisible}
        cancelText="Close"
        okText="Ok"
        onOk={() => setIsModelVisible(false)}
        onCancel={() => setIsModelVisible(false)}
      >
        <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Form.Item label="Credit Card:">
            <Text>{inputs.liabilities.credit_card.name}</Text>
          </Form.Item>
          <Form.Item label="Original Balance" rules={[{ required: true, message: "This is required" }]}>
            <Text>
              <CurrencyFormat
                value={inputs.liabilities.credit_card.original_balance}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </Text>
          </Form.Item>
          <Form.Item label="Interest rate" rules={[{ required: true, message: "This is required" }]}>
            <Text>
              <CurrencyFormat
                value={inputs.liabilities.credit_card.interest_rate * 100}
                displayType={"text"}
                decimalScale={2}
                suffix={"%"}
              />
            </Text>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default CreditCard;
