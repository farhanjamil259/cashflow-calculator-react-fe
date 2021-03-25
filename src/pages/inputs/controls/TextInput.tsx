import { Input } from "antd";
import React from "react";

interface IInputProps {
  onBlur: (e: any) => void;
  value?: String;
  placeholder?: string;
}

const TextInput: React.FC<IInputProps> = ({ onBlur, placeholder, value }) => {
  return <Input placeholder={placeholder} onBlur={(e) => onBlur(e.target.value)} defaultValue={`${value}`} />;
};

export default TextInput;
