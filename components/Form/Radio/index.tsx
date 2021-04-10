import { ChangeEventHandler } from "react";
import { Radio, RadioGroupContainer } from "./style";
interface IRadio extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const RadioInput: React.FC<IRadio> = ({
  name,
  id,
  value,
  label,
  onChange,
  ...props
}) => {
  return (
    <Radio htmlFor={id} className={"radioGroup"}>
      <input
        type="radio"
        onChange={onChange}
        name={name}
        id={id}
        value={value}
        {...props}
      />
      <span className="circle">
        <em className="dot"></em>
      </span>
      <h4>{label}</h4>
    </Radio>
  );
};

interface IRadioGroup {
  options: IRadio[];
  name: string;
  radioLabel: string;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const RadioGroup: React.FC<IRadioGroup> = ({
  options,
  name,
  radioLabel,
  className,
  onChange,
}) => {
  return (
    <RadioGroupContainer className={className}>
      <h4>{radioLabel}</h4>
      {options.map(({ id, value, label, checked }) => (
        <RadioInput
          {...{ name, id, value, label, onChange, checked }}
          key={id}
        />
      ))}
    </RadioGroupContainer>
  );
};
