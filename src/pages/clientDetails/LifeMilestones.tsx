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
  InputNumber,
} from "antd";

import Highcharts, { numberFormat } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useMemo } from "react";
import IInputs from "../../interfaces/IInputs";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import IForecastSummary from "../../interfaces/IForecastSummary";

import {
  bookIcon,
  bottleIcon,
  endIcon,
  hatIcon,
  startIcon,
  umbrellaIcon,
  HomeIcon,
  partyIcon,
} from "../../components/iconSvg";
import { pound } from "../../components/currencySumbol";

import "./LifeMilestones.css";
import axios from "axios";
import TextInput from "../inputs/controls/TextInput";
import MoneyInput from "../inputs/controls/MoneyInput";
import moment from "moment";
import { inputsRoute, summaryRoute } from "../../routes/apiRoutes";
import RateInput from "../inputs/controls/RateInput";
import { currentInputSetReducer, setCurrentInputSetAction } from "../../redux/inputs/inputs";
import { setSummaryAction } from "../../redux/summary/summary";
import { DeleteOutlined } from "@ant-design/icons";

require("highcharts/highcharts-more")(Highcharts);
require("highcharts/modules/dumbbell")(Highcharts);
require("highcharts/modules/lollipop")(Highcharts);

const { Text } = Typography;

interface ILifeGoals {
  _id: string;
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
  const dispatch = useDispatch();

  const inputs: IInputs = useSelector((state: RootStateOrAny) => state.currentInputSetReducer);
  const summary: IForecastSummary[] = useSelector((state: RootStateOrAny) => state.summaryReducer);

  const [shortfall, setShortfall] = useState<number[]>([
    ...summary.map((s) => {
      return s.expense_analysis.total_expenses - s.income_analysis.total_income <= 0
        ? 0
        : s.expense_analysis.total_expenses - s.income_analysis.total_income;
    }),
  ]);

  const [goalInputs, setGoalInputs] = useState<{
    name: string;
    annual_payment_in_todays_terms: number;
    inflation: number;
    start_year: number;
    end_year: number;
  }>({
    name: "Goal",
    annual_payment_in_todays_terms: 0,
    inflation: 0,
    start_year: moment().year(),
    end_year: moment().year(),
  });

  const [goalSelectedData, setGoalSelectedData] = useState({
    _id: "",
    name: "",
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleGoals, setIsModalVisibleGoals] = useState(false);
  const [isModalVisibleDeletGoals, setIsModalVisibleDeletGoals] = useState(false);

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisibleGoals(false);
  };

  const lifeGoals: ILifeGoals[] = [
    ...inputs.household_expenses.one_off_expenses.map((g) => {
      return {
        _id: g._id,
        name: g.name,
        start_year: g.start_year,
        end_year: g.end_year,
        progress: 100,
        amount: g.annual_payment_in_todays_terms,
      };
    }),
  ];

  const planColor: string = "#424242";
  const ownerColors: string[] = useMemo(() => {
    return ["#81d4fa", "#a5d6a7"];
  }, []);
  const childrenColors: string[] = useMemo(() => {
    return ["#7e57c2", "#9575cd", "#b39ddb", "#d1c4e9", "#ede7f6"];
  }, []);

  const lifeEvents: IEvents[] = useMemo(() => {
    return [
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
          name: c.name + " born",
          year: c.birth_year,
          owner: c.name,
          icon: bottleIcon(childrenColors[i]),
        };
      }),
      ...inputs.children.map((c, i) => {
        return {
          name: "School " + c.name,
          year: c.primary_school_year,
          owner: c.name,
          icon: bookIcon(childrenColors[i]),
        };
      }),
      ...inputs.children.map((c, i) => {
        return {
          name: "Graduation " + c.name,
          year: c.graduation_year,
          owner: c.name,
          icon: hatIcon(childrenColors[i]),
        };
      }),
    ];
  }, [childrenColors, inputs.children, inputs.household_owners, ownerColors, inputs.current_year]);

  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({
    chart: {
      height: 400,
    },
    colors: ["#000"],
    credits: {
      enabled: false,
    },
    tooltip: {
      useHTML: true,
      backgroundColor: "white",
      borderWidth: 0,
      formatter: function () {
        let tooltip_html = this.x.toString();
        tooltip_html += "<table>";

        this.points!.forEach(function (entry: any) {
          if (entry.y > 0) {
            tooltip_html += '<tr><td style="font-weight:bold ">' + entry.series.name + "</td></tr>";
          }
        });
        tooltip_html += "</table>";

        return tooltip_html;
      },
      headerFormat: "<small>{point.key}</small><table>",
      shared: true,
      headerShape: "square",
    },
    legend: {
      enabled: false,
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: [
        ...summary.map((s) => {
          return `<b>${s.year}</b> <br> ${
            s.ages.owner_ages[0].age <= 100 ? s.ages.owner_ages[0].age : "-"
          }<br>${s.ages.owner_ages[1].age <= 100 ? s.ages.owner_ages[1].age : "-"}`;
        }),
      ],
      gridLineWidth: 10,
      gridLineColor: "#f5f5f5",
      labels: {
        rotation: 0,
        autoRotation: false,
        step: 5,
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
          ...summary.map(() => {
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
      return null;
    });

    const clone = { ...chartOptions };
    clone.series = [...newSeries];

    const newClone: any = { ...clone };

    summary.map((s, index) => {
      lifeEvents.map((goal, i) => {
        if (s.year === goal.year) {
          newClone.series[i].data[index] = 1;
        }
        return null;
      });
      return null;
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
    let range = 2;

    newClone.series.map((s: any) => {
      s.data.map((d: any, i: number) => {
        if (d > 0) {
          tempArray.push(i);
        }
        return null;
      });
      return null;
    });
    tempArray.map((num, i) => {
      if (i > 0) {
        let previousNum = tempArray[i - 1];
        let diff = num - previousNum;

        if (diff <= range) {
          newClone.series[i].data[num] += 3;
          newClone.series[i].zIndex = -1;
        }
      }
      return null;
    });

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
      width: "30%",
      render: (text: any) => {
        return <Progress percent={text} />;
      },
    },
    {
      title: "Start Year",
      dataIndex: "start_year",
      key: "year",
      width: "10%",
      align: "right",
    },
    {
      title: "End Year",
      dataIndex: "end_year",
      key: "eyear",
      width: "10%",
      align: "right",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",

      width: "10%",
      render: (text: any) => (
        <Text>
          {pound}
          {numberFormat(text, 0, ".", ",")}
        </Text>
      ),
      align: "right",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "right",
      width: "10%",
      render: (text: any, record: any) => {
        return (
          <DeleteOutlined
            onClick={async () => {
              setIsModalVisibleDeletGoals(true);
              setGoalSelectedData(record);
            }}
            style={{
              cursor: "pointer",
              color: "red",
            }}
          />
        );
      },
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
    return a.year > b.year ? 1 : -1;
  });

  const [form] = Form.useForm();
  const { Option } = Select;

  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Row justify="space-around">
        <Col span={23}>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
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
                disabled
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

      <Modal
        title="Goal"
        visible={isModalVisibleGoals}
        okText="Save"
        onCancel={handleCancel}
        onOk={async () => {
          const newInputs = JSON.parse(JSON.stringify(inputs));
          newInputs.household_expenses.one_off_expenses.push({
            name: goalInputs.name,
            annual_payment_in_todays_terms: goalInputs.annual_payment_in_todays_terms,
            inflation: goalInputs.inflation,
            start_year: goalInputs.start_year,
            end_year: goalInputs.end_year,
          });
          const res = await axios.put(inputsRoute + inputs._id, newInputs);

          if (res.status === 200) {
            //  await dispatch(setCurrentInputSetAction(res.data));
            const newInputs = await axios.get(inputsRoute + res.data.id);
            const newSummary = await axios.get(summaryRoute + res.data.id);
            await dispatch(setCurrentInputSetAction(newInputs.data));
            await dispatch(setSummaryAction(newSummary.data));
            setIsModalVisibleGoals(false);
          }
        }}
      >
        <Form form={form} labelAlign="left" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Form.Item
            name="name"
            label="Name of Goal"
            rules={[{ required: true, message: "First name is required" }]}
          >
            <Input
              defaultValue={goalInputs.name}
              onChange={(e) => {
                setGoalInputs({ ...goalInputs, name: e.target.value });
              }}
            />
          </Form.Item>

          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: "An amount is required" }]}
          >
            <MoneyInput
              value={goalInputs.annual_payment_in_todays_terms.toString()}
              onBlur={(e) => setGoalInputs({ ...goalInputs, annual_payment_in_todays_terms: +e })}
            />
          </Form.Item>
          <Form.Item
            name="inflation"
            label="Inflation"
            rules={[{ required: true, message: "Inflation rate is required" }]}
          >
            <InputNumber
              min={0}
              max={100}
              precision={2}
              formatter={(value) => `${value}%`}
              parser={(value: any) => value!.replace("%", "")}
              value={`${+goalInputs.inflation * 100}`}
              className="custom-input-fields"
              onBlur={(e) => {
                setGoalInputs({
                  ...goalInputs,
                  inflation: parseFloat(e.target.value.replace("%", "")) / 100,
                });
              }}
            />
          </Form.Item>

          <Form.Item
            name="start_year"
            label="Start Year"
            rules={[{ required: true, message: "Please select a year" }]}
          >
            <DatePicker
              picker="year"
              name="year"
              style={{ width: "100%" }}
              onChange={(date, dateString) => {
                setGoalInputs({ ...goalInputs, start_year: +dateString });
              }}
            />
          </Form.Item>
          <Form.Item
            name="end_year"
            label="End Year"
            rules={[{ required: true, message: "Please select a year" }]}
          >
            <DatePicker
              picker="year"
              name="year"
              style={{ width: "100%" }}
              onChange={(date, dateString) => {
                setGoalInputs({ ...goalInputs, end_year: +dateString });
              }}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="Event" visible={isModalVisible} okText="Save" onCancel={handleCancel}>
        <Row>
          <Form form={form} layout="vertical" style={{ width: "100%" }}>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="name"
                  label="Name of Event"
                  rules={[{ required: true, message: "First name is required" }]}
                >
                  <Input name="fname" />
                </Form.Item>

                <Form.Item name="owner" label="Owner">
                  <Select style={{ width: "100%" }}>
                    <Option value="mr">Mr</Option>
                    <Option value="mrs">Mrs</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="year"
                  label="Year"
                  rules={[{ required: true, message: "Please select a year" }]}
                >
                  <DatePicker picker="year" name="year" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <Row>
                    <HomeIcon />
                  </Row>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Row>
      </Modal>

      <Modal
        title="Delete Goals"
        okType={"danger"}
        visible={isModalVisibleDeletGoals}
        okText="Delete"
        onOk={async () => {
          const newInputs = JSON.parse(JSON.stringify(inputs));
          const newGoals = newInputs.household_expenses.one_off_expenses.filter((e: any) => {
            return e._id !== goalSelectedData._id;
          });
          newInputs.household_expenses.one_off_expenses = newGoals;
          const res = await axios.put(inputsRoute + inputs._id, newInputs);
          if (res.status === 200) {
            const newInputs = await axios.get(inputsRoute + res.data.id);
            const newSummary = await axios.get(summaryRoute + res.data.id);
            await dispatch(setCurrentInputSetAction(newInputs.data));
            await dispatch(setSummaryAction(newSummary.data));
            setIsModalVisibleDeletGoals(false);
          }
        }}
        onCancel={() => setIsModalVisibleDeletGoals(false)}
      >
        <p>
          Are you sure you want to delete the Goal <strong>{goalSelectedData.name}</strong>
        </p>
        <p>
          <strong>This action cannot be undone! </strong>
        </p>
      </Modal>
    </Layout>
  );
}

export default LifeMilestones;
