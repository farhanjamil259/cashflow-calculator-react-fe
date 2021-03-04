import { Table, Typography } from "antd";
import React from "react";
import IAssumptions from "../../../interfaces/IAssumptions";
import { RootStateOrAny, useSelector } from "react-redux";

// @ts-ignore
import CurrencyFormat from "react-currency-format";
import { Fragment } from "react";
import {firstColumnWidth, secondColumnWidth, thirdColumnWidth} from "../AssumptionsCommonVariable";

const { Text } = Typography;

const EmploymentNic = () => {
    const assumptions: IAssumptions = useSelector(
        (state: RootStateOrAny) => state.assumptionReducer
    );

    const Column = [
        {
            title: "Employment NIC Thresholds",
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
            name: "Lower Earnings",
            threshold: assumptions.employment_nic_thresholds.lower_earnings.threshold,
            rate: assumptions.employment_nic_thresholds.lower_earnings.rate,
            key: "1",
        },
        {
            name: "Primary Threshold",
            threshold: assumptions.employment_nic_thresholds.primary_threshold.threshold,
            rate: assumptions.employment_nic_thresholds.primary_threshold.rate,
            key: "2",
        },
        {
            name: "Upper Earnings Limit",
            threshold: assumptions.employment_nic_thresholds.upper_earnings_limit.threshold,
            rate: assumptions.employment_nic_thresholds.upper_earnings_limit.rate,
            key: "3",
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

export default EmploymentNic;
