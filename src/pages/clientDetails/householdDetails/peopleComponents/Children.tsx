import {Col, Form, Input, InputNumber, Modal, Row, Switch, Table} from "antd";
import React, {useState} from "react";
import IInputs from "../../../../interfaces/IInputs";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {useForm} from "antd/lib/form/Form";
import ViewButton from "../sharedComponents/ViewButton";
import {AlertAction} from "../../../../redux/general/alert";
import {LoadingAction} from "../../../../redux/general/loading";
import Text from "antd/lib/typography/Text";




const Children = (props: any) => {
    const dispatch = useDispatch();
    const inputs: IInputs = useSelector(
        (state: RootStateOrAny) => state.currentInputSetReducer
    );

    const [isModelVisible, setIsModelVisible] = useState(false);

    const [activeItemIndex, setActiveItemIndex] = useState(0);

    const [ownerDetails, setOwnerDetails] = useState(
        JSON.parse(JSON.stringify(inputs.children))
    );

    const [form] = useForm();

    const [editMode, setEditMode] = useState(false);

    const {children} = inputs

    const columns: any = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            ellipsis: true,
            fixed: "left",
        },
        {
            title: "Birth Year",
            dataIndex: "birth_year",
            key: "1",
            ellipsis: true,
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

    const data = children.map((child: any, i: number) => {
        const {
            name, birth_year, primary_school_age,
            primary_school_year,
            secondary_school_age,
            secondary_school_year,
            university_age,
            university_year,
            graduation_age,
            graduation_year,
        } = child
        return {
            key: child._id,
            name,
            birth_year,
            primary_school_age,
            primary_school_year,
            secondary_school_age,
            secondary_school_year,
            university_age,
            university_year,
            graduation_age,
            graduation_year,
        }
    })
    return (
        <div>
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

                <Form form={form} labelAlign={"left"} labelCol={{ span: 9 }} wrapperCol={{ span: 15 }}>
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
                            <Text>{inputs.children[activeItemIndex].name}</Text>
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
                            <Text>{inputs.children[activeItemIndex].birth_year}</Text>
                        )}
                    </Form.Item>
                    <Form.Item label="Primary School Age">
                        <Text>{inputs.children[activeItemIndex].primary_school_age}</Text>
                    </Form.Item>
                    <Form.Item label="Primary School year">
                        <Text>{inputs.children[activeItemIndex].primary_school_year}</Text>
                    </Form.Item>
                    <Form.Item label="Secondary School Age">
                        <Text>{inputs.children[activeItemIndex].secondary_school_age}</Text>
                    </Form.Item>
                    <Form.Item label="Secondary School year">
                        <Text>{inputs.children[activeItemIndex].secondary_school_year}</Text>
                    </Form.Item>
                    <Form.Item label="University Age">
                        <Text>{inputs.children[activeItemIndex].university_age}</Text>
                    </Form.Item>
                    <Form.Item label="University year">
                        <Text>{inputs.children[activeItemIndex].university_year}</Text>
                    </Form.Item>
                    <Form.Item label="Graduation Age">
                        <Text>{inputs.children[activeItemIndex].graduation_age}</Text>
                    </Form.Item>
                    <Form.Item label="Graduation year">
                        <Text>{inputs.children[activeItemIndex].graduation_year}</Text>
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    );
};

export default Children;
