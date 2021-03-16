import React, { Fragment, useState } from "react";

import { Col, Form, InputNumber, Modal, Row, Switch, Table } from "antd";

import { IInputs } from "../../../../interfaces/ISubInputs";
import { RootStateOrAny, useSelector } from "react-redux";
import Text from "antd/lib/typography/Text";

// @ts-ignore
import CurrencyFormat from "react-currency-format";
import { firstColumnWidth, secondColumnWidth, thirdColumnWidth } from "../../CommonVariable";

import ViewButton from "../sharedComponents/ViewButton";
import { numberFormat } from "highcharts";
import { pound } from "../../../../components/currencySumbol";

const { useForm } = Form;

const Bank = () => {
  const inputs: IInputs = useSelector((state: RootStateOrAny) => state.currentInputSetReducer);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const [properties, setProperties] = useState(JSON.parse(JSON.stringify(inputs.assets.bank_accounts)));

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
          {pound} {numberFormat(text, 0, ".", ",")}
        </Text>
      ),
    },
    {
      dataIndex: "action",
      width: thirdColumnWidth,
      render: () => <ViewButton onClick={() => setIsModalVisible(true)} />,
    },
  ];

  const data: any = [
    {
      key: "1",
      number: 1,
      name: "Bank Accounts",
      original_balance: inputs.assets.bank_accounts.original_balance,
      minimum_cash_balance_acceptable: inputs.assets.bank_accounts.minimum_cash_balance_acceptable,
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
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              console.log(record);
              setActiveItemIndex(rowIndex!);
              setIsModalVisible(true);
            },
            hidden: record.original_balance <= 0,
            style: {
              cursor: "pointer",
            },
          };
        }}
        rowKey="0"
      />
      <Modal
        title="Bank Account Details"
        visible={isModalVisible}
        cancelText="Close"
        okButtonProps={{ hidden: !editMode }}
        okText="Update"
        onOk={() => {}}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} labelAlign="left">
          <Row justify="end" style={{ marginBottom: "16px" }}>
            <Col>
              <Switch
                unCheckedChildren="Edit"
                checkedChildren="Editing"
                onChange={(e) => {
                  setEditMode(e);
                }}
              />
            </Col>
          </Row>
          <Form.Item label="Bank Account Name:">
            <Text>Aggregated Bank Accounts</Text>
          </Form.Item>
          <Form.Item label="Original Balance" rules={[{ required: true, message: "This is required" }]}>
            {editMode ? (
              <InputNumber
                value={properties.original_balance}
                style={{ width: "100%" }}
                onChange={(e) => {
                  const clone = JSON.parse(JSON.stringify(properties));
                  clone[activeItemIndex].original_balance = +e!;
                  setProperties(clone);
                }}
              />
            ) : (
              <Text>
                <CurrencyFormat
                  value={inputs.assets.bank_accounts.original_balance}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"£"}
                />
              </Text>
            )}
          </Form.Item>
          <Form.Item label="Growth Rate">
            <Text>
              <CurrencyFormat
                value={properties.growth_rate * 100}
                displayType={"text"}
                decimalScale={2}
                suffix={"%"}
              />
            </Text>
          </Form.Item>
          <Form.Item label="Start Year">
            <Text>{properties.start_year}</Text>
          </Form.Item>
          <Form.Item label="End Year">
            <Text>{properties.end_year}</Text>
          </Form.Item>
          <Form.Item label="Original Balance" rules={[{ required: true, message: "This is required" }]}>
            {editMode ? (
              <InputNumber
                value={properties.minimum_cash_balance_acceptable}
                style={{ width: "100%" }}
                onChange={(e) => {
                  const clone = JSON.parse(JSON.stringify(properties));
                  clone[activeItemIndex].minimum_cash_balance_acceptable = +e!;
                  setProperties(clone);
                }}
              />
            ) : (
              <Text>
                <CurrencyFormat
                  value={inputs.assets.bank_accounts.minimum_cash_balance_acceptable}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"£"}
                />
              </Text>
            )}
          </Form.Item>
        </Form>
      </Modal>
      .
    </Fragment>
  );
};

export default Bank;
