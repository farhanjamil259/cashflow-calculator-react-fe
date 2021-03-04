import { Table, Typography } from "antd";
import React from "react";
import IAssumptions from "../../../interfaces/IAssumptions";
import { RootStateOrAny, useSelector } from "react-redux";

// @ts-ignore
import CurrencyFormat from "react-currency-format";
import { Fragment } from "react";
import {firstColumnWidth, secondColumnWidth, thirdColumnWidth} from "../AssumptionsCommonVariable";

const { Text } = Typography;

const IncomeLimits2 = () => {
    const assumptions: IAssumptions = useSelector(
        (state: RootStateOrAny) => state.assumptionReducer
    );


    const Column = [
        {
            title: "Income Limits  ",
            dataIndex: "name",
            width: firstColumnWidth
        },
        {
            title: "Threshold",
            dataIndex: "threshold",
            width: secondColumnWidth,
            render: (text: any, record: any) => {
                return (
                    <Text>
                        <CurrencyFormat
                            value={text}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"£ "}
                        />
                    </Text>
                );
            },
        },
        {
            title: "",
            dataIndex: "rate",
            width: thirdColumnWidth,

        },
    ];

    const data = [
        {
            name: "Capital Gains Rax Annual Exempt Amount",
            threshold: assumptions.income_limits_2.capital_gains_tax_annual_exempt_amount.threshold,
            key: "1",
        },
    ];
    return (
        <Fragment>
            <Table
                size={"small"}
                columns={Column}
                dataSource={data}
                pagination={false}

            />
        </Fragment>
    );
};

export default IncomeLimits2;
