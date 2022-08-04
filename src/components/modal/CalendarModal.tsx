import React from 'react';
import styled from 'styled-components';

const CalendarModal = ({ setShowCalendarModal }: any) => {
  return <CalendarModalContainer>캘린더 들어올 자리</CalendarModalContainer>;
};

export default CalendarModal;

const CalendarModalContainer = styled.div`
  width: 50rem;
  min-height: 22rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-white);
`;