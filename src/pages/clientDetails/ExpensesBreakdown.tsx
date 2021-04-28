import React, { useEffect } from "react";
import Layout from "antd/lib/layout/layout";
import { Card, Button, Row, Col, Switch, Slider } from "antd";

import highcharts, { numberFormat } from "highcharts";
import HighchartsReact from "highcharts-react-official";

import "rc-slider/assets/index.css";
import { useState } from "react";
import { useDispatch } from "react-redux";

import YearBreakdownTabs from "../../components/YearBreakdownTabs";
import IChartsData from "../../interfaces/IChartsData";

import store from "../../redux/store";
import IInputs from "../../interfaces/IInputs";

const IncomeBreakdown = () => {
  const dispatch = useDispatch();
  const nominalSummary: IChartsData = store.getState().summaryReducer;
  const realSummary: IChartsData = store.getState().realSummaryReducer;
  const inputs: IInputs = store.getState().currentInputSetReducer;

  const [summary, setSummary] = useState<IChartsData>(nominalSummary);
  const [sliderValue, setSliderValue] = useState([summary.years[0], summary.years[summary.years.length - 1]]);

  const [selectedSummaryAtIndexNumber, setSelectedSummaryAtIndexNumber] = useState(0);

  const [selectedSummaryAtIndex, setSelectedSummaryAtIndex] = useState(0);

  const [chartOptions, setChartOptions] = useState<highcharts.Options>({
    chart: {
      alignTicks: false,
      ignoreHiddenSeries: true,
      animation: false,
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
          // color: "red",
          from: -1,
          to: inputs.household_owners[0].retirement_year - inputs.current_year + 0.5,
          label: {
            text: "",
            align: "right",
          },
          events: {
            click: () => {
              console.log(summary.retirement_ages[0]);
              setSliderValue([summary.years[0], inputs.household_owners[0].retirement_year + 3]);

              setChartOptions({
                ...chartOptions,
                xAxis: {
                  ...chartOptions.xAxis,
                  min: 0,
                  max: inputs.household_owners[0].retirement_year - inputs.current_year + 2,
                },
              });
            },
          },
        },
        {
          color: "#eeeeee",
          from: inputs.household_owners[0].retirement_year - inputs.current_year + 0.5,
          to: summary.years.length,
          label: {
            align: "right",
            text: "",
          },
          events: {
            click: (e) => {
              setSliderValue([
                inputs.household_owners[0].retirement_year,
                summary.years[summary.years.length - 1],
              ]);

              setChartOptions({
                ...chartOptions,
                xAxis: {
                  ...chartOptions.xAxis,
                  min: inputs.household_owners[0].retirement_year - inputs.current_year - 1,
                  max: summary.years.length - 1,
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
        animation: false,
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
  });

  let chartRef: any = React.useRef(null);

  const [nominalView, setNominalView] = useState<boolean>(true);

  useEffect(() => {
    setChartOptions({
      series: [
        {
          name: "Additional Tax Charge",
          type: "column",
          data: [...summary.expenses.additional_tax_charge],
          legendIndex: 9,
        },
        {
          name: "Financial",
          type: "column",
          data: [...summary.expenses.financial],
          legendIndex: 8,
        },
        {
          name: "Children",
          type: "column",
          data: [...summary.expenses.children_education],
          legendIndex: 7,
        },
        {
          name: "Onf-Off",
          type: "column",
          data: [...summary.expenses.one_off],
          legendIndex: 6,
        },
        {
          name: "Holiday",
          type: "column",
          data: [...summary.expenses.holiday],
          legendIndex: 5,
        },
        {
          name: "Entertainment",
          type: "column",
          data: [...summary.expenses.entertainment],
          legendIndex: 4,
        },
        {
          name: "Shopping",
          type: "column",
          data: [...summary.expenses.shopping],
          legendIndex: 3,
        },
        {
          name: "Travel",
          type: "column",
          data: [...summary.expenses.travel],
          legendIndex: 2,
        },
        {
          name: "Consumables",
          type: "column",
          data: [...summary.expenses.consumables],
          legendIndex: 1,
        },
        {
          name: "Housing",
          type: "column",
          data: [...summary.expenses.housing],
          legendIndex: 0,
        },
      ],
    });
  }, [summary]);

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
              checkedChildren="Real"
              unCheckedChildren="Nominal"
              defaultChecked
              onChange={(e) => {
                e ? setSummary(nominalSummary) : setSummary(realSummary);
                setNominalView(e);
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
                max={summary.years[summary.years.length - 1]}
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
                  setChartOptions({
                    ...chartOptions,
                    xAxis: {
                      ...chartOptions.xAxis,
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
                  setChartOptions({
                    ...chartOptions,
                    xAxis: {
                      ...chartOptions.xAxis,
                      min: 0,
                      max: summary.years.length - 1,
                    },
                    yAxis: {
                      ...chartOptions.yAxis,
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
              options={chartOptions}
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
                  setChartOptions({
                    ...chartOptions,
                    yAxis: {
                      ...chartOptions.yAxis,
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

export default IncomeBreakdown;
