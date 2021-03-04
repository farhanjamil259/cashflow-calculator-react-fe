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
    name: "Owner",
  },
  {
    name: "Income Tax Charge",
    year: 21400,
  },
  {
    name: "National Insurance",
    year: 5121,
  },
  {
    name: "Total Tax for Mr Optimistic",
    year: 26521,
  },
  {
    name: "Total Taxable income for Mr Optimistic",
    year: 72000,
  },
  {
    name: "Effective Tax Rate - Mr Optimistic",
    year: 37,
  },
  {
    name: "Mrs Optimistic",
  },
  {
    name: "Income Tax Charge",
    year: 11575,
  },
  {
    name: "National Insurance",
    year: 3563,
  },
  {
    name: "Total Tax for Mrs Optimistic",
    year: 15138,
  },
  {
    name: "Total Taxable income for Mrs Optimistic",
    year: 48000,
  },
  {
    name: "Effective Tax Rate - Mrs Optimistic",
    year: 32,
  },
  {
    name: "Overall Effective Tax Rate",
    year: 35,
  },
];

const IncomeTax = () => {
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

export default IncomeTax;
