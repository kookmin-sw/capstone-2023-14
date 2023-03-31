import styled from 'styled-components';

export const Flex = styled.div`
  display: flex;
  gap: ${(props) => (props.gap ? '20px' : null)};
  justify-content: space-between;
  padding: ${(props) => (props.padding ? '20px' : null)};
  cursor: pointer;

  ${(props) =>
    props.gap ? '> img {max-width: 22px; max-height:22px;}' : null};
`;

export const MySwitch = styled.div`
  border: 2px solid ${(props) => (props.mySwitch ? '#EF4E3E' : '#7C7C7C')};
  border-radius: 15px;
  width: 50px;
  height: 24px;
  position: relative;
  cursor: pointer;

  > div {
    transition: all 0.5s ease;
    border-radius: 70%;
    background-color: ${(props) => (props.mySwitch ? '#EF4E3E' : '#7C7C7C')};
    width: 18px;
    height: 18px;
    position: absolute;
    top: 3px;
    right: ${(props) => (props.mySwitch ? '4px' : '28px')};
  }
`;
