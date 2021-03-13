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

const Isaa = () => {
    const assumptions: IAssumptions = useSelector(
        (state: RootStateOrAny) => state.assumptionReducer
    );
    console.log(assumptions)

    const Column = [
        {
            title: "Individual Savings Account (ISA) Allowances",
            dataIndex: "name",
            width: firstColumnWidth
        },
        {
            title: "Allowance",
            dataIndex: "allowance",
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
            title: "Growth Rate",
            dataIndex: "rate",
            width: thirdColumnWidth,
            align: "right" as "right",
            render: (text: any, record: any) => {
                return (
                    <Text>
                        {" "}
                        <CurrencyFormat
                            value={text * 100}
                            displayType={"text"}
                            decimalScale={2}
                            thousandSeparator={true}
                            fixedDecimalScale={0}
                            suffix={"%"}
                        />
                    </Text>
                );
            },
        },
    ];

    const data = [
        {
            name: "Annual Contribution Allowance",
            allowance: assumptions.isaa.annual_contribution_allowance.allowance,
            rate: assumptions.isaa.annual_contribution_allowance.rate,
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

export default Isaa;
