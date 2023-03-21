import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
`;

export const destinationImg = styled.img`
  width: 100%;
  border-radius: 15px;
`;

export const destinationTitle = styled.span`
  position: absolute;
  z-index: 2;
  color: white;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  font-size: 40px;
`;

export const destinationBottom = styled.div`
  position: absolute;
  width: 96%;
  height: 8vh;
  z-index: 1;
  color: white;
  bottom: 1%;
  font-weight: bold;
  background-color: rgb(0, 0, 0, 0.5);
  border-radius: 0 0 15px 15px;
  padding: 3% 0px 0px 4%;
`;
