import styled, { css } from "styled-components";
import calendar from "./calendar";
import datepicker from "./datepicker";

export const Container = styled.div`
  width: 90%;
  margin: 0 5%;
  position: relative;
  margin-top: 40px;
  font-size: 0.75em;
  label {
    color: var(--white-fade);

    transition: color 0.3s ease;
    font-size: 1em;
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

  ${calendar}
  ${datepicker}
`;
