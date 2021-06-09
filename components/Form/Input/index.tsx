import React, { ReactElement } from "react";
import { useState } from "react";
import { FormFieldContainer, Container } from "./style";
import handleValidate, { IValid } from "./validate";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import InputMask from "react-input-mask";
export interface ValidationProp {
  validIf?: string;
  min?: number;
  max?: number;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactElement;
  subtitle?: string;
  validate?: ValidationProp;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, valid?: boolean) => any;
  useCounter?: boolean;
  useVisibility?: boolean;
  testId?: string;
  mask?: string | RegExp;
  [x: string]: any;
}

export const FormField: React.FC<InputProps> = ({
  label = "",
  name = "",
  icon = null,
  subtitle = "",
  validate = {},
  onChange,
  value,
  onBlur,
  onFocus,
  useCounter = false,
  useVisibility = false,
  testId = "",
  mask,
  ...inputProps
}) => {
  const [isFocused, setFocused] = useState(false);
  const [validity, setValidity] = useState<IValid>({
    isValid: true,
    stringHas: {},
  });
  const [length, setLength] = useState(
    value && typeof value !== "number" ? value.length : 0
  );
  const [passwordVisible, setPasswordVisible] = useState(false);

  const messages: { [x: string]: string | null } = {
    symbols: "Deve conter símbolos como: &, *, #, etc.",
    digits: "Deve conter digitos de 0 a 9.",
    upper: "Deve conter letras maiúsculas",
    lower: "Deve conter letras minúsculas",
    nospace: "Não pode conter espaços",
    email:
      "Endereço de email " +
      (validity?.stringHas?.email ? "válido" : "inválido"),
    phone: "Número " + (validity?.stringHas?.phone ? "válido" : "inválido"),
    min: validate.min ? "Mínimo de " + validate.min + " caracteres" : null,
    max: validate.max ? "Máximo de " + validate.max + " caracteres" : null,
  };

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const focus = () => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  };
  const toggleVisible = () => {
    if (inputRef.current !== null) {
      if (inputRef.current.type === "password") {
        setPasswordVisible(true);
        inputRef.current.type = "text";
      } else {
        setPasswordVisible(false);

        inputRef.current.type = "password";
      }
    }
  };
  const visibleIcon = passwordVisible ? (
    <IoMdEyeOff className="visible-icon" onClick={toggleVisible} />
  ) : (
    <IoMdEye className="visible-icon" onClick={toggleVisible} />
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (useCounter) {
      setLength(e.target.value.length);
    }
    let newValidity: null | IValid = null;
    let inputIsValid = null;
    if (Object.keys(validate).length > 0) {
      const val =
        inputProps.type === "number"
          ? parseInt(e.target.value)
          : e.target.value;
      newValidity = handleValidate(val, validate, validity);
      if (validity) {
        setValidity(newValidity);
        inputIsValid = newValidity === null ? null : newValidity.isValid;
      }
    }
    onChange && onChange(e, inputIsValid);
  };
  const inputPadding = (useCounter ? 1 : 0) + (useVisibility ? 1 : 0);
  const numOfvalidationItems = Object.keys(validity.stringHas || {}).length;
  const nativeInputProps = {
    name,
    required: true,
    value,
    onChange: handleChange,
    autoComplete: "off",
    onFocus: (e) => {
      setFocused(true);
      onFocus && onFocus(e);
    },
    onBlur: (e) => {
      setFocused(false);
      onBlur && onBlur(e);
    },
    ref: inputRef,
    "data-testid": testId,
    ...inputProps,
  };
  return (
    <Container
      isFocused={isFocused}
      valid={validity.isValid}
      numOfItems={numOfvalidationItems}
      className="input-container"
    >
      {icon &&
        React.cloneElement(icon, { className: "input-icon", onClick: focus })}
      <FormFieldContainer
        color={validity.isValid ? "var(--primary)" : "var(--error)"}
        padding={inputPadding}
      >
        {inputProps.type === "tel" || mask ? (
          <InputMask
            mask={mask || "+55 99 99999-9999"}
            maskChar=" "
            {...nativeInputProps}
          />
        ) : (
          <input {...nativeInputProps} />
        )}
        <label htmlFor={inputProps.id} className="field-label">
          <span className="field-content-name">{label}</span>
          {useCounter && <span className="field-content-length">{length}</span>}
        </label>
        {useVisibility && visibleIcon}
      </FormFieldContainer>
      {subtitle && <span className="subtitle">{subtitle}</span>}
      {validity.stringHas !== {} && validate !== {} && (
        <ul>
          {validity.stringHas &&
            Object.keys(validity.stringHas).map((has) =>
              messages[has] ? (
                <li
                  key={has}
                  className={
                    validity?.stringHas &&
                    (validity.stringHas[has] ? "valid" : "invalid")
                  }
                >
                  {messages[has]}
                </li>
              ) : null
            )}
        </ul>
      )}
    </Container>
  );
};
