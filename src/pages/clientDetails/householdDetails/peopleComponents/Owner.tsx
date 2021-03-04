import {Col, Form, Input, InputNumber, Modal, Row, Switch, Table} from "antd";
import IInputs from "../../../../interfaces/IInputs";
import React, { Fragment, useState } from "react";
import ViewButton from "../sharedComponents/ViewButton";
import Text from "antd/lib/typography/Text";
import { useForm } from "antd/lib/form/Form";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {AlertAction} from "../../../../redux/general/alert";
import {LoadingAction} from "../../../../redux/general/loading";

const Owner = (props: any) => {
  const dispatch = useDispatch();
  const inputs: IInputs = useSelector(
      (state: RootStateOrAny) => state.currentInputSetReducer
  );

  const [isModelVisible, setIsModelVisible] = useState(false);

  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const [ownerDetails, setOwnerDetails] = useState(
      JSON.parse(JSON.stringify(inputs.household_owners))
  );

  const [form] = useForm();

  const [editMode, setEditMode] = useState(false);

  const { household_owners } = inputs;

  const columns: any = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Birth Year",
      dataIndex: "birth_year",
      key: "1",
    },
    {
      title: "Current Age",
      dataIndex: "current_age",
      key: "2",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text: any, record: any) => (
          <ViewButton onClick={() => setIsModelVisible(true)} />
      ),
    },
  ];

  const data = household_owners.map((o: any, i: number) => {
    const {
      name,
      birth_year,
      current_age,
      retirement_age,
      retirement_year,
      end_of_forecast_age,
      end_of_forecast_year,
    } = o;
    return {
      key: o._id,
      name,
      birth_year,
      current_age,
      retirement_age,
      retirement_year,
      end_of_forecast_age,
      end_of_forecast_year,
    };
  });
  return (
      <Fragment>
        <Table
            size="small"
            columns={columns}
            dataSource={data}
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

          <Form form={form} labelAlign={"left"} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Form.Item label="Name">
              {editMode ? (
                  <Input
                      value={ownerDetails[activeItemIndex].name}
                      onChange={(e) => {
                        const clone = JSON.parse(JSON.stringify(ownerDetails));
                        clone[activeItemIndex].name = e;
                        setOwnerDetails(clone);
                      }}
                  />
              ) : (
                  <Text>{inputs.household_owners[activeItemIndex].name}</Text>
              )}
            </Form.Item>
            <Form.Item label="Birth Year">
              {editMode ? (
                  <Input
                      value={ownerDetails[activeItemIndex].birth_year}
                      onChange={(e) => {
                        const clone = JSON.parse(JSON.stringify(ownerDetails));
                        clone[activeItemIndex].birth_year = e;
                        setOwnerDetails(clone);
                      }}
                  />
              ) : (
                  <Text>{inputs.household_owners[activeItemIndex].birth_year}</Text>
              )}
            </Form.Item>
            <Form.Item label="Current Age">
              <Text>{inputs.household_owners[activeItemIndex].current_age}</Text>
            </Form.Item>
            <Form.Item label="Retirement age">
              {editMode ? (
                  <InputNumber
                      style={{ width: "100%" }}
                      value={ownerDetails[activeItemIndex].retirement_age}
                      onChange={(e) => {
                        const clone = JSON.parse(JSON.stringify(ownerDetails));
                        clone[activeItemIndex].retirement_age = e;
                        setOwnerDetails(clone);
                      }}
                  />
              ) : (
                  <Text>{inputs.household_owners[activeItemIndex].retirement_age}</Text>
              )}
            </Form.Item>
            <Form.Item label="Retirement Year">
              <Text>{inputs.household_owners[activeItemIndex].retirement_year}</Text>
            </Form.Item>
            <Form.Item label="End of Forecast Age">
              <Text>{inputs.household_owners[activeItemIndex].end_of_forecast_age}</Text>
            </Form.Item>
            <Form.Item label="End of Forecast year">
              <Text>{inputs.household_owners[activeItemIndex].end_of_forecast_year}</Text>
            </Form.Item>
          </Form>
        </Modal>
      </Fragment>
  );
};

export default Owner;
