import { Card, Col, Layout, Row, Button } from "antd";
import Sdlt from "./assumptionsComponents/Sdlt";
import Isaa from "./assumptionsComponents/Isaa";
import Pension from "./assumptionsComponents/Pension";
import IncomeTax from "./assumptionsComponents/IncomeTax";
import IncomeLimits from "./assumptionsComponents/IncomeLimits";
import IncomeLimits2 from "./assumptionsComponents/IncomeLimits2";
import EmploymentNic from "./assumptionsComponents/EmploymentNic";
import SelfEmployment2 from "./assumptionsComponents/SelfEmployment2";
import SelfEmployment4 from "./assumptionsComponents/SelfEmployment4";
import DividendTax from "./assumptionsComponents/DividendTax";
import MarketData from "./assumptionsComponents/MarketData";
import React from "react";
import EmploymentMinimumPensionContributions from "./assumptionsComponents/EmploymentMinimumPensionContributions";
import ResidentialPropertyCapitalTexRateThresholds from "./assumptionsComponents/ResidentialPropertyCapitalTexRateThresholds";
import OtherAssetsCapitalGainsTaxRateThresholds from "./assumptionsComponents/OtherAssetsCapitalGainsTaxRateThresholds";
import { useHistory } from "react-router-dom";

const Assumption = () => {
  const history = useHistory();

  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Row justify="center">
        <Col span={12}>
          <Card
            title={"Tax Rules and Market Data Assumptions"}
            bordered={false}
            extra={
              <Button
                type="primary"
                style={{ margin: "16px" }}
                onClick={() => {
                  history.push("/assumption/assumptionForm");
                }}
              >
                Edit Assumptions
              </Button>
            }
          >
            <Row>
              <Col span={24}>
                <Sdlt />
                <Isaa />
                <Pension />
                <IncomeTax />
                <IncomeLimits />
                <EmploymentMinimumPensionContributions />
                <EmploymentNic />
                <SelfEmployment2 />
                <SelfEmployment4 />
                <DividendTax />
                <ResidentialPropertyCapitalTexRateThresholds />
                <OtherAssetsCapitalGainsTaxRateThresholds />
                <IncomeLimits2 />
                <MarketData />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default Assumption;
