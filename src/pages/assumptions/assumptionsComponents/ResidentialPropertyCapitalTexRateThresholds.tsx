import { Table, Typography } from "antd";
import React from "react";
import IAssumptions from "../../../interfaces/IAssumptions";
import { RootStateOrAny, useSelector } from "react-redux";

// @ts-ignore
import CurrencyFormat from "react-currency-format";
import { Fragment } from "react";
import {firstColumnWidth, secondColumnWidth, thirdColumnWidth} from "../AssumptionsCommonVariable";

const { Text } = Typography;

const ResidentialPropertyCapitalTexRateThresholds = () => {
    const assumptions: IAssumptions = useSelector(
        (state: RootStateOrAny) => state.assumptionReducer
    );

    const Column = [
        {
            title: "Residential Property Capital Gains Tax Rate Thresholds ",
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
            title: "Tax Rate",
            dataIndex: "rate",
            width: thirdColumnWidth,
            render: (text: any, record: any) => {
                return (
                    <Text>
                        {" "}
                        <CurrencyFormat
                            value={text * 100}
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
            name: "Basic Rate",
            threshold: assumptions.residential_property_captical_gains_tax_rate_thresholds.basic_rate.threshold,
            rate: assumptions.residential_property_captical_gains_tax_rate_thresholds.basic_rate.rate,
            key: "1",
        },
        {
            name: "Higher and Additional Rate",
            threshold: assumptions.residential_property_captical_gains_tax_rate_thresholds.higher_and_additional_rate.threshold,
            rate: assumptions.residential_property_captical_gains_tax_rate_thresholds.higher_and_additional_rate.rate,
            key: "2",
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

export default ResidentialPropertyCapitalTexRateThresholds;
