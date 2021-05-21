import { SetStateAction } from "react";
import styled from "styled-components";
import { Dropdown } from "../Dropdown";
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
export interface TimePassedProps extends InputProps {
  setValue: React.Dispatch<SetStateAction<string>>;
  value: string;
}
export const TimePassed: React.FC<TimePassedProps> = ({
  name,
  value,
  label,
  setValue,
}) => {
  const inputName = `${name}-timePassed-input`;
  const selectName = `${name}-timePassed`;
  const handleValueChanged = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    field: "select" | "input"
  ) => {
    const newValue = e.target.value;
    let [currentNumber, currentSpan] = value.split(" ");
    let newStr = "";
    console.log(e);
    if (field === "input") {
      newStr = `${newValue} ${currentSpan}`;
    } else {
      newStr = `${currentNumber} ${newValue}`;
    }
    setValue(newStr);
  };

  return (
    <Container>
      <FormField
        type="number"
        label={label}
        onChange={(e) => handleValueChanged(e, "input")}
        name={inputName}
        value={value.split(" ")[0]}
      />
      <Dropdown
        name={selectName}
        defaultValue={value.split(" ")[1]}
        onChange={(e) => handleValueChanged(e, "select")}
        options={[
          {
            value: "Dias",
            label: "Dias",
          },

          {
            value: "Meses",
            label: "Meses",
          },

          {
            value: "Anos",
            label: "Anos",
          },
        ]}
      ></Dropdown>
    </Container>
  );
};
