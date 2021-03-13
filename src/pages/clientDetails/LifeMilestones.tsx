import Layout from "antd/lib/layout/layout";
import {
    Card,
    Col,
    Row,
    Table,
    Typography,
    Progress,
    Button,
    Modal,
    Form,
    Input,
    DatePicker,
    Select,
} from "antd";

import Highcharts, {numberFormat} from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, {useEffect} from "react";
import IInputs from "../../interfaces/IInputs";
import {RootStateOrAny, useSelector} from "react-redux";
import {useState} from "react";
import IForecastSummary from "../../interfaces/IForecastSummary";

import {bookIcon, bottleIcon, endIcon, hatIcon, startIcon, umbrellaIcon} from "../../components/iconSvg";
import {pound} from "../../components/currencySumbol";

import "./LifeMilestones.css";

require("highcharts/highcharts-more")(Highcharts);
require("highcharts/modules/dumbbell")(Highcharts);
require("highcharts/modules/lollipop")(Highcharts);

const {Text} = Typography;

interface ILifeGoals {
    name: string;
    start_year: number;
    end_year: number;
    progress: number;
    amount: number;
}

interface IEvents {
    name: string;
    year: number;
    icon: string;
    owner: string;
}

function LifeMilestones() {
    const inputs: IInputs = useSelector((state: RootStateOrAny) => state.currentInputSetReducer);
    const summary: IForecastSummary[] = useSelector((state: RootStateOrAny) => state.summaryReducer);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleGoals, setIsModalVisibleGoals] = useState(false);

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsModalVisibleGoals(false);
    };

    const lifeGoals: ILifeGoals[] = [
        ...inputs.household_expenses.one_off_expenses.map((g, i) => {
            return {
                name: g.name,
                start_year: g.start_year,
                end_year: g.end_year,
                progress: Math.floor(Math.random() * 20 + 80),
                amount: g.annual_payment_in_todays_terms,
            };
        }),
    ];

    const planColor : string ="#424242"
    const ownerColors : string[] = ["#81d4fa", "#a5d6a7"]
    const childrenCOlors : string[] = ["#7e57c2", "#9575cd", "#b39ddb", "#d1c4e9", "#ede7f6"]

    const lifeEvents: IEvents[] = [
        {
            name: "Test",
            year: inputs.current_year,
            owner: "",
            icon: startIcon(planColor),
        },
        {
            name: "Test",
            year: inputs.current_year,
            owner: "",
            icon: startIcon(planColor),
        },
        {
            name: "Plan Start",
            year: inputs.current_year,
            owner: "",
            icon: startIcon(planColor),
        },
        {
            name: "Plan End",
            year:
                inputs.household_owners.length > 1
                    ? Math.max(
                    inputs.household_owners[0].end_of_forecast_year - 1,
                    inputs.household_owners[1].end_of_forecast_year - 1
                    )
                    : inputs.household_owners[0].end_of_forecast_year - 1,
            owner: "",
            icon: endIcon(planColor),
        },
        ...inputs.household_owners.map((o, i) => {
            return {
                name: "Retirement " + o.name,
                year: inputs.household_owners[i].retirement_year,
                owner: o.name,
                icon: umbrellaIcon(ownerColors[i]),
            };
        }),
        ...inputs.children.map((c, i) => {
            return {
                name: c.name + " " + "born",
                year: c.birth_year,
                owner: c.name,
                icon: bottleIcon(childrenCOlors[i]),
            };
        }),
        ...inputs.children.map((c, i) => {
            return {
                name: "School " + c.name,
                year: c.primary_school_year,
                owner: c.name,
                icon: bookIcon(childrenCOlors[i]),
            };
        }),
        ...inputs.children.map((c, i) => {
            return {
                name: "Graduation " + c.name,
                year: c.graduation_year,
                owner: c.name,
                icon: hatIcon(childrenCOlors[i]),
            };
        }),
    ];


    const [chartOptions, setChartOptions] = useState<Highcharts.Options>({
        chart: {
            height: 400,
        },
        colors: ["#000"],
        credits: {
            enabled: false,
        },
        legend: {
            enabled: false,
        },
        title: {
            text: "",
        },
        xAxis: {
            categories: [
                ...summary.map((s, i) => {
                    return `<b>${s.year}</b> <br> ${s.ages.owner_ages[0].age <= 100 ? s.ages.owner_ages[0].age : "-"}<br>${
                        s.ages.owner_ages[1].age <= 100 ? s.ages.owner_ages[1].age : "-"
                    }`;
                }),
            ],
            gridLineWidth: 10,
            gridLineColor: "#f5f5f5",
            labels: {

                rotation: 0,
                autoRotation: false,
                step: 5

            },
        },
        yAxis: {
            labels: {
                enabled: false,
            },
            min: 0,
            max: 12,
            title: {
                text: "",
            },

            gridLineWidth: 0,
        },
        plotOptions: {
            series: {
                events: {
                    mouseOver: function (e : any) {
                        var chart = this.chart;
                        // console.log(chart.series)


                    }
                },
                dataGrouping: {
                    enabled: true,
                },
            },
            lollipop: {
                groupPadding: 0.5,
            },
        },
        series: [
            {
                type: "lollipop",
            },
        ],
    });


    useEffect(() => {
        const newSeries: any = [];

        lifeEvents.map((goal) => {
            newSeries.push({
                type: "lollipop",
                data: [
                    ...summary.map((s) => {
                        return -1;
                    }),
                ],
                name: goal.name,
                marker: {
                    symbol: goal.icon,
                    width: 40,
                    height: 40,
                },

            });
        });

        const clone = {...chartOptions};
        clone.series = [...newSeries];

        const newClone: any = {...clone};

        summary.map((s, index) => {
            lifeEvents.map((goal, i) => {
                if (s.year === goal.year) {
                    newClone.series[i].data[index] = 1;
                }
            });
        });

        // summary.map((s, index) => {
        //     lifeEvents.map((goal, i) => {
        //         if (s.year === goal.year) {
        //             if(newClone.series[i].data[index -1] === newClone.series[i].data[index]){
        //                 newClone.series[i].data[index] = 3;
        //             }
        //         }
        //     });
        // });

        let tempArray: number[] = [];
        let range = 2

        newClone.series.map((s: any, index: number)=>{
            s.data.map((d: any, i: number)=>{
                if(d >0){
                    tempArray.push(i)
                }
            })
        })
        tempArray.map((num, i)=>{
            if(i>0){
                let perviousNum = tempArray[i-1];
                let diff = num - perviousNum

                if(diff <= range){

                    newClone.series[i].data[num] += 3;
                    newClone.series[i].zIndex = -1
                }
            }
        })




        setChartOptions(newClone);
    }, []);

    const columnsGoals = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: "30%",
        },
        {
            title: "Progress",
            dataIndex: "progress",
            key: "category",
            width: "50%",
            render: (text: any) => {
                return <Progress percent={text}/>;
            },
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (text: any) => (
                <Text>
                    {pound}
                    {numberFormat(text, 0, ".", ",")}
                </Text>
            ),
            align: "right",
        },
    ];

    const dataGoals = lifeGoals;

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
    ];

    const dataEvent = lifeEvents.sort((a: IEvents, b: IEvents) => {
        return a.year > b.year ? 1 : -1
    });

    const [form] = Form.useForm();
    const {Option} = Select;

    return (
        <Layout style={{backgroundColor: "white"}}>

            <Row>
                <Col span={24}>
                    <HighchartsReact highcharts={Highcharts} options={chartOptions}/>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Card
                        title="Goals"
                        bordered={false}
                        extra={
                            <Button
                                type="primary"
                                size="small"
                                onClick={() => {
                                    setIsModalVisibleGoals(true);
                                }}
                            >
                                Add Goal
                            </Button>
                        }
                    >
                        <Table
                            // @ts-ignore
                            columns={columnsGoals}
                            size={"small"}
                            dataSource={dataGoals}
                            bordered={false}
                            pagination={false}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card
                        title="Events"
                        bordered={false}
                        extra={
                            <Button
                                type="primary"
                                size="small"
                                onClick={() => {
                                    setIsModalVisible(true);
                                }}
                            >
                                Add Event
                            </Button>
                        }
                    >
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

            <Modal title="Goal" visible={isModalVisibleGoals} okText="Save" onCancel={handleCancel}>
                <Form form={form} labelAlign="left" labelCol={{span: 8}} wrapperCol={{span: 16}}>
                    <Form.Item
                        name="name"
                        label="Name of Goal"
                        rules={[{required: true, message: "First name is required"}]}
                    >
                        <Input name="fname"/>
                    </Form.Item>

                    <Form.Item
                        name="start_year"
                        label="Start Year"
                        rules={[{required: true, message: "Please select a year"}]}
                    >
                        <DatePicker picker="year" name="year" style={{width: "100%"}}/>
                    </Form.Item>
                    <Form.Item name="end_year" label="End Year">
                        <DatePicker picker="year" name="year" style={{width: "100%"}}/>
                    </Form.Item>
                    <Form.Item
                        name="progress"
                        label="Progress"
                        rules={[{required: true, message: "First name is required"}]}
                    >
                        <Input name="progress"/>
                    </Form.Item>
                    <Form.Item
                        name="amount"
                        label="Amount"
                        rules={[{required: true, message: "First name is required"}]}
                    >
                        <Input name="amount"/>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="Event" visible={isModalVisible} okText="Save" onCancel={handleCancel}>
                <Form form={form} labelAlign="left" labelCol={{span: 8}} wrapperCol={{span: 16}}>
                    <Form.Item
                        name="name"
                        label="Name of Event"
                        rules={[{required: true, message: "First name is required"}]}
                    >
                        <Input name="fname"/>
                    </Form.Item>

                    <Form.Item name="year" label="Year" rules={[{required: true, message: "Please select a year"}]}>
                        <DatePicker picker="year" name="year" style={{width: "100%"}}/>
                    </Form.Item>
                    <Form.Item name="owner" label="Owner">
                        <Select style={{width: "100%"}}>
                            <Option value="mr">Mr</Option>
                            <Option value="mrs">Mrs</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="icon" label="Icon">
                        <textarea style={{width: "100%"}}/>
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
}

export default LifeMilestones;
