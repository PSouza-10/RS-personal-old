import { css } from "styled-components";

export default css`
  .react-time-picker {
    display: inline-flex;
    position: relative;

    color: var(--white-fade);

    width: 100%;

    transition: all 0.3s ease;
  }
  .react-time-picker,
  .react-time-picker *,
  .react-time-picker *:before,
  .react-time-picker *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .react-time-picker--disabled {
    background-color: #f0f0f0;
    color: #6d6d6d;
  }
  .react-time-picker__wrapper {
    display: flex;
    flex-grow: 1;
    flex-shrink: 0;

    border-bottom: 1px solid var(--white-fade);
    /* padding-bottom: calc(var(--input-base) * 1); */
    transition: all 0.3s ease;
  }
  .react-time-picker__wrapper::after {
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
  .react-time-picker__wrapper:focus-within::after {
    transform: scaleX(1);
  }
  select {
    border: none !important;
    outline: none !important;
  }
  .react-time-picker__inputGroup {
    min-width: calc((4px * 3) + 0.54em * 6 + 0.217em * 2);
    flex-grow: 1;
    padding: 0 2px;
    box-sizing: content-box;
  }
  .react-time-picker__inputGroup__divider {
    padding: 1px 0;
    white-space: pre;
    color: var(--white-fade);
  }
  .react-time-picker__inputGroup__input {
    min-width: 0.54em;
    height: 100%;
    position: relative;
    padding: 0 1px;
    border: 0;
    background: none;
    font: inherit;
    font-size:1em;
    color: inherit;
    box-sizing: content-box;
    -moz-appearance: textfield;
  }
  .react-time-picker__inputGroup__input::-webkit-outer-spin-button,
  .react-time-picker__inputGroup__input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .react-time-picker__inputGroup__input:invalid {
    background: rgba(255, 0, 0, 0.1);
  }
  .react-time-picker__inputGroup__input--hasLeadingZero {
    margin-left: -0.54em;
    padding-left: calc(1px + 0.54em);
  }
  .react-time-picker__inputGroup__amPm {
    font: inherit;
    -moz-appearance: menulist;
  }
  .react-time-picker__button {
    border: 0;
    background: transparent;
    padding: 4px 6px;
  }
  .react-time-picker__button:focus {
    outline: 1px dotted var(--primary);
  }
  .react-time-picker__button:enabled {
    cursor: pointer;
  }
  .react-time-picker__button:enabled:hover .react-time-picker__button__icon,
  .react-time-picker__button:enabled:focus .react-time-picker__button__icon {
    stroke: var(--primary);
    fill: var(--primary);
  }

  .react-time-picker__button svg {
    display: inherit;
    fill: var(--white-fade);
    stroke: var(--white-fade);
    height: 19px;
    width: 19px;
    transition: all 0.2s ease;
  }
  .react-time-picker__clock {
    width: 200px;
    height: 200px;
    max-width: 100vw;
    padding: 25px;

    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1;
  }
  .react-time-picker__clock--closed {
    display: none;
  }
`;
