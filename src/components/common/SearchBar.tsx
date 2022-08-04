import React, { useEffect } from "react";
import styled from "styled-components";
import { VscCalendar } from "react-icons/vsc";
import { IoPersonOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import CalendarModalPosition from "../modal/CalendarModalPosition";
import CalendarModal from "../modal/CalendarModal";
import CountModalPosition from "../modal/CountModalPosition";
import CountModal from "../modal/CountModal";
import {
  addDate,
  convertDateToString,
  getDateDiff,
} from "../../utils/dateUtils";

const SearchBar = () => {
  const today = new Date(convertDateToString(new Date()));
  const [initialMonthDate, setInitialMonthDate] = React.useState(
    new Date(convertDateToString(new Date()))
  );
  const [checkIn, setCheckIn] = React.useState<Date | undefined>(
    addDate(today, 7)
  );
  const [checkOut, setCheckOut] = React.useState<Date | undefined>(
    addDate(today, 8)
  );
  const [showCalendarModal, setShowCalendarModal] =
    React.useState<boolean>(false);

  const [showCountModal, setShowCountModal] = React.useState<boolean>(false);

  return (
    <SearchBarContainer>
      <IconWrapper>
        <VscCalendar />
      </IconWrapper>
      <CheckInOutContainer
        onClick={() => {
          setShowCalendarModal(!showCalendarModal);
        }}
      >
        {showCalendarModal && (
          <CalendarModalPosition>
            <CalendarModal
              initialCheckIn={checkIn}
              initialCheckOut={checkOut}
              today={new Date(convertDateToString(new Date()))}
              initialMonthDate={initialMonthDate}
              handleChangeMonthDate={(date: Date) => {
                setInitialMonthDate(date);
              }}
              handleChangeCheckInOut={(
                srcCheckIn?: Date,
                srcCheckOut?: Date
              ) => {
                let changed = false;
                if (srcCheckIn !== checkIn || srcCheckOut !== checkOut) {
                  changed = true;
                }
                setCheckIn(srcCheckIn);
                setCheckOut(srcCheckOut);
                if (changed && srcCheckIn && srcCheckOut) {
                  setShowCalendarModal(false);
                }
              }}
            />
          </CalendarModalPosition>
        )}
        <CheckInWrapper>
          <SubMenuTitle>체크인</SubMenuTitle>
          <SubMenuContents>
            {checkIn
              ? `${checkIn.getMonth() + 1}월 ${checkIn.getDate()}일`
              : "날짜추가"}
          </SubMenuContents>
        </CheckInWrapper>
        <StayPeriodText>
          {checkIn && checkOut ? `${getDateDiff(checkOut, checkIn)}박` : ""}
        </StayPeriodText>
        <CheckOutWrapper>
          <SubMenuTitle>체크아웃</SubMenuTitle>
          <SubMenuContents>
            {checkOut
              ? `${checkOut.getMonth() + 1}월 ${checkOut.getDate()}일`
              : "날짜추가"}
          </SubMenuContents>
        </CheckOutWrapper>
      </CheckInOutContainer>
      <IconWrapper>
        <IoPersonOutline />
      </IconWrapper>
      <GuestInfoContainer
        onClick={() => {
          setShowCountModal(!showCountModal);
        }}
      >
        {showCountModal && (
          <CountModalPosition>
            <CountModal setShowCountModal={setShowCountModal} />
          </CountModalPosition>
        )}
        <GuestInfoWrapper>
          <SubMenuTitle>객실 / 인원</SubMenuTitle>
          <SubMenuContents>객실 1, 인원 3</SubMenuContents>
        </GuestInfoWrapper>
      </GuestInfoContainer>
      <SearchIconWrapper>
        <IoSearch />
      </SearchIconWrapper>
    </SearchBarContainer>
  );
};

export default SearchBar;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background-color: var(--color-white);
  border: 1.5px solid var(--color-border);
  cursor: pointer;
`;

const CheckInOutContainer = styled.div`
  display: flex;
  width: 20rem;
  margin-left: 0 1.5rem;
  border-right: 1.5px solid var(--color-border);

  &:hover {
    background-color: var(--color-hover);
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  font-size: 1.8rem;
`;

const CheckInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 9rem;
  padding-left: 1rem;
`;

const SubMenuTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-subTitle);
`;

const SubMenuContents = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  margin-top: 0.5rem;
`;

const StayPeriodText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  color: var(--color-subTitle);
`;

const CheckOutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 9rem;
  padding-right: 1rem;
`;

const GuestInfoContainer = styled.div`
  display: flex;
  width: 17rem;
  margin-left: 0 1.5rem;

  &:hover {
    background-color: var(--color-hover);
  }
`;

const GuestInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 20rem;
  padding-left: 1rem;
`;

const SearchIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  font-size: 2.2rem;
  background-color: var(--color-main);
  color: var(--color-white);
`;
