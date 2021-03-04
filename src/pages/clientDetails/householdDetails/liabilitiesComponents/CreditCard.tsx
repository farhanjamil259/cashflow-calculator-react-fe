import React, { Fragment, useState } from "react";
import { Col, Form, Input, InputNumber, Modal, Row, Switch, Table } from "antd";

// @ts-ignore
import CurrencyFormat from "react-currency-format";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import IInputs from "../../../../interfaces/IInputs";
import { AlertAction } from "../../../../redux/general/alert";
import { LoadingAction } from "../../../../redux/general/loading";
import Text from "antd/lib/typography/Text";
import {
  firstColumnWidth,
  secondColumnWidth,
  thirdColumnWidth,
} from "../../CommonVariable";
import ViewButton from "../sharedComponents/ViewButton";

const { useForm } = Form;

const CreditCard = () => {
  const dispatch = useDispatch();
  const inputs: IInputs = useSelector(
    (state: RootStateOrAny) => state.currentInputSetReducer
  );

  const [isModelVisible, setIsModelVisible] = useState(false);

  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const [form] = useForm();

  const [creditCard, setCreditCard] = useState(
    JSON.parse(JSON.stringify(inputs.liabilities.credit_card))
  );

  const [editMode, setEditMode] = useState(false);

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
          <CurrencyFormat
            value={text}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"£"}
          />
        </Text>
      ),
    },
    {
      dataIndex: "action",
      width: thirdColumnWidth,
      render: (text: any, record: any) => (
        <ViewButton onClick={() => setIsModelVisible(true)} />
      ),
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
              setActiveItemIndex(rowIndex!);
              // console.log(properties[activeItemIndex]);
            },
          };
        }}
      />
      <Modal
        title="Credit Card"
        visible={isModelVisible}
        cancelText="Close"
        okButtonProps={{ hidden: !editMode }}
        okText={editMode ? "Update" : "Ok"}
        onOk={async () => {
          form
            .validateFields()
            .then(async () => {
              try {
                dispatch(AlertAction("This feature will be soon", "success"));
                dispatch(LoadingAction(false));
                setIsModelVisible(false);
                setEditMode(false);
              } catch (err) {
                console.log(err.message);
                dispatch(AlertAction("Something went wrong", "error"));
                dispatch(LoadingAction(false));
              }
            })
            .catch((info) => console.log("Validation failed", info));
        }}
        onCancel={() => setIsModelVisible(false)}
      >
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

        <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Form.Item label="Credit Card:">
            {editMode ? (
              <Input
                value={creditCard.name}
                onChange={(e) => {
                  const clone = JSON.parse(JSON.stringify(creditCard));
                  clone[activeItemIndex].name = e;
                  setCreditCard(clone);
                }}
              />
            ) : (
              <Text>{inputs.liabilities.credit_card.name}</Text>
            )}
          </Form.Item>
          <Form.Item
            label="Original Balance"
            rules={[{ required: true, message: "This is required" }]}
          >
            {editMode ? (
              <InputNumber
                value={creditCard.original_balance}
                style={{ width: "100%" }}
                onChange={(e) => {
                  const clone = JSON.parse(JSON.stringify(creditCard));
                  clone[activeItemIndex].original_balance = +e!;
                  setCreditCard(clone);
                }}
              />
            ) : (
              <Text>
                <CurrencyFormat
                  value={inputs.liabilities.credit_card.original_balance}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </Text>
            )}
          </Form.Item>
          <Form.Item
            label="Interest rate"
            rules={[{ required: true, message: "This is required" }]}
          >
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
