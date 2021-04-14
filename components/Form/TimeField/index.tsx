import React, { ReactElement, useState } from "react";
import { OnChangeTimeCallback } from "react-clock";
import TimePicker from "react-time-picker/dist/entry.nostyle";
import { MdAccessTime } from "react-icons/md";
import { CloseClock, Container } from "./style";
import format from "date-fns/format";
interface ITimeField {
  label: string;
  value: string;
  icon?: ReactElement;
  onChange: OnChangeTimeCallback;
  id?: string;
  name?: string;
}

const ariaLabels = {
  dayAriaLabel: "Digite um dia",
  monthAriaLabel: "Digite um mês",
  yearAriaLabel: "Digite um ano",
  calendarAriaLabel: "Selecionar no calendário",
  clearAriaLabel: "Limpar data selecionada",
  navigationAriaLabel: "Próximo nível",
  nextAriaLabel: "Próximo período",
  next2AriaLabel: "Pular para frente",
  prevAriaLabel: "Período anterior",
  prev2AriaLabel: "Pular para trás",
};
export const TimeField: React.FC<ITimeField> = ({
  value,
  label,
  onChange,
  icon,
  id,
  name,
}) => {
  const [clockIsOpen, setIsOpen] = useState(false);
  const handleClock = () => {
    const newVal = !clockIsOpen;
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
  const maxTime = format(new Date(), "hh:mm");

  return (
    <Container className="timeWrapper">
      {icon &&
        React.cloneElement(icon, {
          className: "timeField-icon",
        })}
      <span className="clock-input">
        <label htmlFor={id}>{label}</label>
        <TimePicker
          format="HH:mm"
          onChange={onChange}
          onClockOpen={handleClock}
          onClockClose={handleClock}
          value={value}
          name={name}
          nativeInputAriaLabel={label}
          locale="pt-br"
          isOpen={clockIsOpen}
          maxDetail="minute"
          clockIcon={
            <MdAccessTime className="react-time-picker__button__icon" />
          }
        />
      </span>
    </Container>
  );
};
