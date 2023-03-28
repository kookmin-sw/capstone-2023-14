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
    padding: ${(props) => (props.padding ? '60px 20px' : null)};
    border-radius: 12px;
    overflow-y: scroll;
    height: 70%;
  }
  > div > input {
    display: none;
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

export const ImgWrap = styled.div`
  background-color: #d9d9d9;
  height: 200px;
  position: relative;
  cursor: pointer;

  > label > img:first-child {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  > label > img:last-child {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const InputWrap = styled.div`
  padding: 20px;
  position: relative;

  > div {
    margin-bottom: 12px;
  }

  > button {
    all: unset;
    cursor: pointer;
    background: #ef4e3e;
    border-radius: 30px;
    color: #ffffff;
    padding: 4px 18px;
    font-weight: bold;
    display: block;
    margin: auto;
  }

  textarea {
    all: unset;
    resize: none;
    width: calc(100% - 12px);
    padding: 4px;
    height: 120px;
    border: 2px solid rgb(224, 224, 224);
    border-radius: 12px;
    margin-bottom: 20px;
  }
`;

export const StarRatingWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > select {
    padding: 2px 4px;
    border-radius: 18px;
    height: fit-content;
  }
`;
