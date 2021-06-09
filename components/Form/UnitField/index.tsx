import { SetStateAction } from "react";
import styled from "styled-components";
import { Dropdown, DropdownOption } from "../Dropdown";
import { FormField, InputProps } from "../Input";
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;

  .input-container {
    margin: 0 0;
    width: 10%;
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button,
    input[type="number"] {
      -webkit-appearance: none;
      -moz-appearance: textfield;
    }
  }
  .dropdown {
    align-self: flex-end;
  }
`;
export interface UnitFieldProps extends InputProps {
  setValue: React.Dispatch<SetStateAction<string>>;
  value: string;
  unit: DropdownOption[];
}
export const UnitField: React.FC<UnitFieldProps> = ({
  name,
  value,
  label,
  unit,
  setValue,
}) => {
  const handleValueChanged = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    field: "select" | "input"
  ) => {
    const newValue = e.target.value;
    let [currentNumber, currentUnit] = value.split(" ");
    let newStr = "";
    console.log(e);
    if (field === "input") {
      newStr = `${newValue} ${currentUnit}`;
    } else {
      newStr = `${currentNumber} ${newValue}`;
    }
    setValue(newStr);
  };

  return (
    <Container className="unitInput">
      <FormField
        type="number"
        label={label}
        onChange={(e) => handleValueChanged(e, "input")}
        name={`${name}-unit-input`}
        value={value.split(" ")[0]}
      />
      <Dropdown
        name={`${name}-unit-select`}
        defaultValue={value.split(" ")[1]}
        onChange={(e) => handleValueChanged(e, "select")}
        options={unit}
      />
    </Container>
  );
};
