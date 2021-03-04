import { Table } from "antd";
import React, {Fragment} from "react";

import {RootStateOrAny, useSelector} from "react-redux";
import IInputs from "../../../../interfaces/IInputs";

const OtherIncome = () => {
    const inputs: IInputs = useSelector(
        (state: RootStateOrAny) => state.currentInputSetReducer
    );

    // Other Taxable Income
    const columnsTaxable: any = [
        {
            dataIndex: "other_taxable",
        },
        {
            dataIndex: "gross_annual_amount",
        },
    ];

    const dataTaxable = inputs.household_income.other_income.other_taxable_income;

    // Other Non-Taxable Income
    const columnsNonTaxable: any = [
        {
            dataIndex: "other_non_taxable",
        },
        {
            dataIndex: "gross_annual_amount",
        },
    ];

    const dataNonTaxable =
        inputs.household_income.other_income.other_non_taxable_income;

    return (
        <Fragment>
            <Table
                size="small"
                columns={columnsTaxable}
                dataSource={dataTaxable}
                showHeader={false}
                pagination={false}
                bordered={false}
            />
            <Table
                size="small"
                columns={columnsNonTaxable}
                dataSource={dataNonTaxable}
                showHeader={false}
                pagination={false}
                bordered={false}
            />
        </Fragment>
    );
};

export default OtherIncome;
