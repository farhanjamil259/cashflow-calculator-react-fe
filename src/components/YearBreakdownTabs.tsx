import { numberFormat } from "highcharts";
import { Table, Tabs, Typography } from "antd";
import Title from "antd/lib/typography/Title";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons/lib/icons";

const { TabPane } = Tabs;
const { Text } = Typography;

const YearBreakdownTabs = (props: any) => {
  const selectedSummaryAtIndex = props.selectedSummaryAtIndex;

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

            {selectedSummaryAtIndex.year}

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
              title: "Type of Income",
              dataIndex: "name",
              key: "name",
              width: columnWidths[0],
            },
            {
              title: "Name",
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
              name: "Employment Income",
              category: "Employment",
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
                  </svg>{" "}
                </span>
              ),
              value:
                "£" +
                numberFormat(selectedSummaryAtIndex.income_analysis.total_employment_income, 0, ".", ","),
            },
            {
              name: "Self-Employment Income",
              category: "Employment",
              owner: "Mr, Mrs",
              value:
                "£" +
                numberFormat(
                  selectedSummaryAtIndex.income_analysis.total_self_employment_income,
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
                "£" + numberFormat(selectedSummaryAtIndex.income_analysis.total_rental_income, 0, ".", ","),
            },
            {
              name: "Dividend Income",
              category: "Employment",
              owner: "Mr, Mrs",
              value:
                "£" + numberFormat(selectedSummaryAtIndex.income_analysis.total_dividend_income, 0, ".", ","),
            },
            {
              name: "Savings and Investments Drawdowns",
              category: "Employment",
              owner: "Mr, Mrs",
              value:
                "£" +
                numberFormat(
                  selectedSummaryAtIndex.income_analysis.total_savings_and_investments_drawdowns,
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
                "£" + numberFormat(selectedSummaryAtIndex.income_analysis.total_pension_income, 0, ".", ","),
            },
            {
              name: "Other Income",
              category: "Employment",
              owner: "Mr, Mrs",
              value:
                "£" + numberFormat(selectedSummaryAtIndex.income_analysis.total_other_income, 0, ".", ","),
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
                  £ {numberFormat(selectedSummaryAtIndex.income_analysis.total_income, 0, ".", ",")}
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
              category: "Expense",
              owner: "Mr, Mrs",
              value:
                "£" +
                numberFormat(selectedSummaryAtIndex.expense_analysis.total_housing_expenses, 0, ".", ","),
            },
            {
              name: "Consumables Expenses",
              category: "Expense",
              owner: "Mr, Mrs",
              value:
                "£" +
                numberFormat(selectedSummaryAtIndex.expense_analysis.total_consumables_expenses, 0, ".", ","),
            },
            {
              name: "Travel Expenses",
              category: "Expense",
              owner: "Mr, Mrs",
              value:
                "£" +
                numberFormat(selectedSummaryAtIndex.expense_analysis.total_travel_expenses, 0, ".", ","),
            },
            {
              name: "Shopping Expenses",
              category: "Expense",
              owner: "Mr, Mrs",
              value:
                "£" +
                numberFormat(selectedSummaryAtIndex.expense_analysis.total_shopping_expenses, 0, ".", ","),
            },
            {
              name: "Entertainment Expenses",
              category: "Expense",
              owner: "Mr, Mrs",
              value:
                "£" +
                numberFormat(
                  selectedSummaryAtIndex.expense_analysis.total_entertainment_expenses,
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
                numberFormat(selectedSummaryAtIndex.expense_analysis.total_holiday_expenses, 0, ".", ","),
            },
            {
              name: "One-off Expenses",
              category: "Expense",
              owner: "Mr, Mrs",
              value:
                "£" +
                numberFormat(selectedSummaryAtIndex.expense_analysis.total_one_off_expenses, 0, ".", ","),
            },
            {
              name: "Children Education Expenses",
              category: "Expense",
              owner: "Mr, Mrs",
              value:
                "£" +
                numberFormat(
                  selectedSummaryAtIndex.expense_analysis.total_children_education_expenses,
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
                numberFormat(selectedSummaryAtIndex.expense_analysis.total_financial_expenses, 0, ".", ","),
            },
            {
              name: "Additional Tax Charge",
              category: "Expense",
              owner: "Mr, Mrs",
              value:
                "£" +
                numberFormat(
                  selectedSummaryAtIndex.expense_analysis.total_additional_tax_charge,
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
                  £ {numberFormat(selectedSummaryAtIndex.expense_analysis.total_expenses, 0, ".", ",")}
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
              name: "Savings and Investments",
              category: "Savings and Investments",
              owner: "Mr, Mrs",
              value:
                "£" +
                numberFormat(
                  selectedSummaryAtIndex.assets_and_liabilities_analysis.total_savings_and_investments,
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
                    selectedSummaryAtIndex.assets_and_liabilities_analysis.total_savings_and_investments,
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
              name: "Pension Plans",
              category: "Savings and Investments",
              owner: "Mr, Mrs",
              value:
                "£" +
                numberFormat(
                  selectedSummaryAtIndex.assets_and_liabilities_analysis.total_pension_plans,
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
                    selectedSummaryAtIndex.assets_and_liabilities_analysis.total_pension_plans,
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
            {
              name: "Main House",
              category: "Property",
              owner: "Mr, Mrs",
              value: selectedSummaryAtIndex.property_analysis.property_details[0].amount,
            },
            {
              name: "Second Property",
              category: "Property",
              owner: "Mr, Mrs",
              value: selectedSummaryAtIndex.property_analysis.property_details[1].amount,
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
            ...selectedSummaryAtIndex.property_analysis.mortgage_details.map((m: any) => {
              return {
                name: m.name,
                category: "Property",
                owner: "Mr, Mrs",
                value: Math.abs(m.amount),
              };
            }),
            {
              name: "Other Loans",
              category: "Property",
              owner: "Mr, Mrs",
              value: Math.abs(selectedSummaryAtIndex.assets_and_liabilities_analysis.total_other_loans),
            },
            {
              name: "Credit Card",
              category: "Property",
              owner: "Mr, Mrs",
              value: Math.abs(selectedSummaryAtIndex.assets_and_liabilities_analysis.credit_card),
            },
          ]}
          summary={(tableData) => {
            let total = 0;

            tableData.map(({ value }: any) => {
              total += value;
              return null
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
