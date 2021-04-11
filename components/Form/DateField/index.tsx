import React, { ReactElement, useRef, useState } from "react";
import { OnChangeDateCallback } from "react-calendar";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { MdEvent } from "react-icons/md";
import { CloseCalendar, Container } from "./style";

interface IDateField {
  label: string;
  value: Date;
  icon?: ReactElement;
  onChange: OnChangeDateCallback;
}
export const DateField: React.FC<IDateField> = ({
  value,
  label,
  onChange,
  icon,
}) => {
  const [calendarIsOpen, setIsOpen] = useState(false);
  const handleCalendar = () => {
    const newVal = !calendarIsOpen;
    setIsOpen(newVal);
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    if (vw >= 768) {
      const newOverflow = newVal ? "hidden" : "initial";
      document.body.style.overflowY = newOverflow;
    }
  };

  const datePickerRef = useRef(null);

  const focus = () => datePickerRef.current && datePickerRef.current.focus();
  return (
    <Container className="dateWrapper">
      {icon &&
        React.cloneElement(icon, {
          onClick: focus,
          className: "dateField-icon",
        })}
      <span className="calendar-input">
        <label htmlFor={label.replace(" ", "")} ref={datePickerRef}>
          {label}
        </label>
        <DatePicker
          onChange={onChange}
          onCalendarOpen={handleCalendar}
          onCalendarClose={handleCalendar}
          value={value}
          name={label.replace(" ", "")}
          locale="pt-br"
          isOpen={calendarIsOpen}
          maxDate={new Date()}
          calendarIcon={<MdEvent />}
        />
      </span>
      <CloseCalendar visible={calendarIsOpen} onClick={handleCalendar} />
    </Container>
  );
};
