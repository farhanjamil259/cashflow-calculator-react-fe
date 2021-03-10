import React from "react";
import Layout from "antd/lib/layout/layout";
import {
  Card,
  Table,
  Popover,
  Button,
  Row,
  Col,
  Switch,
  Typography,
  Slider,
  Collapse,
  Tabs,
} from "antd";

import highcharts, { numberFormat } from "highcharts";
import HighchartsReact from "highcharts-react-official";

import "rc-slider/assets/index.css";
import { useState } from "react";
import IForecastSummary from "../../interfaces/IForecastSummary";
import { RootStateOrAny, useSelector } from "react-redux";
import { useEffect } from "react";
import {CaretLeftOutlined, CaretRightOutlined, SettingFilled } from "@ant-design/icons/lib/icons";
import Title from "antd/lib/typography/Title";

const { Text } = Typography;
const { Panel } = Collapse;
const { TabPane } = Tabs;

const Cashflow = () => {
  const summary: IForecastSummary[] = useSelector(
    (state: RootStateOrAny) => state.summaryReducer
  );

  const [showTable, setShowTable] = useState(false);

  const [sliderValue, setSliderValue] = useState([
    summary[0].year,
    summary[summary.length - 1].year,
  ]);

  const [selectedSummaryAtIndexNumber, setSelectedSummaryAtIndexNumber] = useState(0)

  const [selectedSummaryAtIndex, setSelectedSummaryAtIndex] = useState(
    summary[0]
  );



  const [
    cashFlowChartOptions,
    setCashFlowChartOptions,
  ] = useState<highcharts.Options>({
    chart: {
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
    colors: [
      "#81d4fa",
      "#4fc3f7",
      "#29b6f6",
      "#03a9f4",
      "#039be5",
      "#0288d1",
      "#0277bd",
      "#01579b",
      "#d32f2f",
    ],
    xAxis: {
      crosshair: true,
      labels: {
        rotation: 0,
        autoRotation: false,
        overflow: "justify",
        step: 4,
      },
      categories: [
        ...summary.map((s, i) => {
          return `<b>${s.year}</b> <br> ${s.ages.owner_ages[0].age}<br>${s.ages.owner_ages[1].age}`;
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
              setSliderValue([summary[0].year, summary[0].retirement_ages[0]]);

              setCashFlowChartOptions({
                ...cashFlowChartOptions,
                xAxis: {
                  ...cashFlowChartOptions.xAxis,
                  min: 0,
                  max:
                    summary[0].retirement_ages[0] - summary[0].year + 0.5 + 1,
                },
              });
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
              setSliderValue([
                summary[0].retirement_ages[0],
                summary[summary.length - 1].year,
              ]);

              setCashFlowChartOptions({
                ...cashFlowChartOptions,
                xAxis: {
                  ...cashFlowChartOptions.xAxis,
                  min:
                    summary[0].retirement_ages[0] - summary[0].year + 0.5 - 1,
                  max: summary[summary.length - 1].year - summary[0].year + 0.5,
                },
              });
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
            if (entry.series.name === "Total Expenses") {
              tooltip_html +=
                '<tr><td style="font-weight:bold; color:' +
                entry.series.color +
                '">' +
                entry.series.name +
                ':</td><td style="text-align: right"> ' +
                "(" +
                "£" +
                numberFormat(entry.y, 0, ".", ",") +
                ")" +
                "</td></tr>";
            } else {
              tooltip_html +=
                '<tr><td style="font-weight:bold; color:' +
                entry.series.color +
                '">' +
                entry.series.name +
                ':</td><td style="text-align: right"> ' +
                "£" +
                numberFormat(entry.y, 0, ".", ",") +
                "</td></tr>";
            }
          }
        });
        tooltip_html += "</table>";

        return tooltip_html;
      },
      followPointer: true,
      shared: true,
      distance: 30,
    },
    plotOptions: {
      series: {
        point: {
          events: {
            click: (e) => {
              setSelectedSummaryAtIndexNumber(e.point.x)
              setSelectedSummaryAtIndex(summary[e.point.x]);
            },
          },
        },
      },
      column: {
        stacking: "normal",
        borderWidth: 1,
        pointPadding: 0,
        groupPadding: 0,
        pointRange: 1,
        events: {
          click: (e) => {
            // console.log(e.point.x)
          },
        },
        point: {
          events: {
            select: (event) => {
              console.log(event);
            },
          },
        },
      },
    },
    series: [
      {
        name: "Surplus",
        type: "column",
        data: [
          ...summary.map((s) => {
            return (
              s.expense_analysis.total_expenses - s.income_analysis.total_income
            );
          }),
        ],
        color: "#d32f2f",
        legendIndex: 9,
      },
      {
        name: "Other",
        type: "column",
        data: [
          ...summary.map((s) => {
            return s.income_analysis.total_other_income;
          }),
        ],
        legendIndex: 7,
      },
      {
        name: "Pension",
        type: "column",
        data: [
          ...summary.map((s) => {
            return s.income_analysis.total_pension_income;
          }),
        ],
        legendIndex: 6,
      },
      {
        name: "Savings and Investments",
        type: "column",
        data: [
          ...summary.map((s) => {
            return s.income_analysis.total_savings_and_investments_drawdowns;
          }),
        ],
        legendIndex: 5,
      },
      {
        name: "Dividend",
        type: "column",
        data: [
          ...summary.map((s) => {
            return s.income_analysis.total_dividend_income;
          }),
        ],
        legendIndex: 4,
      },
      {
        name: "Rental",
        type: "column",
        data: [
          ...summary.map((s) => {
            return s.income_analysis.total_rental_income;
          }),
        ],
        legendIndex: 3,
      },

      {
        name: "Self-Employment",
        type: "column",
        data: [
          ...summary.map((s) => {
            return s.income_analysis.total_self_employment_income;
          }),
        ],
        legendIndex: 2,
      },
      {
        name: "Employment",
        type: "column",
        data: [
          ...summary.map((s) => {
            return s.income_analysis.total_employment_income;
          }),
        ],
        legendIndex: 1,
      },
      {
        type: "line",
        name: "Total Expenses",
        step: "left",
        data: [
          ...summary.map((s) => {
            return s.expense_analysis.total_expenses;
          }),
        ],
        color: "#212121",
        marker: {
          enabled: false,
        },
        pointPlacement: -0.5,
        lineWidth: 3,
        legendIndex: 8,
      },
    ],
  });

  let chartRef: any = React.useRef(null);

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
      };
    }),
  ];

  const [chartControls, setChartControls] = useState({
    label: "years",
    zoomable: false,
  });

  const [some, setSome] = useState(0);
  const [some2, setSome2] = useState(some);

  // @ts-ignore
  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Card
        title="Cashflow"
        style={{ margin: "16px" }}
        bordered={false}
        extra={
          <div>
            <Switch
              style={{ marginRight: "16px" }}
              checkedChildren="Zoom"
              unCheckedChildren="Static"
              defaultChecked={false}
              onChange={(e) => {
                setChartControls({ ...chartControls, zoomable: e });
              }}
            />
            <Switch
              style={{ marginRight: "16px" }}
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
                              setChartControls({
                                ...chartControls,
                                label: "years",
                              });
                              setCashFlowChartOptions({
                                ...cashFlowChartOptions,
                                xAxis: {
                                  ...cashFlowChartOptions.xAxis,
                                  categories: [
                                    ...summary.map((s) => {
                                      return s.year.toString();
                                    }),
                                  ],
                                },
                              });
                            } else {
                              setChartControls({
                                ...chartControls,
                                label: "ages",
                              });
                              setCashFlowChartOptions({
                                ...cashFlowChartOptions,
                                xAxis: {
                                  ...cashFlowChartOptions.xAxis,
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
                <SettingFilled />
              </Button>
            </Popover>
          </div>
        }
      >
        {chartControls.zoomable && (
          <Row
            justify="space-around"
            align="middle"
            style={{ marginBottom: "16px" }}
          >
            <Col span={22}>
              <Slider
                range={{ draggableTrack: true }}
                min={summary[0].year}
                max={summary[summary.length - 1].year}
                defaultValue={[
                  summary[0].year,
                  summary[summary.length - 1].year,
                ]}
                value={[sliderValue[0], sliderValue[1]]}
                tipFormatter={(value) => {
                  if (chartControls.label === "years") {
                    return `${value}`;
                  } else {
                    return `${
                      summary[value! - summary[0].year].ages.owner_ages[0].age
                    }`;
                  }
                }}
                onChange={(e: number[]) => {
                  setSliderValue(e);
                }}
                onAfterChange={(e: number[]) => {
                  setCashFlowChartOptions({
                    ...cashFlowChartOptions,
                    xAxis: {
                      ...cashFlowChartOptions.xAxis,
                      min: e[0] - summary[0].year,
                      max: e[1] - summary[0].year,
                    },
                  });
                }}
              />
            </Col>
            <Col>
              <Button
                onClick={(e) => {
                  setSliderValue([
                    summary[0].year,
                    summary[summary.length - 1].year,
                  ]);
                  setCashFlowChartOptions({
                    ...cashFlowChartOptions,
                    xAxis: {
                      ...cashFlowChartOptions.xAxis,
                      min: 0,
                      max: summary.length - 1,
                    },
                    yAxis: {
                      ...cashFlowChartOptions.yAxis,
                      max: null,
                    },
                  });
                  setSome2(some);
                }}
              >
                Reset
              </Button>
            </Col>
          </Row>
        )}

        <Row justify="space-around">
          <Col span={23}>
            <HighchartsReact
              highcharts={highcharts}
              options={cashFlowChartOptions}
              ref={chartRef}
              callback={(chart: any) => {
                setSome(chart.yAxis[0].max);
              }}
            />
          </Col>
          {chartControls.zoomable && (
            <Col style={{ paddingBottom: "80px", paddingTop: "20px" }}>
              <Slider
                vertical
                step={10000}
                max={some}
                defaultValue={some}
                style={{ marginRight: "16px" }}
                onChange={(e: number) => {
                  setSome2(e);
                }}
                onAfterChange={(e: number) => {
                  setCashFlowChartOptions({
                    ...cashFlowChartOptions,
                    yAxis: {
                      ...cashFlowChartOptions.yAxis,
                      max: e,
                    },
                  });
                }}
              />
            </Col>
          )}
        </Row>
        <Row style={{ marginTop: "16px" }}>
          <Col span={24}>
            <Tabs
              centered
              size="large"
              type="card"
              animated={true}
              tabBarExtraContent={{
                left: (
                  <Title level={4}>
                    <a href={"#!"}  onClick={() => {
                      if (selectedSummaryAtIndexNumber > 0){
                        setSelectedSummaryAtIndexNumber(selectedSummaryAtIndexNumber-1)
                        setSelectedSummaryAtIndex(summary[selectedSummaryAtIndexNumber-1]);
                      }
                    }} >  <CaretLeftOutlined  /> </a>


                   {selectedSummaryAtIndex.year}


                   <a href={"#!"}  onClick={() => {
                     if (selectedSummaryAtIndexNumber <= summary.length-2){
                       setSelectedSummaryAtIndexNumber(selectedSummaryAtIndexNumber+1)
                       setSelectedSummaryAtIndex(summary[selectedSummaryAtIndexNumber+1]);
                     }
                   }} > <CaretRightOutlined /> </a>

                  </Title>
                ),
              }}
            >
              <TabPane tab="Income" key="income">
                <Table
                  columns={[
                    {
                      title: "Name",
                      dataIndex: "name",
                      key: "name",
                    },
                    {
                      title: "Category",
                      dataIndex: "category",
                      key: "category",
                    },
                    {
                      title: "Owner",
                      dataIndex: "owner",
                      key: "owner",
                    },
                    {
                      title: "Value",
                      dataIndex: "value",
                      key: "value",
                      align: "right",
                    },
                  ]}
                  dataSource={[
                    {
                      name: "Employment Income",
                      category: "Employment",
                      owner: "Mr, Mrs",
                      value:
                        "£" +
                        numberFormat(
                          selectedSummaryAtIndex.income_analysis
                            .total_employment_income,
                          0,
                          ".",
                          ","
                        ),
                    },
                    {
                      name: "Self-Employment Income",
                      category: "Employment",
                      owner: "Mr, Mrs",
                      value:
                        "£" +
                        numberFormat(
                          selectedSummaryAtIndex.income_analysis
                            .total_self_employment_income,
                          0,
                          ".",
                          ","
                        ),
                    },
                    {
                      name: "Rental Income",
                      category: "Employment",
                      owner: "Mr, Mrs",
                      value:
                        "£" +
                        numberFormat(
                          selectedSummaryAtIndex.income_analysis
                            .total_rental_income,
                          0,
                          ".",
                          ","
                        ),
                    },
                    {
                      name: "Dividend Income",
                      category: "Employment",
                      owner: "Mr, Mrs",
                      value:
                        "£" +
                        numberFormat(
                          selectedSummaryAtIndex.income_analysis
                            .total_dividend_income,
                          0,
                          ".",
                          ","
                        ),
                    },
                    {
                      name: "Savings and Investments Drawdowns",
                      category: "Employment",
                      owner: "Mr, Mrs",
                      value:
                        "£" +
                        numberFormat(
                          selectedSummaryAtIndex.income_analysis
                            .total_savings_and_investments_drawdowns,
                          0,
                          ".",
                          ","
                        ),
                    },
                    {
                      name: "Pension Income",
                      category: "Employment",
                      owner: "Mr, Mrs",
                      value:
                        "£" +
                        numberFormat(
                          selectedSummaryAtIndex.income_analysis
                            .total_pension_income,
                          0,
                          ".",
                          ","
                        ),
                    },
                    {
                      name: "Other Income",
                      category: "Employment",
                      owner: "Mr, Mrs",
                      value:
                        "£" +
                        numberFormat(
                          selectedSummaryAtIndex.income_analysis
                            .total_other_income,
                          0,
                          ".",
                          ","
                        ),
                    },
                  ]}
                  summary={() => (
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0}>
                        <Text strong>Total</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1} align={"right"} />
                      <Table.Summary.Cell index={2} align={"right"} />
                      <Table.Summary.Cell index={3} align={"right"}>
                        <Text strong>
                          £{" "}
                          {numberFormat(
                            selectedSummaryAtIndex.income_analysis.total_income,
                            0,
                            ".",
                            ","
                          )}
                        </Text>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  )}
                  pagination={false}
                />
              </TabPane>
              <TabPane tab="Expenses" key="expenses">
                <Table
                  columns={[
                    {
                      title: "Name",
                      dataIndex: "name",
                      key: "name",
                    },
                    {
                      title: "Category",
                      dataIndex: "category",
                      key: "category",
                    },
                    {
                      title: "Owner",
                      dataIndex: "owner",
                      key: "owner",
                    },
                    {
                      title: "Value",
                      dataIndex: "value",
                      key: "value",
                      align: "right",
                    },
                  ]}
                  dataSource={[
                    {
                      name: "Housing Expenses",
                      category: "Expense",
                      owner: "Mr, Mrs",
                      value:
                        "£" +
                        numberFormat(
                          selectedSummaryAtIndex.expense_analysis
                            .total_housing_expenses,
                          0,
                          ".",
                          ","
                        ),
                    },
                    {
                      name: "Consumables Expenses",
                      category: "Expense",
                      owner: "Mr, Mrs",
                      value:
                        "£" +
                        numberFormat(
                          selectedSummaryAtIndex.expense_analysis
                            .total_consumables_expenses,
                          0,
                          ".",
                          ","
                        ),
                    },
                    {
                      name: "Travel Expenses",
                      category: "Expense",
                      owner: "Mr, Mrs",
                      value:
                        "£" +
                        numberFormat(
                          selectedSummaryAtIndex.expense_analysis
                            .total_travel_expenses,
                          0,
                          ".",
                          ","
                        ),
                    },
                    {
                      name: "Shopping Expenses",
                      category: "Expense",
                      owner: "Mr, Mrs",
                      value:
                        "£" +
                        numberFormat(
                          selectedSummaryAtIndex.expense_analysis
                            .total_shopping_expenses,
                          0,
                          ".",
                          ","
                        ),
                    },
                    {
                      name: "Entertainment Expenses",
                      category: "Expense",
                      owner: "Mr, Mrs",
                      value:
                        "£" +
                        numberFormat(
                          selectedSummaryAtIndex.expense_analysis
                            .total_entertainment_expenses,
                          0,
                          ".",
                          ","
                        ),
                    },
                    {
                      name: "Holiday Expenses",
                      category: "Expense",
                      owner: "Mr, Mrs",
                      value:
                        "£" +
                        numberFormat(
                          selectedSummaryAtIndex.expense_analysis
                            .total_holiday_expenses,
                          0,
                          ".",
                          ","
                        ),
                    },
                    {
                      name: "One-off Expenses",
                      category: "Expense",
                      owner: "Mr, Mrs",
                      value:
                        "£" +
                        numberFormat(
                          selectedSummaryAtIndex.expense_analysis
                            .total_one_off_expenses,
                          0,
                          ".",
                          ","
                        ),
                    },
                    {
                      name: "Children Education Expenses",
                      category: "Expense",
                      owner: "Mr, Mrs",
                      value:
                        "£" +
                        numberFormat(
                          selectedSummaryAtIndex.expense_analysis
                            .total_children_education_expenses,
                          0,
                          ".",
                          ","
                        ),
                    },
                    {
                      name: "Financials Expenses",
                      category: "Expense",
                      owner: "Mr, Mrs",
                      value:
                        "£" +
                        numberFormat(
                          selectedSummaryAtIndex.expense_analysis
                            .total_financial_expenses,
                          0,
                          ".",
                          ","
                        ),
                    },
                    {
                      name: "Additional Tax Charge",
                      category: "Expense",
                      owner: "Mr, Mrs",
                      value:
                        "£" +
                        numberFormat(
                          selectedSummaryAtIndex.expense_analysis
                            .total_additional_tax_charge,
                          0,
                          ".",
                          ","
                        ),
                    },
                  ]}
                  summary={() => (
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0}>
                        <Text strong>Total</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1} align={"right"} />
                      <Table.Summary.Cell index={2} align={"right"} />
                      <Table.Summary.Cell index={3} align={"right"}>
                        <Text strong>
                          £{" "}
                          {numberFormat(
                            selectedSummaryAtIndex.expense_analysis
                              .total_expenses,
                            0,
                            ".",
                            ","
                          )}
                        </Text>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  )}
                  pagination={false}
                />
              </TabPane>
              <TabPane tab="Investments" key="investments">
                <Table
                  columns={[
                    {
                      title: "Name",
                      dataIndex: "name",
                      key: "name",
                    },
                    {
                      title: "Category",
                      dataIndex: "category",
                      key: "category",
                    },
                    {
                      title: "Owner",
                      dataIndex: "owner",
                      key: "owner",
                    },
                    {
                      title: "Value",
                      dataIndex: "value",
                      key: "value",
                      align: "right",
                    },
                  ]}
                  dataSource={[
                    {
                      name: "Savings and Investments",
                      category: "Savings and Investments",
                      owner: "Mr, Mrs",
                      value:
                        "£" +
                        numberFormat(
                          selectedSummaryAtIndex.assets_and_liabilities_analysis
                            .total_savings_and_investments,
                          0,
                          ".",
                          ","
                        ),
                    },
                  ]}
                  summary={() => (
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0}>
                        <Text strong>Total</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1} align={"right"} />
                      <Table.Summary.Cell index={2} align={"right"} />
                      <Table.Summary.Cell index={3} align={"right"}>
                        <Text strong>
                          £
                          {numberFormat(
                            selectedSummaryAtIndex
                              .assets_and_liabilities_analysis
                              .total_savings_and_investments,
                            0,
                            ".",
                            ","
                          )}
                        </Text>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  )}
                  pagination={false}
                />
              </TabPane>
              <TabPane tab="Pensions" key="pensions">
                <Table
                  columns={[
                    {
                      title: "Name",
                      dataIndex: "name",
                      key: "name",
                    },
                    {
                      title: "Category",
                      dataIndex: "category",
                      key: "category",
                    },
                    {
                      title: "Owner",
                      dataIndex: "owner",
                      key: "owner",
                    },
                    {
                      title: "Value",
                      dataIndex: "value",
                      key: "value",
                      align: "right",
                    },
                  ]}
                  dataSource={[
                    {
                      name: "Pension Plans",
                      category: "Savings and Investments",
                      owner: "Mr, Mrs",
                      value:
                        "£" +
                        numberFormat(
                          selectedSummaryAtIndex.assets_and_liabilities_analysis
                            .total_pension_plans,
                          0,
                          ".",
                          ","
                        ),
                    },
                  ]}
                  summary={() => (
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0}>
                        <Text strong>Total</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1} align={"right"} />
                      <Table.Summary.Cell index={2} align={"right"} />
                      <Table.Summary.Cell index={3} align={"right"}>
                        <Text strong>
                          £
                          {numberFormat(
                            selectedSummaryAtIndex
                              .assets_and_liabilities_analysis
                              .total_pension_plans,
                            0,
                            ".",
                            ","
                          )}
                        </Text>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  )}
                  pagination={false}
                />
              </TabPane>
              <TabPane tab="Property" key="property">
                <Table
                  columns={[
                    {
                      title: "Name",
                      dataIndex: "name",
                      key: "name",
                    },
                    {
                      title: "Category",
                      dataIndex: "category",
                      key: "category",
                    },
                    {
                      title: "Owner",
                      dataIndex: "owner",
                      key: "owner",
                    },
                    {
                      title: "Value",
                      dataIndex: "value",
                      key: "value",
                      align: "right",
                      render: (text: any) => {
                        return `£ ${numberFormat(text, 0, ".", ",")}`;
                      },
                    },
                  ]}
                  dataSource={[
                    {
                      name: "Main House",
                      category: "Property",
                      owner: "Mr, Mrs",
                      value:
                        selectedSummaryAtIndex.property_analysis
                          .property_details[0].amount,
                    },
                    {
                      name: "Second Property",
                      category: "Property",
                      owner: "Mr, Mrs",
                      value:
                        selectedSummaryAtIndex.property_analysis
                          .property_details[1].amount,
                    },
                  ]}
                  summary={(tableData) => {
                    let total = 0;

                    tableData.map(({ value }: any) => {
                      total += value;
                    });

                    return (
                      <Table.Summary.Row>
                        <Table.Summary.Cell index={0}>
                          <Text strong>Total</Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={1} align={"right"} />
                        <Table.Summary.Cell index={2} align={"right"} />
                        <Table.Summary.Cell index={3} align={"right"}>
                          <Text strong>
                            £{numberFormat(total, 0, ".", ",")}
                          </Text>
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    );
                  }}
                  pagination={false}
                />
              </TabPane>
              <TabPane tab="Liabilities" key="dept">
                <Table
                  columns={[
                    {
                      title: "Name",
                      dataIndex: "name",
                      key: "name",
                    },
                    {
                      title: "Category",
                      dataIndex: "category",
                      key: "category",
                    },
                    {
                      title: "Owner",
                      dataIndex: "owner",
                      key: "owner",
                    },
                    {
                      title: "Value",
                      dataIndex: "value",
                      key: "value",
                      align: "right",
                      render: (text: any) => {
                        return `£ ${numberFormat(text, 0, ".", ",")}`;
                      },
                    },
                  ]}
                  dataSource={[

                   ...selectedSummaryAtIndex.property_analysis.mortgage_details.map((m) => {
                          return {
                              name: m.name,
                              category: "Property",
                              owner: "Mr, Mrs",
                              value:
                               Math.abs( m.amount),
                            }
                      }),
                   {
                      name: "Other Loans",
                      category: "Property",
                      owner: "Mr, Mrs",
                      value:
                      Math.abs(selectedSummaryAtIndex.assets_and_liabilities_analysis.total_other_loans)
                    },
                    {
                      name: "Credit Card",
                      category: "Property",
                      owner: "Mr, Mrs",
                      value:
                      Math.abs(selectedSummaryAtIndex.assets_and_liabilities_analysis.credit_card)
                    },
                  ]}
                  summary={(tableData) => {
                    let total = 0;

                    tableData.map(({ value }: any) => {
                      total += value;
                    });

                    return (
                      <Table.Summary.Row>
                        <Table.Summary.Cell index={0}>
                          <Text strong>Total</Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={1} align={"right"} />
                        <Table.Summary.Cell index={2} align={"right"} />
                        <Table.Summary.Cell index={3} align={"right"}>
                          <Text strong>
                            £{numberFormat(total, 0, ".", ",")}
                          </Text>
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    );
                  }}
                  pagination={false}
                />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Card>
    </Layout>
  );
};

export default Cashflow;
