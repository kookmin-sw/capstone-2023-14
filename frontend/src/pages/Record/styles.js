import styled from 'styled-components';

export const Wrap = styled.div`
  height: 100%;
  position: relative;

  > div:nth-child(2) {
    padding: 0 24px 60px;
    position: relative;
    overflow-y: scroll;
  }
`;

export const FloatingButton = styled.div`
  display: inline-block;
  width: 52px;
  height: 52px;
  border-radius: 70%;
  background-color: #ef4e3e;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  font-size: 28px;
  font-weight: bold;
  color: #ffffff;
  position: absolute;
  right: 24px;
  bottom: 80px;
  line-height: 1.7em;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
`;
