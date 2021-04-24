import React, { useState } from "react";
import Layout from "antd/lib/layout/layout";
import { Button, Card, Col, Row, Slider, Switch } from "antd";
import IForecastSummary from "../../interfaces/IForecastSummary";

import { RootStateOrAny, useSelector } from "react-redux";

import highcharts, { numberFormat } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import YearBreakdownTabs from "../../components/YearBreakdownTabs";
import IChartsData from "../../interfaces/IChartsData";

const ExpensesBreakdown = () => {
  const nominalSummary: IChartsData = useSelector((state: RootStateOrAny) => state.summaryReducer);
  const realSummary: IChartsData = useSelector((state: RootStateOrAny) => state.realSummaryReducer);
  const [summary, setSummary] = useState<IChartsData>(nominalSummary);
  const [sliderValue, setSliderValue] = useState([summary.years[0], summary.years[summary.years.length - 1]]);

  const [selectedSummaryAtIndexNumber, setSelectedSummaryAtIndexNumber] = useState(0);

  const [selectedSummaryAtIndex, setSelectedSummaryAtIndex] = useState(summary.years[0]);

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
        ...summary.years.map((s, i) => {
          return `<b>${s}</b> <br> ${summary.ages.owners[0][i] <= 100 ? summary.ages.owners[0][i] : "-"}<br>${
            summary.ages.owners[1][i] <= 100 ? summary.ages.owners[1][i] : "-"
          }`;
        }),
      ],
      min: 0,
      max: summary.years.length - 1,
      plotBands: [
        {
          color: "#ffffff",
          from: 0,
          to: summary.retirement_ages[0] - summary.years[0] + 0.5,
          label: {
            text: "",
            align: "right",
          },
          events: {
            click: (e) => {
              setSliderValue([summary.years[0], summary.retirement_ages[0]]);

              setExpensesBreakdownOptions({
                ...expensesBreakdownOptions,
                xAxis: {
                  ...expensesBreakdownOptions.xAxis,
                  min: 0,
                  max: summary.retirement_ages[0] - summary.years[0] + 0.5 + 1,
                },
              });
            },
          },
        },
        {
          color: "#eeeeee",
          from: summary.retirement_ages[0] - summary.years[0] + 0.5,
          to: summary.years[summary.years.length - 1] - summary.years[0] + 0.5,
          label: {
            align: "right",
            text: "",
          },
          events: {
            click: (e) => {
              setSliderValue([summary.retirement_ages[0], summary.years[summary.years.length - 1]]);

              setExpensesBreakdownOptions({
                ...expensesBreakdownOptions,
                xAxis: {
                  ...expensesBreakdownOptions.xAxis,
                  min: summary.retirement_ages[0] - summary.years[0] + 0.5 - 1,
                  max: summary.years[summary.years.length - 1] - summary.years[0] + 0.5,
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
              setSelectedSummaryAtIndex(summary.years[e.point.x]);
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
        name: "Housing",
        type: "column",
        data: [
          ...summary.expenses.housing.map((s) => {
            return s;
          }),
        ],
      },
      {
        name: "Consumables",
        type: "column",
        data: [
          ...summary.expenses.consumables.map((s) => {
            return s;
          }),
        ],
      },
      {
        name: "Travel",
        type: "column",
        data: [
          ...summary.expenses.travel.map((s) => {
            return s;
          }),
        ],
      },
      {
        name: "Shopping",
        type: "column",
        data: [
          ...summary.expenses.shopping.map((s) => {
            return s;
          }),
        ],
      },
      {
        name: "Entertainment",
        type: "column",
        data: [
          ...summary.expenses.entertainment.map((s) => {
            return s;
          }),
        ],
      },
      {
        name: "Holiday",
        type: "column",
        data: [
          ...summary.expenses.holiday.map((s) => {
            return s;
          }),
        ],
      },
      {
        name: "One-Off",
        type: "column",
        data: [
          ...summary.expenses.one_off.map((s) => {
            return s;
          }),
        ],
      },
      {
        name: "Children",
        type: "column",
        data: [
          ...summary.expenses.children_education.map((s) => {
            return s;
          }),
        ],
      },
      {
        name: "Financial",
        type: "column",
        data: [
          ...summary.expenses.financial.map((s) => {
            return s;
          }),
        ],
      },
      {
        name: "Additional Tax",
        type: "column",
        data: [
          ...summary.expenses.additional_tax_charge.map((s) => {
            return s;
          }),
        ],
      },
    ],
  });

  let chartRef: any = React.useRef(null);

  const [chartControls, setChartControls] = useState({
    label: "years",
    zoomable: false,
  });

  const [some, setSome] = useState(0);
  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Card
        title="Expenses"
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
              onChange={(e) => {
                if (e) {
                  setSummary(nominalSummary);
                  setExpensesBreakdownOptions({
                    ...expensesBreakdownOptions,
                    series: [
                      {
                        name: "Housing",
                        type: "column",
                        data: [
                          ...summary.expenses.housing.map((s) => {
                            return s;
                          }),
                        ],
                      },
                      {
                        name: "Consumables",
                        type: "column",
                        data: [
                          ...summary.expenses.consumables.map((s) => {
                            return s;
                          }),
                        ],
                      },
                      {
                        name: "Travel",
                        type: "column",
                        data: [
                          ...summary.expenses.travel.map((s) => {
                            return s;
                          }),
                        ],
                      },
                      {
                        name: "Shopping",
                        type: "column",
                        data: [
                          ...summary.expenses.shopping.map((s) => {
                            return s;
                          }),
                        ],
                      },
                      {
                        name: "Entertainment",
                        type: "column",
                        data: [
                          ...summary.expenses.entertainment.map((s) => {
                            return s;
                          }),
                        ],
                      },
                      {
                        name: "Holiday",
                        type: "column",
                        data: [
                          ...summary.expenses.holiday.map((s) => {
                            return s;
                          }),
                        ],
                      },
                      {
                        name: "One-Off",
                        type: "column",
                        data: [
                          ...summary.expenses.one_off.map((s) => {
                            return s;
                          }),
                        ],
                      },
                      {
                        name: "Children",
                        type: "column",
                        data: [
                          ...summary.expenses.children_education.map((s) => {
                            return s;
                          }),
                        ],
                      },
                      {
                        name: "Financial",
                        type: "column",
                        data: [
                          ...summary.expenses.financial.map((s) => {
                            return s;
                          }),
                        ],
                      },
                      {
                        name: "Additional Tax",
                        type: "column",
                        data: [
                          ...summary.expenses.additional_tax_charge.map((s) => {
                            return s;
                          }),
                        ],
                      },
                    ],
                  });
                } else {
                  setSummary(realSummary);
                  setExpensesBreakdownOptions({
                    ...expensesBreakdownOptions,
                    series: [
                      {
                        name: "Housing",
                        type: "column",
                        data: [
                          ...summary.expenses.housing.map((s) => {
                            return s;
                          }),
                        ],
                      },
                      {
                        name: "Consumables",
                        type: "column",
                        data: [
                          ...summary.expenses.consumables.map((s) => {
                            return s;
                          }),
                        ],
                      },
                      {
                        name: "Travel",
                        type: "column",
                        data: [
                          ...summary.expenses.travel.map((s) => {
                            return s;
                          }),
                        ],
                      },
                      {
                        name: "Shopping",
                        type: "column",
                        data: [
                          ...summary.expenses.shopping.map((s) => {
                            return s;
                          }),
                        ],
                      },
                      {
                        name: "Entertainment",
                        type: "column",
                        data: [
                          ...summary.expenses.entertainment.map((s) => {
                            return s;
                          }),
                        ],
                      },
                      {
                        name: "Holiday",
                        type: "column",
                        data: [
                          ...summary.expenses.holiday.map((s) => {
                            return s;
                          }),
                        ],
                      },
                      {
                        name: "One-Off",
                        type: "column",
                        data: [
                          ...summary.expenses.one_off.map((s) => {
                            return s;
                          }),
                        ],
                      },
                      {
                        name: "Children",
                        type: "column",
                        data: [
                          ...summary.expenses.children_education.map((s) => {
                            return s;
                          }),
                        ],
                      },
                      {
                        name: "Financial",
                        type: "column",
                        data: [
                          ...summary.expenses.financial.map((s) => {
                            return s;
                          }),
                        ],
                      },
                      {
                        name: "Additional Tax",
                        type: "column",
                        data: [
                          ...summary.expenses.additional_tax_charge.map((s) => {
                            return s;
                          }),
                        ],
                      },
                    ],
                  });
                }
              }}
            />
          </div>
        }
      >
        {chartControls.zoomable && (
          <Row justify="space-around" align="middle" style={{ marginBottom: "16px" }}>
            <Col span={22}>
              <Slider
                range={{ draggableTrack: true }}
                min={summary.years[0]}
                max={summary.years[summary.years.length - 1]}
                defaultValue={[summary.years[0], summary.years[summary.years.length - 1]]}
                value={[sliderValue[0], sliderValue[1]]}
                tipFormatter={(value) => {
                  if (chartControls.label === "years") {
                    return `${value}`;
                  } else {
                    return summary.ages.owners[0][value! - summary.years[0]].toString();
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
                      min: e[0] - summary.years[0],
                      max: e[1] - summary.years[0],
                    },
                  });
                }}
              />
            </Col>
            <Col>
              <Button
                onClick={(e) => {
                  setSliderValue([summary.years[0], summary.years[summary.years.length - 1]]);
                  setExpensesBreakdownOptions({
                    ...expensesBreakdownOptions,
                    xAxis: {
                      ...expensesBreakdownOptions.xAxis,
                      min: 0,
                      max: summary.years.length - 1,
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
            <Col style={{ paddingBottom: "80px", paddingTop: "20px" }}>
              <Slider
                vertical
                step={10000}
                max={some}
                defaultValue={some}
                style={{ marginRight: "16px" }}
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
        <Row style={{ marginTop: "16px" }}>
          <Col span={24}>
            <YearBreakdownTabs
              selectedSummaryAtIndex={summary}
              onLeftClick={() => {
                if (selectedSummaryAtIndexNumber > 0) {
                  setSelectedSummaryAtIndexNumber(selectedSummaryAtIndexNumber - 1);
                  setSelectedSummaryAtIndex(summary.years[selectedSummaryAtIndexNumber - 1]);
                }
              }}
              onRightClick={() => {
                if (selectedSummaryAtIndexNumber <= summary.years.length - 2) {
                  setSelectedSummaryAtIndexNumber(selectedSummaryAtIndexNumber + 1);
                  setSelectedSummaryAtIndex(summary.years[selectedSummaryAtIndexNumber + 1]);
                }
              }}
              index={selectedSummaryAtIndexNumber}
            />
          </Col>
        </Row>
      </Card>
    </Layout>
  );
};

export default ExpensesBreakdown;
