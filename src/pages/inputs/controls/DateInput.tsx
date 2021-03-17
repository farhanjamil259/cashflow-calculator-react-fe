import { DatePicker } from "antd";
import React from "react";

const DateInput = () => {
  return (
    <DatePicker picker="year" className="custom-input-fields" onChange={(date: any, dateString: any) => {}} />
  );
};

export default DateInput;
