import React, {Fragment, useEffect, useState} from "react";
import {Card, Col, Row, Tabs, Typography} from "antd";
import {RootStateOrAny, useSelector} from "react-redux";

import Assets from "./householdDetails/Assets";
import Children from "./householdDetails/peopleComponents/Children";
import Expenses from "./householdDetails/Expenses";
import Income from "./householdDetails/Income";
import Liabilities from "./householdDetails/Liabilities";
import Owner from "./householdDetails/peopleComponents/Owner";
import "./HouseholdDetails.css";

import highcharts, {numberFormat, Options} from "highcharts";
import HighchartsReact from "highcharts-react-official";
import IInputs from "../../interfaces/IInputs";
import {pound} from "../../components/currencySumbol";

const {Title, Text} = Typography;

const {TabPane} = Tabs;

const HouseholdDetails = () => {
    const inputs: IInputs = useSelector(
        (state: RootStateOrAny) => state.inputsReducer
    )[0];
    const currentInputs: any = useSelector(
        (state: RootStateOrAny) => state.currentInputSetReducer
    );
    const summary: any = useSelector(
        (state: RootStateOrAny) => state.summaryReducer
    );

    const [totalAssets, setTotalAssets] = useState(0);
    const [totalLiabilities, setTotalLiabilities] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    useEffect(() => {
        let totalAssetsTemp = 0;
        let totalLiabilitiesTemp = 0;

        const cy = inputs.current_year

        inputs.assets.properties.map((p) => {
            if (cy >= p.start_year && cy <= p.end_year) {
                totalAssetsTemp += p.todays_value
            }
        });

        totalAssetsTemp += inputs.assets.bank_accounts.original_balance;

        inputs.assets.savings_and_investments.individual_savings_account.map(
            (sai) => {
                if (cy >= sai.contribution_start_year && cy <= sai.contribution_end_year) {
                    totalAssetsTemp += sai.original_balance;
                }
            }
        );

        inputs.assets.non_employment_defined_contribution_pension_plans.map(
            (dcpp) => {
                if (cy >= dcpp.contribution_start_year && cy <= dcpp.contribution_end_year) {
                    totalAssetsTemp += dcpp.original_balance;
                }

            }
        );

        inputs.liabilities.mortgages.map((m) => {
            if (cy >= m.start_year && cy <= m.end_year) {
                totalLiabilitiesTemp += m.original_balance;
            }

        });

        inputs.liabilities.other_loans.map((ol) => {
            if (cy >= ol.start_year && cy <= ol.end_year) {
                totalLiabilitiesTemp += ol.original_balance;
            }

        });

        totalLiabilitiesTemp += inputs.liabilities.credit_card.original_balance;

        let totalIncomeTemp = 0;
        let totalExpensesTemp = 0;

        inputs.household_income.employment_income.map((ei) => {
            if (cy >= ei.start_year && cy <= ei.end_year) {
                totalIncomeTemp += ei.gross_anual_amount;
            }
        });
        inputs.household_income.self_employment_income.map((sei) => {
            if (cy >= sei.start_year && cy <= sei.end_year) {
                totalIncomeTemp += sei.gross_anual_amount;
            }
        });
        totalIncomeTemp += cy >= inputs.household_income.rental_income.details[0].start_year && cy <= inputs.household_income.rental_income.details[0].end_year ? inputs.household_income.rental_income.joint_annual_rental_income : 0


        inputs.household_income.dividend_income.map((di) => {
            if (cy >= di.start_year && cy <= di.end_year) {

                totalIncomeTemp += di.anual_amount;
            }
        });

        inputs.household_income.savings_and_investments_drawdowns.individual_savings_accounts.map(
            (draw) => {
                draw.drawdowns.map((d) => {
                    if (cy >= d.start_year && cy <= d.end_year) {
                        totalIncomeTemp += d.amount_to_drawn_down;
                    }
                });
            }
        );
        inputs.household_income.pension_income.state_pension.map((sp) => {
            if (cy >= sp.start_year && cy <= sp.end_year) {

                totalIncomeTemp += sp.annual_amount;
            }
        });
        inputs.household_income.pension_income.defined_benifit_pension_plans.map(
            (dbpp) => {
                if (cy >= dbpp.start_year && cy <= dbpp.end_year) {

                    totalIncomeTemp += dbpp.estimated_lump_sum;
                }
            }
        );
        inputs.household_income.pension_income.defined_contribution_pension_plans.map(
            (dcpp) => {
                if (cy >= dcpp.end_year && cy <= dcpp.end_year) {

                    totalIncomeTemp += dcpp.drawdown_option_annual_amount;
                }
            }
        );
        inputs.household_income.other_income.other_taxable_income.map((income) => {
            if (cy >= income.start_year && cy <= income.end_year) {

                totalIncomeTemp += income.gross_annual_amount;
            }
        });
        inputs.household_income.other_income.other_non_taxable_income.map(
            (income) => {
                if (cy >= income.start_year && cy <= income.end_year) {

                    totalIncomeTemp += income.gross_annual_amount;
                }
            }
        );

        inputs.household_expenses.housing.details.map((expense) => {
            if (cy >= expense.start_year && cy <= expense.end_year) {
                totalExpensesTemp += expense.annual_expense;

            }
        });
        inputs.household_expenses.consumables.details.map((expense) => {
            if (cy >= expense.start_year && cy <= expense.end_year) {
                totalExpensesTemp += expense.annual_expense;

            }
        });
        inputs.household_expenses.travel.details.map((expense) => {
            if (cy >= expense.start_year && cy <= expense.end_year) {
                totalExpensesTemp += expense.annual_expense;

            }
        });
        inputs.household_expenses.shopping.details.map((expense) => {
            if (cy >= expense.start_year && cy <= expense.end_year) {
                totalExpensesTemp += expense.annual_expense;

            }
        });
        inputs.household_expenses.entertainment.details.map((expense) => {
            if (cy >= expense.start_year && cy <= expense.end_year) {
                totalExpensesTemp += expense.annual_expense;

            }
        });
        inputs.household_expenses.holiday.details.map((expense) => {
            if (cy >= expense.start_year && cy <= expense.end_year) {
                totalExpensesTemp += expense.annual_expense;

            }
        });
        inputs.household_expenses.insurance_policies.map((expense) => {
            if (cy >= expense.start_year && cy <= expense.end_year) {
                totalExpensesTemp += expense.annual_expense;

            }
        });
        inputs.household_expenses.one_off_expenses.map((expense) => {
            if (cy >= expense.start_year && cy <= expense.end_year) {
                totalExpensesTemp += expense.annual_payment_in_todays_terms;
            }

        });


        if (inputs.children[0].primary_school_year >= inputs.current_year && inputs.children[0].secondary_school_year <= inputs.current_year) {
            totalExpensesTemp +=
                inputs.household_expenses.children_education_expenses.primary_school_fees
                    .annual_fee_in_todays_terms;
            totalExpensesTemp +=
                inputs.household_expenses.children_education_expenses.seconday_school_fees
                    .annual_fee_in_todays_terms;
            totalExpensesTemp +=
                inputs.household_expenses.children_education_expenses.university_fees
                    .annual_fee_in_todays_terms;
        } else if (inputs.children[0].secondary_school_year >= inputs.current_year && inputs.children[0].university_year <= inputs.current_year) {
            totalExpensesTemp +=
                inputs.household_expenses.children_education_expenses.primary_school_fees
                    .annual_fee_in_todays_terms;
            totalExpensesTemp +=
                inputs.household_expenses.children_education_expenses.seconday_school_fees
                    .annual_fee_in_todays_terms;
            totalExpensesTemp +=
                inputs.household_expenses.children_education_expenses.university_fees
                    .annual_fee_in_todays_terms;
        } else if (inputs.children[0].university_year >= inputs.current_year && inputs.children[0].graduation_year <= inputs.current_year) {
            totalExpensesTemp +=
                inputs.household_expenses.children_education_expenses.primary_school_fees
                    .annual_fee_in_todays_terms;
            totalExpensesTemp +=
                inputs.household_expenses.children_education_expenses.seconday_school_fees
                    .annual_fee_in_todays_terms;
            totalExpensesTemp +=
                inputs.household_expenses.children_education_expenses.university_fees
                    .annual_fee_in_todays_terms;
        }


        setTotalAssets(totalAssetsTemp);
        setTotalLiabilities(totalLiabilitiesTemp);

        setTotalIncome(totalIncomeTemp);
        setTotalExpenses(totalExpensesTemp);
    }, [inputs]);

    const commonChartOptions: Highcharts.Options = {
        chart: {
            plotShadow: false,
            height: "200px",
        },
        title: {
            text: "",
        },
        tooltip: {
            pointFormat: "<b>£{point.y:,.0f}</b>",

            shared: true,
            useHTML: true,
        },
        credits: {
            enabled: false,
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                    enabled: false,
                },
                showInLegend: true,
            },
        },
    };

    const [
        assetChartOptions,
        setAssetChartOptions,
    ] = useState<Highcharts.Options>({
        ...commonChartOptions,
        legend: {
            align: "right",
            verticalAlign: "middle",
            layout: "vertical",
            width: "50%"

        },
        colors: ["#0288d1", "#039be5", "#03a9f4", "#29b6f6"],
        series: [
            {
                name: "Assets",
                colorByPoint: true,
                type: "pie",
                innerSize: "70%",
                data: [
                    {
                        name: "Properties",

                        y: inputs.assets.properties.reduce((sum: any, p: any) => {
                            if (
                                inputs.current_year <= p.end_year &&
                                inputs.current_year >= p.start_year
                            ) {
                                return sum + p.todays_value;
                            } else {
                                return sum;
                            }
                        }, 0),
                    },
                    {
                        name: "Bank Account",
                        y: inputs.assets.bank_accounts.original_balance,
                    },
                    {
                        name: "Pension Plan",
                        y: inputs.assets.non_employment_defined_contribution_pension_plans.reduce(
                            (sum: any, p: any) => {
                                if (
                                    inputs.current_year <= p.contribution_end_year &&
                                    inputs.current_year >= p.contribution_start_year
                                ) {
                                    return sum + p.original_balance;
                                } else {
                                    return sum;
                                }
                            },
                            0
                        ),
                    },
                    {
                        name: "Savings and Investments",
                        y:
                            inputs.assets.savings_and_investments.individual_savings_account.reduce(
                                (sum: any, p: any) => {
                                    if (
                                        inputs.current_year <= p.contribution_end_year &&
                                        inputs.current_year >= p.contribution_start_year
                                    ) {
                                        return sum + p.original_balance;
                                    } else {
                                        return sum;
                                    }
                                },
                                0
                            ) +
                            inputs.assets.savings_and_investments.general_investment_account.reduce(
                                (sum: any, p: any) => {
                                    if (
                                        inputs.current_year <= p.contribution_end_year &&
                                        inputs.current_year >= p.contribution_start_year
                                    ) {
                                        return sum + p.original_balance;
                                    } else {
                                        return sum;
                                    }
                                },
                                0
                            ),
                    },
                ],
            },
        ],
    });
    const [
        liabilitiesChartOptions,
        setLiabilitiesChartOptions,
    ] = useState<Highcharts.Options>({
        ...commonChartOptions,
        legend: {
            align: "right",
            verticalAlign: "middle",
            layout: "vertical",
            width: "50%"

        },
        colors: ["#ab47bc", "#ba68c8", "#ce93d8"],
        series: [
            {
                name: "Liabilities",
                colorByPoint: true,
                type: "pie",
                innerSize: "70%",
                data: [
                    {
                        name: "Mortgages",
                        y: inputs.liabilities.mortgages.reduce((sum: any, p: any) => {
                            if (
                                inputs.current_year <= p.end_year &&
                                inputs.current_year >= p.start_year
                            ) {
                                return sum + p.original_balance;
                            } else {
                                return sum;
                            }
                        }, 0),
                    },
                    {
                        name: "Other Loans",
                        y: inputs.liabilities.other_loans.reduce((sum: any, p: any) => {
                            if (
                                inputs.current_year <= p.end_year &&
                                inputs.current_year >= p.start_year
                            ) {
                                return sum + p.original_balance;
                            } else {
                                return sum;
                            }
                        }, 0),
                    },
                    {
                        name: "Credit Card",
                        y: inputs.liabilities.credit_card.original_balance,
                    },
                ],
            },
        ],
    });

    const [
        incomeChartOptions,
        setIncomeChartOptions,
    ] = useState<Highcharts.Options>({
        ...commonChartOptions,
        legend: {
            align: "right",
            verticalAlign: "middle",
            layout: "vertical",
            width: "50%"
        },
        colors: [
            "#388e3c",
            "#43a047",
            "#4caf50",
            "#66bb6a",
            "#81c784",
            "#a5d6a7",
            "#c8e6c9",
        ],
        series: [
            {
                name: "Income",
                colorByPoint: true,
                type: "pie",
                innerSize: "70%",
                data: [
                    {
                        name: "Employment Income",
                        y: inputs.household_income.employment_income.reduce(
                            (sum: any, p: any) => {
                                if (
                                    inputs.current_year <= p.end_year &&
                                    inputs.current_year >= p.start_year
                                ) {
                                    return sum + p.gross_anual_amount;
                                } else {
                                    return sum;
                                }
                            },
                            0
                        ),
                    },
                    {
                        name: "Self Employment Income",
                        y: inputs.household_income.self_employment_income.reduce(
                            (sum: any, p: any) => {
                                if (
                                    inputs.current_year <= p.end_year &&
                                    inputs.current_year >= p.start_year
                                ) {
                                    return sum + p.gross_anual_amount;
                                } else {
                                    return sum;
                                }
                            },
                            0
                        ),
                    },
                    {
                        name: "Rental Income",
                        y:
                            inputs.household_income.rental_income.details[0].start_year >=
                            inputs.current_year &&
                            inputs.household_income.rental_income.details[0].end_year <=
                            inputs.current_year
                                ? inputs.household_income.rental_income
                                    .joint_annual_rental_income
                                : 0,
                    },
                    {
                        name: "Dividend Income",
                        y: inputs.household_income.dividend_income.reduce(
                            (sum: any, p: any) => {
                                if (
                                    inputs.current_year <= p.end_year &&
                                    inputs.current_year >= p.start_year
                                ) {
                                    return sum + p.anual_amount;
                                } else {
                                    return sum;
                                }
                            },
                            0
                        ),
                    },
                    {
                        name: "Savings and Investments Income",
                        y:
                            inputs.household_income.savings_and_investments_drawdowns.individual_savings_accounts.reduce(
                                (sum: any, d: any) =>
                                    sum +
                                    d.drawdowns.reduce(
                                        (a: any, b: any) => {
                                            if (
                                                inputs.current_year <= b.end_year &&
                                                inputs.current_year >= b.start_year
                                            ) {
                                                return a + b.amount_to_drawn_down;
                                            } else {
                                                return a;
                                            }
                                        },

                                        0
                                    ),
                                0
                            ) +
                            inputs.household_income.savings_and_investments_drawdowns.general_investment_accounts.reduce(
                                (sum: any, d: any) =>
                                    sum +
                                    d.drawdowns.reduce(
                                        (a: any, b: any) => {
                                            if (
                                                inputs.current_year <= b.end_year &&
                                                inputs.current_year >= b.start_year
                                            ) {
                                                return a + b.amount_to_drawn_down;
                                            } else {
                                                return a;
                                            }
                                        },

                                        0
                                    ),
                                0
                            ),
                    },
                    {
                        name: "Pension Income",
                        y:
                            inputs.household_income.pension_income.state_pension.reduce(
                                (a: any, b: any) => {
                                    if (
                                        inputs.current_year <= b.end_year &&
                                        inputs.current_year >= b.start_year
                                    ) {
                                        return a + b.amount_to_drawn_down;
                                    } else {
                                        return a;
                                    }
                                },
                                0
                            ) +
                            inputs.household_income.pension_income.defined_benifit_pension_plans.reduce(
                                (a: any, b: any) => {
                                    if (
                                        inputs.current_year <= b.end_year &&
                                        inputs.current_year >= b.start_year
                                    ) {
                                        return a + b.estimated_lump_sum;
                                    } else {
                                        return a;
                                    }
                                },
                                0
                            ) +
                            inputs.household_income.pension_income.defined_contribution_pension_plans.reduce(
                                (a: any, b: any) => {
                                    if (
                                        inputs.current_year <= b.end_year &&
                                        inputs.current_year >= b.start_year
                                    ) {
                                        return a + b.drawdown_option_annual_amount;
                                    } else {
                                        return a;
                                    }
                                },
                                0
                            ),
                    },
                    {
                        name: "Other Income",
                        y: 0,
                    },
                ],
            },
        ],
    });
    const [
        expensesChartOptions,
        setExpensesChartOptions,
    ] = useState<Highcharts.Options>({
        ...commonChartOptions,
        legend: {
            align: "right",
            verticalAlign: "top",
            layout: "vertical",
            width: "50%"
        },
        colors:[
            "#c62828",
            "#d32f2f",
            "#e53935",
            "#f44336",
            "#ef5350",
            "#e57373",
            "#ef9a9a",
            "#ffcdd2",
        ],

        series: [
            {
                name: "Expense",
                colorByPoint: true,
                type: "pie",
                innerSize: "70%",
                data: [
                    {
                        name: "Housing",
                        y: inputs.household_expenses.housing.details.reduce(
                            (a: any, b: any) => {
                                if (
                                    inputs.current_year <= b.end_year &&
                                    inputs.current_year >= b.start_year
                                ) {
                                    return a + b.annual_expense;
                                } else {
                                    return a;
                                }
                            },
                            0
                        ),
                    },
                    {
                        name: "Consumables",
                        y: inputs.household_expenses.consumables.details.reduce(
                            (a: any, b: any) => {
                                if (
                                    inputs.current_year <= b.end_year &&
                                    inputs.current_year >= b.start_year
                                ) {
                                    return a + b.annual_expense;
                                } else {
                                    return a;
                                }
                            },
                            0
                        ),
                    },
                    {
                        name: "Travel",
                        y: inputs.household_expenses.travel.details.reduce(
                            (a: any, b: any) => {
                                if (
                                    inputs.current_year <= b.end_year &&
                                    inputs.current_year >= b.start_year
                                ) {
                                    return a + b.annual_expense;
                                } else {
                                    return a;
                                }
                            },
                            0
                        ),
                    },
                    {
                        name: "Shopping",
                        y: inputs.household_expenses.shopping.details.reduce(
                            (a: any, b: any) => {
                                if (
                                    inputs.current_year <= b.end_year &&
                                    inputs.current_year >= b.start_year
                                ) {
                                    return a + b.annual_expense;
                                } else {
                                    return a;
                                }
                            },
                            0
                        ),
                    },
                    {
                        name: "Entertainment",
                        y: inputs.household_expenses.entertainment.details.reduce(
                            (a: any, b: any) => {
                                if (
                                    inputs.current_year <= b.end_year &&
                                    inputs.current_year >= b.start_year
                                ) {
                                    return a + b.annual_expense;
                                } else {
                                    return a;
                                }
                            },
                            0
                        ),
                    },
                    {
                        name: "Holiday",
                        y: inputs.household_expenses.holiday.details.reduce(
                            (a: any, b: any) => {
                                if (
                                    inputs.current_year <= b.end_year &&
                                    inputs.current_year >= b.start_year
                                ) {
                                    return a + b.annual_expense;
                                } else {
                                    return a;
                                }
                            },
                            0
                        ),
                    },
                    {
                        name: "Insurance Policies",
                        y: inputs.household_expenses.insurance_policies.reduce(
                            (a: any, b: any) => {
                                if (
                                    inputs.current_year <= b.end_year &&
                                    inputs.current_year >= b.start_year
                                ) {
                                    return a + b.annual_expense;
                                } else {
                                    return a;
                                }
                            },
                            0
                        ),
                    },
                    {
                        name: "One-Off Expenses",
                        y: inputs.household_expenses.one_off_expenses.reduce(
                            (a: any, b: any) => {
                                if (
                                    inputs.current_year <= b.end_year &&
                                    inputs.current_year >= b.start_year
                                ) {
                                    return a + b.annual_payment_in_todays_terms;
                                } else {
                                    return a;
                                }
                            },
                            0
                        ),
                    },
                    {
                        name: "Children",
                        y:
                            inputs.children[0].primary_school_year >= inputs.current_year &&
                            inputs.children[0].secondary_school_year <= inputs.current_year
                                ? inputs.household_expenses.children_education_expenses
                                    .primary_school_fees.annual_fee_in_todays_terms +
                                inputs.household_expenses.children_education_expenses
                                    .seconday_school_fees.annual_fee_in_todays_terms +
                                inputs.household_expenses.children_education_expenses
                                    .university_fees.annual_fee_in_todays_terms
                                : inputs.children[0].secondary_school_year >=
                                inputs.current_year &&
                                inputs.children[0].university_year <= inputs.current_year
                                ? inputs.household_expenses.children_education_expenses
                                    .primary_school_fees.annual_fee_in_todays_terms +
                                inputs.household_expenses.children_education_expenses
                                    .seconday_school_fees.annual_fee_in_todays_terms +
                                inputs.household_expenses.children_education_expenses
                                    .university_fees.annual_fee_in_todays_terms
                                : inputs.children[0].university_year >= inputs.current_year &&
                                inputs.children[0].graduation_year <= inputs.current_year
                                    ? inputs.household_expenses.children_education_expenses
                                        .primary_school_fees.annual_fee_in_todays_terms +
                                    inputs.household_expenses.children_education_expenses
                                        .seconday_school_fees.annual_fee_in_todays_terms +
                                    inputs.household_expenses.children_education_expenses
                                        .university_fees.annual_fee_in_todays_terms
                                    : 0,
                    },
                ],
            },
        ],
    });



    return (
        <Fragment>

            <div style={{padding: "16px", backgroundColor: "white"}}>
                <Row>
                    <Col span={24}>
                        <Tabs animated={true} defaultActiveKey={"assetsAndLiabilities"}>
                            <TabPane tab="Household Members" key="1">
                                <Row>
                                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                                        <Card title="Owners" style={{marginRight: "16px"}}>
                                            <Owner inputs={inputs}/>
                                        </Card>
                                    </Col>
                                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                                        <Card title="Dependants">
                                            <Children inputs={inputs}/>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="Assets and Liabilities" key="assetsAndLiabilities">
                                <Row justify="space-around" align="middle">
                                    <Col span={24}>
                                        <Card bordered={false}>
                                            <Row justify="space-around">
                                                <Col span={6}>
                                                    <Row justify={"start"}>
                                                        <Text
                                                            style={{width: "100%", textAlign: "left"}}
                                                            strong
                                                        >
                                                            Net Worth
                                                        </Text>

                                                        <Title level={1} className="cashflow-heeding">
                                                            {pound}
                                                            {numberFormat(totalAssets - totalLiabilities, 0, ".", ",")}
                                                        </Title>
                                                    </Row>
                                                    <Row justify="start">
                                                        <Col span={12}>
                                                            <Row justify="space-around">
                                                                <Text className="asset-heading"> Assets</Text>

                                                                <Text className="asset-amount">
                                                                    {pound}{numberFormat(totalAssets, 0, ".", ",")}
                                                                </Text>
                                                            </Row>
                                                        </Col>
                                                        <Col span={12}>
                                                            <Row justify="space-around">
                                                                <Text  className="liability-heading"> Liabilities</Text>
                                                                <Text className="liability-amount">
                                                                    -{pound}{numberFormat(totalLiabilities, 0, ".", ",")}
                                                                </Text>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Col>

                                                <Col span={8}>
                                                    <HighchartsReact options={assetChartOptions}/>
                                                </Col>


                                                <Col span={8}>
                                                    <HighchartsReact options={liabilitiesChartOptions}/>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                                        <Assets/>
                                    </Col>
                                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                                        <Liabilities/>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="Income and Expenses" key="incomeAndExpenses">
                                <Row justify="space-around" align="middle">
                                    <Col span={24}>
                                        <Card bordered={false}>
                                            <Row justify="space-around">
                                                <Col span={6}>
                                                    <Row justify={"start"}>
                                                        <Text
                                                            style={{width: "100%", textAlign: "left"}}
                                                            strong
                                                        >
                                                            Cashflow
                                                        </Text>

                                                        <Title level={1} className="cashflow-heeding">
                                                            {pound}
                                                            {numberFormat(totalIncome - totalExpenses, 0, ".", ",")}
                                                        </Title>
                                                    </Row>
                                                    <Row justify="start">
                                                        <Col span={12}>
                                                            <Row justify="space-around">
                                                                <Text className="income-heading"> Income</Text>

                                                                <Text className="income-amount">
                                                                    {pound}{numberFormat(totalIncome, 0, ".", ",")}
                                                                </Text>
                                                            </Row>
                                                        </Col>
                                                        <Col span={12}>
                                                            <Row justify="space-around">
                                                                <Text  className="expense-heading"> Expenses</Text>
                                                                <Text className="expense-amount">
                                                                    -{pound}{numberFormat(totalExpenses, 0, ".", ",")}
                                                                </Text>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Col>

                                                <Col span={8}>
                                                    <HighchartsReact options={incomeChartOptions}/>
                                                </Col>


                                                <Col span={8}>
                                                    <HighchartsReact options={expensesChartOptions}/>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                                        <Income/>
                                    </Col>
                                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                                        <Expenses/>
                                    </Col>
                                </Row>
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </div>
        </Fragment>
    );
};

export default HouseholdDetails;
