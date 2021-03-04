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
    name: "Owner's Ages",
  },
  {
    name: "Mr Optimistic",
    year: 32,
  },
  {
    name: "Mrs Optimistic",
    year: 27,
  },
  {
    name: "Children Ages",
  },
  {
    name: "Optimistic Jr",
    year: 0,
  },
];

const Age = () => {
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

export default Age;
