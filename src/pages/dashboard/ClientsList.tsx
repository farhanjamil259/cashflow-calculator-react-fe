import React, {useEffect, useState} from "react";
import {Table, Tag, Card, Space, Button, Row, Modal, Form, Input, Select, DatePicker} from "antd";
import Layout from "antd/lib/layout/layout";
import moment from "moment";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

import {CreateClientAction, setActiveClientAction} from "../../redux/clients/client";
import {LoadingAction} from "../../redux/general/loading";
import {GetInputsAction} from "../../redux/inputs/inputs";
import { MoreOutlined } from "@ant-design/icons";

const {Option} = Select;

const ClientsList = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const data = useSelector((state: RootStateOrAny) => state.clientsReducer);
    const user = useSelector((state: RootStateOrAny) => state.userReducer);
    const loading = useSelector((state: RootStateOrAny) => state.loadingReducer);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);

    const [activeClientId, setActiveClientId] = useState<any>({});

    useEffect(() => {
        dispatch(LoadingAction(false));
    }, [dispatch]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsModalVisible2(false);
    };


    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",

        },
        {
            title: "Created",
            dataIndex: "created",
            key: "created",
            render: (date: any) => <>{moment(date).format("DD MMMM YYYY")}</>,
        },
        {
            title: "Modified",
            dataIndex: "modified",
            key: "modified",
            render: (date: any) => <>{moment(date).format("DD MMMM YYYY")}</>,
        },
        {
            title: "Advisers",
            dataIndex: "advisor",
            key: "adviser",
        },
        {
            title: "Access",
            key: "tags",
            dataIndex: "access",
            render: (access: any) => (
                <>
                    {access.map((tag: any) => {
                        let color = tag.length > 5 ? "geekblue" : "green";
                        if (tag === "read") {
                            color = "volcano";
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (text: any, record: any) => (
                <Space size="middle">
                    <Button
                        size="small"
                        onClick={async (e) => {
                            e.stopPropagation()
                            setActiveClientId(record);
                            setIsModalVisible2(true);
                        }}
                    >
                        <MoreOutlined />
                    </Button>
                </Space>
            ),
        },
    ];

    const [clientInfo, setClientInfo] = useState({
        _id: "",
        userid: sessionStorage.getItem("userid")!,
        fname: "",
        lname: "",
        birth_year: 1990,
        gender: "male",
        is_retired: "no",
        retirement_age: 65,
        access: ["Admin", "Adviser"],
        created: moment(),
        modified: moment(),
        advisor: user.name,
    });

    const [form] = Form.useForm();

    return (
        <Layout className="layout" style={{backgroundColor: "white"}}>
            <Card bordered={false} style={{margin: "16px"}}>
                <Row justify="end">
                    <Button type="primary" style={{marginBottom: 16}} onClick={showModal}>
                        Add new client
                    </Button>
                </Row>
                <Table  loading={loading} onRow={ (record : any, rowIndex : any)=>{
                    return {
                        style : {
                            cursor : "pointer"
                        },
                        onClick: async ()=>{
                            await dispatch(setActiveClientAction(activeClientId));

                            await dispatch(GetInputsAction(activeClientId._id))
                            history.push("/dashboard/clientDashboard");
                        }
                    }
                }
                } columns={columns} dataSource={data} rowKey="_id" pagination={false}/>
            </Card>

            <Modal
                title="Add New Client"
                visible={isModalVisible}
                okButtonProps={{loading: loading}}
                onOk={async () => {
                    form
                        .validateFields()
                        .then(async () => {
                            setClientInfo({...clientInfo, advisor: user.name});
                            const status: any = await dispatch(CreateClientAction(clientInfo));

                            if (status === 200) {
                                setIsModalVisible(false);
                            }
                            form.resetFields();
                        })
                        .catch((info) => console.log("Validation failed", info));


                }}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={{
                        gender: "male",
                        is_retied: "no",
                        retirement_age: "65",
                        is_married: "no",
                        birth_year: moment("1992", "YYYY"),
                    }}
                >
                    <Form.Item
                        name="fname"
                        label="First Name"
                        rules={[{required: true, message: "First name is required"}]}
                    >
                        <Input
                            name="fname"
                            onChange={(e) => {
                                setClientInfo({...clientInfo, fname: e.target.value});
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="lname"
                        label="Last Name"
                        rules={[{required: true, message: "Last name is required "}]}
                    >
                        <Input
                            onChange={(e) => {
                                setClientInfo({...clientInfo, lname: e.target.value});
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="birth_year"
                        label="Birth Year"
                        rules={[{required: true, message: "Please select a year"}]}
                    >
                        <DatePicker
                            picker="year"
                            name="birth_year"
                            onChange={(date: any, dateString) => setClientInfo({
                                ...clientInfo,
                                birth_year: +dateString
                            })}
                        />
                    </Form.Item>
                    <Form.Item name="gender" label="Gender">
                        <Select style={{width: 120}}>
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="is_retied" label="Already Retied?">
                        <Select
                            style={{width: 120}}
                            onChange={(e) => {
                                setClientInfo({...clientInfo, is_retired: e.toString()});
                            }}
                        >
                            <Option value="no">No</Option>
                            <Option value="yes">Yes</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="retirement_age" label="Retirement Age">
                        <Input
                            type="number"
                            name="retirement_age"
                            onChange={(e) => setClientInfo({...clientInfo, retirement_age: +e.target.value})}
                        />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Client Details"
                visible={isModalVisible2}
                okText="Open Client"
                onOk={async () => {
                    await dispatch(setActiveClientAction(activeClientId));

                    await dispatch(GetInputsAction(activeClientId._id))
                    history.push("/dashboard/clientDashboard");
                }}
                onCancel={handleCancel}
            >
                <p>
                    <strong>Client: </strong> {activeClientId.name}
                </p>
                <p>
                    <strong>Adviser: </strong> {user.name}
                </p>
                <p>
                    <strong>Created: </strong>
                   {moment(activeClientId.created).format("DD MMMM YYYY")}
                </p>
                <p>
                    <strong>Last Modified: </strong>
                   {moment(activeClientId.created).format("DD MMMM YYYY")}
                </p>
            </Modal>
        </Layout>
    );
};

export default ClientsList;
