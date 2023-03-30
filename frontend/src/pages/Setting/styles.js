import styled from 'styled-components';

export const Wrap = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;

  > div:last-child {
    background-color: #d9d9d9;
    padding-top: 12px;
    flex: auto;
  }
`;

export const ItemWrap = styled.div`
  background-color: #ffffff;
  margin-bottom: 12px;
`;
