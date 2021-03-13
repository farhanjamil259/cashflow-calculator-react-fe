import { useRef } from "react";
import React, {useEffect, useState} from "react";
import Layout from "antd/lib/layout/layout";
import {Button, Card, Col, Collapse, Popover, Row, Slider, Switch, Table, Typography} from "antd";
import IForecastSummary from "../../interfaces/IForecastSummary";

import {RootStateOrAny, useSelector} from "react-redux";

import highcharts, {numberFormat} from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {SettingFilled} from "@ant-design/icons/lib/icons";
import YearBreakdownTabs from "../../components/YearBreakdownTabs";

const {Text} = Typography
const {Panel} = Collapse;

const ExpensesBreakdown = () => {

  const nominalSummary: IForecastSummary[] = useSelector(
      (state: RootStateOrAny) => state.summaryReducer
  );
  const realSummary: IForecastSummary[] = useSelector(
      (state: RootStateOrAny) => state.realSummaryReducer
  );
  const [summary, setSummary] = useState<IForecastSummary[]>(nominalSummary);
  const [sliderValue, setSliderValue] = useState([
    summary[0].year,
    summary[summary.length - 1].year,
  ]);

  const [
    selectedSummaryAtIndexNumber,
    setSelectedSummaryAtIndexNumber,
  ] = useState(0);

  const [selectedSummaryAtIndex, setSelectedSummaryAtIndex] = useState(
      summary[0]
  );

  const [expensesBreakdownOptions, setExpensesBreakdownOptions] = useState<highcharts.Options>({
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
          return `<b>${s.year}</b> <br> ${s.ages.owner_ages[0].age <= 100 ? s.ages.owner_ages[0].age : "-"}<br>${
              s.ages.owner_ages[1].age <= 100 ? s.ages.owner_ages[1].age : "-"
          }`;
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

              setExpensesBreakdownOptions({
                ...expensesBreakdownOptions,
                xAxis: {
                  ...expensesBreakdownOptions.xAxis,
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

              setExpensesBreakdownOptions({
                ...expensesBreakdownOptions,
                xAxis: {
                  ...expensesBreakdownOptions.xAxis,
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
              setSelectedSummaryAtIndexNumber(e.point.x);
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

  const [chartControls, setChartControls] = useState({
    label: "years",
    zoomable: false,
  });

  const [some, setSome] = useState(0);
  const [some2, setSome2] = useState(some)

  return (

      <Layout style={{backgroundColor: "white"}}>
        <Card
            title="Cashflow"
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
                    onChange={(e) => {
                      if (e) {
                        setSummary(nominalSummary)
                        setExpensesBreakdownOptions({
                          ...expensesBreakdownOptions,
                          series: [
                            { name: "Housing", type: "column", data: [...nominalSummary.map((s)=>{
                                return s.expense_analysis.total_housing_expenses
                              })] },
                            { name: "Consumables", type: "column", data: [...nominalSummary.map((s)=>{
                                return s.expense_analysis.total_consumables_expenses
                              })] },
                            { name: "Travel", type: "column", data: [...nominalSummary.map((s)=>{
                                return s.expense_analysis.total_travel_expenses
                              })] },
                            { name: "Shopping", type: "column", data: [...nominalSummary.map((s)=>{
                                return s.expense_analysis.total_shopping_expenses
                              })] },
                            { name: "Entertainment", type: "column", data: [...nominalSummary.map((s)=>{
                                return s.expense_analysis.total_entertainment_expenses
                              })] },
                            { name: "Holiday", type: "column", data: [...nominalSummary.map((s)=>{
                                return s.expense_analysis.total_holiday_expenses
                              })] },
                            { name: "One-Off", type: "column", data: [...nominalSummary.map((s)=>{
                                return s.expense_analysis.total_one_off_expenses
                              })] },
                            { name: "Children", type: "column", data: [...nominalSummary.map((s)=>{
                                return s.expense_analysis.total_children_education_expenses
                              })] },
                            { name: "Financial", type: "column", data: [...nominalSummary.map((s)=>{
                                return s.expense_analysis.total_financial_expenses
                              })] },
                            { name: "Additional Tax", type: "column", data: [...nominalSummary.map((s)=>{
                                return s.expense_analysis.total_additional_tax_charge
                              })] },
                          ],
                        });
                      } else {
                        setSummary(realSummary)
                        setExpensesBreakdownOptions({
                          ...expensesBreakdownOptions,
                          series: [
                            { name: "Housing", type: "column", data: [...realSummary.map((s)=>{
                                return s.expense_analysis.total_housing_expenses
                              })] },
                            { name: "Consumables", type: "column", data: [...realSummary.map((s)=>{
                                return s.expense_analysis.total_consumables_expenses
                              })] },
                            { name: "Travel", type: "column", data: [...realSummary.map((s)=>{
                                return s.expense_analysis.total_travel_expenses
                              })] },
                            { name: "Shopping", type: "column", data: [...realSummary.map((s)=>{
                                return s.expense_analysis.total_shopping_expenses
                              })] },
                            { name: "Entertainment", type: "column", data: [...realSummary.map((s)=>{
                                return s.expense_analysis.total_entertainment_expenses
                              })] },
                            { name: "Holiday", type: "column", data: [...realSummary.map((s)=>{
                                return s.expense_analysis.total_holiday_expenses
                              })] },
                            { name: "One-Off", type: "column", data: [...realSummary.map((s)=>{
                                return s.expense_analysis.total_one_off_expenses
                              })] },
                            { name: "Children", type: "column", data: [...realSummary.map((s)=>{
                                return s.expense_analysis.total_children_education_expenses
                              })] },
                            { name: "Financial", type: "column", data: [...realSummary.map((s)=>{
                                return s.expense_analysis.total_financial_expenses
                              })] },
                            { name: "Additional Tax", type: "column", data: [...realSummary.map((s)=>{
                                return s.expense_analysis.total_additional_tax_charge
                              })] },
                          ],
                        });
                      }
                    }}
                />

              </div>
            }
        >
          {chartControls.zoomable && (
              <Row
                  justify="space-around"
                  align="middle"
                  style={{marginBottom: "16px"}}
              >
                <Col span={22}>
                  <Slider
                      range={{draggableTrack: true}}
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
                  <Button
                      onClick={(e) => {
                        setSliderValue([
                          summary[0].year,
                          summary[summary.length - 1].year,
                        ]);
                        setExpensesBreakdownOptions({
                          ...expensesBreakdownOptions,
                          xAxis: {
                            ...expensesBreakdownOptions.xAxis,
                            min: 0,
                            max: summary.length - 1,
                          },
                          yAxis: {
                            ...expensesBreakdownOptions.yAxis,
                            max: null,
                          },
                        });
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
                  options={expensesBreakdownOptions}
                  ref={chartRef}
                  callback={(chart: any) => {
                    setSome(chart.yAxis[0].max);
                  }}
              />
            </Col>
            {chartControls.zoomable && (
                <Col style={{paddingBottom: "80px", paddingTop: "20px"}}>
                  <Slider
                      vertical
                      step={10000}
                      max={some}
                      defaultValue={some}
                      style={{marginRight: "16px"}}
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
          <Row style={{marginTop: "16px"}}>
            <Col span={24}>
              <YearBreakdownTabs
                  summary={summary}
                  onLeftClick={() => {
                    if (selectedSummaryAtIndexNumber > 0) {
                      setSelectedSummaryAtIndexNumber(
                          selectedSummaryAtIndexNumber - 1
                      );
                      setSelectedSummaryAtIndex(
                          summary[selectedSummaryAtIndexNumber - 1]
                      );
                    }
                  }}
                  onRightClick={() => {
                    if (selectedSummaryAtIndexNumber <= summary.length - 2) {
                      setSelectedSummaryAtIndexNumber(
                          selectedSummaryAtIndexNumber + 1
                      );
                      setSelectedSummaryAtIndex(
                          summary[selectedSummaryAtIndexNumber + 1]
                      );
                    }
                  }}
                  selectedSummaryAtIndex={selectedSummaryAtIndex}
              />
            </Col>
          </Row>
        </Card>
      </Layout>

  );
};

export default ExpensesBreakdown;
