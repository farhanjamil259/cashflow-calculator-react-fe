import React, {useState} from "react";
import {Col, Form, Input, InputNumber, Modal, Row, Switch, Table} from "antd";
// @ts-ignore
import CurrencyFormat from "react-currency-format";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import IInputs from "../../../../interfaces/IInputs";
import Text from "antd/lib/typography/Text";
import {AlertAction} from "../../../../redux/general/alert";
import {LoadingAction} from "../../../../redux/general/loading";
import {firstColumnWidth, secondColumnWidth} from "../../CommonVariable";
import ViewButton from "../sharedComponents/ViewButton";
import {pound} from "../../../../components/currencySumbol";
import {numberFormat} from "highcharts";

const {useForm} = Form;

const PensionPlan = () => {
    const dispatch = useDispatch();
    const inputs: IInputs = useSelector(
        (state: RootStateOrAny) => state.currentInputSetReducer
    );

    const [isModelVisible, setIsModelVisible] = useState(false);

    const [activeItemIndex, setActiveItemIndex] = useState(0);

    const [form] = useForm();

    const columns: any = [
        {
            dataIndex: "name",
            width: firstColumnWidth,
        },
        {
            dataIndex: "original_balance",
            width: secondColumnWidth,
            align: "right",
            render: (text: any) => (
                <Text>
                    {pound}{numberFormat(text, 0, ".", ",")}
                </Text>
            ),

        },
        {
            dataIndex: "action",
            render: () => (
                <ViewButton onClick={() => setIsModelVisible(true)}/>
            ),
        },
    ];

    const data = inputs.assets.non_employment_defined_contribution_pension_plans;

    const [pensionPlan, setPensionPlan] = useState(
        JSON.parse(JSON.stringify(inputs.assets.non_employment_defined_contribution_pension_plans))
    );

    const [editMode, setEditMode] = useState(false);

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
                        },
                    };
                }}

            />
            <Modal
                title="Pension details"
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
                <Form form={form} labelCol={{span: 8}} wrapperCol={{span: 16}} labelAlign="left">
                    <Row justify="end" style={{marginBottom: "16px"}}>
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
                    <Form.Item label="Pension of:">
                        {editMode ? (
                            <Input
                                value={pensionPlan[activeItemIndex].name}
                                onChange={(e) => {
                                    const clone = JSON.parse(JSON.stringify(pensionPlan));
                                    clone[activeItemIndex].name = e;
                                    setPensionPlan(clone);
                                }}
                            />
                        ) : (
                            <Text>
                                {
                                    inputs.assets.non_employment_defined_contribution_pension_plans[
                                        activeItemIndex
                                        ].name
                                }
                            </Text>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="Original Balance"
                        rules={[{required: true, message: "This is required"}]}
                    >
                        {editMode ? (
                            <InputNumber
                                value={pensionPlan[activeItemIndex].original_balance}
                                style={{width: "100%"}}
                                onChange={(e) => {
                                    const clone = JSON.parse(JSON.stringify(pensionPlan));
                                    clone[activeItemIndex].original_balance = +e!;
                                    setPensionPlan(clone);
                                }}
                            />
                        ) : (
                            <Text>
                                <CurrencyFormat
                                    value={
                                        inputs.assets.non_employment_defined_contribution_pension_plans[activeItemIndex].original_balance
                                    }
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"£"}
                                />
                            </Text>
                        )}
                    </Form.Item>
                    <Form.Item label="Growth Rate">
                        <Text>
                            <CurrencyFormat
                                value={
                                    inputs.assets.savings_and_investments.individual_savings_account[activeItemIndex]
                                        .growth_rate * 100
                                }
                                displayType={"text"}
                                decimalScale={2}
                                suffix={"%"}
                            />
                        </Text>
                    </Form.Item>
                    <Form.Item label="Annual Contribution">
                        {editMode ? (
                            <Input
                                value={pensionPlan[activeItemIndex].annual_contribution}
                                onChange={(e) => {
                                    const clone = JSON.parse(JSON.stringify(pensionPlan));
                                    clone[activeItemIndex].name = e;
                                    pensionPlan(clone);
                                }}
                            />
                        ) : (
                            <Text>
                                {
                                    inputs.assets.non_employment_defined_contribution_pension_plans[
                                        activeItemIndex
                                        ].annual_contribution
                                }
                            </Text>
                        )}
                    </Form.Item>
                    <Form.Item label="Contribution start year">
                        <Text>
                            {
                                inputs.assets.non_employment_defined_contribution_pension_plans[
                                    activeItemIndex
                                    ].contribution_start_year
                            }
                        </Text>
                    </Form.Item>
                    <Form.Item label="Contribution end year">
                        <Text>
                            {
                                inputs.assets.non_employment_defined_contribution_pension_plans[
                                    activeItemIndex
                                    ].contribution_end_year
                            }
                        </Text>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default PensionPlan;
