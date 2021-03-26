import { InputNumber } from "antd";
import React from "react";
import { pound } from "../../../components/currencySumbol";

interface Props {
  onBlur: (e: any) => void;
  value: string;
}

const MoneyInput: React.FC<Props> = ({ onBlur, value }) => {
  return (
    <div>
      <InputNumber
        formatter={(value) => `${pound}${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        // parser={(value) => value!.replace(/£\s?|(,*)/g, "")}
        value={value}
        className="custom-input-fields"
        onBlur={(e) => onBlur(e.target.value.replace(/£\s?|(,*)/g, ""))}
      />
    </div>
  );
};
export default MoneyInput;
