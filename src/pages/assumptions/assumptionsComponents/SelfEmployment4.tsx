import { Table, Typography } from "antd";
import React from "react";
import IAssumptions from "../../../interfaces/IAssumptions";
import { RootStateOrAny, useSelector } from "react-redux";

// @ts-ignore
import CurrencyFormat from "react-currency-format";
import { Fragment } from "react";
import {firstColumnWidth, secondColumnWidth, thirdColumnWidth} from "../AssumptionsCommonVariable";
import {pound} from "../../../components/currencySumbol";
import {numberFormat} from "highcharts";

const { Text } = Typography;

const SelfEmployment4 = () => {
    const assumptions: IAssumptions = useSelector(
        (state: RootStateOrAny) => state.assumptionReducer
    );

    const Column = [
        {
            title: "Self-Employment NIC Class 4 Threshold",
            dataIndex: "name",
            width: firstColumnWidth
        },
        {
            title: "Threshold",
            dataIndex: "threshold",
            width: secondColumnWidth,
            align: "right" as "right",
            render: (text: any, record: any) => {
                return (
                    <Text>
                        {pound} {numberFormat(text, 0, ".", ",")}
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
            name: "Lower Profits Limit",
            threshold: assumptions.self_employment_nic_class_4_threshold.lower_profits_limit.threshold,
            rate: assumptions.self_employment_nic_class_4_threshold.lower_profits_limit.rate,
            key: "1",
        },
        {
            name: "Upper Profits Limit",
            threshold: assumptions.self_employment_nic_class_4_threshold.upper_earnings_limit.threshold,
            rate: assumptions.self_employment_nic_class_4_threshold.upper_earnings_limit.rate,
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

export default SelfEmployment4;
