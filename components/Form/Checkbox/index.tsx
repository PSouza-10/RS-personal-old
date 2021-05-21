import { Container } from "./style";
import React from "react";

export interface CheckBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;

  label: string | JSX.Element;
  [x: string]: any;
}
export interface CheckBoxPropsWithOnChecked extends CheckBoxProps {
  onCheck: (checked: boolean) => any;
}
export const Checkbox: React.FC<CheckBoxPropsWithOnChecked> = ({
  checked,
  onCheck,
  label,

  ...otherProps
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    onCheck(value);
  };
  return (
    <Container className="checkbox-container">
      <input
        type="checkbox"
        onChange={handleChange}
        checked={checked}
        {...otherProps}
      />
      <label className="checkbox" htmlFor={otherProps.id}></label>
      <label htmlFor={otherProps.id}>{label}</label>
    </Container>
  );
};
