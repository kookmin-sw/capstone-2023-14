import styled from 'styled-components';

export const Wrap = styled.div`
  position: fixed;
  width: 100%;
  height: 52px;
  bottom: 0;
  z-index: 99;
  background-color: #ffffff;
  max-width: 480px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-top: 1px solid #e9e9e9;
`;

export const Icon = styled.div`
  cursor: pointer;
  path {
    stroke: ${(props) =>
      props.value === props.active ? '#ED655E' : '#7c7c7c'};
    stroke-width: 2px;
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
