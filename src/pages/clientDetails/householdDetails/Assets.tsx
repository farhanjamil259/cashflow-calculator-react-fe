import {Card} from "antd";
import React from "react";
import Bank from "./assetsComponents/Bank";
import PensionPlan from "./assetsComponents/PensionPlan";
import Properties from "./assetsComponents/Properties";
import SAI from "./assetsComponents/SAI";
import Title from "antd/lib/typography/Title";

const Assets = () => {
    return (
        <div >
            <Card title="Assets" style={{marginRight: "16px"}}>
                <Title level={5}>Properties</Title>
                <Properties/>
                <Title level={5}>Bank Accounts</Title>
                <Bank/>
                <Title level={5}>Savings and Investments</Title>
                <SAI/>
                <Title level={5}>Pension Plans</Title>
                <PensionPlan/>
            </Card>
        </div>
    );
};

export default Assets;
