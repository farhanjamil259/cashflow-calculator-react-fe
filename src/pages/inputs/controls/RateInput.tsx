import { InputNumber } from "antd";
import React from "react";
interface Props {
  onBlur: (e: any) => void;
  value: string;
}

const RateInput: React.FC<Props> = ({ onBlur, value }) => {
  return (
    <InputNumber
      min={0}
      max={100}
      precision={2}
      formatter={(value) => `${value}%`}
      parser={(value: any) => value!.replace("%", "")}
      value={`${+value * 100}`}
      className="custom-input-fields"
      onBlur={(e) => {
        onBlur(parseFloat(e.target.value.replace("%", "")) / 100);
      }}
    />
  );
};

export default RateInput;
