import { InputNumber } from "antd";
import React from "react";

const RateInput = () => {
  return (
    <InputNumber
      min={0}
      max={100}
      formatter={(value) => `${value}%`}
      parser={(value: any) => value!.replace("%", "")}
      className="custom-input-fields"
      onBlur={(e) => {}}
    />
  );
};

export default RateInput;
