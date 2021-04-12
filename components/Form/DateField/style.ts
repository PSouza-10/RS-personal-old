import { MdClose } from "react-icons/md";
import styled, { css } from "styled-components";
import calendar from "./calendar";
import datepicker from "./datepicker";
export const CloseCalendar = styled(MdClose)<{ visible: boolean }>`
  height: 2em;
  width: 2em;
  cursor: pointer;
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  &:hover {
    fill: var(--primary);
  }

  position: fixed;
  bottom: 3rem;
  right: 1rem;
  z-index: 7;
`;
export const Container = styled.div`
  width: 90%;
  margin: 0 5%;
  position: relative;
  margin-top: 40px;
  display: flex;

  font-size: 0.75em;
  label {
    color: var(--white-fade);

    transition: color 0.3s ease;
    font-size: 0.7em;
  }
  .dateField-icon {
    flex-shrink: 0;
    height: 1.2em;
    width: 1.2em;
    margin-right: 0.4em;
    fill: var(--primary);
    align-self: center;
    cursor: pointer;
  }
  .calendar-input {
    flex: 1;
  }
  &:focus-within &__wrapper {
    border-bottom: 2px solid #f26e2c;
  }
  &:focus-within .react-date-picker {
    color: #fff;
  }
  &:focus-within label {
    color: #f26e2c;
  }
  &:focus-within .react-date-picker__inputGroup__input {
    color: #fff;
  }
  ${CloseCalendar} {
    display: none;
  }
  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}) {
      .react-date-picker__calendar {
        z-index: 6 !important;
      }
      .react-calendar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: auto !important;
      }
      ${CloseCalendar} {
        display: block;
      }
    }
  `}
  ${calendar}
  ${datepicker}
`;
