import React from "react";
import { Table } from "antd";

const columns: any = [
  {
    title: "Year",
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  {
    title: "2017",
    dataIndex: "year",
    key: "1",
  },
];

const data = [
  {
    name: "Housing Expense",
    year: 33660,
  },
  {
    name: "Consumables Expense",
    year: 6000,
  },
  {
    name: "Travel Expense",
    year: 4680,
  },
  {
    name: "Shopping Expense",
    year: 2700,
  },
  {
    name: "Entertainment Expense",
    year: 820,
  },
  {
    name: "Holiday Expense",
    year: 1800,
  },
  {
    name: "One-Off Expense",
    year: 2020,
  },
  {
    name: "Children Education Expense",
    year: 0,
  },
  {
    name: "Financial Expense",
    year: 12177,
  },
  {
    name: "Additional Tax Charge",
    year: 14538,
  },
  {
    name: "Total Expenses",
    year: 78396,
  },
];

const Expenses = () => {
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: true }}
        pagination={false}
      />
    </div>
  );
};

export default Expenses;
