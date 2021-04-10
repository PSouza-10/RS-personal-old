import React from "react";
import { OnChangeDateCallback } from "react-calendar";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { MdEvent } from "react-icons/md";
import { Container } from "./style";

interface IDateField {
  label: string;
  value: Date;
  onChange: OnChangeDateCallback;
}
export const DateField: React.FC<IDateField> = ({ value, label, onChange }) => {
  return (
    <Container className="dateWrapper">
      <label htmlFor={label.replace(" ", "")}>{label}</label>
      <DatePicker
        onChange={onChange}
        value={value}
        name={label.replace(" ", "")}
        locale="pt-br"
        maxDate={new Date()}
        calendarIcon={<MdEvent />}
      />
    </Container>
  );
};
