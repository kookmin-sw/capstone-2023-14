import styled from 'styled-components';

export const Wrap = styled.div`
  z-index: 99;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  max-width: 480px;

  > div {
    background-color: #ffffff;
    margin: 24px;
    width: 100%;
    padding: 60px 20px;
    border-radius: 12px;
    overflow-y: scroll;
    height: 70%;
  }
`;

export const TypeWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px 8px;
  margin-bottom: 20px;

  > div {
    border-radius: 24px;
    padding: 10px;
    text-align: center;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    border: 2px solid #ef4e3e;
    color: #000000;
    margin-bottom: 8px;
  }
`;
