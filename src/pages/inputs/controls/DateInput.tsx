import { DatePicker } from "antd";
import React from "react";
import moment from "moment";

interface IInputProps {
  onBlur: (date: any, dateString: any) => void;
  value?: String;
}

const DateInput: React.FC<IInputProps> = ({ onBlur, value }) => {
  return (
    <DatePicker
      picker="year"
      className="custom-input-fields"
      onChange={(date, dateString) => {
        onBlur(date, dateString);
      }}
      value={moment(`${value}`, "YYYY")}
    />
  );
};

export default DateInput;
