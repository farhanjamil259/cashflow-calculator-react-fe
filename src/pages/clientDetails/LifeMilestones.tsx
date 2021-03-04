import Layout from "antd/lib/layout/layout";
import {Card, Col, Row, Table, Typography} from "antd";

import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official";
import React, {useEffect} from "react";
import IInputs from "../../interfaces/IInputs";
import {RootStateOrAny, useSelector} from "react-redux";
import {useState} from "react";
import IForecastSummary from "../../interfaces/IForecastSummary";

import BookIcon from "../../assets/Icons/Book"


require("highcharts/highcharts-more")(Highcharts)
require("highcharts/modules/dumbbell")(Highcharts)
require("highcharts/modules/lollipop")(Highcharts)

const {Text, Title} = Typography

interface ILifeGoal {
    name: string;
    year: number;
    icon: string;
    owner: string;
}


function LifeMilestones() {

    const inputs: IInputs = useSelector((state: RootStateOrAny) => state.currentInputSetReducer)
    const summary: IForecastSummary[] = useSelector((state: RootStateOrAny) => state.summaryReducer)


    const lifeGoals: ILifeGoal[] = [
        {
            name: "Plan Start",
            year: inputs.current_year,
            owner: "",
            icon: "url(https://api.iconify.design/clarity:play-solid.svg?height=50)"
        },
        {
            name: "Test",
            year: 2050,
            owner: "Mr Optimistic",
            icon: "url(https://api.iconify.design/clarity:play-solid.svg?height=50)"
        },
        {
            name: "Plan End",
            year: inputs.household_owners.length > 1 ? Math.max(inputs.household_owners[0].end_of_forecast_year - 1, inputs.household_owners[1].end_of_forecast_year - 1) : inputs.household_owners[0].end_of_forecast_year - 1,
            owner: "",
            icon: "url(https://api.iconify.design/fe:stop.svg?height=50)"
        },
        ...inputs.household_owners.map((o, i) => {
            return {
                name: "Retirement",
                year: inputs.household_owners[i].retirement_year,
                owner: o.name,
                icon: "url(https://api.iconify.design/clarity:play-solid.svg?height=50)"
            }
        }),
        ...inputs.children.map((c) => {
            return {
                name: c.name + " " + "born",
                year: c.birth_year,
                owner: c.name,
                icon: "url(https://api.iconify.design/mdi:baby-bottle.svg?height=50)"
            }
        }),
        ...inputs.children.map((c) => {
            return {
                name: "School " + c.name,
                year: c.primary_school_year,
                owner: c.name,
                icon: "url(../../assets/Icons/bookico.svg)",
            }
        }),
        ...inputs.children.map((c) => {
            return {
                name: "Graduation " + c.name,
                year: c.graduation_year,
                owner: c.name,
                icon: "url(https://api.iconify.design/fluent:hat-graduation-16-filled.svg?height=50)"
            }
        })
    ]

    const [chartOptions, setChartOptions] = useState<Highcharts.Options>({

        chart:{
            events:{
                render(){
                    let chart : any = this;

                    chart.series[0].points.forEach((p: any) => {
                        console.log(p.graphic)
                        // p.graphic!.translate(p.plotX - chart.marginRight - 2, p.plotY - p.graphic.getBBox().height + 2)
                    })

                }
            }
        },
            colors: ["#000"],
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            title: {
                text: "",
            },
            xAxis: {
                categories: [...summary.map((s, i) => {
                    return `${s.year} <br> ${s.ages.owner_ages[0].age}<br>${s.ages.owner_ages[1].age}`;
                }),],
                gridLineWidth: 10,
                labels: {
                    rotation: 0,
                    autoRotation: false,
                    overflow: "justify",
                    step: 4,
                },
            },
            yAxis: {
                labels: {
                    enabled: false
                },
                min: 0,
                max: 10,
                title: {
                    text: ""
                },

                gridLineWidth: 0,
            },
            plotOptions: {
                series: {
                    dataGrouping: {
                        enabled: true
                    }
                },
                lollipop: {
                    groupPadding: 0.5
                }
            },
            series: [
                {
                    type: "lollipop",
                },
            ]
        }
    )

    Highcharts.SVGRenderer.prototype.symbols.cross = function () {
        return ["M19 2l-5 4.5v11l5-4.5V2M6.5 5C4.55 5 2.45 5.4 1 6.5v14.66c0 .25.25.5.5.5c.1 0 .15-.07.25-.07c1.35-.65 3.3-1.09 4.75-1.09c1.95 0 4.05.4 5.5 1.5c1.35-.85 3.8-1.5 5.5-1.5c1.65 0 3.35.31 4.75 1.06c.1.05.15.03.25.03c.25 0 .5-.25.5-.5V6.5c-.6-.45-1.25-.75-2-1V19c-1.1-.35-2.3-.5-3.5-.5c-1.7 0-4.15.65-5.5 1.5V6.5C10.55 5.4 8.45 5 6.5 5z"];
    };


    useEffect(() => {
        const newSeries: any = []

        lifeGoals.map((goal) => {
            newSeries.push({
                type: "lollipop",
                data: [...summary.map(s => {
                    return -1
                })],
                name: goal.name,

                marker: {
                    symbol: goal.icon
                }
            })
        })

        const clone = {...chartOptions}
        clone.series = [...newSeries]

        const newClone: any = {...clone}

        summary.map((s, index) => {
            lifeGoals.map((goal, i) => {
                if (s.year === goal.year) {
                    newClone.series[i].data[index] = 1
                }
            })
        })

        setChartOptions(newClone)
    }, [])

    const columnsGoals = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Progress",
            dataIndex: "progress",
            key: "category",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "owner",
        },
    ]

    const dataGoals = [
        {
            name: "Name",
            progress: "Progress",
            amount: "Amount",
        },

    ]

    const columnsEvent = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Owner",
            dataIndex: "owner",
        },
        {
            title: "Year",
            dataIndex: "year",
        },
    ]

    const dataEvent = lifeGoals


    return <Layout style={{backgroundColor: "white"}}>
        <Row>
            <Col span={24}>

                <Card title="Life Milestones" style={{margin: "16px"}} bordered={false}>
                    <Row justify="space-around">
                        <Col span={23}>
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={chartOptions}
                            />
                        </Col>

                    </Row>
                    <Row style={{marginTop: "16px"}}>
                        <Col span={24}>

                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col span={12}>
                <Card title="Goals" bordered={false}>
                    <Table
                        columns={columnsGoals}
                        dataSource={dataGoals}
                        bordered={false}
                        pagination={false}

                    />
                </Card>
            </Col>
            <Col span={12}>
                <Card title="Events" bordered={false}>
                    <Table
                        columns={columnsEvent}
                        dataSource={dataEvent}
                        size={"small"}
                        bordered={false}
                        pagination={false}

                    />
                </Card>
            </Col>
        </Row>
    </Layout>
}

export default LifeMilestones