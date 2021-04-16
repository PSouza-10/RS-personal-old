import { Container } from "./style";
import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  onCheck: (checked: boolean) => any;
  label: string | JSX.Element;
  [x: string]: any;
}

export const Checkbox: React.FC<Props> = ({
  checked,
  onCheck,
  label,
  name,
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
        name={name}
        onChange={handleChange}
        checked={checked}
        {...otherProps}
      />
      <label className="checkbox" htmlFor={otherProps.id}></label>
      <label htmlFor={otherProps.id}>{label}</label>
    </Container>
  );
};
