import { SetStateAction } from "react";
import styled, { css } from "styled-components";

const Container = styled.div<{ nItems: number }>`
  display: grid;
  gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  align-items: center;
  flex: 1;
  height: 100%;
  justify-content: center;
  button {
    background-color: var(--bgContrast);
    font-size: 2em;
    text-align: center;
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
    <Container nItems={options.length}>
      {options.map(({ label, value, ...props }, idx) => (
        <button
          onClick={() => setValue(value)}
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
