import React, { Fragment, useState } from "react";
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
import { firstColumnWidth, secondColumnWidth } from "../../CommonVariable";
import ViewButton from "../sharedComponents/ViewButton";
import { numberFormat } from "highcharts";
import { pound } from "../../../../components/currencySumbol";

const { Text } = Typography;
const { useForm } = Form;

const SAI = () => {
  const dispatch = useDispatch();
  const inputs: IInputs = useSelector(
    (state: RootStateOrAny) => state.currentInputSetReducer
  );

  const [isModelVisible, setIsModelVisible] = useState(false);
  const [isModelVisible2, setIsModelVisible2] = useState(false);

  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [activeOwnerIndex, setActiveOwnerIndex] = useState(0);

  const [form] = useForm();

  const [incomeDetails, setIncomeDetails] = useState(
    JSON.parse(
      JSON.stringify(inputs.household_income.savings_and_investments_drawdowns)
    )
  );


  const [editMode, setEditMode] = useState(false);

  const columns: any = [
    {
      dataIndex: "name",
      width: firstColumnWidth,
    },
    {
      dataIndex: "amount_to_drawn_down",
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

  const columns2: any = [
    {
      dataIndex: "name",
      width: firstColumnWidth,
    },
    {
      dataIndex: "amount_to_drawn_down",
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
          <ViewButton onClick={() => setIsModelVisible2(true)} />
      ),
    },
  ];

  return (
    <Fragment>
      {inputs.household_income.savings_and_investments_drawdowns.individual_savings_accounts.map(
        (o: any, i: any) => {
          return (
            <div>
              <Text strong> {o.owner_name} </Text>
              <Table
                size="small"
                columns={columns}
                dataSource={o.drawdowns}
                showHeader={false}
                pagination={false}
                bordered={false}
                rowKey={(record) => record._id}
              />

            </div>
          );
        }
      )}

      {inputs.household_income.savings_and_investments_drawdowns.general_investment_accounts.map(
          (o: any, i: any) => {
            return (
                <div>
                  <Text strong> {o.owner_name} </Text>
                  <Table
                      size="small"
                      columns={columns2}
                      dataSource={o.drawdowns}
                      showHeader={false}
                      pagination={false}
                      bordered={false}
                      onRow={(record, rowIndex) => {
                        return {
                          onClick: (event) => {
                            setActiveOwnerIndex(i);
                            setActiveItemIndex(rowIndex!);
                          },
                        };
                      }}
                      rowKey={(record) => record._id}
                  />

                </div>
            );
          }
      )}

      <Modal
        title="Individual Savings Accounts Drawdowns"
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
          <Form.Item label="Drawdown Name">
            {editMode ? (
              <Input
                value={incomeDetails[activeOwnerIndex].owner_name}
                onChange={(e) => {
                  const clone = JSON.parse(JSON.stringify(incomeDetails));
                  clone[activeItemIndex].owner_name = e;
                  setIncomeDetails(clone);
                }}
              />
            ) : (
              <Text>
                {
                  inputs.household_income.savings_and_investments_drawdowns.individual_savings_accounts[
                    activeOwnerIndex
                  ].drawdowns[activeItemIndex].name
                }
              </Text>
            )}
          </Form.Item>
          <Form.Item
            label="Annual Amount"
            rules={[{ required: true, message: "This is required" }]}
          >
            {editMode ? (
              <InputNumber
                value={incomeDetails[activeOwnerIndex].drawdowns[activeItemIndex].amount_to_drawn_down}
                style={{ width: "100%" }}
                onChange={(e) => {
                  const clone = JSON.parse(JSON.stringify(incomeDetails));
                  clone[activeItemIndex].amount_to_drawn_down = +e!;
                  setIncomeDetails(clone);
                }}
              />
            ) : (
              <Text>
                <CurrencyFormat
                  value={
                    inputs.household_income.savings_and_investments_drawdowns.individual_savings_accounts[
                      activeOwnerIndex
                    ].drawdowns[activeItemIndex].amount_to_drawn_down
                  }
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"£ "}
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
                  const clone = JSON.parse(JSON.stringify(incomeDetails));
                  clone[activeItemIndex].start_year = +dateString;
                  setIncomeDetails(clone);
                }}
              />
            ) : (
              <Text>
                {
                  inputs.household_income.savings_and_investments_drawdowns.individual_savings_accounts[
                    activeOwnerIndex
                  ].drawdowns[activeItemIndex].start_year
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
                  const clone = JSON.parse(JSON.stringify(incomeDetails));
                  clone[activeItemIndex].end_year = +dateString;
                  setIncomeDetails(clone);
                }}
              />
            ) : (
              <Text>
                {
                  inputs.household_income.savings_and_investments_drawdowns.individual_savings_accounts[
                    activeOwnerIndex
                  ].drawdowns[activeItemIndex].end_year
                }
              </Text>
            )}
          </Form.Item>
        </Form>
      </Modal>

















      <Modal
          title="General Investments Accounts Drawdowns"
          visible={isModelVisible2}
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
          onCancel={() => setIsModelVisible2(false)}
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
          <Form.Item label="Drawdown Name">
            {editMode ? (
                <Input
                    value={incomeDetails[activeOwnerIndex].owner_name}
                    onChange={(e) => {
                      const clone = JSON.parse(JSON.stringify(incomeDetails));
                      clone[activeItemIndex].owner_name = e;
                      setIncomeDetails(clone);
                    }}
                />
            ) : (
                <Text>
                  {
                    inputs.household_income.savings_and_investments_drawdowns.general_investment_accounts[
                        activeOwnerIndex
                        ].drawdowns[activeItemIndex].name
                  }
                </Text>
            )}
          </Form.Item>
          <Form.Item
              label="Annual Amount"
              rules={[{ required: true, message: "This is required" }]}
          >
            {editMode ? (
                <InputNumber
                    value={incomeDetails[activeOwnerIndex].drawdowns[activeItemIndex].amount_to_drawn_down}
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      const clone = JSON.parse(JSON.stringify(incomeDetails));
                      clone[activeItemIndex].amount_to_drawn_down = +e!;
                      setIncomeDetails(clone);
                    }}
                />
            ) : (
                <Text>
                  <CurrencyFormat
                      value={
                        inputs.household_income.savings_and_investments_drawdowns.general_investment_accounts[
                            activeOwnerIndex
                            ].drawdowns[activeItemIndex].amount_to_drawn_down
                      }
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"£ "}
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
                      const clone = JSON.parse(JSON.stringify(incomeDetails));
                      clone[activeItemIndex].start_year = +dateString;
                      setIncomeDetails(clone);
                    }}
                />
            ) : (
                <Text>
                  {
                    inputs.household_income.savings_and_investments_drawdowns.general_investment_accounts[
                        activeOwnerIndex
                        ].drawdowns[activeItemIndex].start_year
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
                      const clone = JSON.parse(JSON.stringify(incomeDetails));
                      clone[activeItemIndex].end_year = +dateString;
                      setIncomeDetails(clone);
                    }}
                />
            ) : (
                <Text>
                  {
                    inputs.household_income.savings_and_investments_drawdowns.general_investment_accounts[
                        activeOwnerIndex
                        ].drawdowns[activeItemIndex].end_year
                  }
                </Text>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default SAI;
