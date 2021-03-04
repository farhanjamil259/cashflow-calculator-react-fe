import React, {useState} from "react";
import {
    Col,
    Form,
    InputNumber,
    Modal,
    Row,
    Switch,
    Table,
    Typography,
} from "antd";
// @ts-ignore
import CurrencyFormat from "react-currency-format";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import IInputs from "../../../../interfaces/IInputs";
import {AlertAction} from "../../../../redux/general/alert";
import {LoadingAction} from "../../../../redux/general/loading";
import {
    firstColumnWidth,
    secondColumnWidth,
    thirdColumnWidth,
} from "../../CommonVariable";
import ViewButton from "../sharedComponents/ViewButton";
import {pound} from "../../../../components/currencySumbol";
import {numberFormat} from "highcharts";

const {Text} = Typography;
const {useForm} = Form;

const ChildrenEducation = () => {
    const dispatch = useDispatch();
    const inputs: IInputs = useSelector(
        (state: RootStateOrAny) => state.currentInputSetReducer
    );

    const [isModelVisiblePrimary, setIsModelVisiblePrimary] = useState(false);
    const [isModelVisibleSecondary, setIsModelVisibleSecondary] = useState(false);
    const [isModelVisibleUniversity, setIsModelVisibleUniversity] = useState(
        false
    );


    const [form] = useForm();

    const [primarySchool, setPrimarySchool] = useState(
        JSON.parse(
            JSON.stringify(
                inputs.household_expenses.children_education_expenses
                    .primary_school_fees
            )
        )
    );
    const [secondarySchool, setSecondarySchool] = useState(
        JSON.parse(
            JSON.stringify(
                inputs.household_expenses.children_education_expenses
                    .seconday_school_fees
            )
        )
    );
    const [university, setUniversity] = useState(
        JSON.parse(
            JSON.stringify(
                inputs.household_expenses.children_education_expenses.university_fees
            )
        )
    );

    const [editMode, setEditMode] = useState(false);

    const columns: any = [
        {
            dataIndex: "name",
            width: firstColumnWidth,
        },
        {
            dataIndex: "annual_expense",
            width: secondColumnWidth,
            align: "right",
            render: (text: any, record: any, index: any) => (
                <Text>
                    {pound}{inputs.children[0].primary_school_year >= inputs.current_year && inputs.children[0].secondary_school_year <= inputs.current_year ? numberFormat(text, 0, ".", ",") : inputs.children[0].secondary_school_year >= inputs.current_year && inputs.children[0].university_year <= inputs.current_year ? numberFormat(text, 0, ".", ",") : inputs.children[0].university_year >= inputs.current_year && inputs.children[0].graduation_year <= inputs.current_year ? numberFormat(text, 0, ".", ",") : 0}
                </Text>
            ),
        },
        {
            dataIndex: "action",
            width: thirdColumnWidth,
            render: (text: any, record: any) => (
                <ViewButton
                    onClick={() => {
                        if (record.name === "Primary School Fees") {
                            setIsModelVisiblePrimary(true);
                        }
                        if (record.name === "Secondary School Fees") {
                            setIsModelVisibleSecondary(true);
                        }
                        if (record.name === "University Fees") {
                            setIsModelVisibleUniversity(true);
                        }
                    }}
                />
            ),
        },
    ];

    const data = [
        {
            name: "Primary School Fees",
            annual_expense:
            inputs.household_expenses.children_education_expenses
                .primary_school_fees.annual_fee_in_todays_terms,
            inflation:
            inputs.household_expenses.children_education_expenses
                .primary_school_fees.inflation,
        },
        {
            name: "Secondary School Fees",
            annual_expense:
            inputs.household_expenses.children_education_expenses
                .seconday_school_fees.annual_fee_in_todays_terms,
            inflation:
            inputs.household_expenses.children_education_expenses
                .seconday_school_fees.inflation,
        },
        {
            name: "University Fees",
            annual_expense:
            inputs.household_expenses.children_education_expenses.university_fees
                .annual_fee_in_todays_terms,
            inflation:
            inputs.household_expenses.children_education_expenses.university_fees
                .inflation,
        },
    ];

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

                        },
                    };
                }}
            />
            <Modal
                title="Children Education Expense"
                visible={isModelVisiblePrimary}
                cancelText="Close"
                okButtonProps={{hidden: !editMode}}
                okText={editMode ? "Update" : "Ok"}
                onOk={async () => {
                    form
                        .validateFields()
                        .then(async () => {
                            try {
                                dispatch(AlertAction("This feature will be soon", "success"));
                                dispatch(LoadingAction(false));
                                setIsModelVisiblePrimary(false);
                                setEditMode(false);
                            } catch (err) {
                                console.log(err.message);
                                dispatch(AlertAction("Something went wrong", "error"));
                                dispatch(LoadingAction(false));
                            }
                        })
                        .catch((info) => console.log("Validation failed", info));
                }}
                onCancel={() => setIsModelVisiblePrimary(false)}
            >
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

                <Form
                    form={form}
                    labelAlign="left"
                    labelCol={{span: 10}}
                    wrapperCol={{span: 14}}
                >
                    <Form.Item
                        label="Expense Name "
                        rules={[{required: true, message: "This is required"}]}
                    >
                        <Text>Primary School Fees</Text>
                    </Form.Item>
                    <Form.Item label="Annual Fee in Todays Terms">
                        {editMode ? (
                            <InputNumber
                                value={primarySchool.annual_fee_in_todays_terms}
                                style={{width: "100%"}}
                                onChange={(e) => {
                                    const clone = JSON.parse(JSON.stringify(primarySchool));
                                    clone.annual_fee_in_todays_terms = +e!;
                                    setPrimarySchool(clone);
                                }}
                            />
                        ) : (
                            <Text>
                                <CurrencyFormat
                                    value={
                                        inputs.household_expenses.children_education_expenses
                                            .primary_school_fees.annual_fee_in_todays_terms
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
                        rules={[{required: true, message: "This is required"}]}
                    >
                        <Text>
                            <CurrencyFormat
                                value={
                                    inputs.household_expenses.children_education_expenses
                                        .primary_school_fees.inflation * 100
                                }
                                displayType={"text"}
                                decimalScale={2}
                                suffix={"%"}
                            />
                        </Text>
                    </Form.Item>
                </Form>
            </Modal>
            {/*Secondary School Modal*/}
            <Modal
                title="Children Education Expense"
                visible={isModelVisibleSecondary}
                cancelText="Close"
                okButtonProps={{hidden: !editMode}}
                okText={editMode ? "Update" : "Ok"}
                onOk={async () => {
                    form
                        .validateFields()
                        .then(async () => {
                            try {
                                dispatch(AlertAction("This feature will be soon", "success"));
                                dispatch(LoadingAction(false));
                                setIsModelVisibleSecondary(false);
                                setEditMode(false);
                            } catch (err) {
                                console.log(err.message);
                                dispatch(AlertAction("Something went wrong", "error"));
                                dispatch(LoadingAction(false));
                            }
                        })
                        .catch((info) => console.log("Validation failed", info));
                }}
                onCancel={() => setIsModelVisibleSecondary(false)}
            >
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

                <Form
                    form={form}
                    labelAlign="left"
                    labelCol={{span: 10}}
                    wrapperCol={{span: 14}}
                >
                    <Form.Item
                        label="Expense Name "
                        rules={[{required: true, message: "This is required"}]}
                    >
                        <Text>Secondary School Fees</Text>
                    </Form.Item>
                    <Form.Item label="Annual Fee in Todays Terms">
                        {editMode ? (
                            <InputNumber
                                value={secondarySchool.annual_fee_in_todays_terms}
                                style={{width: "100%"}}
                                onChange={(e) => {
                                    const clone = JSON.parse(JSON.stringify(secondarySchool));
                                    clone.annual_fee_in_todays_terms = +e!;
                                    setSecondarySchool(clone);
                                }}
                            />
                        ) : (
                            <Text>
                                <CurrencyFormat
                                    value={
                                        inputs.household_expenses.children_education_expenses
                                            .seconday_school_fees.annual_fee_in_todays_terms
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
                        rules={[{required: true, message: "This is required"}]}
                    >
                        <Text>
                            <CurrencyFormat
                                value={
                                    inputs.household_expenses.children_education_expenses
                                        .seconday_school_fees.inflation * 100
                                }
                                displayType={"text"}
                                decimalScale={2}
                                suffix={"%"}
                            />
                        </Text>
                    </Form.Item>
                </Form>
            </Modal>
            {/*University School Modal*/}
            <Modal
                title="Children Education Expense"
                visible={isModelVisibleUniversity}
                cancelText="Close"
                okButtonProps={{hidden: !editMode}}
                okText={editMode ? "Update" : "Ok"}
                onOk={async () => {
                    form
                        .validateFields()
                        .then(async () => {
                            try {
                                dispatch(AlertAction("This feature will be soon", "success"));
                                dispatch(LoadingAction(false));
                                setIsModelVisibleUniversity(false);
                                setEditMode(false);
                            } catch (err) {
                                console.log(err.message);
                                dispatch(AlertAction("Something went wrong", "error"));
                                dispatch(LoadingAction(false));
                            }
                        })
                        .catch((info) => console.log("Validation failed", info));
                }}
                onCancel={() => setIsModelVisibleUniversity(false)}
            >
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

                <Form
                    form={form}
                    labelAlign="left"
                    labelCol={{span: 10}}
                    wrapperCol={{span: 14}}
                >
                    <Form.Item
                        label="Expense Name "
                        rules={[{required: true, message: "This is required"}]}
                    >
                        <Text>University Fees</Text>
                    </Form.Item>
                    <Form.Item label="Annual Fee in Todays Terms">
                        {editMode ? (
                            <InputNumber
                                value={university.annual_fee_in_todays_terms}
                                style={{width: "100%"}}
                                onChange={(e) => {
                                    const clone = JSON.parse(JSON.stringify(university));
                                    clone.annual_fee_in_todays_terms = +e!;
                                    setUniversity(clone);
                                }}
                            />
                        ) : (
                            <Text>
                                <CurrencyFormat
                                    value={
                                        inputs.household_expenses.children_education_expenses
                                            .university_fees.annual_fee_in_todays_terms
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
                        rules={[{required: true, message: "This is required"}]}
                    >
                        <Text>
                            <CurrencyFormat
                                value={
                                    inputs.household_expenses.children_education_expenses
                                        .university_fees.inflation * 100
                                }
                                displayType={"text"}
                                decimalScale={2}
                                suffix={"%"}
                            />
                        </Text>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ChildrenEducation;
