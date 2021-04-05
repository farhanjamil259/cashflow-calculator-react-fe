import React, { useState } from "react";
import { Card, Col, Row, Typography, Input, Button, Modal, Dropdown, Menu, Form } from "antd";
import Layout from "antd/lib/layout/layout";
import { Table, Space } from "antd";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { inputsFormRoute } from "../../routes/navRoutes";
import { GetInputsAction, setCurrentInputSetAction } from "../../redux/inputs/inputs";
import axios from "axios";
import { AlertAction } from "../../redux/general/alert";

import dummyInputs from "../inputs/data/dummyInputs";
import { IInputs } from "../../interfaces/ISubInputs";
import { clientRoute, inputsRoute, summaryRoute } from "../../routes/apiRoutes";
import { setSummaryAction } from "../../redux/summary/summary";
import CalcRealSummary from "../../helpers/calcRealSummary";
import IAssumptions from "../../interfaces/IAssumptions";
import { setRealSummaryAction } from "../../redux/summary/realSummary";
import { MoreOutlined } from "@ant-design/icons";
import { GetClientsActions, setActiveClientAction } from "../../redux/clients/client";

const { Text, Title } = Typography;
const { TextArea } = Input;

const ClientDashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isModalVisible2, setIsModelVisible2] = useState(false);
  const [clientDeleteModalVisible, setClientDeleteModalVisible] = useState(false);
  const [isModalVisibleClone, setIsModelVisibleClone] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const [loading, setLoading] = useState(false);
  const client = useSelector((state: RootStateOrAny) => state.activeClientReducer);
  const inputs = useSelector((state: RootStateOrAny) => state.inputsReducer);

  const [testState, setTestState] = useState("");
  const columns = [
    {
      title: "#",
      render: (text: any, r: any, i: any) => <>{i + 1}</>,
    },
    {
      title: "Plan Name",
      dataIndex: "set_name",
      key: "set_name",
    },
    {
      title: "",
      dataIndex: "set_name",
      key: "age",

      render: (text: any, record: any) => (
        <>
          {record.people.owner.map((o: any, i: any) => {
            return (
              <span key={i}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  focusable="false"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z"
                    fill={i === 0 ? "#a5d6a7" : "#81d4fa"}
                  />
                  <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill={i === 0 ? "#a5d6a7" : "#81d4fa"} />
                </svg>
              </span>
            );
          })}
          {record.people.child.map((c: any, i: any) => {
            return (
              <span key={i}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  focusable="false"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 32 32"
                >
                  <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#7e57c2" />
                  <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#626262" />
                </svg>
              </span>
            );
          })}
        </>
      ),
    },

    {
      title: "Year",
      dataIndex: "current_year",
      key: "year",
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="2">
                  <Button
                    type="link"
                    onClick={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsModelVisibleClone(true);
                      setSelectedId(record.id);
                    }}
                  >
                    Clone
                  </Button>
                </Menu.Item>
                <Menu.Item key="3">
                  <Button
                    type="link"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedId(record.id);
                      setIsModelVisible2(true);
                    }}
                  >
                    Delete
                  </Button>
                </Menu.Item>
              </Menu>
            }
          >
            <Button
              size="small"
              onClick={async (e) => {
                e.stopPropagation();
              }}
            >
              <MoreOutlined />
            </Button>
          </Dropdown>
        </Space>
      ),
    },
  ];

  const data = useSelector((state: RootStateOrAny) => state.inputsReducer).map((d: any, i: number) => {
    return {
      id: d._id,
      key: d._id,
      set_name: d.input_set_name,
      current_year: d.current_year,

      people: {
        owner: d.household_owners,
        child: d.children,
      },
    };
  });

  const [notes, setNotes] = useState("");

  const assumptions: IAssumptions = useSelector((state: RootStateOrAny) => state.assumptionReducer);

  const [form] = Form.useForm();

  const [newClient, setNewClient] = useState(client);

  return (
    <Layout className="layout" style={{ background: "white" }}>
      <Card bordered={false}>
        <Row gutter={16}>
          <Col lg={8} md={24} sm={24} xs={24}>
            <Card>
              <Row justify="space-between">
                <Col>
                  <Title level={3}>
                    {newClient.fname} {newClient.lname}
                  </Title>
                </Col>
                <Col>
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item key="3">
                          <Button
                            style={{
                              color: "red",
                            }}
                            type="link"
                            onClick={(e) => {
                              e.stopPropagation();
                              setClientDeleteModalVisible(true);
                            }}
                          >
                            Delete
                          </Button>
                        </Menu.Item>
                      </Menu>
                    }
                  >
                    <Button
                      size="small"
                      onClick={async (e) => {
                        e.stopPropagation();
                      }}
                    >
                      <MoreOutlined />
                    </Button>
                  </Dropdown>
                </Col>
              </Row>
              <Row style={{ marginTop: "16px" }}>
                <Col lg={12} md={24} sm={24} xs={24}>
                  <Text>Email</Text>
                  <br />
                  <Text strong>{newClient.email}</Text>
                </Col>

                <Col lg={12} md={24} sm={24} xs={24}>
                  <Text>Phone</Text>
                  <br />
                  <Text strong>{newClient.phone}</Text>
                </Col>
              </Row>
              <Row style={{ marginTop: "16px" }}>
                <Col lg={12} md={24} sm={24} xs={24}>
                  <Text>Mobile</Text>
                  <br />
                  <Text strong>{newClient.mobile}</Text>
                </Col>

                <Col lg={12} md={24} sm={24} xs={24}>
                  <Text>Address</Text>
                  <br />
                  <Text strong>{newClient.address}</Text>
                </Col>
              </Row>
              <Row style={{ marginTop: "16px" }}>
                <Col span={24}>
                  <Text>Notes</Text>
                  <br />
                  <TextArea
                    rows={4}
                    placeholder="No notes added"
                    defaultValue={newClient.notes}
                    onChange={(e) => {
                      setNewClient({ ...newClient, notes: e.target.value });
                    }}
                    onBlur={async (e) => {
                      setLoading(true);
                      const res = await axios.patch(clientRoute, newClient);
                      await dispatch(GetClientsActions());
                      await dispatch(setActiveClientAction(res.data));
                      setLoading(false);
                    }}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col lg={16} md={24} sm={24} xs={24}>
            <Card
              title="Plans"
              extra={
                <>
                  <Button
                    style={{ marginRight: "16px" }}
                    type="dashed"
                    loading={loading}
                    onClick={async () => {
                      const newDummy: IInputs = { ...dummyInputs };
                      newDummy.input_set_name = "Plan #  " + Math.floor(Math.random() * 999);
                      try {
                        setLoading(true);
                        const res = await axios.post(inputsRoute + client._id, newDummy);
                        console.log(res);
                        await dispatch(GetInputsAction(client._id));
                        setLoading(false);
                      } catch (err) {
                        console.log(err);
                      }
                    }}
                  >
                    Create Dummy Plan
                  </Button>
                  <Button
                    loading={loading}
                    type="primary"
                    onClick={() => {
                      history.push(inputsFormRoute);
                    }}
                  >
                    Create new Plan
                  </Button>
                </>
              }
            >
              <Table
                columns={columns}
                loading={loading}
                dataSource={data}
                onRow={(record: any, rowIndex: any) => {
                  return {
                    style: {
                      cursor: "pointer",
                    },
                    onClick: async () => {
                      setLoading(true);
                      dispatch(setCurrentInputSetAction(inputs[rowIndex]));

                      const res = await axios.get(summaryRoute + inputs[0]._id);
                      await dispatch(setSummaryAction(res.data));
                      await dispatch(setRealSummaryAction(CalcRealSummary(res.data, assumptions)));

                      history.push("/dashboard/clientDashboard/clientPlanDetails");
                    },
                  };
                }}
              />
            </Card>
          </Col>
        </Row>
      </Card>

      <Modal
        title={"Clone "}
        okType={"primary"}
        visible={isModalVisibleClone}
        okText="Ok"
        confirmLoading={loading}
        onOk={async () => {
          const inputSetToClone: IInputs = inputs.filter((set: any) => {
            return set._id === selectedId;
          })[0];
          inputSetToClone.input_set_name = testState;
          console.log(inputSetToClone);

          try {
            setLoading(true);
            const res = await axios.post(inputsRoute + client._id, inputSetToClone);
            if (res.status !== 200) {
              dispatch(AlertAction("Plan with the same name already exists", "error"));
              setLoading(false);
            } else {
              await dispatch(GetInputsAction(client._id));
              setLoading(false);
              setIsModelVisibleClone(false);
              dispatch(AlertAction("Plan successfully created" + ": " + res.data.input_set_name, "success"));
              setTestState("");
              form.resetFields();
            }
          } catch (err) {
            console.log(err);
          }
        }}
        onCancel={() => setIsModelVisibleClone(false)}
      >
        <Form
          form={form}
          initialValues={{
            plane_name: "",
          }}
        >
          <Form.Item label="Plan Name">
            <Input
              placeholder="Plan Name"
              name="plane_name"
              value={testState}
              onChange={(e) => {
                setTestState(e.target.value);
              }}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Delete InputSet"
        okType={"danger"}
        visible={isModalVisible2}
        okText="Delete"
        confirmLoading={loading}
        onOk={async () => {
          try {
            await axios.delete(inputsRoute + selectedId);
            dispatch(AlertAction("Input Set Deleted", "error"));
            await dispatch(GetInputsAction(client._id));
            setIsModelVisible2(false);
          } catch (err) {
            console.log(err);
          }
        }}
        onCancel={() => setIsModelVisible2(false)}
      >
        <p>
          <strong>Are you sure you want to delete the input set? </strong>
        </p>
        <p>
          <strong>This action cannot be undone! </strong>
        </p>
      </Modal>

      <Modal
        title="Delete InputSet"
        okType={"danger"}
        visible={clientDeleteModalVisible}
        okText="Delete"
        confirmLoading={loading}
        onOk={async () => {
          try {
            const res = await axios.delete(clientRoute + client._id);
            if (res.status === 200) {
              dispatch(GetClientsActions());
              setClientDeleteModalVisible(false);
              history.push("/dashboard");
            } else {
              console.log("Something went wrong");
            }
          } catch (err) {
            console.log(err);
          }
        }}
        onCancel={() => setClientDeleteModalVisible(false)}
      >
        <p>
          <strong>Are you sure you want to delete the input set? </strong>
        </p>
        <p>
          <strong>This action cannot be undone! </strong>
        </p>
      </Modal>
    </Layout>
  );
};

export default ClientDashboard;
