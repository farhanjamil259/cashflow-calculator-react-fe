import {  Form,   Modal,   Table } from "antd";
import IInputs from "../../../../interfaces/IInputs";
import React, { Fragment, useState } from "react";
import ViewButton from "../sharedComponents/ViewButton";
import Text from "antd/lib/typography/Text";
import { useForm } from "antd/lib/form/Form";
import { RootStateOrAny,  useSelector } from "react-redux";

const Owner = () => {
  const inputs: IInputs = useSelector((state: RootStateOrAny) => state.currentInputSetReducer);

  const [isModelVisible, setIsModelVisible] = useState(false);

  const [activeItemIndex, setActiveItemIndex] = useState(0);


  const [form] = useForm();

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
      render: () => <ViewButton onClick={() => setIsModelVisible(true)} />,
    },
  ];

  const data = household_owners.map((o: any) => {
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
            onClick: () => {
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
        okText="Ok"
        onOk={() => setIsModelVisible(false)}
        onCancel={() => setIsModelVisible(false)}
      >
        <Form form={form} labelAlign={"left"} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Form.Item label="Name">
            <Text>{inputs.household_owners[activeItemIndex].name}</Text>
          </Form.Item>
          <Form.Item label="Birth Year">
            <Text>{inputs.household_owners[activeItemIndex].birth_year}</Text>
          </Form.Item>
          <Form.Item label="Current Age">
            <Text>{inputs.household_owners[activeItemIndex].current_age}</Text>
          </Form.Item>
          <Form.Item label="Retirement age">
            <Text>{inputs.household_owners[activeItemIndex].retirement_age}</Text>
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
