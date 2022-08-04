import React from "react";
import styled from "styled-components";
import Calendar from "../calendar/Calendar";

type Props = {
  today: Date;
  initialCheckIn: Date | undefined;
  initialCheckOut: Date | undefined;
  initialMonthDate: Date;
  handleChangeCheckInOut?: (checkIn?: Date, checkOut?: Date) => void;
  handleChangeMonthDate?: (date: Date) => void;
};

const CalendarModal = ({
  today,
  initialCheckIn,
  initialCheckOut,
  initialMonthDate,
  handleChangeCheckInOut,
  handleChangeMonthDate,
}: Props) => {
  return (
    <CalendarModalContainer onClick={(e) => e.stopPropagation()}>
      <Calendar
        today={today}
        initialCheckIn={initialCheckIn}
        initialCheckOut={initialCheckOut}
        initialMonthDate={initialMonthDate}
        handleChangeCheckInOut={handleChangeCheckInOut}
        handleChangeMonthDate={handleChangeMonthDate}
      />
    </CalendarModalContainer>
  );
};

export default CalendarModal;

const CalendarModalContainer = styled.div`
  width: 800px;
  min-height: 400px;
  border: 1px solid var(--color-border);
  background-color: var(--color-white);
`;
