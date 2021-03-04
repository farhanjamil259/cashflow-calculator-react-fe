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
    name: "Employment Income",
    year: 51879,
  },
  {
    name: "Self-Employment Income",
    year: 50000,
  },
  {
    name: "Rental Income",
    year: 0,
  },
  {
    name: "Total Dividend Income",
    year: 5500,
  },
  {
    name: "Saving and Investments Drawdowns",
    year: 3000,
  },
  {
    name: "Pension Income",
    year: 0,
  },
  {
    name: "Other Income",
    year: 0,
  },
  {
    name: "Total Income",
    year: 110379,
  },
];

const Income = () => {
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

export default Income;
