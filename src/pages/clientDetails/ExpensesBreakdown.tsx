import { useRef } from "react";
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

const ExpensesBreakdown = () => {

  const summary:IForecastSummary[] = useSelector((state:RootStateOrAny)=> state.summaryReducer)

  const [showTable, setShowTable] = useState(false)


  const [sliderValue, setSliderValue] = useState([summary[0].year, summary[summary.length - 1].year]);

  const [expensesBreakdownOptions, setExpensesBreakdownOptions] = useState<highcharts.Options>({
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

              setExpensesBreakdownOptions({
                ...expensesBreakdownOptions,
                xAxis: {
                  ...expensesBreakdownOptions.xAxis,
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

              setExpensesBreakdownOptions({
                ...expensesBreakdownOptions,
                xAxis: {
                  ...expensesBreakdownOptions.xAxis,
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
      { name: "Housing", type: "column", data: [...summary.map((s)=>{
        return s.expense_analysis.total_housing_expenses
        })] },
      { name: "Consumables", type: "column", data: [...summary.map((s)=>{
        return s.expense_analysis.total_consumables_expenses
        })] },
      { name: "Travel", type: "column", data: [...summary.map((s)=>{
        return s.expense_analysis.total_travel_expenses
        })] },
      { name: "Shopping", type: "column", data: [...summary.map((s)=>{
          return s.expense_analysis.total_shopping_expenses
        })] },
      { name: "Entertainment", type: "column", data: [...summary.map((s)=>{
          return s.expense_analysis.total_entertainment_expenses
        })] },
      { name: "Holiday", type: "column", data: [...summary.map((s)=>{
          return s.expense_analysis.total_holiday_expenses
        })] },
      { name: "One-Off", type: "column", data: [...summary.map((s)=>{
          return s.expense_analysis.total_one_off_expenses
        })] },
      { name: "Children", type: "column", data: [...summary.map((s)=>{
          return s.expense_analysis.total_children_education_expenses
        })] },
      { name: "Financial", type: "column", data: [...summary.map((s)=>{
          return s.expense_analysis.total_financial_expenses
        })] },
      { name: "Additional Tax", type: "column", data: [...summary.map((s)=>{
            return s.expense_analysis.total_additional_tax_charge
        })] },
    ],
  });

  let chartRef: any = React.useRef(null);


  const [housingData, setHousingData]=useState({
    name: "Housing Expense",
  })
  const [consumableData, setConsumableData]=useState({
    name: "Consumables Expense",
  })
  const [travelData, setTravelData]=useState({
    name: "Travel Expense",
  })
  const [shoppingData, setShoppingData]=useState({
    name: "Shopping Expense",
  })
  const [entertainmentData, setEntertainmentData]=useState({
    name: "Entertainment Expense",
  })
  const [holidayData, setHolidayData]=useState({
    name: "Holiday Expense",
  })
   const [oneoffData, setOneoffData]=useState({
     name: "One-Off Expense",
  })
   const [childrenEducationData, setChildrenEducationData]=useState({
     name: "Children Education Expense",
  })
   const [financialData, setFinancialData]=useState({
     name: "Financial Expense",
  })
   const [additionalTaxData, setAdditionalTaxData]=useState({
     name: "Additional Tax Charge",
  })
   const [totalExpensesData, setTotalExpenses]=useState({
     name: "Total Expenses",
  })

  useEffect(()=>{
    let housing:any={
      name: "Housing Expense",
    }
    let consumable:any={
      name: "Consumables Expense",
    }
    let travel:any={
      name: "Travel Expense",
    }
    let shopping:any={
      name: "Shopping Expense",
    }
    let entertainment:any={
      name: "Entertainment Expense",
    }
    let holiday:any={
      name: "Holiday Expense",
    }
    let oneoff:any={
      name: "Holiday Expense",
    }
    let childrenEducation:any={
      name: "Children Education Expense",
    }
    let financial:any={
      name: "Financial Expense",
    }
    let atc:any={
      name: "Additional Tax Charge",
    }
    let totalExpenses:any={
      name: "Total Expenses",
    }

    summary.map((s,i)=>{
      housing["year"+i]=Math.round(s.expense_analysis.total_housing_expenses)
      consumable["year"+i]=Math.round(s.expense_analysis.total_consumables_expenses)
      travel["year"+i]=Math.round(s.expense_analysis.total_travel_expenses)
      shopping["year"+i]=Math.round(s.expense_analysis.total_shopping_expenses)
      entertainment["year"+i]=Math.round(s.expense_analysis.total_entertainment_expenses)
      holiday["year"+i]=Math.round(s.expense_analysis.total_holiday_expenses)
      oneoff["year"+i]=Math.round(s.expense_analysis.total_one_off_expenses)
      childrenEducation["year"+i]=Math.round(s.expense_analysis.total_children_education_expenses)
      financial["year"+i]=Math.round(s.expense_analysis.total_financial_expenses)
      atc["year"+i]=Math.round(s.expense_analysis.total_additional_tax_charge)
      totalExpenses["year"+i]=Math.round(s.expense_analysis.total_expenses)
      return null
    })

    setHousingData(housing)
    setConsumableData(consumable)
    setTravelData(travel)
    setShoppingData(shopping)
    setEntertainmentData(entertainment)
    setHolidayData(holiday)
    setOneoffData(oneoff)
    setChildrenEducationData(childrenEducation)
    setFinancialData(financial)
    setAdditionalTaxData(atc)
    setTotalExpenses(totalExpenses)
    setShowTable(true)

  },[summary])

  const columns: any = [
    {
      title: "Year",
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    ...summary.map((s,i)=>{
      return{
        title: s.year.toString(),
        dataIndex: `year${i}`,
        key: i,
      }
    })
  ];

  const data = [
    housingData,
    consumableData,
    travelData,
    shoppingData,
    entertainmentData,
    holidayData,
    oneoffData,
    childrenEducationData,
    financialData,
    additionalTaxData,
    totalExpensesData,
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
            title="Expenses"
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
                                      setExpensesBreakdownOptions({
                                        ...expensesBreakdownOptions,
                                        xAxis: {
                                          ...expensesBreakdownOptions.xAxis,
                                          categories: [
                                            ...summary.map((s) => {
                                              return s.year.toString();
                                            }),
                                          ],
                                        },
                                      });
                                    } else {
                                      setChartControls({...chartControls, label: "ages"});
                                      setExpensesBreakdownOptions({
                                        ...expensesBreakdownOptions,
                                        xAxis: {
                                          ...expensesBreakdownOptions.xAxis,
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
                        setExpensesBreakdownOptions({
                          ...expensesBreakdownOptions,
                          xAxis: {
                            ...expensesBreakdownOptions.xAxis,
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
                    setExpensesBreakdownOptions({
                      ...expensesBreakdownOptions,
                      xAxis: {
                        ...expensesBreakdownOptions.xAxis,
                        min: 0,
                        max: summary.length - 1,
                      },
                      yAxis:{
                        ...expensesBreakdownOptions.yAxis,
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
              <HighchartsReact highcharts={highcharts} options={expensesBreakdownOptions} ref={chartRef}
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

                        setExpensesBreakdownOptions({
                          ...expensesBreakdownOptions,
                          yAxis: {
                            ...expensesBreakdownOptions.yAxis,
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
                <Panel key={1} header={"Expenses Breakdown Analysis"}>
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

export default ExpensesBreakdown;
