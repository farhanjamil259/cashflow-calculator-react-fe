import { InputNumber } from "antd";
import React from "react";
import { pound } from "../../../components/currencySumbol";

const MoneyInput = () => {
  return (
    <InputNumber
      formatter={(value) => `${pound}${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      parser={(value) => value!.replace(/£\s?|(,*)/g, "")}
      className="custom-input-fields"
      onBlur={(e) => {}}
    />
  );
};

export default MoneyInput;
