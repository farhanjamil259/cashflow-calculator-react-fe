import React, { Fragment, useState } from "react";
import {
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Switch,
  Table,
} from "antd";

// @ts-ignore
import CurrencyFormat from "react-currency-format";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import IInputs from "../../../../interfaces/IInputs";
import { AlertAction } from "../../../../redux/general/alert";
import { LoadingAction } from "../../../../redux/general/loading";
import Text from "antd/lib/typography/Text";
import { firstColumnWidth, secondColumnWidth } from "../../CommonVariable";
import ViewButton from "../sharedComponents/ViewButton";
import {pound} from "../../../../components/currencySumbol";
import {numberFormat} from "highcharts";

const { useForm } = Form;
const { Option } = Select;

const OtherLoan = () => {
  const dispatch = useDispatch();
  const inputs: IInputs = useSelector(
    (state: RootStateOrAny) => state.currentInputSetReducer
  );

  const [isModelVisible, setIsModelVisible] = useState(false);

  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const [form] = useForm();

  const [otherLoan, setOtherLoan] = useState(
    JSON.parse(JSON.stringify(inputs.liabilities.other_loans))
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
            {pound}{inputs.current_year <= record.end_year && inputs.current_year>= record.start_year ? numberFormat(text, 0, ".", ",") : 0}
          </Text>
      ),
    },
    {
      dataIndex: "action",
      render: (text: any, record: any) => (
        <ViewButton onClick={() => setIsModelVisible(true)} />
      ),
    },
  ];

  const data: any = inputs.liabilities.other_loans;

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
        title="Other Loan Details"
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

        <Form
          form={form}
          labelAlign="left"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item label="Loan of:">
            {editMode ? (
              <Input
                value={otherLoan[activeItemIndex].name}
                onChange={(e) => {
                  const clone = JSON.parse(JSON.stringify(otherLoan));
                  clone[activeItemIndex].name = e;
                  setOtherLoan(clone);
                }}
              />
            ) : (
              <Text>
                {inputs.liabilities.other_loans[activeItemIndex].name}
              </Text>
            )}
          </Form.Item>
          <Form.Item
            label="Original Balance"
            rules={[{ required: true, message: "This is required" }]}
          >
            {editMode ? (
              <InputNumber
                value={otherLoan[activeItemIndex].original_balance}
                style={{ width: "100%" }}
                onChange={(e) => {
                  const clone = JSON.parse(JSON.stringify(otherLoan));
                  clone[activeItemIndex].original_balance = +e!;
                  setOtherLoan(clone);
                }}
              />
            ) : (
              <Text>
                <CurrencyFormat
                  value={
                    inputs.liabilities.other_loans[activeItemIndex]
                      .original_balance
                  }
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"£ "}
                />
              </Text>
            )}
          </Form.Item>
          <Form.Item
            label="Interest rate(APR)"
            rules={[{ required: true, message: "This is required" }]}
          >
            {editMode ? (
              <InputNumber
                value={otherLoan[activeItemIndex].interest_rate }
                style={{ width: "100%" }}
                onChange={(e) => {
                  const clone = JSON.parse(JSON.stringify(otherLoan));
                  clone[activeItemIndex].interest_rate = +e!;
                  setOtherLoan(clone);
                }}
              />
            ) : (
              <Text>
                <CurrencyFormat
                  value={
                    inputs.liabilities.other_loans[activeItemIndex]
                      .interest_rate * 100
                  }
                  displayType={"text"}
                  decimalScale={2}
                  suffix={"%"}
                />
              </Text>
            )}
          </Form.Item>
          <Form.Item label="Start year">
            {editMode ? (
              <DatePicker
                picker="year"
                className="custom-input-fields"
                onChange={(date: any, dateString: any) => {
                  const clone = JSON.parse(JSON.stringify(otherLoan));
                  clone[activeItemIndex].start_year = +dateString;
                  setOtherLoan(clone);
                }}
              />
            ) : (
              <Text>
                {inputs.liabilities.other_loans[activeItemIndex].start_year}
              </Text>
            )}
          </Form.Item>
          <Form.Item label="Start year fro model">
            <Text>
              {
                inputs.liabilities.other_loans[activeItemIndex]
                  .start_year_for_model
              }
            </Text>
          </Form.Item>
          <Form.Item
            label="Mortgages Period"
            rules={[{ required: true, message: "This is required" }]}
          >
            {editMode ? (
              <InputNumber
                value={otherLoan[activeItemIndex].loan_period}
                style={{ width: "100%" }}
                onChange={(e) => {
                  const clone = JSON.parse(JSON.stringify(otherLoan));
                  clone[activeItemIndex].mortgage_period = +e!;
                  setOtherLoan(clone);
                }}
              />
            ) : (
              <Text>
                <CurrencyFormat
                  value={
                    inputs.liabilities.other_loans[activeItemIndex].loan_period
                  }
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" Year"}
                />
              </Text>
            )}
          </Form.Item>
          <Form.Item label="End year">
            <Text>
              {inputs.liabilities.other_loans[activeItemIndex].end_year}
            </Text>
          </Form.Item>
          <Form.Item label="Number of payments per year: ">
            {editMode ? (
              <Select
                defaultValue="12"
                className="custom-input-fields"
                onChange={(e) => {
                  const clone = JSON.parse(JSON.stringify(otherLoan));
                  clone[activeItemIndex].number_of_payments_per_year = +e;
                  setOtherLoan(clone);
                }}
              >
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="4">4</Option>
                <Option value="6">6</Option>
                <Option value="12">12</Option>
              </Select>
            ) : (
              <Text>
                <CurrencyFormat
                  value={
                    inputs.liabilities.other_loans[activeItemIndex]
                      .number_of_payments_per_year
                  }
                  displayType={"text"}
                  suffix={" / Year"}
                />
              </Text>
            )}
          </Form.Item>
          <Form.Item label="Annual Payment">
            <Text>
              <CurrencyFormat
                value={Math.round(
                  inputs.liabilities.other_loans[activeItemIndex].annual_payment
                )}
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

export default OtherLoan;
