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

const EmploymentMinimumPensionContributions = () => {
    const assumptions: IAssumptions = useSelector(
        (state: RootStateOrAny) => state.assumptionReducer
    );

    const Column = [
        {
            title: "Employment Minimum Pension Contributions",
            dataIndex: "name",
            width: firstColumnWidth
        },
        {
            title: "Member's",
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
            title: "Employer's",
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
                            suffix={"%"}
                        />
                    </Text>
                );
            },
        },
    ];

    const data = [
        {
            name: "Minimum Contributions",
            allowance: assumptions.employement_minimum_pension_contributions.minimum_contributions.member,
            rate: assumptions.employement_minimum_pension_contributions.minimum_contributions.employer,
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

export default EmploymentMinimumPensionContributions;
