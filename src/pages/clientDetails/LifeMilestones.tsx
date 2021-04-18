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
  Radio,
  Space,
  Dropdown,
  Menu,
} from "antd";

import Highcharts, { numberFormat } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { cloneElement, useEffect, useMemo } from "react";
import IInputs from "../../interfaces/IInputs";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import IForecastSummary from "../../interfaces/IForecastSummary";

import { Icon, InlineIcon } from "@iconify/react";
import sailboatFill from "@iconify-icons/ri/sailboat-fill";
import baselineDirectionsBoatFilled from "@iconify-icons/ic/baseline-directions-boat-filled";
import baselineSpeaker from "@iconify-icons/ic/baseline-speaker";
import hatGraduation24Filled from "@iconify-icons/fluent/hat-graduation-24-filled";
import baselineToys from "@iconify-icons/ic/baseline-toys";
import baselineHouse from "@iconify-icons/ic/baseline-house";
import money24Filled from "@iconify-icons/fluent/money-24-filled";
import baselineDirectionsCarFilled from "@iconify-icons/ic/baseline-directions-car-filled";
import sharpAccessTimeFilled from "@iconify-icons/ic/sharp-access-time-filled";
import hammerWrench from "@iconify-icons/mdi/hammer-wrench";
import roundStorefront from "@iconify-icons/ic/round-storefront";
import airplane24Filled from "@iconify-icons/fluent/airplane-24-filled";
import ringIcon from "@iconify-icons/mdi/ring";
import shoppingIcon from "@iconify-icons/mdi/shopping";

import {
  boatIcon,
  bookIcon,
  bottleIcon,
  childCareIcon,
  endIcon,
  hatIcon,
  houseIcon,
  inheritanceIcon,
  midLifeCrisisIcon,
  otherIcon,
  partTimeJobIcon,
  partyIcon,
  remodelIcon,
  startBusinessIcon,
  startIcon,
  travelIcon,
  umbrellaIcon,
  universityIcon,
  weddingIcon,
} from "../../components/iconSvg";
import { pound } from "../../components/currencySumbol";

import "./LifeMilestones.css";
import axios from "axios";
import TextInput from "../inputs/controls/TextInput";
import MoneyInput from "../inputs/controls/MoneyInput";
import moment from "moment";
import { eventsRoute, inputsRoute, summaryRoute } from "../../routes/apiRoutes";
import RateInput from "../inputs/controls/RateInput";
import { currentInputSetReducer, GetInputsAction, setCurrentInputSetAction } from "../../redux/inputs/inputs";
import { setSummaryAction } from "../../redux/summary/summary";
import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { eventsReducer, getEventsAction } from "../../redux/events/events";
import { FormInstance, useForm } from "antd/lib/form/Form";
import { AlertAction } from "../../redux/general/alert";

require("highcharts/highcharts-more")(Highcharts);
require("highcharts/modules/dumbbell")(Highcharts);
require("highcharts/modules/lollipop")(Highcharts);

const { Text } = Typography;

interface ILifeGoals {
  _id: string;
  name: string;
  start_year: number;
  end_year: number;
  inflation: number;
  progress: number;
  annual_payment_in_todays_terms: number;
}

interface IEvents {
  name: string;
  year: number;
  icon: string;
  owner: string;
  planid: string;
}

function LifeMilestones() {
  const dispatch = useDispatch();

  const inputs: IInputs = useSelector((state: RootStateOrAny) => state.currentInputSetReducer);
  const summary: IForecastSummary[] = useSelector((state: RootStateOrAny) => state.summaryReducer);
  const activeClient = useSelector((state: RootStateOrAny) => state.activeClientReducer);

  const [loading, setLoading] = useState(false);

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
    annual_payment_in_todays_terms: 0,
    inflation: 0,
    start_year: moment().year(),
    end_year: moment().year(),
  });
  const [eventSelectedData, setEventSelectedData] = useState<{
    id: string;
    name: string;
    year: number;
    owner: number;
    planid: string;
    category: string;
  }>({
    id: "",
    name: "asd",
    owner: 0,
    year: 0,
    planid: "",
    category: "",
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleGoals, setIsModalVisibleGoals] = useState(false);
  const [isModalVisibleDeletGoals, setIsModalVisibleDeletGoals] = useState(false);
  const [isModalVisibleDeletEvent, setIsModalVisibleDeleltEvent] = useState(false);
  const [isModalVisibleEditGoals, setIsModalVisibleEditGoals] = useState(false);
  const [isModalVisibleEditEvent, setIsModalVisibleEditEvent] = useState(false);

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisibleGoals(false);
    setIsModalVisibleEditEvent(false);
    setIsModalVisibleEditGoals(false);
  };

  const [lifeGoals, setLifeGoans] = useState<ILifeGoals[]>([]);

  //Math.round(100 - sumShortfall / goal.amount)
  const planColor: string = "#424242";
  const ownerColors: string[] = useMemo(() => {
    return ["#81d4fa", "#a5d6a7"];
  }, []);
  const childrenColors: string[] = useMemo(() => {
    return ["#7e57c2", "#9575cd", "#b39ddb", "#d1c4e9", "#ede7f6"];
  }, []);

  const allEvents: any = useSelector((state: RootStateOrAny) => state.eventsReducer);

  const handleIcons = (category: string) => {
    switch (category) {
      case "Boat":
        return boatIcon("#f48fb1");
      case "Party":
        return partyIcon("#f48fb1");
      case "University":
        return universityIcon("#f48fb1");
      case "Childcare":
        return childCareIcon("#f48fb1");
      case "House":
        return houseIcon("#f48fb1");
      case "Inheritance":
        return inheritanceIcon("#f48fb1");
      case "Mid-life crisis":
        return midLifeCrisisIcon("#f48fb1");
      case "Part-time job":
        return partTimeJobIcon("#f48fb1");
      case "Remodel":
        return remodelIcon("#f48fb1");
      case "Start a business":
        return startBusinessIcon("#f48fb1");
      case "Travel":
        return travelIcon("#f48fb1");
      case "Wedding":
        return weddingIcon("#f48fb1");
      case "Other":
        return otherIcon("#f48fb1");

      default:
        break;
    }
  };

  const lifeEvents: IEvents[] = useMemo(() => {
    return [
      ...allEvents.map((e: any, i: number) => {
        return {
          id: e._id,
          name: e.name,
          year: e.year,
          ownername: inputs.household_owners[e.owner].name,
          owner: e.owner,
          planid: e.planid,
          category: e.category,
          icon: handleIcons(e.category),
        };
      }),
      {
        id: "",
        name: "Plan Start",
        year: inputs.current_year,
        owner: "",
        icon: startIcon(planColor),
      },
      {
        id: "",
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
          id: "",
          name: "Retirement " + o.name,
          year: inputs.household_owners[i].retirement_year,
          owner: o.name,
          icon: umbrellaIcon(ownerColors[i]),
        };
      }),
      ...inputs.children.map((c, i) => {
        return {
          id: "",
          name: c.name + " born",
          year: c.birth_year,
          owner: c.name,
          icon: bottleIcon(childrenColors[i]),
        };
      }),
      ...inputs.children.map((c, i) => {
        return {
          id: "",
          name: "School " + c.name,
          year: c.primary_school_year,
          owner: c.name,
          icon: bookIcon(childrenColors[i]),
        };
      }),
      ...inputs.children.map((c, i) => {
        return {
          id: "",
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
    let range = 1;

    newClone.series.map((s: any) => {
      s.data.map((d: any, i: number) => {
        if (d > 0) {
          tempArray.push(i);
        }
        return null;
      });
      return null;
    });

    let pVal = 1;
    tempArray.map((num, i) => {
      if (i > 0) {
        let previousNum = tempArray[i - 1];
        let diff = num - previousNum;

        if (diff <= range) {
          pVal += 2;
          newClone.series[i].data[num] = pVal;
          newClone.series[i].zIndex = -i;
        } else {
          pVal = 1;
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
      dataIndex: "annual_payment_in_todays_terms",
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
      key: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="2">
                  <Button
                    type="link"
                    onClick={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsModalVisibleEditGoals(true);

                      setGoalSelectedData(record);
                    }}
                  >
                    Edit
                  </Button>
                </Menu.Item>
                <Menu.Item key="3">
                  <Button
                    type="link"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsModalVisibleDeletGoals(true);
                      setGoalSelectedData(record);
                    }}
                  >
                    Delete
                  </Button>
                </Menu.Item>
              </Menu>
            }
          >
            <Button
              size="small"
              onClick={async (e) => {
                e.stopPropagation();
              }}
            >
              <MoreOutlined />
            </Button>
          </Dropdown>
        </Space>
      ),
    },
  ];

  let dataGoals = lifeGoals;

  const columnsEvent = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Owner",
      dataIndex: "ownername",
    },
    {
      title: "Year",
      dataIndex: "year",
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          {record.id !== "" && (
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="2">
                    <Button
                      type="link"
                      onClick={async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsModalVisibleEditEvent(true);
                        setEventSelectedData(record);
                      }}
                    >
                      Edit
                    </Button>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Button
                      type="link"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsModalVisibleDeleltEvent(true);
                        setEventSelectedData(record);
                      }}
                    >
                      Delete
                    </Button>
                  </Menu.Item>
                </Menu>
              }
            >
              <Button
                size="small"
                onClick={async (e) => {
                  e.stopPropagation();
                }}
              >
                <MoreOutlined />
              </Button>
            </Dropdown>
          )}
        </Space>
      ),
    },
  ];

  const dataEvent = lifeEvents.sort((a: IEvents, b: IEvents) => {
    return a.year > b.year ? 1 : -1;
  });

  dataGoals = dataGoals.sort((a: ILifeGoals, b: ILifeGoals) => {
    return a.start_year > b.start_year ? 1 : -1;
  });

  const [form] = Form.useForm();
  const { Option } = Select;

  const [event, setEvent] = useState<{
    name: string;
    owner: number;
    year: number;
    category: string;
    planid: string;
  }>({
    planid: "",
    name: "",
    owner: 0,
    year: 2021,
    category: "",
  });

  const [categories, setCategories] = useState([
    {
      icon: baselineDirectionsBoatFilled,
      category: "Boat",
    },
    {
      icon: baselineSpeaker,
      category: "Party",
    },
    {
      icon: hatGraduation24Filled,
      category: "University",
    },

    {
      icon: baselineToys,
      category: "Childcare",
    },
    {
      icon: baselineHouse,
      category: "House",
    },
    {
      icon: money24Filled,
      category: "Inheritance",
    },
    {
      icon: baselineDirectionsCarFilled,
      category: "Mid-life crisis",
    },
    {
      icon: sharpAccessTimeFilled,
      category: "Part-time job",
    },
    {
      icon: hammerWrench,
      category: "Remodel",
    },
    {
      icon: roundStorefront,
      category: "Start a business",
    },
    {
      icon: airplane24Filled,
      category: "Travel",
    },
    {
      icon: ringIcon,
      category: "Wedding",
    },
    {
      icon: shoppingIcon,
      category: "Other",
    },
  ]);

  /*
    [one_off_expense: {
      inflation: 2.5 (decial)
      startYear: 2012
      endYear: 2095
      afterRetirement: 0 
    }]

    [summary: {
      incomeAnalysis: {
        totalIncome: number
      },
      expenseAnalysis: {
        totalExpenses: number
      }
    }]
  */
  useEffect(() => {
    const arr_LifeGoals: ILifeGoals[] = [];
    inputs.household_expenses.one_off_expenses.map((g) => {
      let newProgress = 0;
      let calcShortfall = 0;
      summary.map((s) => {
        if (s.year >= g.start_year && s.year <= g.end_year) {
          calcShortfall += s.expense_analysis.total_expenses - s.income_analysis.total_income;
        }
      });
      let calculatedProgress = Math.round(100 - calcShortfall / g.annual_payment_in_todays_terms);
      if (Math.round(100 - calcShortfall / g.annual_payment_in_todays_terms) > 100) {
        newProgress = 100;
      } else {
        Math.round(100 - calcShortfall / g.annual_payment_in_todays_terms);
      }

      arr_LifeGoals.push({
        _id: g._id,
        name: g.name,
        start_year: g.start_year,
        end_year: g.end_year,
        inflation: g.inflation,
        progress: calculatedProgress,
        annual_payment_in_todays_terms: g.annual_payment_in_todays_terms,
      });
    });
    setLifeGoans(arr_LifeGoals);
  }, [inputs]);

  const [eventEditForm] = useForm();
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
      {/* //Add Goals Modal */}
      <Modal
        title="Goal"
        visible={isModalVisibleGoals}
        okText="Save"
        okButtonProps={{
          loading: loading,
        }}
        cancelButtonProps={{
          loading: loading,
        }}
        onCancel={handleCancel}
        onOk={async () => {
          setLoading(true);
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
            setLoading(false);
          }
          setLoading(false);
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
      {/* //Edit Goals Modal */}
      <Modal
        title="Edit Goal"
        visible={isModalVisibleEditGoals}
        okText="Update"
        okButtonProps={{
          loading: loading,
        }}
        cancelButtonProps={{
          loading: loading,
        }}
        onCancel={handleCancel}
        onOk={async () => {
          setLoading(true);
          const inputsClone: IInputs = JSON.parse(JSON.stringify(inputs));
          inputsClone.household_expenses.one_off_expenses = inputsClone.household_expenses.one_off_expenses.filter(
            (g) => {
              return goalSelectedData._id !== g._id;
            }
          );

          inputsClone.household_expenses.one_off_expenses.push(goalSelectedData);

          try {
            setLoading(true);
            const res = await axios.patch(inputsRoute + activeClient._id, inputsClone);
            if (res.status === 200) {
              await dispatch(AlertAction("Plan successfully updated", "success"));
              await dispatch(GetInputsAction(activeClient._id));
              await dispatch(setCurrentInputSetAction(inputsClone));
            }
            setLoading(false);
            handleCancel();
          } catch (error) {
            console.log(error);
            handleCancel();
          }

          // setIsModalVisibleEditGoals(false);
          setLoading(false);
        }}
      >
        <Form form={form} labelAlign="left" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Form.Item label="Name of Goal" rules={[{ required: true, message: "First name is required" }]}>
            <Input
              value={goalSelectedData.name}
              onChange={(e) => {
                setGoalSelectedData({ ...goalSelectedData, name: e.target.value });
              }}
            />
          </Form.Item>

          <Form.Item label="Amount" rules={[{ required: true, message: "An amount is required" }]}>
            <InputNumber
              formatter={(value) => `${pound}${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value!.replace(/£\s?|(,*)/g, "")}
              value={`${goalSelectedData.annual_payment_in_todays_terms}`}
              className="custom-input-fields"
              onBlur={(e) => {
                setGoalSelectedData({ ...goalSelectedData, annual_payment_in_todays_terms: +e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="Inflation" rules={[{ required: true, message: "Inflation rate is required" }]}>
            <InputNumber
              min={0}
              max={100}
              precision={2}
              formatter={(value) => `${value}%`}
              parser={(value: any) => value!.replace("%", "")}
              value={`${+goalSelectedData.inflation * 100}`}
              className="custom-input-fields"
              onBlur={(e) => {
                setGoalSelectedData({
                  ...goalSelectedData,
                  inflation: parseFloat(e.target.value.replace("%", "")) / 100,
                });
              }}
            />
          </Form.Item>

          <Form.Item label="Start Year" rules={[{ required: true, message: "Please select a year" }]}>
            <DatePicker
              picker="year"
              value={moment(goalSelectedData.start_year.toString())}
              name="year"
              style={{ width: "100%" }}
              onChange={(date, dateString) => {
                setGoalSelectedData({ ...goalSelectedData, start_year: +dateString });
              }}
            />
          </Form.Item>
          <Form.Item label="End Year" rules={[{ required: true, message: "Please select a year" }]}>
            <DatePicker
              picker="year"
              name="year"
              value={moment(goalSelectedData.end_year.toString())}
              style={{ width: "100%" }}
              onChange={(date, dateString) => {
                setGoalSelectedData({ ...goalSelectedData, end_year: +dateString });
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
      {/* //Add event modal */}
      <Modal
        title="Event"
        okButtonProps={{
          loading: loading,
        }}
        cancelButtonProps={{
          loading: loading,
        }}
        visible={isModalVisible}
        okText="Save"
        onOk={async () => {
          setLoading(true);
          const res = await axios.post(eventsRoute + inputs._id, event);
          await dispatch(getEventsAction(inputs._id));
          setIsModalVisible(false);
          setLoading(false);
        }}
        onCancel={handleCancel}
        width="1000px"
      >
        <Row>
          <Form form={form} layout="vertical" style={{ width: "100%" }}>
            <Row>
              <Col span={24}>
                <Form.Item
                  label="Name of Event"
                  rules={[{ required: true, message: "First name is required" }]}
                >
                  <Input
                    name="fname"
                    value={event.name}
                    onChange={(e) => {
                      setEvent({ ...event, name: e.target.value });
                    }}
                  />
                </Form.Item>

                <Form.Item name="owner" label="Owner">
                  <Select
                    style={{ width: "100%" }}
                    defaultValue={inputs.household_owners[0].name}
                    onChange={(e) => {
                      setEvent({ ...event, owner: +e });
                    }}
                  >
                    {inputs.household_owners.map((o, i) => {
                      return <Option value={i}>{o.name}</Option>;
                    })}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="year"
                  label="Year"
                  rules={[{ required: true, message: "Please select a year" }]}
                >
                  <DatePicker
                    picker="year"
                    name="year"
                    defaultValue={moment()}
                    style={{ width: "100%" }}
                    onChange={(date, dateString) => {
                      setEvent({ ...event, year: +dateString });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <Row>
                    <Radio.Group
                      buttonStyle="solid"
                      onChange={(e) => {
                        setEvent({ ...event, category: e.target.value });
                      }}
                    >
                      {categories.map((c) => {
                        return (
                          <Radio.Button
                            value={c.category}
                            style={{
                              padding: "5px",
                              margin: "5px",
                              width: "100px",
                              height: "100px",
                              textAlign: "center",
                            }}
                          >
                            <Icon icon={c.icon} height="60" />
                            <p
                              style={{
                                fontSize: "10px",
                              }}
                            >
                              {c.category}
                            </p>
                          </Radio.Button>
                        );
                      })}
                    </Radio.Group>
                  </Row>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Row>
      </Modal>
      {/* //Edit Event Modal */}
      <Modal
        title="Edit Event"
        okButtonProps={{
          loading: loading,
        }}
        cancelButtonProps={{
          loading: loading,
        }}
        visible={isModalVisibleEditEvent}
        okText="Save"
        onOk={async () => {
          setLoading(true);
          await eventEditForm
            .validateFields()
            .then(async () => {
              const res = await axios.patch(eventsRoute + eventSelectedData.id, eventSelectedData);
              await dispatch(getEventsAction(inputs._id));
              setIsModalVisibleEditEvent(false);
            })
            .catch(() => {
              setLoading(false);
            });
          setLoading(false);
        }}
        onCancel={handleCancel}
        width="1000px"
      >
        <Row>
          <Form form={eventEditForm} layout="vertical" style={{ width: "100%" }}>
            <Row>
              <Col span={24}>
                <Form.Item
                  label="Name of Event"
                  rules={[{ required: true, message: "First name is required" }]}
                >
                  <Input
                    name="fname"
                    value={eventSelectedData.name}
                    onChange={(e) => {
                      setEventSelectedData({ ...eventSelectedData, name: e.target.value });
                    }}
                  />
                </Form.Item>

                <Form.Item label="Owner">
                  <Select
                    style={{ width: "100%" }}
                    value={inputs.household_owners[eventSelectedData.owner].name}
                    onChange={(e) => {
                      setEventSelectedData({ ...eventSelectedData, owner: +e });
                    }}
                  >
                    {inputs.household_owners.map((o, i) => {
                      return <Option value={i}>{o.name}</Option>;
                    })}
                  </Select>
                </Form.Item>

                <Form.Item label="Year" rules={[{ required: true, message: "Please select a year" }]}>
                  <DatePicker
                    picker="year"
                    name="year"
                    value={moment(eventSelectedData.year.toString())}
                    style={{ width: "100%" }}
                    onChange={(date, dateString) => {
                      setEventSelectedData({ ...eventSelectedData, year: +dateString });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Category">
                  <Row>
                    <Radio.Group
                      buttonStyle="solid"
                      value={eventSelectedData.category}
                      onChange={(e) => {
                        setEventSelectedData({ ...eventSelectedData, category: e.target.value });
                      }}
                    >
                      {categories.map((c) => {
                        return (
                          <Radio.Button
                            value={c.category}
                            style={{
                              padding: "5px",
                              margin: "5px",
                              width: "100px",
                              height: "100px",
                              textAlign: "center",
                            }}
                          >
                            <Icon icon={c.icon} height="60" />
                            <p
                              style={{
                                fontSize: "10px",
                              }}
                            >
                              {c.category}
                            </p>
                          </Radio.Button>
                        );
                      })}
                    </Radio.Group>
                  </Row>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Row>
      </Modal>
      {/* // delete goals */}
      <Modal
        title="Delete Goal"
        okType={"danger"}
        visible={isModalVisibleDeletGoals}
        okButtonProps={{
          loading: loading,
        }}
        cancelButtonProps={{
          loading: loading,
        }}
        okText="Delete"
        onOk={async () => {
          const newInputs = JSON.parse(JSON.stringify(inputs));
          const newGoals = newInputs.household_expenses.one_off_expenses.filter((e: any) => {
            return e._id !== goalSelectedData._id;
          });
          newInputs.household_expenses.one_off_expenses = newGoals;
          const res = await axios.put(inputsRoute + inputs._id, newInputs);
          if (res.status === 200) {
            setLoading(true);
            const newInputs = await axios.get(inputsRoute + res.data.id);
            const newSummary = await axios.get(summaryRoute + res.data.id);
            await dispatch(setCurrentInputSetAction(newInputs.data));
            await dispatch(setSummaryAction(newSummary.data));
            setIsModalVisibleDeletGoals(false);
            setLoading(false);
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
      {/* // delete event */}
      <Modal
        title="Delete Event"
        okType={"danger"}
        visible={isModalVisibleDeletEvent}
        okButtonProps={{
          loading: loading,
        }}
        cancelButtonProps={{
          loading: loading,
        }}
        okText="Delete"
        onOk={async () => {
          const res = await axios.delete(eventsRoute + eventSelectedData.id);

          await dispatch(getEventsAction(inputs._id));
          setIsModalVisibleDeleltEvent(false);
        }}
        onCancel={() => setIsModalVisibleDeleltEvent(false)}
      >
        <p>
          Are you sure you want to delete the Event <strong>{eventSelectedData.name}</strong>
        </p>
        <p>
          <strong>This action cannot be undone! </strong>
        </p>
      </Modal>
    </Layout>
  );
}

export default LifeMilestones;
