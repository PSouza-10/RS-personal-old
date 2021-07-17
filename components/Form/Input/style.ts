import styled from "styled-components";
interface IContainer {
  valid?: boolean;
  isFocused: boolean;
  numOfItems: number;
}
export const Container = styled.div<IContainer>`
  display: flex;
  width: 90%;
  margin: 0 5%;
  align-items: flex-end;
  flex-wrap: wrap;
  font-size: 1em;
  position: relative;
  caret-color: ${({ valid }) => (valid ? "var(--primary)" : "var(--error)")};
  ul {
    visibility: ${({ isFocused }) => (isFocused ? "visible" : "hidden")};
    opacity: ${({ isFocused }) => (isFocused ? "1" : "0")};
    position: absolute;
    right: 0;
    z-index: 2;
    list-style: none;
    overflow: hidden;
    background-color: var(--bgContrast);
    transition: all 0.3s ease;
    height: ${({ numOfItems }) => numOfItems * 1.4 + "em"};
    /* bottom: ${({ numOfItems }) => "-" + numOfItems * 1.4 + "em"}; */
    top: 101%;
  }
  li {
    height: 1em;
    padding: 0.1em;
    font-size: 0.9em;
  }
  .valid {
    color: var(--success);
  }
  .invalid {
    color: var(--error);
  }
  .input-icon {
    flex-shrink: 0;
    height: 1.2em;
    width: 1.2em;
    margin-right: 0.4em;
    fill: ${({ valid }) => (valid ? "var(--primary)" : "var(--error)")};
    cursor: pointer;
  }
  .subtitle {
    color: #fff8;
    flex-basis: 100%;
    padding-left: 2.2em;
    font-size: 0.6em;
  }
`;

export const FormFieldContainer = styled.div<{ padding: number }>`
  flex: 1;
  height: 2.2em;

  color: white;
  position: relative;

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 0s ease-in-out 5000000s;
    -webkit-text-fill-color: white !important;
  }
  input {
    background-color: rgba(0, 0, 0, 0) !important;
    -webkit-background-color: rgba(0, 0, 0, 0) !important;
    -webkit-box-shadow: 0 0 0 30px rgba(0, 0, 0, 0) inset !important;
    outline: none;
    box-shadow: none;
    border: none;
    width: 100%;
    position: absolute;
    bottom: 0.2em;

    /* height: calc(100% - (var(--input-base) * 3.7)); */
    padding-top: 0.3em;
    /* padding-top: calc((var(--input-base) * 3.6)); */

    font-size: 1em;
    color: white;
    padding-right: ${({ padding }) => `${padding * 1.2}em`};
  }
  .field-label {
    position: absolute;
    pointer-events: none;
    bottom: 0;
    left: 0;
    font-size: 0.9em;
    width: 100%;
    height: 100%;
    border-bottom: 1px solid #fff8;
  }
  .field-label::after {
    content: "";
    position: absolute;
    height: 101%;
    width: 100%;
    border-bottom: 3px solid ${({ color }) => color};
    left: 0;
    bottom: -1px;
    transform: scaleX(0);
    transition: transform 0.3s ease-in;
    transform-origin: right;
  }
  .field-content-name {
    font-size: 1em;
    position: absolute;
    color: #fff8;
    bottom: calc(var(--input-base) * 0.4);
    left: 0;
    transition: all 0.3s ease;
  }
  .field-content-length {
    font-size: 1em;
    position: absolute;
    bottom: calc(var(--input-base) * 0.4);
    right: 0.1em;
  }
  .visible-icon {
    position: absolute;
    flex-shrink: 0;
    height: 1em;
    width: 1em;
    right: ${({ padding }) => (padding === 2 ? "1em" : "0")};
    bottom: calc(var(--input-base) * 0.8);
    fill: ${({ color }) => color};
    cursor: pointer;
  }
  input:focus + .field-label .field-content-name,
  input:valid + .field-label .field-content-name,
  input:not([value=""]) + .field-label .field-content-name,
  input:placeholder-shown + .field-label .field-content-name {
    transform: translateY(-2em);
    bottom: 0;
    font-size: 0.75em;
    color: ${({ color }) => color};
  }
  input:focus + .field-label {
    /* border-color: ${({ color }) => color}; */
    border: none;
  }
  input:focus + .field-label::after {
    transform: scaleX(1);
    transform-origin: left;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }
`;
