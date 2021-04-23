import { numberFormat } from "highcharts";
import { Table, Tabs, Typography } from "antd";
import Title from "antd/lib/typography/Title";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons/lib/icons";
import IChartsData from "../interfaces/IChartsData";

const { TabPane } = Tabs;
const { Text } = Typography;

const YearBreakdownTabs = (props: any) => {
  const index: number = props.index;
  const newSummary: IChartsData = props.selectedSummaryAtIndex;

  const columnWidths = ["25%", "25%", "25%", "25%"];

  return (
    <Tabs
      size="large"
      type="card"
      animated={false}
      tabBarExtraContent={{
        right: (
          <Title level={4}>
            <a
              href={"#!"}
              onClick={() => {
                props.onLeftClick();
              }}
            >
              {" "}
              <CaretLeftOutlined />{" "}
            </a>

            {newSummary.years[index]}

            <a
              href={"#!"}
              onClick={() => {
                props.onRightClick();
              }}
            >
              {" "}
              <CaretRightOutlined />{" "}
            </a>
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
              key: "category",
              width: columnWidths[1],
            },
            {
              title: "Category",
              dataIndex: "category",
              key: "name",
              width: columnWidths[0],
            },

            {
              title: "Owner",
              dataIndex: "owner",
              key: "owner",
              width: columnWidths[2],
            },
            {
              title: "Value",
              dataIndex: "value",
              key: "value",
              align: "right",
              width: columnWidths[3],
            },
          ]}
          dataSource={[
            {
              name: "Employment",
              category: "Employment Income",
              owner: (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#a5d6a7" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#a5d6a7" />
                  </svg>
                </span>
              ),
              value: "£" + numberFormat(newSummary.cashflow.employment_income[index], 0, ".", ","),
            },
            {
              name: "Self-Employment Income",
              category: "Other Income",
              owner: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  focusable="false"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 32 32"
                >
                  <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#b39ddb" />
                  <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#b39ddb" />
                </svg>
              ),
              value: "£" + numberFormat(newSummary.cashflow.self_employment_income[index], 0, ".", ","),
            },
            {
              name: "Rental Income",
              category: "Other Income",
              owner: (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#a5d6a7" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#a5d6a7" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#b39ddb" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#b39ddb" />
                  </svg>
                </span>
              ),
              value: "£" + numberFormat(newSummary.cashflow.rental_income[index], 0, ".", ","),
            },
            {
              name: "Dividend Income",
              category: "Other Income",
              owner: (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#a5d6a7" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#a5d6a7" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#b39ddb" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#b39ddb" />
                  </svg>
                </span>
              ),
              value: "£" + numberFormat(newSummary.cashflow.dividend_income[index], 0, ".", ","),
            },
            {
              name: "Savings and Investments Drawdowns",
              category: "Savings and Investments",
              owner: (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#a5d6a7" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#a5d6a7" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#b39ddb" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#b39ddb" />
                  </svg>
                </span>
              ),
              value:
                "£" + numberFormat(newSummary.cashflow.savings_and_investments_drawdowns[index], 0, ".", ","),
            },
            {
              name: "Pension Income",
              category: "Pension",
              owner: (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#a5d6a7" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#a5d6a7" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#b39ddb" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#b39ddb" />
                  </svg>
                </span>
              ),
              value: "£" + numberFormat(newSummary.cashflow.pension_income[index], 0, ".", ","),
            },
            {
              name: "Other Income",
              category: "Other Income",
              owner: (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#a5d6a7" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#a5d6a7" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#b39ddb" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#b39ddb" />
                  </svg>
                </span>
              ),
              value: "£" + numberFormat(newSummary.cashflow.other_income[index], 0, ".", ","),
            },
          ]}
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
              width: columnWidths[0],
            },
            {
              title: "Category",
              dataIndex: "category",
              key: "category",
              width: columnWidths[1],
            },
            {
              title: "Owner",
              dataIndex: "owner",
              key: "owner",
              width: columnWidths[2],
            },
            {
              title: "Value",
              dataIndex: "value",
              key: "value",
              align: "right",
              width: columnWidths[3],
            },
          ]}
          dataSource={[
            {
              name: "Housing Expenses",
              category: "Basics",
              owner: (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#a5d6a7" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#a5d6a7" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#b39ddb" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#b39ddb" />
                  </svg>
                </span>
              ),
              value: "£" + numberFormat(newSummary.expenses.housing[index], 0, ".", ","),
            },
            {
              name: "Consumables Expenses",
              category: "Basics",
              owner: (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#a5d6a7" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#a5d6a7" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#b39ddb" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#b39ddb" />
                  </svg>
                </span>
              ),
              value: "£" + numberFormat(newSummary.expenses.consumables[index], 0, ".", ","),
            },
            {
              name: "Travel Expenses",
              category: "Leisure",
              owner: (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#a5d6a7" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#a5d6a7" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#b39ddb" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#b39ddb" />
                  </svg>
                </span>
              ),
              value: "£" + numberFormat(newSummary.expenses.travel[index], 0, ".", ","),
            },
            {
              name: "Shopping Expenses",
              category: "Leisure",
              owner: (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#a5d6a7" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#a5d6a7" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#b39ddb" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#b39ddb" />
                  </svg>
                </span>
              ),
              value: "£" + numberFormat(newSummary.expenses.shopping[index], 0, ".", ","),
            },
            {
              name: "Entertainment Expenses",
              category: "Leisure",
              owner: (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#a5d6a7" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#a5d6a7" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#b39ddb" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#b39ddb" />
                  </svg>
                </span>
              ),
              value: "£" + numberFormat(newSummary.expenses.entertainment[index], 0, ".", ","),
            },
            {
              name: "Holiday Expenses",
              category: "Leisure",
              owner: (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#a5d6a7" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#a5d6a7" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#b39ddb" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#b39ddb" />
                  </svg>
                </span>
              ),
              value: "£" + numberFormat(newSummary.expenses.holiday[index], 0, ".", ","),
            },

            {
              name: "Children Education Expenses",
              category: "Basics",
              owner: (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#a5d6a7" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#a5d6a7" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#b39ddb" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#b39ddb" />
                  </svg>
                </span>
              ),
              value: "£" + numberFormat(newSummary.expenses.children_education[index], 0, ".", ","),
            },
            {
              name: "Financials Expenses",
              category: "Other",
              owner: (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#a5d6a7" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#a5d6a7" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#b39ddb" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#b39ddb" />
                  </svg>
                </span>
              ),
              value: "£" + numberFormat(newSummary.expenses.financial[index], 0, ".", ","),
            },
            {
              name: "Additional Tax Charge",
              category: "Taxes",
              owner: (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#a5d6a7" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#a5d6a7" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#b39ddb" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#b39ddb" />
                  </svg>
                </span>
              ),
              value: "£" + numberFormat(newSummary.expenses.additional_tax_charge[index], 0, ".", ","),
            },
          ]}
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
              width: columnWidths[0],
            },
            {
              title: "",
              dataIndex: "",
              key: "category",
              width: columnWidths[1],
            },
            {
              title: "Owner",
              dataIndex: "owner",
              key: "owner",
              width: columnWidths[2],
            },
            {
              title: "Value",
              dataIndex: "value",
              key: "value",
              align: "right",
              width: columnWidths[3],
            },
          ]}
          dataSource={[
            {
              name: "Savings and Investments",
              category: "Savings and Investments",
              owner: (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#a5d6a7" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#a5d6a7" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#b39ddb" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#b39ddb" />
                  </svg>
                </span>
              ),
              value:
                "£" +
                numberFormat(newSummary.assets_and_liabilities.savings_and_investments[index], 0, ".", ","),
            },
          ]}
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
              width: columnWidths[0],
            },
            {
              title: "",
              dataIndex: "",
              key: "category",
              width: columnWidths[1],
            },
            {
              title: "Owner",
              dataIndex: "owner",
              key: "owner",
              width: columnWidths[2],
            },
            {
              title: "Value",
              dataIndex: "value",
              key: "value",
              align: "right",
              width: columnWidths[3],
            },
          ]}
          dataSource={[
            {
              name: "Pension Plans",
              category: "Savings and Investments",
              owner: (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#a5d6a7" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#a5d6a7" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#b39ddb" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#b39ddb" />
                  </svg>
                </span>
              ),
              value: "£" + numberFormat(newSummary.assets_and_liabilities.pension_plans[index], 0, ".", ","),
            },
          ]}
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
              width: columnWidths[0],
            },
            {
              title: "",
              dataIndex: "",
              key: "category",
              width: columnWidths[1],
            },
            {
              title: "Owner",
              dataIndex: "owner",
              key: "owner",
              width: columnWidths[2],
            },
            {
              title: "Value",
              dataIndex: "value",
              key: "value",
              align: "right",
              width: columnWidths[3],
              render: (text: any) => {
                return `£ ${numberFormat(text, 0, ".", ",")}`;
              },
            },
          ]}
          dataSource={[
            {
              name: "Main House",
              category: "Property",
              owner: (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#a5d6a7" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#a5d6a7" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#b39ddb" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#b39ddb" />
                  </svg>
                </span>
              ),
              // value: selectedSummaryAtIndex.property_analysis.property_details[0].amount,
            },
            {
              name: "Second Property",
              category: "Property",
              owner: (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#a5d6a7" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#a5d6a7" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#b39ddb" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#b39ddb" />
                  </svg>
                </span>
              ),
              // value: selectedSummaryAtIndex.property_analysis.property_details[1].amount,
            },
          ]}
          summary={(tableData) => {
            let total = 0;

            tableData.map(({ value }: any) => {
              total += value;
              return null;
            });

            return (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>
                  <Text strong>Total</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} align={"right"} />
                <Table.Summary.Cell index={2} align={"right"} />
                <Table.Summary.Cell index={3} align={"right"}>
                  <Text strong>£{numberFormat(total, 0, ".", ",")}</Text>
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
              width: columnWidths[0],
            },
            {
              title: "Category",
              dataIndex: "category",
              key: "category",
              width: columnWidths[1],
            },
            {
              title: "Owner",
              dataIndex: "owner",
              key: "owner",
              width: columnWidths[2],
            },
            {
              title: "Value",
              dataIndex: "value",
              key: "value",
              align: "right",
              width: columnWidths[3],
              render: (text: any) => {
                return `£ ${numberFormat(text, 0, ".", ",")}`;
              },
            },
          ]}
          dataSource={[
            // ...selectedSummaryAtIndex.property_analysis.mortgage_details.map((m: any) => {
            //   return {
            //     name: m.name,
            //     category: "Property",
            //     owner: (
            //       <span>
            //         <svg
            //           xmlns="http://www.w3.org/2000/svg"
            //           xmlnsXlink="http://www.w3.org/1999/xlink"
            //           aria-hidden="true"
            //           focusable="false"
            //           width="1em"
            //           height="1em"
            //           preserveAspectRatio="xMidYMid meet"
            //           viewBox="0 0 32 32"
            //         >
            //           <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#a5d6a7" />
            //           <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#a5d6a7" />
            //         </svg>
            //         <svg
            //           xmlns="http://www.w3.org/2000/svg"
            //           xmlnsXlink="http://www.w3.org/1999/xlink"
            //           aria-hidden="true"
            //           focusable="false"
            //           width="1em"
            //           height="1em"
            //           preserveAspectRatio="xMidYMid meet"
            //           viewBox="0 0 32 32"
            //         >
            //           <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#b39ddb" />
            //           <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#b39ddb" />
            //         </svg>
            //       </span>
            //     ),
            //     value: Math.abs(m.amount),
            //   };
            // }),
            {
              name: "Other Loans",
              category: "Property",
              owner: (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#a5d6a7" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#a5d6a7" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#b39ddb" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#b39ddb" />
                  </svg>
                </span>
              ),
              // value: Math.abs(selectedSummaryAtIndex.assets_and_liabilities_analysis.total_other_loans),
            },
            {
              name: "Credit Card",
              category: "Property",
              owner: (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#a5d6a7" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#a5d6a7" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    focusable="false"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path d="M6 30h20v-5a7.008 7.008 0 0 0-7-7h-6a7.008 7.008 0 0 0-7 7z" fill="#b39ddb" />
                    <path d="M9 9a7 7 0 1 0 7-7a7 7 0 0 0-7 7z" fill="#b39ddb" />
                  </svg>
                </span>
              ),
              // value: Math.abs(selectedSummaryAtIndex.assets_and_liabilities_analysis.credit_card),
            },
          ]}
          summary={(tableData) => {
            let total = 0;

            tableData.map(({ value }: any) => {
              total += value;
              return null;
            });

            return (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>
                  <Text strong>Total</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} align={"right"} />
                <Table.Summary.Cell index={2} align={"right"} />
                <Table.Summary.Cell index={3} align={"right"}>
                  <Text strong>£{numberFormat(total, 0, ".", ",")}</Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            );
          }}
          pagination={false}
        />
      </TabPane>
    </Tabs>
  );
};

export default YearBreakdownTabs;
