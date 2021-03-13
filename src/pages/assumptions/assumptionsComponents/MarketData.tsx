import { Table, Typography } from "antd";
import React from "react";
import IAssumptions from "../../../interfaces/IAssumptions";
import { RootStateOrAny, useSelector } from "react-redux";

// @ts-ignore
import CurrencyFormat from "react-currency-format";
import { Fragment } from "react";
import {firstColumnWidth, secondColumnWidth, thirdColumnWidth} from "../AssumptionsCommonVariable";

const { Text } = Typography;

const MarketData = () => {
    const assumptions: IAssumptions = useSelector(
        (state: RootStateOrAny) => state.assumptionReducer
    );

    const Column = [
        {
            title: "Market Data",
            dataIndex: "name",
            width: firstColumnWidth
        },
        {
            title: "Notes",
            dataIndex: "threshold",
            width: secondColumnWidth,

            align: "right" as "right",
            render: (text: any, record: any) => {
                return (
                    <Text>
                        {text}
                    </Text>
                );
            },
        },
        {
            title: "Rate",
            dataIndex: "rate",
            width: thirdColumnWidth,
            align: "right" as "right",
            render: (text: any, record: any) => {
                return (
                    <Text>
                        <CurrencyFormat
                            value={text *100 }
                            displayType={"text"}
                                decimalScale={2}
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
            name: "Property Price Inflation",
            threshold: assumptions.market_data.property_price_inflation.notes,
            rate: assumptions.market_data.property_price_inflation.rate,
            key: "1",
        },
        {
            name: "Cash and Money Markets Yield",
            threshold: assumptions.market_data.cash_and_money_market_yield.notes,
            rate: assumptions.market_data.cash_and_money_market_yield.rate,
            key: "2",
        },
        {
            name: "Savings and Investment Growth Rate",
            threshold: assumptions.market_data.savings_and_investment_growth_rate.notes,
            rate: assumptions.market_data.savings_and_investment_growth_rate.rate,
            key: "3",
        },
        {
            name: "Earnings Growth Rate",
            threshold: assumptions.market_data.earning_growth_rate.notes,
            rate: assumptions.market_data.earning_growth_rate.rate,
            key: "4",
        },
        {
            name: "Retail Price Index",
            threshold: assumptions.market_data.retain_price_index.notes,
            rate: assumptions.market_data.retain_price_index.rate,
            key: "5",
        },
        {
            name: "Consumer Price Index",
            threshold: assumptions.market_data.consumer_price_index.notes,
            rate: assumptions.market_data.consumer_price_index.rate,
            key: "6",
        },
        {
            name: "Annuity (Age 65, Single Life, Level, No Guarantee)1",
            threshold: assumptions.market_data.annuity.notes,
            rate: assumptions.market_data.annuity.rate,
            key: "7",
        },
        {
            name: "Private School Fee Inflation",
            threshold: assumptions.market_data.private_school_fee_inflation.notes,
            rate: assumptions.market_data.private_school_fee_inflation.rate,
            key: "8",
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

export default MarketData;
