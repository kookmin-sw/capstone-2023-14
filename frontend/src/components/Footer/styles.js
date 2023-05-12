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
