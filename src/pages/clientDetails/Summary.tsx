import React from "react";
import { Collapse } from "antd";
import Age from "./summary/Age";
import AssetsLiabilities from "./summary/AssetsLiabilities";
import CashFlow from "./summary/CashFlow";
import Income from "./summary/Income";
import Expenses from "./summary/Expenses";
import IncomeTax from "./summary/IncomeTax";
import TaxAndExpenses from "./summary/TaxAndExpenses";
import Property from "./summary/Property";
import Layout from "antd/lib/layout/layout";
import SideNav from "./SideNav";

const { Panel } = Collapse;

const Summary = () => {
  return (
    <div>
      <Layout>
        <SideNav />
        <Layout>
          <Collapse bordered={false} style={{ margin: "16px" }}>
            <Panel header="Ages" key="1">
              <Age />
            </Panel>
            <Panel header="Assets and Liabilities Analysis" key="2">
              <AssetsLiabilities />
            </Panel>
            <Panel header="Cash Flow Analysis" key="3">
              <CashFlow />
            </Panel>
            <Panel header="Income Analysis" key="4">
              <Income />
            </Panel>
            <Panel header="Expenses Analysis" key="5">
              <Expenses />
            </Panel>
            <Panel header="Income Tax Analysis" key="6">
              <IncomeTax />
            </Panel>
            <Panel header="Tax and Expenses as a Percentage of Income" key="7">
              <TaxAndExpenses />
            </Panel>
            <Panel header="Property Analysis" key="8">
              <Property />
            </Panel>
          </Collapse>
        </Layout>
      </Layout>
    </div>
  );
};

export default Summary;
