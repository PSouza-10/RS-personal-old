import { MdKeyboardArrowDown } from "react-icons/md";
import styled from "styled-components";

const Container = styled.div`
  position: relative;

  * {
    transition: all 0.2s ease;
  }
  select {
    background-color: var(--bg);
    font-size: 1em;
    width: 5em;
    color: var(--fg);
    font-weight: 400;
    box-shadow: none;
    border: 1px solid var(--white-fade);
    outline: var(--primary);

    &:hover {
      border: 1px solid var(--primary) !important;
    }
    &:hover + .select-arrow svg {
      fill: var(--primary);
    }
    option:hover {
      background-color: var(--primary);
    }
  }
  .select-arrow {
    position: absolute;
    right: 1px;
    top: 1px;
    bottom: 1px;
    min-width: 20px;
    display: flex;
    align-items: center;
    svg {
      height: 1.2em;
      width: 1.2em;
      fill: var(--white-fade);
    }
    pointer-events: none;
    background-color: var(--bg);
  }
`;
export interface DropdownOption
  extends React.DetailedHTMLProps<
    React.OptionHTMLAttributes<HTMLOptionElement>,
    HTMLOptionElement
  > {
  label: string;
}

interface DropdownProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  options: DropdownOption[];
}
export const Dropdown: React.FC<DropdownProps> = ({ options, ...props }) => {
  return (
    <Container className="dropdown">
      <select {...props}>
        {options.map(({ label, ...optProps }, idx) => (
          <option {...optProps} key={idx}>
            {label}
          </option>
        ))}
      </select>
      <span className="select-arrow">
        <MdKeyboardArrowDown />
      </span>
    </Container>
  );
};
