import React, { useEffect, useMemo, useRef } from "react";
import Layout from "antd/lib/layout/layout";
import { Card, Button, Row, Col, Switch, Slider } from "antd";

import highcharts, { numberFormat } from "highcharts";
import HighchartsReact from "highcharts-react-official";

import "rc-slider/assets/index.css";
import { useState } from "react";
import IForecastSummary from "../../interfaces/IForecastSummary";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

import YearBreakdownTabs from "../../components/YearBreakdownTabs";
import { setSummaryAction } from "../../redux/summary/summary";
import IChartsData from "../../interfaces/IChartsData";

import store from "../../redux/store";

const Cashflow = () => {
  const dispatch = useDispatch();
  const nominalSummary: IChartsData = store.getState().summaryReducer;
  const realSummary: IChartsData = store.getState().realSummaryReducer;

  const [summary, setSummary] = useState<IChartsData>(nominalSummary);
  const [sliderValue, setSliderValue] = useState([summary.years[0], summary.years[summary.years.length - 1]]);

  const [selectedSummaryAtIndexNumber, setSelectedSummaryAtIndexNumber] = useState(0);

  const [selectedSummaryAtIndex, setSelectedSummaryAtIndex] = useState(0);

  const [shortfall, setShortfall] = useState<number[]>(summary.cashflow.shortfall);

  const [incomeState, setIncomeState] = useState({
    employmentState: false,
    selfEmploymentState: false,
    rentalState: false,
    dividendState: false,
    savingsAndInvestmentsState: false,
    pensionState: false,
    propertySaleState: false,
    otherState: false,
  });

  const [cashFlowChartOptions, setCashFlowChartOptions] = useState<highcharts.Options>({
    chart: {
      alignTicks: false,
      ignoreHiddenSeries: true,
      // animation: false,
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
          to: summary.years[0] - summary.years[0] + 0.5,
          label: {
            text: "",
            align: "right",
          },
          events: {
            click: () => {
              setSliderValue([summary.years[0], summary.years[0]]);

              setCashFlowChartOptions({
                ...cashFlowChartOptions,
                xAxis: {
                  ...cashFlowChartOptions.xAxis,
                  min: 0,
                  max: summary.years[0] - summary.years[0] + 0.5 + 1,
                },
              });
            },
          },
        },
        {
          color: "#eeeeee",
          from: summary.years[0] - summary.years[0] + 0.5,
          to: summary.years[0] - summary.years[0] + 0.5,
          label: {
            align: "right",
            text: "",
          },
          events: {
            click: (e) => {
              setSliderValue([summary.years[0], summary.years[0]]);

              setCashFlowChartOptions({
                ...cashFlowChartOptions,
                xAxis: {
                  ...cashFlowChartOptions.xAxis,
                  min: summary.years[0] - summary.years[0] + 0.5 - 1,
                  max: summary.years[0] - summary.years[0] + 0.5,
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
                '</td><td style="text-align: right"> ' +
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
        // animation: false,
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
              // console.log(event);
            },
          },
        },
      },
    },
    colors: [
      "#e3f2fd", //other
      "#bbdefb", // bank
      "#90caf9", // property
      "#64b5f6", // pension
      "#42a5f5", // SAI
      "#2196f3", //dividend
      "#1e88e5", //rental
      "#1976d2", //self
      "#1565c0", // employ
    ],
  });

  let chartRef: any = React.useRef(null);

  const [detailedView, setDetailedVliew] = useState<boolean>(true);
  const [nominalView, setNominalView] = useState<boolean>(true);

  //problem state
  useEffect(() => {
    setCashFlowChartOptions({
      series: [
        {
          visible: true,
          showInLegend: true,
          name: "Shortfall",
          type: "column",
          data: detailedView
            ? shortfall
            : summary.cashflow.shortfall.map((s, i) => {
                return s;
              }),
          color: "#f44336",
          legendIndex: 11,
        },
        {
          // visible: detailedView,
          showInLegend: detailedView,
          name: "Other",
          type: "column",
          events: detailedView
            ? {
                legendItemClick: (e) => {
                  setIncomeState({ ...incomeState, otherState: !e.target.visible });
                  if (e.target.visible) {
                    setShortfall(
                      shortfall.map((s, i) => {
                        return s + summary.cashflow.other_income[i];
                      })
                    );
                  } else {
                    setShortfall(
                      shortfall.map((s, i) => {
                        return s - summary.cashflow.other_income[i];
                      })
                    );
                  }
                },
              }
            : {},
          data: detailedView
            ? [
                ...summary.cashflow.other_income.map((s) => {
                  return s;
                }),
              ]
            : [],
          legendIndex: 8,
        },
        {
          // visible: detailedView,
          showInLegend: detailedView,
          name: "Bank Accounts",
          type: "column",
          events: detailedView
            ? {
                legendItemClick: (e) => {
                  setIncomeState({ ...incomeState, otherState: !e.target.visible });
                  if (e.target.visible) {
                    setShortfall(
                      shortfall.map((s, i) => {
                        return s + summary.cashflow.bank_accounts[i];
                      })
                    );
                  } else {
                    setShortfall(
                      shortfall.map((s, i) => {
                        return s - summary.cashflow.bank_accounts[i];
                      })
                    );
                  }
                },
              }
            : {},
          data: detailedView
            ? [
                ...summary.cashflow.bank_accounts.map((s) => {
                  return s;
                }),
              ]
            : [],
          legendIndex: 9,
        },
        {
          showInLegend: detailedView,
          name: "Property Sale",
          type: "column",
          events: detailedView
            ? {
                legendItemClick: (e) => {
                  setIncomeState({ ...incomeState, otherState: !e.target.visible });
                  if (e.target.visible) {
                    setShortfall(
                      shortfall.map((s, i) => {
                        return s + summary.cashflow.residential_property_sales_proceeds[i];
                      })
                    );
                  } else {
                    setShortfall(
                      shortfall.map((s, i) => {
                        return s - summary.cashflow.residential_property_sales_proceeds[i];
                      })
                    );
                  }
                },
              }
            : {},
          data: detailedView
            ? [
                ...summary.cashflow.residential_property_sales_proceeds.map((s) => {
                  return s;
                }),
              ]
            : [],
          legendIndex: 7,
        },
        {
          // visible: detailedView,
          showInLegend: detailedView,
          name: "Pension",
          type: "column",
          events: detailedView
            ? {
                legendItemClick: (e) => {
                  setIncomeState({ ...incomeState, pensionState: !e.target.visible });
                  if (e.target.visible) {
                    setShortfall(
                      shortfall.map((s, i) => {
                        return s + summary.cashflow.pension_income[i];
                      })
                    );
                  } else {
                    setShortfall(
                      shortfall.map((s, i) => {
                        return s - summary.cashflow.pension_income[i];
                      })
                    );
                  }
                },
              }
            : {},
          data: detailedView
            ? [
                ...summary.cashflow.pension_income.map((s) => {
                  return s;
                }),
              ]
            : [],
          legendIndex: 6,
        },
        {
          // visible: detailedView,
          showInLegend: detailedView,
          name: "Savings and Investments",
          type: "column",
          events: detailedView
            ? {
                legendItemClick: (e) => {
                  setIncomeState({ ...incomeState, savingsAndInvestmentsState: e.target.visible });
                  if (e.target.visible) {
                    setShortfall(
                      shortfall.map((s, i) => {
                        return s + summary.cashflow.savings_and_investments_drawdowns[i];
                      })
                    );
                  } else {
                    setShortfall(
                      shortfall.map((s, i) => {
                        return s - summary.cashflow.savings_and_investments_drawdowns[i];
                      })
                    );
                  }
                },
              }
            : {},
          data: detailedView
            ? [
                ...summary.cashflow.savings_and_investments_drawdowns.map((s) => {
                  return s;
                }),
              ]
            : [],
          legendIndex: 5,
        },
        {
          // visible: detailedView,
          showInLegend: detailedView,
          name: "Dividend",
          type: "column",
          events: detailedView
            ? {
                legendItemClick: (e) => {
                  setIncomeState({ ...incomeState, dividendState: !e.target.visible });
                  if (e.target.visible) {
                    setShortfall(
                      shortfall.map((s, i) => {
                        return s + summary.cashflow.dividend_income[i];
                      })
                    );
                  } else {
                    setShortfall(
                      shortfall.map((s, i) => {
                        return s - summary.cashflow.dividend_income[i];
                      })
                    );
                  }
                },
              }
            : {},
          data: detailedView
            ? [
                ...summary.cashflow.dividend_income.map((s) => {
                  return s;
                }),
              ]
            : [],
          legendIndex: 4,
        },
        {
          // visible: detailedView,
          showInLegend: detailedView,
          name: "Rental",
          type: "column",
          events: detailedView
            ? {
                legendItemClick: (e) => {
                  setIncomeState({ ...incomeState, rentalState: !e.target.visible });
                  if (e.target.visible) {
                    setShortfall(
                      shortfall.map((s, i) => {
                        return s + summary.cashflow.rental_income[i];
                      })
                    );
                  } else {
                    setShortfall(
                      shortfall.map((s, i) => {
                        return s - summary.cashflow.rental_income[i];
                      })
                    );
                  }
                },
              }
            : {},
          data: detailedView
            ? [
                ...summary.cashflow.rental_income.map((s) => {
                  return s;
                }),
              ]
            : [],
          legendIndex: 3,
        },
        {
          // visible: incomeState.selfEmploymentState,
          showInLegend: detailedView,
          name: "Self-Employment",
          type: "column",
          events: detailedView
            ? {
                legendItemClick: (e) => {
                  setIncomeState({ ...incomeState, selfEmploymentState: e.target.visible });
                  if (e.target.visible) {
                    setShortfall(
                      shortfall.map((s, i) => {
                        return s + summary.cashflow.self_employment_income[i];
                      })
                    );
                  } else {
                    setShortfall(
                      shortfall.map((s, i) => {
                        return s - summary.cashflow.self_employment_income[i];
                      })
                    );
                  }
                },
              }
            : {},
          data: detailedView
            ? [
                ...summary.cashflow.self_employment_income.map((s) => {
                  return s;
                }),
              ]
            : [],
          legendIndex: 2,
        },
        {
          showInLegend: detailedView,
          name: "Employment",
          type: "column",
          events: detailedView
            ? {
                legendItemClick: (e) => {
                  setIncomeState({ ...incomeState, employmentState: e.target.visible });
                  if (detailedView) {
                    if (e.target.visible) {
                      let v = shortfall.map((s, i) => {
                        return s + summary.cashflow.employment_income[i];
                      });
                      setShortfall(v);
                    } else {
                      let v = shortfall.map((s, i) => {
                        return s - summary.cashflow.employment_income[i];
                      });
                      setShortfall(v);
                    }
                  }
                },
              }
            : {},
          data: detailedView
            ? [
                ...summary.cashflow.employment_income.map((s) => {
                  return s;
                }),
              ]
            : [],
          legendIndex: 1,

          // ...(!detailedView
          //   ? {
          //       visible: false,
          //     }
          //   : { visible: true }),
        },
        {
          visible: !detailedView,
          showInLegend: !detailedView,
          name: "Inflow",
          type: "column",
          color: "#1976d2",
          data: [...summary.income.total_income],
        },
        {
          zIndex: 99,
          visible: true,
          showInLegend: true,
          type: "line",
          name: "Total Expenses",
          step: "center",
          data: [...summary.cashflow.expenses],
          color: "#212121",
          marker: {
            enabled: false,
          },
          // pointPlacement: -0.5,

          lineWidth: 3,
          legendIndex: 10,
        },
      ],
    });
  }, [summary, detailedView, shortfall]);

  useEffect(() => {
    setShortfall(summary.cashflow.shortfall);
  }, [nominalView]);

  const [chartControls, setChartControls] = useState({
    label: "years",
    zoomable: false,
  });

  const [some, setSome] = useState(0);

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
              checkedChildren="Detailed"
              unCheckedChildren="Detailed"
              defaultChecked={true}
              onChange={(e) => {
                setDetailedVliew(e);
              }}
            />

            <Switch
              style={{ marginRight: "16px" }}
              checkedChildren="Real"
              unCheckedChildren="Nominal"
              defaultChecked
              onChange={(e) => {
                e ? setSummary(nominalSummary) : setSummary(realSummary);
                setNominalView(e);

                const clone: any = { ...cashFlowChartOptions };

                clone.series = clone.series.map((s: any) => {
                  return { ...s, visible: true };
                });

                setCashFlowChartOptions(clone);
              }}
            />
            <Switch
              style={{ marginRight: "16px" }}
              checkedChildren="Zoom"
              unCheckedChildren="Zoom"
              defaultChecked={false}
              onChange={(e) => {
                setChartControls({ ...chartControls, zoomable: e });
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
                max={summary.years[0]}
                defaultValue={[summary.years[0], summary.years[0]]}
                value={[sliderValue[0], sliderValue[1]]}
                tipFormatter={(value: any) => {
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
                  setCashFlowChartOptions({
                    ...cashFlowChartOptions,
                    xAxis: {
                      ...cashFlowChartOptions.xAxis,
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
                  setSliderValue([summary.years[0], summary.years[0]]);
                  setCashFlowChartOptions({
                    ...cashFlowChartOptions,
                    xAxis: {
                      ...cashFlowChartOptions.xAxis,
                      min: 0,
                      max: summary.years.length - 1,
                    },
                    yAxis: {
                      ...cashFlowChartOptions.yAxis,
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

        <Row>
          <Col span={24}>
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

        {/* Table */}
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

export default Cashflow;
