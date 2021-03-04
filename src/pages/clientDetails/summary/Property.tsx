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
    name: "Main House	",
    year: 0,
  },
  {
    name: "Second Property",
    year: 0,
  },
  {
    name: "Mortgage - Main House",
    year: 0,
  },
  {
    name: "Mortgage - Second Property",
    year: 0,
  },
  {
    name: "Net Position",
    year: 0,
  },
  {
    name: "LTV - Main House",
    year: 0,
  },
  {
    name: "LTV - Second Property",
    year: 0,
  },
];

const Property = () => {
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

export default Property;
