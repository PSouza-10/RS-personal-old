import { css } from "styled-components";

export default css`
  .react-calendar {
    width: 350px;
    max-width: 100%;
    background: #333333;
    font-family: "Titillium Web", sans-serif;
    line-height: 1.125em;
  }
  .react-calendar--doubleView {
    width: 700px;
  }
  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }
  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }
  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }
  .react-calendar button:enabled:hover {
    cursor: pointer;
  }
  .react-calendar__navigation {
    height: 44px;
  }
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
    color: white;
    text-transform: capitalize;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #2224;
  }
  .react-calendar__navigation button[disabled] {
    background-color: transparent;
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
  }
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
    color: white;
  }
  .react-calendar__month-view__weekNumbers {
    font-weight: bold;
  }
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    padding: calc(0.75em / 0.75) calc(0.5em / 0.75);
  }
  .react-calendar__tile {
    color: #fff;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #d10000;
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #757575;
  }
  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }
  .react-calendar__tile {
    max-width: 100%;
    text-align: center;
    padding: 0.75em 0.5em;
    background: none;
    text-transform: capitalize;
  }
  .react-calendar__tile:disabled {
    background-color: none;
  }

  /* Day hover*/
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #2224;
  }
  .react-calendar__tile--now {
    position: relative;
  }
  .react-calendar__tile--now:after {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top: 5px solid var(--primary);
  }
  .react-calendar button:disabled {
    opacity: 0;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #2224;
  }

  .react-calendar__tile--hasActive {
    background: #f26e2c;
    color: white;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #f26e2c;
  }
  .react-calendar__tile--active {
    background: #f26e2c;
    color: white;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #f26e2c;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #2224;
  }
`;
