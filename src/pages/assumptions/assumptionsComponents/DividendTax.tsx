import { Table, Typography } from "antd";
import React from "react";
import IAssumptions from "../../../interfaces/IAssumptions";
import { RootStateOrAny, useSelector } from "react-redux";

// @ts-ignore
import CurrencyFormat from "react-currency-format";
import { Fragment } from "react";
import {firstColumnWidth, secondColumnWidth, thirdColumnWidth} from "../AssumptionsCommonVariable";

const { Text } = Typography;

const DividendTax = () => {
    const assumptions: IAssumptions = useSelector(
        (state: RootStateOrAny) => state.assumptionReducer
    );

    const Column = [
        {
            title: "Dividend Tax Rate Threshold",
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
            title: "Rate",
            dataIndex: "rate",
            width: thirdColumnWidth,
            render: (text: any, record: any) => {
                return (
                    <Text>
                        <CurrencyFormat
                            value={text *100 }
                            displayType={"text"}
                            decimalScale={2}
                            fixedDecimalScale={0}
                            thousandSeparator={true}
                            suffix={"%"}
                        />
                    </Text>
                );
            },
        },
    ];

    const data = [
        {
            name: "Personal Allowance",
            threshold: assumptions.dividend_tax_rate_thresholds.personal_allowance.threshold,
            rate: assumptions.dividend_tax_rate_thresholds.personal_allowance.rate,
            key: "1",
        },
        {
            name: "Basic Rate",
            threshold: assumptions.dividend_tax_rate_thresholds.basic_rate.threshold,
            rate: assumptions.dividend_tax_rate_thresholds.basic_rate.rate,
            key: "2",
        },
        {
            name: "Higher Rate",
            threshold: assumptions.dividend_tax_rate_thresholds.higher_rate.threshold,
            rate: assumptions.dividend_tax_rate_thresholds.higher_rate.rate,
            key: "3",
        },
        {
            name: "Additional Rate",
            threshold: assumptions.dividend_tax_rate_thresholds.additional_rate.threshold,
            rate: assumptions.dividend_tax_rate_thresholds.additional_rate.rate,
            key: "4",
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

export default DividendTax;
