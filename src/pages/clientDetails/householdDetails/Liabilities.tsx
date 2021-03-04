import React, {Fragment} from "react";
import {Card} from "antd";
import Mortgages from "./liabilitiesComponents/Mortgages";
import OtherLoan from "./liabilitiesComponents/OtherLoan";
import CreditCard from "./liabilitiesComponents/CreditCard";
import Title from "antd/lib/typography/Title";

const Liabilities = () => {
    return (
        <Fragment>
            <Card title="Liabilities" style={{marginRight: "16px"}}>
                <Title level={5}>Mortgages</Title>
                <Mortgages/>

                <Title level={5}>Other Loans</Title>
                <OtherLoan/>

                <Title level={5}>Credit Card</Title>
                <CreditCard/>
            </Card>

        </Fragment>
    );
};

export default Liabilities;
