import {PlusCircleOutlined} from "@ant-design/icons";
import {
    Button,
    Card,
    Col,
    DatePicker,
    Divider,
    Form,
    InputNumber,
    Row,
    Select,
} from "antd";

import Text from "antd/lib/typography/Text";
import {
    IDividendIncome,
    IEmploymentIncome, IIndividualSavingAccountDrawdowns,
    IOwner,
    IPensionIncomeDefinedBenifitPensionPlan, IPensionIncomeDefinedContributionPensionPlans,
    IRentalIncome,
    ISavingsAndInvestmentSDrawdowns,
    ISelfEmploymentIncome,
} from "../../../interfaces/ISubInputs";

const {Option} = Select;
/*eslint no-useless-escape: "off"*/
const Income = (props: any) => {
    const owners: IOwner[] = props.owners;
    const employmentIncome: IEmploymentIncome[] = props.employmentIncome;
    const selfEmploymentIncome: ISelfEmploymentIncome[] =
        props.selfEmploymentIncome;
    const rentalIncome: IRentalIncome = props.rentalIncome;
    const dividendIncome: IDividendIncome[] = props.dividendIncome;
    const savingsAndInvestmentsDrawdowns: ISavingsAndInvestmentSDrawdowns =
        props.savingsAndInvestmentsDrawdowns;
    const pensionIncomeDefinedBenifitPensionPlans: IPensionIncomeDefinedBenifitPensionPlan[] =
        props.pensionIncomeDefinedBenifitPensionPlans;
    const pensionIncomeDefinedContributionPensionPlans : IPensionIncomeDefinedContributionPensionPlans[] = props.pensionIncomeDefinedContributionPensionPlans

    return (
        <Card
            title="Income"
            id="income"
            style={{margin: "16px", borderColor: "#81c784"}}
        >
            {/* Employment Income */}
            <div id="employment-income"/>
            <Divider orientation="left">Employment Income</Divider>
            {employmentIncome.map((income: IEmploymentIncome, i: number) => {
                return (
                    <Row key={i + "employmentIncome"}>
                        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                            <Form.Item label=" ">
                                <Text strong editable={{
                                    onChange: (e) => {
                                        const clone = [...owners]
                                        clone[i].name = e
                                        props.onOwnerChange(clone)
                                    }
                                }}>{owners[i].name}</Text>
                            </Form.Item>
                        </Col>
                        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                            <Form.Item label="Gross annual amount:">
                                <InputNumber
                                    formatter={(value) =>
                                        "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    }
                                    parser={(value) => value!.replace(/£\s?|(,*)/g, "")}
                                    className="custom-input-fields"
                                    onBlur={(e) => {
                                        const clone: IEmploymentIncome[] = [...employmentIncome];

                                        clone[i].gross_anual_amount = +e.target.value.replace(/£\s?|(,*)/g, "");
                                        props.onEmploymentIncomeChange(clone);
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                );
            })}

            {/* Self-Employment Income */}
            <div id="self-employment-income"/>
            <Divider orientation="left">Self-Employment Income</Divider>
            {selfEmploymentIncome.map((income: any, i: number) => {
                return <Row key={i + "selfemploymentincome"}>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                        <Form.Item label=" ">
                            <Text strong editable={{
                                onChange: (e) => {
                                    const clone = [...owners]
                                    clone[i].name = e
                                    props.onOwnerChange(clone)
                                }
                            }}>{owners[i].name}</Text>
                        </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                        <Form.Item label="Gross annual amount:">
                            <InputNumber
                                formatter={(value) =>
                                    "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }
                                parser={(value) => value!.replace(/£\s?|(,*)/g, "")}
                                className="custom-input-fields"
                                onBlur={(e) => {
                                    const clone: ISelfEmploymentIncome[] = [...selfEmploymentIncome];

                                    clone[i].gross_anual_amount = +e.target.value.replace(/£\s?|(,*)/g, "");
                                    props.onSelfEmploymentChange(clone);
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            })}

            {/* Rental Income */}
            <div id="rental-income"/>
            <Divider orientation="left">Rental Income</Divider>
            <Row>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item label=" ">
                        <Text>Joint annual rental income</Text>
                    </Form.Item>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item label=" ">
                        <InputNumber
                            formatter={(value) =>
                                "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                            parser={(value) => value!.replace(/£\s?|(,*)/g, "")}
                            className="custom-input-fields"
                            onBlur={(e) => {
                                const clone: IRentalIncome = {...rentalIncome};

                                clone.joint_annual_rental_income = +e.target.value.replace(/£\s?|(,*)/g, "");
                                props.onRentalIncomeChange(clone);
                            }}
                        />
                    </Form.Item>
                </Col>
            </Row>
            {rentalIncome.details.map((income: any, i: number) => {
                return <Row key={i + "rentalIncomeDetails"}>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                        <Form.Item label=" ">
                            <Text strong editable={{
                                onChange: (e) => {
                                    const clone = [...owners]
                                    clone[i].name = e
                                    props.onOwnerChange(clone)
                                }
                            }}>{owners[i].name}</Text>
                        </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                        <Form.Item label="Share of income:">
                            <InputNumber
                                min={0}
                                max={100}
                                formatter={(value) => `${value}%`}
                                parser={(value) => value!.replace("%", "")}
                                className="custom-input-fields"
                                onBlur={(e) => {
                                    const clone: IRentalIncome = {...rentalIncome};

                                    clone.details[i].share_of_rental_income =
                                        +e.target.value.replace("%", "") / 100;

                                    props.onRentalIncomeChange(clone);
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                        <Form.Item label="Start year:">
                            <DatePicker
                                picker="year"
                                className="custom-input-fields"
                                onChange={(date: any, dateString: any) => {
                                    const clone: IRentalIncome = {...rentalIncome};
                                    clone.details[i].start_year = +dateString;
                                    props.onRentalIncomeChange(clone);
                                }}/>


                        </Form.Item>
                    </Col>
                </Row>
            })}
            {/* Dividend Income */}

            <div id="dividend-income"/>
            <Divider orientation="left">Dividend Income</Divider>
            {dividendIncome.map((income: any, i: number) => {
                return <Row key={i + "dividendIncome"}>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                        <Form.Item label=" ">
                            <Text strong editable={{
                                onChange: (e) => {
                                    const clone = [...owners]
                                    clone[i].name = e
                                    props.onOwnerChange(clone)
                                }
                            }}>{owners[i].name}</Text>
                        </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                        <Form.Item label="Annual amount:">
                            <InputNumber
                                formatter={(value) =>
                                    "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }
                                parser={(value) => value!.replace(/£\s?|(,*)/g, "")}
                                className="custom-input-fields"
                                onBlur={(e) => {
                                    const clone: IDividendIncome[] = [...dividendIncome];

                                    clone[i].anual_amount = +e.target.value.replace(/£\s?|(,*)/g, "");
                                    props.onDividendIncomeChange(clone);

                                }}

                            />
                        </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                        <Form.Item label="Start year:">
                            <DatePicker
                                picker="year"
                                className="custom-input-fields"
                                onChange={(date: any, dateString: any) => {
                                    const clone: IDividendIncome[] = [...dividendIncome];
                                    clone[i].start_year = +dateString;
                                    props.onDividendIncomeChange(clone);
                                }}/>
                        </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                        <Form.Item label="End year:">
                            <DatePicker
                                picker="year"
                                className="custom-input-fields"
                                onChange={(date: any, dateString: any) => {
                                    const clone: IDividendIncome[] = [...dividendIncome];
                                    clone[i].end_year = +dateString;
                                    props.onDividendIncomeChange(clone);
                                }}/>
                        </Form.Item>
                    </Col>
                </Row>
            })}
            {/* Drawdowns */}
            <div id="drawdowns"/>
            <Divider orientation="left">Drawdowns</Divider>
            {savingsAndInvestmentsDrawdowns.individual_savings_accounts.map((drawdown: any, i: number) => {
                return <div key={i + "owners2"}>
                    <Row>
                        <Col lg={24} md={24} sm={24} xs={24} className="custom-input-fields">
                            <Form.Item label=" ">
                                <Text>
                                    Individual Savings Account (ISA) - <Text strong>{owners[i].name}</Text>
                                    <Button type="link" onClick={() => {
                                        const clone: IIndividualSavingAccountDrawdowns[] = [...savingsAndInvestmentsDrawdowns.individual_savings_accounts]
                                        clone[i].drawdowns.push({
                                            name: "Drawdown " + (clone[i].drawdowns.length + 1),
                                            amount_to_drawn_down: 0,
                                            start_year: 0,
                                            end_year: 0,
                                            id: ""
                                        })
                                        props.onDrawdownAdd(clone)
                                    }}>
                                        <PlusCircleOutlined/>
                                    </Button>
                                </Text>
                            </Form.Item>
                        </Col>
                    </Row>

                    {drawdown.drawdowns.map((draw: any, i2: number) => {
                        return <Row key={i2 + "drawdown"}>
                            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                                <Form.Item label=" ">
                                    <Text>{draw.name}</Text>
                                </Form.Item>
                            </Col>
                            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                                <Form.Item label="Drawdown:">
                                    <InputNumber
                                        formatter={(value) =>
                                            "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                        }
                                        parser={(value) => value!.replace(/£\s?|(,*)/g, "")}
                                        className="custom-input-fields"
                                        onBlur={(e) => {
                                            const clone: IIndividualSavingAccountDrawdowns[] = [...savingsAndInvestmentsDrawdowns.individual_savings_accounts]

                                            clone[i].drawdowns[i2].amount_to_drawn_down = +e.target.value.replace(/£\s?|(,*)/g, "");
                                            props.onSavingsAndInvestmentsDrawdownsChange(clone);
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                                <Form.Item label="Start year:">
                                    <DatePicker picker="year" className="custom-input-fields"
                                                onChange={(date: any, dateString: any) => {
                                                    const clone: IIndividualSavingAccountDrawdowns[] = [...savingsAndInvestmentsDrawdowns.individual_savings_accounts]
                                                    clone[i].drawdowns[i2].start_year = +dateString;
                                                    props.onSavingsAndInvestmentsDrawdownsChange(clone);
                                                }}/>
                                </Form.Item>
                            </Col>
                            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                                <Form.Item label="End year:">
                                    <DatePicker picker="year" className="custom-input-fields"
                                                onChange={(date: any, dateString: any) => {
                                                    const clone: IIndividualSavingAccountDrawdowns[] = [...savingsAndInvestmentsDrawdowns.individual_savings_accounts]
                                                    clone[i].drawdowns[i2].end_year = +dateString;
                                                    props.onSavingsAndInvestmentsDrawdownsChange(clone);
                                                }}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    })}

                </div>
            })}
            <div id="pension-plans"/>
            {/* Pension Plans */}
            <Divider orientation="left">Pension Plans</Divider>
            <Row>
                <Col lg={24} md={24} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item label=" ">
                        <Text>Defined Benefit Pension Plan</Text>
                    </Form.Item>
                </Col>
            </Row>

            {pensionIncomeDefinedBenifitPensionPlans.map((plan: any, i: number) => {
                return <Row key={i+"pensionIncomeDefinedBenifitPensionPlans"}>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                        <Form.Item label=" ">
                            <Text strong editable={{
                                onChange: (e) => {
                                    const clone = [...owners]
                                    clone[i].name = e
                                    props.onOwnerChange(clone)
                                }
                            }}>{owners[i].name}</Text>
                        </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                        <Form.Item label="Option taken:">
                            <Select
                                defaultValue="Lump Sum"
                                className="custom-input-fields"
                               onChange={(e)=>{
                                   const clone: IPensionIncomeDefinedBenifitPensionPlan[] = [...pensionIncomeDefinedBenifitPensionPlans];
                                   clone[i].option_taken = e;
                                   props.onPensionIncomeDefinedBenifitPensionPlansChange(clone);
                               }}


                            >
                                <Option value="Lump Sum">Lump Sum</Option>
                                <Option value="Annual">Annual</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                        <Form.Item label="Estimated lump sum:">
                            <InputNumber
                                formatter={(value) =>
                                    "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }
                                parser={(value) => value!.replace(/£\s?|(,*)/g, "")}
                                className="custom-input-fields"
                                onBlur={(e) => {
                                    const clone: IPensionIncomeDefinedBenifitPensionPlan[] = [...pensionIncomeDefinedBenifitPensionPlans];

                                    clone[i].estimated_lump_sum = +e.target.value.replace(/£\s?|(,*)/g, "");
                                    props.onPensionIncomeDefinedBenifitPensionPlansChange(clone);
                                }}

                            />
                        </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                        <Form.Item label="Est. annual pension:">
                            <InputNumber
                                formatter={(value) =>
                                    "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }
                                parser={(value) => value!.replace(/£\s?|(,*)/g, "")}
                                className="custom-input-fields"
                                onBlur={(e) => {
                                    const clone: IPensionIncomeDefinedBenifitPensionPlan[] = [...pensionIncomeDefinedBenifitPensionPlans];

                                    clone[i].estimated_annual_pension = +e.target.value.replace(/£\s?|(,*)/g, "");
                                    props.onPensionIncomeDefinedBenifitPensionPlansChange(clone);
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                        <Form.Item label="Annual increase">
                            <InputNumber
                                min={0}
                                max={100}
                                formatter={(value) => `${value}%`}
                                parser={(value) => value!.replace("%", "")}
                                className="custom-input-fields"

                                onBlur={(e) => {
                                    const clone: IPensionIncomeDefinedBenifitPensionPlan[] = [...pensionIncomeDefinedBenifitPensionPlans];

                                    clone[i].annual_increase =
                                        +e.target.value.replace("%", "") / 100;


                                    props.onPensionIncomeDefinedBenifitPensionPlansChange(clone);
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            })}

            <Row>
                <Col lg={24} md={24} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item label=" ">
                        <Text>Defined Contribution Pension Plan</Text>
                    </Form.Item>
                </Col>
            </Row>

            {pensionIncomeDefinedContributionPensionPlans.map((plan:any, i:number)=>{
                return  <Row key={i+"pensionIncomeDefinedContributionPensionPlans"}>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                        <Form.Item label=" ">
                            <Text strong editable={{
                                onChange: (e) => {
                                    const clone = [...owners]
                                    clone[i].name = e
                                    props.onOwnerChange(clone)
                                }
                            }}>{owners[i].name}</Text>
                        </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                        <Form.Item label="Option taken:">
                            <Select
                                defaultValue="Lump Sum"
                                className="custom-input-fields"
                                onChange={(e)=>{
                                    const clone: IPensionIncomeDefinedContributionPensionPlans[] = [...pensionIncomeDefinedContributionPensionPlans];

                                    clone[i].option_taken = e;
                                    props.onPensionIncomeDefinedContributionPensionPlansChange(clone);
                                }}
                            >
                                <Option value="Lump Sum">Lump Sum</Option>
                                <Option value="Annual">Annual</Option>
                                <Option value="Drawdown">Drawdown</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                        <Form.Item label="Annual Amount:">
                            <InputNumber
                                formatter={(value) =>
                                    "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }
                                parser={(value) => value!.replace(/£\s?|(,*)/g, "")}
                                className="custom-input-fields"
                                onBlur={(e) => {
                                    const clone: IPensionIncomeDefinedContributionPensionPlans[] = [...pensionIncomeDefinedContributionPensionPlans];

                                    clone[i].drawdown_option_annual_amount = +e.target.value.replace(/£\s?|(,*)/g, "");
                                    props.onPensionIncomeDefinedContributionPensionPlansChange(clone);
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            })}
            {/* Other Income */}
            <div id="other-income"/>
            <Divider orientation="left">Other Income</Divider>
            <Row>
                <Col lg={24} md={24} sm={24} xs={24} className="custom-input-fields">
                    <Form.Item label=" ">
                        <Text>Other Taxable Income</Text>
                        <br/>
                        <Text>Other Non-Taxable Income</Text>
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};

export default Income;
