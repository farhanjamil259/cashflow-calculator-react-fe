import { Table, Typography } from "antd";
import React from "react";
import IAssumptions from "../../../interfaces/IAssumptions";
import { RootStateOrAny, useSelector } from "react-redux";

// @ts-ignore
import CurrencyFormat from "react-currency-format";
import { Fragment } from "react";
import {firstColumnWidth, secondColumnWidth, thirdColumnWidth} from "../AssumptionsCommonVariable";

const { Text } = Typography;

const SelfEmployment2 = () => {
    const assumptions: IAssumptions = useSelector(
        (state: RootStateOrAny) => state.assumptionReducer
    );

    const Column = [
        {
            title: "Self-Employment NIC Class 2 Threshold",
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
                            value={text }
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"£ "}
                            suffix={" p.a"}
                        />
                    </Text>
                );
            },
        },
    ];

    const data = [
        {
            name: "Small Profit Rate",
            threshold: assumptions.self_employment_nic_class_2_threshold.small_profit_rate.threshold,
            rate: assumptions.self_employment_nic_class_2_threshold.small_profit_rate.rate,
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

export default SelfEmployment2;
