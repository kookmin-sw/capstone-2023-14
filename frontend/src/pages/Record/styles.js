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

export const AddOptionModal = styled.div`
  z-index: 100;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  inset: 0;
  display: flex;
  justify-content: center;
  margin: auto;
  max-width: 480px;
  font-family: 'SEBANG-Gothic', serif;

  > div {
    background-color: #ffffff;
    margin: auto;
    padding: 20px;
    border-radius: 12px;
    overflow-y: scroll;
    min-width: 60%;
  }
  > div > div:first-child {
    text-align: center;
    margin-bottom: 20px;
  }

  > div > div:last-child {
    display: flex;
    gap: 4px;

    > button {
      all: unset;
      flex: 50%;
      text-align: center;
      cursor: pointer;
      display: inline-block;
      position: relative;
      padding: 8px 0;
      font-size: 14px;

      :after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 0;
        height: 2px;
        border-radius: 4px;
        background-color: #ef4e3e;
        transition: all 0.5s;
      }
      :hover:after {
        width: 100%;
      }
    }
  }
`;
