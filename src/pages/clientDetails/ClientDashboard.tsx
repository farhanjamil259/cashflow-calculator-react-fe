import React, {useState} from "react";
import {Card, Col, Row, Typography, Input, Button, Modal} from "antd";
import { SmileFilled} from "@ant-design/icons";
import Layout from "antd/lib/layout/layout";
import {Table, Space} from "antd";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import { useHistory} from "react-router-dom";
import { inputsFormRoute} from "../../routes/navRoutes";
import {GetInputsAction, setCurrentInputSetAction} from "../../redux/inputs/inputs";
import axios from "axios";
import {AlertAction} from "../../redux/general/alert";

import dummyInputs from "../inputs/data/dummyInputs";
import {IInputs} from "../../interfaces/ISubInputs";
import {inputsRoute, summaryRoute} from "../../routes/apiRoutes";
import {setSummaryAction} from "../../redux/summary/summary";
import CalcRealSummary from "../../helpers/calcRealSummary";
import IAssumptions from "../../interfaces/IAssumptions";
import {setRealSummaryAction} from "../../redux/summary/realSummary";

const {Text, Title} = Typography;
const {TextArea} = Input;

const ClientDashboard = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const [isModalVisible2, setIsModelVisible2] = useState(false);
    const [selectedId, setSelectedId] = useState("")
    const [loading, setLoading] = useState(false)
    const client = useSelector((state: RootStateOrAny) => state.activeClientReducer);
    const inputs = useSelector((state: RootStateOrAny) => state.inputsReducer);
    const columns = [
        {
            title: "#",
            render: (text: any, r: any, i: any) => <>{i + 1}</>,
        },
        {
            title: "Set Name",
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
                        return <SmileFilled style={{marginRight: "10px", color: i === 0 ? "#3f51b5" : "#2196f3"}}/>
                    })}
                    {record.people.child.map((c: any, i: any) => {
                        return <SmileFilled style={{color: "#90caf9"}}/>
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
                    <a href="#!" onClick={(e) => {
                        e.stopPropagation()
                        setSelectedId(record.id)
                        setIsModelVisible2(true)
                    }}>Delete</a>
                </Space>
            ),
        },
    ];

    const data = useSelector((state: RootStateOrAny) => state.inputsReducer).map((d: any, i: number) => {
        return {
            id: d._id,
            key: i,
            set_name: d.input_set_name,
            current_year: d.current_year,

            people: {
                owner: d.household_owners,
                child: d.children
            }

        }
    });

    const assumptions : IAssumptions = useSelector((state: RootStateOrAny) => state.assumptionReducer)

    return (
        <Layout className="layout" style={{background: "white"}}>
            <Card bordered={false}>
                <Row gutter={16}>
                    <Col lg={8} md={24} sm={24} xs={24}>
                        <Card>
                            <Row>
                                <Col>
                                    <Title level={3}>{client.fname} {client.lname}</Title>

                                </Col>
                            </Row>
                            <Row style={{marginTop: "16px"}}>
                                <Col lg={12} md={24} sm={24} xs={24}>
                                    <Text>Email</Text>
                                    <br/>
                                    <Text strong>{`${client.fname}${client.lname}@email.com`}</Text>
                                </Col>

                                <Col lg={12} md={24} sm={24} xs={24}>
                                    <Text>Phone</Text>
                                    <br/>
                                    <Text strong>+44 5740 594158</Text>
                                </Col>
                            </Row>
                            <Row style={{marginTop: "16px"}}>
                                <Col lg={12} md={24} sm={24} xs={24}>
                                    <Text>Mobile</Text>
                                    <br/>
                                    <Text strong>+44 5740 594158</Text>
                                </Col>

                                <Col lg={12} md={24} sm={24} xs={24}>
                                    <Text>Address</Text>
                                    <br/>
                                    <Text strong>24 River Street, London, 1EC1R 1XN</Text>
                                </Col>
                            </Row>
                            <Row style={{marginTop: "16px"}}>
                                <Col span={24}>
                                    <Text>Notes</Text>
                                    <br/>
                                    <TextArea rows={4} placeholder="No notes added"/>
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
                                        style={{marginRight: "16px"}}
                                        type="dashed"
                                        loading={loading}
                                        onClick={async () => {
                                            const newDummy: IInputs = {...dummyInputs};
                                            newDummy.input_set_name = "Plan #  " + Math.floor(Math.random() * 999)
                                            try {
                                                setLoading(true)
                                                const res = await axios.post(inputsRoute + client._id, newDummy)
                                                console.log(res)
                                                await dispatch(GetInputsAction(client._id))
                                                setLoading(false)
                                            } catch (err) {

                                            }
                                        }}
                                    >
                                        Create Dummy Plan
                                    </Button>
                                    <Button
                                        type="primary"
                                        onClick={() => {

                                            history.push(inputsFormRoute);
                                        }}
                                    >
                                        Create new Plan
                                    </Button></>
                            }
                        >
                            <Table columns={columns} loading={loading} dataSource={data} onRow={ (record : any, rowIndex : any)=>{
                                return {
                                    style : {
                                        cursor : "pointer"
                                    },
                                    onClick: async ()=>{

                                        setLoading(true)
                                        dispatch(setCurrentInputSetAction(inputs[record.key]))
                                        const res = await axios.get(summaryRoute + inputs[0]._id)
                                        await dispatch(setSummaryAction(res.data))
                                        await dispatch(setRealSummaryAction(CalcRealSummary(res.data, assumptions)))



                                        history.push("/dashboard/clientDashboard/clientPlanDetails")
                                    }
                                }
                            }
                            }/>
                        </Card>
                    </Col>
                </Row>
            </Card>
            <Modal
                title="Delete InputSet"
                okType={"danger"}
                visible={isModalVisible2}
                okText="Delete"
                confirmLoading={loading}
                onOk={async () => {
                    try {
                        await axios.delete(inputsRoute + selectedId)
                        dispatch(AlertAction("Input Set Deleted", "error"))
                        await dispatch((GetInputsAction(client._id)))
                        setIsModelVisible2(false)
                    } catch (err) {
                        console.log(err)
                    }
                }}
                onCancel={() => setIsModelVisible2((false))}
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
