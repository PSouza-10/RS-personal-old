import { css } from "styled-components";

export default css`
  .react-date-picker {
    display: inline-flex;

    color: var(--white-fade);

    width: 100%;
    position: relative;
    cursor: text;
    transition: all 0.3s ease;
  }

  .react-date-picker,
  .react-date-picker *,
  .react-date-picker *:before,
  .react-date-picker *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .react-date-picker--disabled {
    background-color: #f0f0f0;
    color: #6d6d6d;
  }
  .react-date-picker__wrapper {
    display: flex;
    flex-grow: 1;
    flex-shrink: 0;
    border-bottom: 1px solid var(--white-fade);
    /* padding-bottom: calc(var(--input-base) * 1); */
    transition: all 0.3s ease;
  }
  .react-date-picker__wrapper::after {
    content: "";
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    background-color: var(--primary);
    transform: scaleX(0);
    transform-origin: left;
    transition: all 0.3s ease-in;
  }
  .react-date-picker__wrapper:focus-within::after {
    transform: scaleX(1);
  }

  .react-date-picker__inputGroup {
    min-width: calc((4px * 3) + 0.54em * 8 + 0.217em * 2);
    flex-grow: 1;
    padding: 0 2px;
    box-sizing: content-box;
  }
  .react-date-picker__inputGroup__divider {
    padding: 1px 0;
    white-space: pre;
  }
  .react-date-picker__inputGroup__input {
    min-width: 0.54em;
    height: 100%;
    position: relative;
    padding: 0 1px;
    font-size: 1em;
    border: 0;
    background: none;

    box-sizing: content-box;
    -moz-appearance: textfield;
    color: var(--white-fade);
    transition: color 0.3s ease;
  }

  .react-date-picker__inputGroup__input::-webkit-outer-spin-button,
  .react-date-picker__inputGroup__input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .react-date-picker__inputGroup__input:invalid {
    background: rgba(255, 0, 0, 0.1);
  }

  .react-date-picker__inputGroup__input--hasLeadingZero {
    margin-left: -0.54em;
    padding-left: calc(1px + 0.54em);
  }
  .react-date-picker__button {
    border: 0;
    background: transparent;
    padding: 4px 6px;
  }
  .react-date-picker__button svg {
    height: 19px;
    width: 19px;
    transition: all 0.2s ease;
  }
  .react-date-picker__button:enabled {
    cursor: pointer;
  }
  .react-date-picker__button:enabled svg {
    stroke: var(--white-fade);
    fill: var(--white-fade);
  }
  .react-date-picker__wrapper:focus-within svg,
  .react-date-picker__button:enabled:hover svg,
  .react-date-picker__button:enabled:focus svg {
    stroke: var(--primary);
    fill: var(--primary);
  }

  .react-date-picker__button:disabled .react-date-picker__button__icon {
    stroke: var(--white-fade);
  }
  .react-date-picker__button svg {
    display: inherit;
  }
  .react-date-picker__calendar {
    width: 350px;
    max-width: 100vw;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1;
  }
  .react-date-picker__calendar--closed {
    display: none;
  }
  .react-date-picker__calendar .react-calendar {
    border-width: thin;
  }
`;
