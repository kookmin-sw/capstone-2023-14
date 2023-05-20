import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  cursor: pointer;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
`;

export const destinationImg = styled.img`
  width: 100%;

  :hover {
    transform: scale(1.1);
    transition: transform 0.2s linear;
  }
`;

export const destinationTitle = styled.div`
  position: absolute;
  z-index: 2;
  color: white;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  letter-spacing: 0.1em;
`;

export const destinationBottom = styled.div`
  position: absolute;
  width: 92%;
  height: 7vh;
  z-index: 1;
  bottom: 0;
  background-color: rgb(0, 0, 0, 0.5);
  border-radius: 0 0 15px 15px;
  padding: 3% 4%;
  letter-spacing: 0.05em;
  line-height: 1.4em;
`;
