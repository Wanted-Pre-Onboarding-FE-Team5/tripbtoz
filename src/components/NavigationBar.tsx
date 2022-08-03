import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type Props = {};

const NavigationBar = (props: Props) => {
  const navigate = useNavigate();

  const handleLogo = () => {
    navigate('/');
  };

  const handleToReservation = () => {
    navigate('/reservation');
  };

  return (
    <NavigationBarWrapper>
      <NavigationBarContainer>
        <LogoContainer>
          <LogoImage src='./images/logo-black-tripbtoz.png' onClick={handleLogo} />
        </LogoContainer>
        <NavigationBarMenuItems>
          <CustomerService>고객센터</CustomerService>
          <ReservationList onClick={handleToReservation}>예약확인</ReservationList>
        </NavigationBarMenuItems>
      </NavigationBarContainer>
    </NavigationBarWrapper>
  );
};

export default NavigationBar;

const NavigationBarWrapper = styled.nav`
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavigationBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 50%;
`;

const LogoContainer = styled.div`
  width: 10rem;
  height: 3rem;
  display: flex:
  justify-content: center;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const NavigationBarMenuItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 10rem;
  height: 3rem;
  font-size: 1.1rem;
`;

const CustomerService = styled.div`
  cursor: pointer;
`;

const ReservationList = styled.div`
  cursor: pointer;
`;
