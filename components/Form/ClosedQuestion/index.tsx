import { SetStateAction } from "react";
import styled, { css } from "styled-components";

const Container = styled.div<{ nItems: number }>`
  display: flex;
  gap: 1em;
  flex-direction: column;
  flex: 1;
  height: 100%;

  button {
    background-color: var(--bgContrast);
    font-size: clamp(19px, 2em, 22px);
    text-align: center;
    white-space: normal;
    transition: all 0.2s ease;
    padding: 0.6em 0.6em;
    font-weight: 500;
    border: none;
    cursor: pointer;
    color: var(--fg);
    &.selected-opt {
      outline: 2px solid var(--primary);
      color: var(--primary);
    }
  }
  /* ${({ nItems }) =>
    nItems % 2 !== 0 &&
    css`
      button:first-child,
      button:last-child {
        grid-column: 1 / -1;
      }
    `} */
`;

export interface ClosedQuestionOption
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  value: any;
  onValueChange?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: any
  ) => any;
  label: string;
}
export interface ClosedQuestionProps {
  options: ClosedQuestionOption[];
  setValue: React.Dispatch<SetStateAction<any>> | ((val: any) => any);
  currentValue: any;
}
export const ClosedQuestion: React.FC<ClosedQuestionProps> = ({
  options,
  setValue,
  currentValue,
}) => {
  return (
    <Container nItems={options.length} className="closed-question-container">
      {options.map(({ label, value, onValueChange, ...props }, idx) => (
        <button
          onClick={(e) => {
            setValue(value);
            onValueChange && onValueChange(e, value);
          }}
          className={currentValue === value ? "selected-opt" : ""}
          {...props}
          key={idx}
        >
          {label}
        </button>
      ))}
    </Container>
  );
};
