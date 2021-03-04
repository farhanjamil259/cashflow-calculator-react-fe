import {
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Modal,
    Row,
    Select,
    Switch,
    Table,
} from "antd";
import React, {Fragment, useState} from "react";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import IInputs from "../../../../interfaces/IInputs";
import {LoadingAction} from "../../../../redux/general/loading";
import {AlertAction} from "../../../../redux/general/alert";
import Text from "antd/lib/typography/Text";
// @ts-ignore
import CurrencyFormat from "react-currency-format";
import {
    firstColumnWidth,
    secondColumnWidth,
    thirdColumnWidth,
} from "../../CommonVariable";
import ViewButton from "../sharedComponents/ViewButton";
import {numberFormat} from "highcharts";
import {pound} from "../../../../components/currencySumbol";

const {useForm} = Form;
const {Option} = Select;

const Properties = (props: any) => {
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
            dataIndex: "todays_value",
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
            key: "action",
            width: thirdColumnWidth,
            render: (text: any, record: any) => (
                <ViewButton onClick={() => setIsModelVisible(true)}/>
            ),
        },
    ];

    const data: any = inputs.assets.properties;

    const [properties, setProperties] = useState(
        JSON.parse(JSON.stringify(inputs.assets.properties))
    );

    const [editMode, setEditMode] = useState(false);

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
                rowKey={(record) => record._id}
            />

            <Modal
                title="Property Details"
                visible={isModelVisible}
                cancelText="Close"
                okButtonProps={{hidden: !editMode}}
                okText={editMode ? "Update" : "Ok"}
                onOk={async () => {
                    form
                        .validateFields()
                        .then(async () => {
                            // const newInputs = JSON.parse(JSON.stringify(inputs))
                            // newInputs.assets.properties = properties
                            // console.log(newInputs.assets.properties[0].start_year)
                            try {
                                // dispatch(LoadingAction(true))
                                // const res = await axios.patch(inputsRoute + inputs._id, newInputs)
                                // await dispatch(setCurrentInputSetAction(res.data))
                                // const summary = await axios.get(summaryRoute + res.data._id)
                                // await dispatch(setSummaryAction(summary.data))
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
                <Form
                    form={form}
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    labelAlign="left"
                >
                    <Form.Item label="Property Name">
                        {editMode ? (
                            <Input
                                value={properties[activeItemIndex].name}
                                onChange={(e) => {
                                    const clone = JSON.parse(JSON.stringify(properties));
                                    clone[activeItemIndex].name = e;
                                    setProperties(clone);
                                }}
                            />
                        ) : (
                            <Text>{inputs.assets.properties[activeItemIndex].name}</Text>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="Original Balance"
                        rules={[{required: true, message: "This is required"}]}
                    >
                        {editMode ? (
                            <InputNumber
                                value={properties[activeItemIndex].original_price}
                                style={{width: "100%"}}
                                onChange={(e) => {
                                    const clone = JSON.parse(JSON.stringify(properties));
                                    clone[activeItemIndex].original_price = +e!;
                                    setProperties(clone);
                                }}
                            />
                        ) : (
                            <Text>
                                <CurrencyFormat
                                    value={
                                        inputs.assets.properties[activeItemIndex].original_price
                                    }
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"£"}
                                />
                            </Text>
                        )}
                    </Form.Item>
                    <Form.Item label="Todays Value">
                        <Text>
                            <CurrencyFormat
                                value={
                                    inputs.assets.properties[activeItemIndex].todays_value
                                }
                                displayType={"text"}
                                thousandSeparator={true}
                                decimalScale={0}
                                prefix={"£"}
                            />

                        </Text>
                    </Form.Item>
                    <Form.Item label="Growth Rate">
                        <Text>
                            <CurrencyFormat
                                value={
                                    inputs.assets.properties[activeItemIndex].growth_rate * 100
                                }
                                displayType={"text"}
                                thousandSeparator={true}
                                decimalScale={2}
                                suffix={"%"}
                            />
                        </Text>
                    </Form.Item>
                    <Form.Item label="Start Year">
                        {editMode ? (
                            <DatePicker
                                picker="year"
                                className="custom-input-fields"
                                onChange={(date: any, dateString: any) => {
                                    const clone = JSON.parse(JSON.stringify(properties));
                                    clone[activeItemIndex].start_year = +dateString;
                                    setProperties(clone);
                                }}
                            />
                        ) : (
                            <Text>
                                {inputs.assets.properties[activeItemIndex].start_year}
                            </Text>
                        )}
                    </Form.Item>
                    <Form.Item label="Sell in Future?">
                        {editMode ? (
                            <Select
                                defaultValue={inputs.assets.properties[activeItemIndex].sell_in_future
                                    ? "yes"
                                    : "no"}
                                className="custom-input-fields"
                                onChange={(e: any) => {
                                    const clone = JSON.parse(JSON.stringify(properties));
                                    clone[activeItemIndex].sell_in_future = e === "yes";
                                    setProperties(clone);
                                }}
                            >
                                <Option value="yes">Yes</Option>
                                <Option value="no">No</Option>
                            </Select>
                        ) : (
                            <Text>
                                {inputs.assets.properties[activeItemIndex].sell_in_future
                                    ? "Yes"
                                    : "No"}
                            </Text>
                        )}
                    </Form.Item>

                    <Form.Item label="End Year">
                        {editMode ? (
                            <DatePicker
                                picker="year"
                                className="custom-input-fields"
                                onChange={(date: any, dateString: any) => {
                                    const clone = JSON.parse(JSON.stringify(properties));
                                    clone[activeItemIndex].start_year = +dateString;
                                    setProperties(clone);
                                }}
                            />
                        ) : (
                            <Text>{inputs.assets.properties[activeItemIndex].end_year}</Text>
                        )}
                    </Form.Item>
                    <Form.Item label="Type of Property">
                        {editMode ? (
                            <Select
                                defaultValue={inputs.assets.properties[activeItemIndex].type_of_property}
                                className="custom-input-fields"
                                onChange={(e: any) => {
                                    const clone = JSON.parse(JSON.stringify(properties));
                                    clone[activeItemIndex].type_of_property = e === "yes";
                                    setProperties(clone);
                                }}
                            >
                                <Option value="Main Home">Main Home</Option>
                                <Option value="Other Residential">Other Residential</Option>
                            </Select>
                        ) : (
                            <Text>
                                {inputs.assets.properties[activeItemIndex].type_of_property}
                            </Text>
                        )}
                    </Form.Item>
                    <Form.Item label="On Mortgage?">
                        {editMode ? (
                            <Select
                                defaultValue={inputs.assets.properties[activeItemIndex].on_mortgage
                                    ? "yes"
                                    : "no"}
                                className="custom-input-fields"
                                onChange={(e: any) => {
                                    const clone = JSON.parse(JSON.stringify(properties));
                                    clone[activeItemIndex].on_mortgage = e === "yes";
                                    setProperties(clone);
                                }}
                            >
                                <Option value="yes">Yes</Option>
                                <Option value="no">No</Option>
                            </Select>
                        ) : (
                            <Text>
                                {inputs.assets.properties[activeItemIndex].on_mortgage
                                    ? "Yes"
                                    : "No"}
                            </Text>
                        )}
                    </Form.Item>
                    <Form.Item label="Deposit">
                        <Text>
                            <CurrencyFormat
                                value={
                                    inputs.assets.properties[activeItemIndex].deposit
                                }
                                displayType={"text"}
                                thousandSeparator={true}
                                decimalScale={0}
                                prefix={"£ "}
                            />
                        </Text>
                    </Form.Item>
                    <Form.Item label="SDLT">
                        <Text>
                            <CurrencyFormat
                                value={
                                    inputs.assets.properties[activeItemIndex].sdlt
                                }
                                displayType={"text"}
                                thousandSeparator={true}
                                decimalScale={0}
                                prefix={"£ "}
                            />

                            {}</Text>
                    </Form.Item>
                </Form>
            </Modal>
        </Fragment>
    );
};

export default Properties;
