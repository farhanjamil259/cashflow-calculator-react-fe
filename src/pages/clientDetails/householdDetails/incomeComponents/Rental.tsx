import React, {Fragment, useState} from "react";
import {
    Col, DatePicker,
    Form,
    Input,
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
import {firstColumnWidth, secondColumnWidth} from "../../CommonVariable";
import ViewButton from "../sharedComponents/ViewButton";
import {pound} from "../../../../components/currencySumbol";
import {numberFormat} from "highcharts";

const {Text} = Typography;
const {useForm} = Form;

const Rental = () => {
    const dispatch = useDispatch();
    const inputs: IInputs = useSelector(
        (state: RootStateOrAny) => state.currentInputSetReducer
    );

    const [isModelVisible, setIsModelVisible] = useState(false);

    const [activeItemIndex, setActiveItemIndex] = useState(0);

    const [form] = useForm();

    const [incomeDetails, setIncomeDetails] = useState(
        JSON.parse(JSON.stringify(inputs.household_income.rental_income.details))
    );

    const [editMode, setEditMode] = useState(false);

    const columns: any = [
        {
            dataIndex: "name",
            width: firstColumnWidth,

        },
        {
            dataIndex: "annual_amount",
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

                        <ViewButton onClick={() => setIsModelVisible(true)}/>

            ),
        },
    ];

    const data: any = inputs.household_income.rental_income.details;

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
                title="Rental Income Details"
                visible={isModelVisible}
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

                <Form form={form} labelAlign="left" labelCol={{span: 8}} wrapperCol={{span: 16}}>
                    {/*need to fix--not in State--------------------------------------------------------------------------*/}
                    <Form.Item label="Joint Annual Rental">
                        {editMode ? (
                            <Input
                                value={
                                    inputs.household_income.rental_income
                                        .joint_annual_rental_income
                                }
                                onChange={(e) => {
                                    const clone = JSON.parse(JSON.stringify(incomeDetails));
                                    clone[activeItemIndex].name = e;
                                    // setIncomeDetails(clone)
                                }}
                            />
                        ) : (
                            <Text>
                                <CurrencyFormat
                                    value={
                                        inputs.household_income.rental_income.joint_annual_rental_income
                                    }
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"£"}
                                />
                            </Text>
                        )}
                    </Form.Item>

                    <Form.Item label="Rental Income of:">
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
                                    inputs.household_income.rental_income.details[activeItemIndex]
                                        .name
                                }
                            </Text>
                        )}
                    </Form.Item>
                    <Form.Item label="Share of Rental Income">
                        {editMode ? (
                            <InputNumber
                                value={incomeDetails[activeItemIndex].share_of_rental_income}
                                style={{width: "100%"}}
                                onChange={(e) => {
                                    const clone = JSON.parse(JSON.stringify(incomeDetails));
                                    clone[activeItemIndex].share_of_rental_income = +e!;
                                    setIncomeDetails(clone);
                                }}
                            />
                        ) : (
                            <Text>
                                <CurrencyFormat
                                    value={
                                        inputs.household_income.rental_income.details[activeItemIndex]
                                            .share_of_rental_income * 100
                                    }
                                    displayType={"text"}
                                    decimalScale={2}
                                    suffix={"%"}
                                />
                            </Text>
                        )}
                    </Form.Item>
                    <Form.Item label="Annual Amount">

                        <Text>
                            <CurrencyFormat
                                value={
                                    inputs.household_income.rental_income.details[activeItemIndex]
                                        .annual_amount
                                }
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"£ "}
                            />
                        </Text>

                    </Form.Item>
                    <Form.Item
                        label="Inflation"
                        rules={[{required: true, message: "This is required"}]}
                    >
                        <Text>
                            <CurrencyFormat
                                value={
                                    inputs.household_income.rental_income.details[activeItemIndex]
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
                                    inputs.household_income.rental_income
                                        .details[activeItemIndex]
                                        .start_year
                                }
                            </Text>)}
                    </Form.Item>
                    <Form.Item label="End year">
                        <Text>
                            {
                                inputs.household_income.rental_income.details[activeItemIndex]
                                    .end_year
                            }
                        </Text>
                    </Form.Item>
                </Form>
            </Modal>
        </Fragment>
    );
};

export default Rental;
