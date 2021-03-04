import React, { Fragment } from "react";
import {Card} from "antd";
import Housing from "./expenses/Housing";
import Consumables from "./expenses/Consumables";
import Travel from "./expenses/Travel";
import Shopping from "./expenses/Shopping";
import Entertainment from "./expenses/Entertainment";
import Holiday from "./expenses/Holiday";
import InsurancePolicies from "./expenses/InsurancePolicies";
import OneOff from "./expenses/OneOff";
import ChildrenEducation from "./expenses/ChildrenEducation";
import Title from "antd/lib/typography/Title";

const Expenses = () => {
    return (
        <Fragment>

          <Card title="Expenses" >
                  <Title level={5}>Housing</Title>
                  <Housing/>

                  <Title level={5}>Consumables</Title>
                  <Consumables/>

                  <Title level={5}>Travel</Title>
                  <Travel/>

                  <Title level={5}>Shopping</Title>
                  <Shopping/>

                  <Title level={5}>Entertainment</Title>
                  <Entertainment/>

                  <Title level={5}>Holiday</Title>
                  <Holiday/>

                  <Title level={5}>Insurance Policies</Title>
                  <InsurancePolicies/>

                  <Title level={5}>One-Off</Title>
                  <OneOff/>

                  <Title level={5}>Children Education</Title>
                  <ChildrenEducation/>
          </Card>
        </Fragment>
    );
};

export default Expenses;
