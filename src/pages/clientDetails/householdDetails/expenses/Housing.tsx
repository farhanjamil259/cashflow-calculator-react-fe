import React, { useState } from "react";
import {
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Switch,
  Table,
  Typography,
} from "antd";
// @ts-ignore
import CurrencyFormat from "react-currency-format";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import IInputs from "../../../../interfaces/IInputs";
import { AlertAction } from "../../../../redux/general/alert";
import { LoadingAction } from "../../../../redux/general/loading";
import {firstColumnWidth, secondColumnWidth, thirdColumnWidth} from "../../CommonVariable";
import ViewButton from "../sharedComponents/ViewButton";
import {pound} from "../../../../components/currencySumbol";
import {numberFormat} from "highcharts";

const { Text } = Typography;
const { useForm } = Form;

const Housing = () => {
  const dispatch = useDispatch();
  const inputs: IInputs = useSelector(
    (state: RootStateOrAny) => state.currentInputSetReducer
  );

  const [isModelVisible, setIsModelVisible] = useState(false);

  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const [form] = useForm();

  const [expensesDetails, setExpensesDetails] = useState(
    JSON.parse(JSON.stringify(inputs.household_expenses.housing.details))
  );

  const [editMode, setEditMode] = useState(false);

  const columns: any = [
    {
      dataIndex: "name",
      width: firstColumnWidth

    },
    {
      dataIndex: "annual_expense",
      width: secondColumnWidth,
      align: "right",
      render: (text: any, record: any) => (
          <Text>
            <Text>
              {pound}{inputs.current_year <= record.end_year && inputs.current_year>= record.start_year ? numberFormat(text, 0, ".", ",") : 0}
            </Text>
          </Text>
      ),
    },
    {
      dataIndex: "action",
      width: thirdColumnWidth,
      render: () => (
          <ViewButton onClick={()=>setIsModelVisible(true)}/>
      ),
    },
  ];

  const data = inputs.household_expenses.housing.details;

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
              setActiveItemIndex(rowIndex!);
              // console.log(properties[activeItemIndex]);
            },
          };
        }}
      />
      <Modal
        title="Housing Expense Details"
        visible={isModelVisible}
        cancelText="Close"
        okButtonProps={{hidden : !editMode}}
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

        <Form form={form} labelAlign="left" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Form.Item label="Expenses Name">
            {editMode ? (
              <Input
                value={expensesDetails[activeItemIndex].name}
                onChange={(e) => {
                  const clone = JSON.parse(JSON.stringify(expensesDetails));
                  clone[activeItemIndex].name = e;
                  setExpensesDetails(clone);
                }}
              />
            ) : (
              <Text>
                {
                  inputs.household_expenses.housing.details[activeItemIndex]
                    .name
                }
              </Text>
            )}
          </Form.Item>
          <Form.Item label="Share of Rental Income">
            {editMode ? (
              <InputNumber
                value={expensesDetails[activeItemIndex].annual_expense}
                style={{ width: "100%" }}
                onChange={(e) => {
                  const clone = JSON.parse(JSON.stringify(expensesDetails));
                  clone[activeItemIndex].annual_expense = +e!;
                  setExpensesDetails(clone);
                }}
              />
            ) : (
              <Text>
                <CurrencyFormat
                  value={
                    inputs.household_expenses.housing.details[activeItemIndex]
                      .annual_expense
                  }
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"£"}
                />
              </Text>
            )}
          </Form.Item>
          <Form.Item
            label="Inflation"
            rules={[{ required: true, message: "This is required" }]}
          >
            <Text>
              <CurrencyFormat
                value={
                  inputs.household_expenses.housing.details[activeItemIndex]
                    .inflation * 100
                }
                displayType={"text"}
                decimalScale={2}
                suffix={"%"}
              />
            </Text>
          </Form.Item>
          <Form.Item label="Start year">
            {editMode ? (
              <DatePicker
                picker="year"
                className="custom-input-fields"
                onChange={(date: any, dateString: any) => {
                  const clone = JSON.parse(JSON.stringify(expensesDetails));
                  clone[activeItemIndex].start_year = +dateString;
                  setExpensesDetails(clone);
                }}
              />
            ) : (
              <Text>
                {
                  inputs.household_expenses.housing.details[activeItemIndex]
                    .start_year
                }
              </Text>
            )}
          </Form.Item>
          <Form.Item label="End year">
            {editMode ? (
              <DatePicker
                picker="year"
                className="custom-input-fields"
                onChange={(date: any, dateString: any) => {
                  const clone = JSON.parse(JSON.stringify(expensesDetails));
                  clone[activeItemIndex].end_year = +dateString;
                  setExpensesDetails(clone);
                }}
              />
            ) : (
              <Text>
                {
                  inputs.household_expenses.housing.details[activeItemIndex]
                    .end_year
                }
              </Text>
            )}
          </Form.Item>
          <Form.Item label="Share of Rental Income">
            {editMode ? (
              <InputNumber
                value={expensesDetails[activeItemIndex].rate_after_retirement}
                style={{ width: "100%" }}
                onChange={(e) => {
                  const clone = JSON.parse(JSON.stringify(expensesDetails));
                  clone[activeItemIndex].rate_after_retirement = +e!;
                  setExpensesDetails(clone);
                }}
              />
            ) : (
              <Text>
                <CurrencyFormat
                  value={
                    inputs.household_expenses.housing.details[activeItemIndex]
                      .rate_after_retirement * 100
                  }
                  displayType={"text"}
                  decimalScale={2}
                  suffix={"%"}
                />
              </Text>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Housing;
