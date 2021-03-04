import React, {useEffect, useState} from "react";
import Layout from "antd/lib/layout/layout";
import {Button, Card, Col, Collapse, Popover, Row, Slider, Switch, Table, Typography} from "antd";
import IForecastSummary from "../../interfaces/IForecastSummary";
import {RootStateOrAny, useSelector} from "react-redux";
import highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {SettingFilled} from "@ant-design/icons/lib/icons";


const {Text} = Typography
const {Panel} = Collapse;


const IncomeBreakdown = () => {

    const summary: IForecastSummary[] = useSelector((state: RootStateOrAny) => state.summaryReducer);

    const [showTable, setShowTable] = useState(false)

    const [sliderValue, setSliderValue] = useState([summary[0].year, summary[summary.length - 1].year]);


    const [incomeBreakdownOptions, setIncomeBreakdownOptions] = useState<highcharts.Options>({
        chart: {
            height: 400,
            alignTicks: false,
            ignoreHiddenSeries: true,
        },
        credits: {
            enabled: false,
        },
        title: {
            text: "",
            align: "left",
        },
        xAxis: {
            crosshair: true,
            labels: {
                rotation: 0,
                autoRotation: false,
                overflow: "justify",
                step: 3,
            },
            categories: [
                ...summary.map((s) => {
                    return `${s.year} <br> ${s.ages.owner_ages[0].age}<br>${s.ages.owner_ages[1].age}`;
                }),
            ],
            min: 0,
            max: summary.length - 1,
            plotBands: [
                {
                    color: "#ffffff",
                    from: 0,
                    to: summary[0].retirement_ages[0] - summary[0].year + 0.5,
                    label: {
                        text: "",
                        align: "right",
                    },
                    events: {
                        click: (e) => {
                            setSliderValue([summary[0].year, summary[0].retirement_ages[0]])

                            setIncomeBreakdownOptions({
                                ...incomeBreakdownOptions,
                                xAxis: {
                                    ...incomeBreakdownOptions.xAxis,
                                    min: 0,
                                    max: summary[0].retirement_ages[0] - summary[0].year + 0.5 + 1,
                                }
                            })
                        },

                    },
                },
                {
                    color: "#eeeeee",
                    from: summary[0].retirement_ages[0] - summary[0].year + 0.5,
                    to: summary[summary.length - 1].year - summary[0].year + 0.5,
                    label: {
                        align: "right",
                        text: "",
                    },
                    events: {
                        click: (e) => {
                            setSliderValue([summary[0].retirement_ages[0], summary[summary.length - 1].year])

                            setIncomeBreakdownOptions({
                                ...incomeBreakdownOptions,
                                xAxis: {
                                    ...incomeBreakdownOptions.xAxis,
                                    min: summary[0].retirement_ages[0] - summary[0].year + 0.5 - 1,
                                    max: summary[summary.length - 1].year - summary[0].year + 0.5,
                                }
                            })

                        },

                    },
                },
            ],
        },
        rangeSelector: {
            selected: 1,
        },
        yAxis: {
            gridLineWidth: 0,

            min: 0,
            max: null,
            title: {
                text: "",
            },
            labels: {
                useHTML: true,
                formatter: function (e: any) {
                    return "£" + e.value / 1000 + "k";
                },
            },
        },
        tooltip: {
            useHTML: true,
            backgroundColor: "white",
            borderWidth: 0,
            formatter: function () {
                let tooltip_html = this.x.toString();
                tooltip_html += "<table>";

                this.points!.forEach(function (entry: any, index) {
                    if (entry.y > 0) {
                        tooltip_html +=
                            '<tr><td style="font-weight:bold; color:' +
                            entry.series.color +
                            '">' +
                            entry.series.name +
                            ':</td><td style="text-align: right"> ' +
                            "£" +
                            Math.round(entry.y) +
                            "</td></tr>";
                    }
                });

                tooltip_html += "</table>";

                return tooltip_html;
            },
            followPointer: true,
            shared: true,
            distance: 30,
            valueDecimals: 0,
        },
        plotOptions: {
            series: {},
            column: {
                stacking: "normal", borderWidth: 1, pointPadding: 0, groupPadding: 0, pointRange: 1, events: {
                    click: (e) => {
                        console.log(e.point.x)
                    },

                }
            },
        },
        series: [
            {
                name: "Other", type: "column", data: [...summary.map((s) => {
                    return s.income_analysis.total_other_income
                })]
            },
            {
                name: "Pension", type: "column", data: [...summary.map((s) => {
                    return s.income_analysis.total_pension_income
                })]
            },
            {
                name: "Savings and Investments",
                type: "column",
                data: [...summary.map((s) => {
                    return s.income_analysis.total_savings_and_investments_drawdowns
                })],
            },
            {
                name: "Dividend", type: "column", data: [...summary.map((s) => {
                    return s.income_analysis.total_dividend_income
                })]
            },
            {
                name: "Rental", type: "column", data: [...summary.map((s) => {
                    return s.income_analysis.total_rental_income
                })]
            },

            {
                name: "Self-Employment",
                type: "column",
                data: [...summary.map((s) => {
                    return s.income_analysis.total_self_employment_income
                })],
            },
            {
                name: "Employment", type: "column", data: [...summary.map((s) => {
                    return s.income_analysis.total_employment_income
                })]
            },
        ],
    });

    let chartRef: any = React.useRef(null);

    const [employmentData, setEmploymentData] = useState({
        name: "Employment Income",
    })

    const [selfEmploymentData, setSelfEmploymentData] = useState({
        name: "Self-Employment Income",
    })

    const [rentalData, setRentalData] = useState({
        name: "Rental Income",
    })

    const [dividendData, setDividendData] = useState({
        name: "Dividend Income",
    })

    const [saidData, setSaidData] = useState({
        name: "Saving and Investments Drawdowns",
    })

    const [pensionData, setPensionData] = useState({
        name: "Pension Income",
    })

    const [otherIncomeData, setOtherIncomeData] = useState({
        name: "Other Income",
    })

    const [totalIncomeData, setTotalIncomeData] = useState({
        name: "Total Income",
    })

    useEffect(() => {
        let employment: any = {
            name: "Employment Income",
        }
        let selfEmployment: any = {
            name: "Self-Employment Income",
        }
        let rental: any = {
            name: "Rental Income",
        }
        let dividend: any = {
            name: "Dividend Income",
        }
        let said: any = {
            name: "Saving and Investments Drawdowns",
        }
        let pension: any = {
            name: "Pension Income",
        }
        let otherIncome: any = {
            name: "Other Income",
        }
        let totalIncome: any = {
            name: "Total Income",
        }

        summary.map((s, i) => {
            employment["year" + i] = Math.round(s.income_analysis.total_employment_income)
            selfEmployment["year" + i] = Math.round(s.income_analysis.total_self_employment_income)
            rental["year" + i] = Math.round(s.income_analysis.total_rental_income)
            dividend["year" + i] = Math.round(s.income_analysis.total_dividend_income)
            said["year" + i] = Math.round(s.income_analysis.total_savings_and_investments_drawdowns)
            pension["year" + i] = Math.round(s.income_analysis.total_pension_income)
            otherIncome["year" + i] = Math.round(s.income_analysis.total_other_income)
            totalIncome["year" + i] = Math.round(s.income_analysis.total_income)
            return null

        })

        setEmploymentData(employment)
        setSelfEmploymentData(selfEmployment)
        setRentalData(rental)
        setDividendData(dividend)
        setSaidData(said)
        setPensionData(pension)
        setOtherIncomeData(otherIncome)
        setTotalIncomeData(totalIncome)
        setShowTable(true)

    }, [summary])


    const columns: any = [
        {
            title: "Year",
            dataIndex: "name",
            key: "name",
            fixed: "left",
        },
        ...summary.map((s, i) => {
            return {
                title: s.year.toString(),
                dataIndex: `year${i}`,
                key: i,
            }
        })
    ];


    const data = [
        employmentData,
        selfEmploymentData,
        rentalData,
        dividendData,
        saidData,
        pensionData,
        otherIncomeData,
        totalIncomeData,
    ];

    const [chartControls, setChartControls] = useState({
        label: "years",
        zoomable: false,
    });

    const [some, setSome] = useState(0);
    const [some2, setSome2] = useState(some)


    return (
        <Layout style={{backgroundColor: "white"}}>

            <Card
                title="Income"
                style={{margin: "16px"}}
                bordered={false}
                extra={
                    <div>
                        <Switch
                            style={{marginRight: "16px"}}
                            checkedChildren="Zoom"
                            unCheckedChildren="Static"
                            defaultChecked={false}
                            onChange={(e) => {
                                setChartControls({...chartControls, zoomable: e});
                            }}
                        />
                        <Switch
                            style={{marginRight: "16px"}}
                            checkedChildren="Nominal"
                            unCheckedChildren="Real"
                            defaultChecked
                            disabled={true}
                        />
                        <Popover
                            content={
                                <div>
                                    <Row justify="start">
                                        <Col span={12}>
                                            <Row justify="start">
                                                <Text>Labels</Text>
                                            </Row>
                                        </Col>
                                        <Col span={12}>
                                            <Row justify="end">
                                                <Switch
                                                    checkedChildren="Years"
                                                    unCheckedChildren="Ages"
                                                    defaultChecked
                                                    onChange={(e) => {
                                                        if (e) {
                                                            setChartControls({...chartControls, label: "years"});
                                                            setIncomeBreakdownOptions({
                                                                ...incomeBreakdownOptions,
                                                                xAxis: {
                                                                    ...incomeBreakdownOptions.xAxis,
                                                                    categories: [
                                                                        ...summary.map((s) => {
                                                                            return s.year.toString();
                                                                        }),
                                                                    ],
                                                                },
                                                            });
                                                        } else {
                                                            setChartControls({...chartControls, label: "ages"});
                                                            setIncomeBreakdownOptions({
                                                                ...incomeBreakdownOptions,
                                                                xAxis: {
                                                                    ...incomeBreakdownOptions.xAxis,
                                                                    categories: [
                                                                        ...summary.map((s) => {
                                                                            return `${s.ages.owner_ages[0].age}, ${s.ages.owner_ages[1].age}`;
                                                                        }),
                                                                    ],
                                                                },
                                                            });
                                                        }
                                                    }}
                                                />
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            }
                            title="Chart Controls"
                            placement="left"
                            trigger="click"
                        >
                            <Button>
                                <SettingFilled/>
                            </Button>
                        </Popover>
                    </div>
                }
            >
                {chartControls.zoomable && (
                    <Row justify="space-around" align="middle" style={{marginBottom: "16px"}}>

                        <Col span={22}>
                            <Slider
                                range={{draggableTrack: true}}
                                min={summary[0].year}
                                max={summary[summary.length - 1].year}
                                defaultValue={[summary[0].year, summary[summary.length - 1].year]}
                                value={[sliderValue[0], sliderValue[1]]}
                                tipFormatter={(value) => {
                                    if (chartControls.label === "years") {
                                        return `${value}`;
                                    } else {
                                        return `${summary[value! - summary[0].year].ages.owner_ages[0].age}`;
                                    }
                                }}

                                onChange={(e: number[])=>{
                                    setSliderValue(e)
                                }}
                                onAfterChange={(e: number[]) => {
                                    setIncomeBreakdownOptions({
                                        ...incomeBreakdownOptions,
                                        xAxis: {
                                            ...incomeBreakdownOptions.xAxis,
                                            min: e[0] - summary[0].year,
                                            max: e[1] - summary[0].year,
                                        },
                                    });
                                }}
                            />
                        </Col>
                        <Col>
                            <Button onClick={(e)=>{
                                setSliderValue([summary[0].year, summary[summary.length - 1].year])
                                setIncomeBreakdownOptions({
                                    ...incomeBreakdownOptions,
                                    xAxis: {
                                        ...incomeBreakdownOptions.xAxis,
                                        min: 0,
                                        max: summary.length - 1,
                                    },
                                    yAxis:{
                                        ...incomeBreakdownOptions.yAxis,
                                        max: null
                                    }
                                });
                                setSome2(some)
                            }} >Reset</Button>
                        </Col>
                    </Row>
                )}
                <Row justify="space-around">
                    <Col span={23}>
                        <HighchartsReact highcharts={highcharts} options={incomeBreakdownOptions} ref={chartRef}
                                         callback={(chart: any) => {
                                             setSome(chart.yAxis[0].max)
                                         }}/>
                    </Col>
                    {chartControls.zoomable && (
                        <Col style={{paddingBottom: "80px", paddingTop: "20px"}}>
                            <Slider
                                vertical
                                step={10000}
                                max={some}

                                defaultValue={some}
                                style={{marginRight: "16px"}}
                                onChange={(e: number)=>{
                                    setSome2(e)
                                }}
                                onAfterChange={(e: number) => {

                                    setIncomeBreakdownOptions({
                                        ...incomeBreakdownOptions,
                                        yAxis: {
                                            ...incomeBreakdownOptions.yAxis,
                                            max: e,
                                        },
                                    });
                                }}
                            />
                        </Col>
                    )}
                </Row>

                <Row>
                    <Col span={24}>
                        <Collapse>
                            <Panel key={1} header={"Income Breakdown"}>
                                {showTable && (
                                    <Table columns={columns} dataSource={data} pagination={false} scroll={{x: true}}/>
                                )}
                            </Panel>
                        </Collapse>
                    </Col>
                </Row>
            </Card>
        </Layout>
    );
};

export default IncomeBreakdown;
