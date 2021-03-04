import React, {Fragment} from "react";
import {Card} from "antd";
import Employment from "./incomeComponents/Employment";
import SelfEmployment from "./incomeComponents/SelfEmployment";
import Rental from "./incomeComponents/Rental";
import Dividend from "./incomeComponents/Dividend";
import Pension from "./incomeComponents/Pension";
import OtherIncome from "./incomeComponents/OtherIncome";
import SAI from "./incomeComponents/SAI";
import Title from "antd/lib/typography/Title";

const Income = () => {
    return (
        <Fragment>

            <Card title="Income" style={{marginRight: "16px"}}>
                <Title level={5}>Employment Income</Title>
                <Employment/>

                <Title level={5}>Self-Employment Income</Title>
                <SelfEmployment/>

                <Title level={5}>Rental Income</Title>
                <Rental/>

                <Title level={5}>Dividend Income</Title>
                <Dividend/>

                <Title level={5}>Savings and Investments</Title>
                <SAI/>

                <Title level={5}>Pension Income</Title>
                <Pension/>

                <Title level={5}>Other Income</Title>
                <OtherIncome/>
            </Card>


        </Fragment>
    );
};

export default Income;
