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
    name: "Household Income",
    year: 110379,
  },
  {
    name: "Household Expenses",
    year: -78396,
  },
  {
    name: "Annual Cash Inflow/Outflow",
    year: 31983,
  },
];

const CashFlow = () => {
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

export default CashFlow;
