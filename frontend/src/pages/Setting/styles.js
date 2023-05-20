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
  font-family: 'SEBANG-Gothic', serif;

  > div {
    background-color: #ffffff;
    margin: auto;
    padding: 20px;
    border-radius: 12px;
    overflow-y: scroll;
    min-width: 60%;
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

  label {
    display: flex;
    align-items: center;
    gap: 4px;
    line-height: 2em;
    font-size: 14px;
  }

  input[type='text'] {
    border: 2px solid #e0e0e0;
    border-radius: 30px;
    width: 80%;
    height: 24px;
    padding: 2px 12px;
    margin: 12px 0;
    font-family: 'SEBANG-Gothic', serif;
    :hover,
    :focus-visible {
      border: 2px solid #ef4e3e;
      outline: none;
      transition: 0.2s ease;
    }
  }

  input[type='radio'] {
    vertical-align: middle;
    appearance: none;
    border: 2px solid gray;
    border-radius: 50%;
    width: 1.25em;
    height: 1.25em;
  }

  input[type='radio']:checked {
    border: 4px solid #ef4e3e;
  }
`;

export const Row = styled.div`
  display: flex;
  ${(props) =>
    props.title
      ? 'align-items: flex-end; margin: 20px 0;'
      : 'flex-wrap: wrap; gap: 8px 12px; margin-bottom: 20px;'};
`;
export const ButtonWrap = styled.div`
  ${(props) => (props.setting ? ' width: 100%;' : null)}
`;

export const Options = styled.label`
  padding: 2px 16px;
  border: 1.5px solid #7c7c7c;
  border-radius: 24px;
  cursor: pointer;

  > input {
    display: none;
  }
`;
