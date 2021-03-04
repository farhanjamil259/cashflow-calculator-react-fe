import { Table, Typography } from "antd";
import React from "react";
import IAssumptions from "../../../interfaces/IAssumptions";
import { RootStateOrAny, useSelector } from "react-redux";

// @ts-ignore
import CurrencyFormat from "react-currency-format";
import { Fragment } from "react";
import {firstColumnWidth, secondColumnWidth, thirdColumnWidth} from "../AssumptionsCommonVariable";

const { Text } = Typography;

const Pension = () => {
    const assumptions: IAssumptions = useSelector(
        (state: RootStateOrAny) => state.assumptionReducer
    );

    const Column = [
        {
            title: "Pension Contribution Allowances",
            dataIndex: "name",
            width: firstColumnWidth
        },
        {
            title: "Lifetime",
            dataIndex: "allowance",
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
            title: "Growth Rate",
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
            name: "Contribution Annual Allowance",
            allowance: assumptions.pension_contribution_allowance.contribution_annual_allowance.allowance,
            rate: assumptions.pension_contribution_allowance.contribution_annual_allowance.rate,
            key: "1",
        },
        {
            name: "Lifetime Allowance",
            allowance: assumptions.pension_contribution_allowance.lifetime_allowance.allowance,
            rate: assumptions.pension_contribution_allowance.lifetime_allowance.rate,
            key: "2",
        },
        {
            name: "Contribution Annual Allowance Floor",
            allowance: assumptions.pension_contribution_allowance.contribution_annual_allowance_floor.allowance,
            rate: assumptions.pension_contribution_allowance.contribution_annual_allowance_floor.rate,
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

export default Pension;
