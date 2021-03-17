import { Input } from "antd";
import React from "react";

interface IInputProps {
  placeholder?: string;
}

const TextInput = (props: IInputProps) => {
  return <Input placeholder={props.placeholder} />;
};

export default TextInput;
