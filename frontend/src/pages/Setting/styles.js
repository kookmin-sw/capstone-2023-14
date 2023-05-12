import styled from 'styled-components';

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;

  ${(props) =>
    props.taste
      ? 'padding: 0 24px 60px; @media screen and (max-width: 400px) {padding: 0 20px;}'
      : 'height: 100vh; > div:last-child {  background-color: #d9d9d9; padding-top: 12px; flex: auto;}'}
`;

export const ItemWrap = styled.div`
  background-color: #ffffff;
  margin-bottom: 12px;
`;

export const TasteWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;

  > div:last-child {
    flex: auto;
    > div {
      position: relative;
    }
  }
`;

export const AddOptionModal = styled.div`
  z-index: 99;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  inset: 0;
  display: flex;
  justify-content: center;
  margin: auto;
  max-width: 480px;

  > div {
    background-color: #ffffff;
    margin: auto;
    padding: 20px;
    border-radius: 12px;
    overflow-y: scroll;
  }
`;
