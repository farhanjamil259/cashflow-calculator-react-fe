import React, {Fragment, useState} from "react";
import {Col, DatePicker, Form, Input, Modal, Row, Switch, Table, Typography} from "antd";
// @ts-ignore
import CurrencyFormat from "react-currency-format";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import IInputs from "../../../../interfaces/IInputs";
import {AlertAction} from "../../../../redux/general/alert";
import {LoadingAction} from "../../../../redux/general/loading";
import {firstColumnWidth, secondColumnWidth} from "../../CommonVariable";
import ViewButton from "../sharedComponents/ViewButton";
import { numberFormat } from "highcharts";
import { pound } from "../../../../components/currencySumbol";

const { Text } = Typography;
const { useForm } = Form;

const Dividend = () => {
  const dispatch = useDispatch();
  const inputs: IInputs = useSelector(
      (state: RootStateOrAny) => state.currentInputSetReducer
  );

  const [isModelVisible, setIsModelVisible] = useState(false);

  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const [form] = useForm();

  const [incomeDetails, setIncomeDetails] = useState(
      JSON.parse(JSON.stringify(inputs.household_income.dividend_income))
  );

  const [editMode, setEditMode] = useState(false);

  const columns: any = [

    {
      dataIndex: "name",
        width: firstColumnWidth
    },
    {
      dataIndex: "anual_amount",
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
          <ViewButton onClick={()=>setIsModelVisible(true)}/>
      ),
    },
  ];

  const data = inputs.household_income.dividend_income


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
          title="Dividend Income Details"
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
          <Form.Item label="Dividend Income of:">
            {editMode ? (
                <Input
                    value={incomeDetails[activeItemIndex].name}
                    onChange={(e) => {
                      const clone = JSON.parse(JSON.stringify(incomeDetails));
                      clone[activeItemIndex].name = e;
                      setIncomeDetails(clone);
                    }}
                />
            ) : (
                <Text>
                  {
                    inputs.household_income.dividend_income[activeItemIndex]
                        .name
                  }
                </Text>
            )}
          </Form.Item>
         < Form.Item label="Annual Amount">
           {editMode ? (
               <Input
                   value={incomeDetails[activeItemIndex].anual_amount}
                   onChange={(e) => {
                     const clone = JSON.parse(JSON.stringify(incomeDetails));
                     clone[activeItemIndex].anual_amount = e;
                     setIncomeDetails(clone);
                   }}
               />
           ) : (
               <Text>
                 <CurrencyFormat
                     value={
                       inputs.household_income.dividend_income[activeItemIndex]
                           .anual_amount
                     }
                     displayType={"text"}
                     thousandSeparator={true}
                     prefix={"£ "}
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
                    inputs.household_income.dividend_income[activeItemIndex]
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
                          const clone = JSON.parse(JSON.stringify(incomeDetails));
                          clone[activeItemIndex].start_year = +dateString;
                          setIncomeDetails(clone);
                      }}
                  />
              ) : (
            <Text>
              {
                inputs.household_income.dividend_income[activeItemIndex]
                    .start_year
              }
            </Text>)}
          </Form.Item>
          <Form.Item label="End year">
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
                inputs.household_income.dividend_income[activeItemIndex]
                    .end_year
              }
            </Text>
                  )}
          </Form.Item>
        </Form>
      </Modal>

    </Fragment>
  );
};

export default Dividend;
