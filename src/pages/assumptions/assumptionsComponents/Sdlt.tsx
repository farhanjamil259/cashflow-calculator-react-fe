import { Table, Typography } from "antd";
import React from "react";
import IAssumptions from "../../../interfaces/IAssumptions";
import { RootStateOrAny, useSelector } from "react-redux";

// @ts-ignore
import CurrencyFormat from "react-currency-format";
import { Fragment } from "react";
import {firstColumnWidth, secondColumnWidth, thirdColumnWidth} from "../AssumptionsCommonVariable";

const { Text } = Typography;

const Sdlt = () => {
  const assumptions: IAssumptions = useSelector(
    (state: RootStateOrAny) => state.assumptionReducer
  );

  const Column = [
    {
      title: "SDLT Thresholds",
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
      dataIndex: "taxrate",
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
      name: "Up to first threshold",
      threshold: assumptions.sdlt_thresholds.c5.threshold,
      taxrate: assumptions.sdlt_thresholds.c5.taxrate,
      key: "1",
    },
    {
      name: "Up to second threshold",
      threshold: assumptions.sdlt_thresholds.c6.threshold,
      taxrate: assumptions.sdlt_thresholds.c6.taxrate,
      key: "2",
    },
    {
      name: "Up to third threshold",
      threshold: assumptions.sdlt_thresholds.c7.threshold,
      taxrate: assumptions.sdlt_thresholds.c7.taxrate,
      key: "3",
    },
    {
      name: "Up to fourth threshold",
      threshold: assumptions.sdlt_thresholds.c8.threshold,
      taxrate: assumptions.sdlt_thresholds.c8.taxrate,
      key: "4",
    },
    {
      name: "The remaining amount",
      threshold: assumptions.sdlt_thresholds.c9.threshold,
      taxrate: assumptions.sdlt_thresholds.c9.taxrate,
      key: "5",
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

export default Sdlt;
