import styled from "styled-components";
import { Checkbox, CheckBoxProps } from "../Checkbox";

export interface CheckOption extends CheckBoxProps {
  onCheck?: (checked: boolean) => any;
}
export interface CheckListProps {
  options: CheckOption[];
  onOptionChange: (idx: number, checked: boolean) => any;
}

const Container = styled.fieldset`
  display: flex;
  flex-direction: column;

  border: none;
  gap: 1em;
`;
export const CheckList: React.FC<CheckListProps> = ({
  options,
  onOptionChange,
}) => {
  return (
    <Container className="checkList-container">
      {options.map(({ onCheck, ...props }, idx) => (
        <Checkbox
          onCheck={(newChecked) => onOptionChange(idx, newChecked)}
          label={props.label}
          checked={props.checked}
          name="carlos"
          key={idx}
          id={idx.toString()}
        />
      ))}
    </Container>
  );
};
