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
    name: "Aggregated Bank Accounts",
    year: 50000,
  },
  {
    name: "Savings and Investments",
    year: 325000,
  },
  {
    name: "Pension Plans",
    year: 50000,
  },
  {
    name: "Mortgages",
    year: 0,
  },
  {
    name: "Other Loans",
    year: -14616,
  },
  {
    name: "Credit Card",
    year: -5000,
  },
  {
    name: "Net Asset Position",
    year: 405384,
  },
];
const AssetsLiabilities = () => {
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

export default AssetsLiabilities;
