import React, { Fragment, useState } from "react";
import {
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
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
import {firstColumnWidth, secondColumnWidth, thirdColumnWidth} from "../../CommonVariable";
import ViewButton from "../sharedComponents/ViewButton";
import { numberFormat } from "highcharts";
import { pound } from "../../../../components/currencySumbol";

const { useForm } = Form;

const Employment = () => {
  const dispatch = useDispatch();
  const inputs: IInputs = useSelector(
    (state: RootStateOrAny) => state.currentInputSetReducer
  );

  const [isModelVisible, setIsModelVisible] = useState(false);

  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const [form] = useForm();

  const [employment, setEmployment] = useState(
    JSON.parse(JSON.stringify(inputs.household_income.employment_income))
  );

  const [editMode, setEditMode] = useState(false);

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
            {pound}{inputs.current_year <= record.end_year && inputs.current_year>= record.start_year ? numberFormat(text, 0, ".", ",") : 0}
          </Text>
      ),
    },
    {
      dataIndex: "action",
      width: thirdColumnWidth,
      render: (text: any, record: any) => (
          <ViewButton onClick={()=>setIsModelVisible(true)}/>
      ),
    },
  ];

  const data = inputs.household_income.employment_income;

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
        title="Employment Details"
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

        <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Form.Item label="Employment of:">
            {editMode ? (
              <Input
                value={employment[activeItemIndex].name}
                onChange={(e) => {
                  const clone = JSON.parse(JSON.stringify(employment));
                  clone[activeItemIndex].name = e;
                  setEmployment(clone);
                }}
              />
            ) : (
              <Text>
                {
                  inputs.household_income.employment_income[activeItemIndex]
                    .name
                }
              </Text>
            )}
          </Form.Item>
          <Form.Item
            label="Gross Annual Amount"
            rules={[{ required: true, message: "This is required" }]}
          >
            {editMode ? (
              <InputNumber
                value={employment[activeItemIndex].gross_anual_amount}
                style={{ width: "100%" }}
                onChange={(e) => {
                  const clone = JSON.parse(JSON.stringify(employment));
                  clone[activeItemIndex].gross_anual_amount = +e!;
                  setEmployment(clone);
                }}
              />
            ) : (
              <Text>
                <CurrencyFormat
                  value={
                    inputs.household_income.employment_income[activeItemIndex]
                      .gross_anual_amount
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
              {inputs.household_income.employment_income[activeItemIndex]
                  .inflation * 100}%
            </Text>
          </Form.Item>
          <Form.Item label="Start year">
            <Text>
              {
                inputs.household_income.employment_income[activeItemIndex]
                  .start_year
              }
            </Text>
          </Form.Item>
          <Form.Item label="End year">
            <Text>
              {
                inputs.household_income.employment_income[activeItemIndex]
                  .end_year
              }
            </Text>
          </Form.Item>
          <Form.Item label="Member's Contribution">
            <Text>
              {
                inputs.household_income.employment_income[activeItemIndex]
                    .member_contribution * 100
              }%
            </Text>
          </Form.Item>
          <Form.Item label="Employer's Contribution">
            <Text>
              {
                inputs.household_income.employment_income[activeItemIndex]
                    .employer_contribution*100
              }%
            </Text>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default Employment;
