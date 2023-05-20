import styled from 'styled-components';

const Common = styled.div`
  display: flex;
  align-items: center;
`;

export const Wrap = styled(Common)`
  z-index: 99;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  inset: 0;
  justify-content: center;
  margin: auto;
  max-width: 480px;

  > div {
    background-color: #ffffff;
    margin: 24px;
    width: 100%;
    padding: ${(props) => (props.padding ? '60px 20px' : null)};
    border-radius: 12px;
    overflow-y: scroll;
  }
  > div > input {
    display: none;
  }
`;

export const TasteWrap = styled.div`
  text-align: center;
  > div:nth-child(2) {
    margin-bottom: 32px;
  }
  > div:last-child {
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
  height: 260px;
  position: relative;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
`;

export const InputWrap = styled.div`
  padding: 20px;
  position: relative;

  > div {
    margin-bottom: 12px;

    :first-child img {
      width: 28px;
    }
  }

  > button,
  span > button {
    all: unset;
    cursor: pointer;
    background: #ef4e3e;
    border-radius: 30px;
    color: #ffffff;
    padding: 4px 18px;
    font-weight: bold;
    display: block;
    margin: auto;
    border: 2px solid #ef4e3e;
  }
  span {
    display: flex;
    justify-content: flex-end;
    gap: 8px;

    > button {
      margin: unset;
    }
    > button:last-child {
      background: #ffffff;
      color: #141414;
    }
  }

  img {
    width: ${(props) => (props.small ? '18px' : null)};
  }
`;

export const Textarea = styled.textarea`
  all: unset;
  resize: none;
  font-family: 'SEBANG-Gothic', serif;
  font-size: 12px;
  width: calc(100% - 12px);
  padding: 4px;
  height: 120px;
  border: 2px solid rgb(224, 224, 224);
  border-radius: 12px;
  margin-bottom: 20px;
  background-color: ${(props) =>
    props.disabled ? 'rgba(224, 224, 224, 0.2)' : null};
  :hover,
  :focus-visible {
    border: ${(props) => (props.disabled ? null : '2px solid #ef4e3e')};
    outline: none;
    transition: 0.5s ease;
  }
`;

export const StarRatingWrap = styled(Common)`
  justify-content: space-between;

  > select {
    padding: 2px 4px;
    border-radius: 18px;
    height: fit-content;
  }
`;

export const DateWrap = styled(Common)`
  text-align: center;
  border: 2px solid rgb(224, 224, 224);
  border-radius: 30px;
  padding: 8px 12px;

  input {
    all: unset;
    width: 100% !important;
  }

  :hover,
  :focus-visible {
    border: 2px solid rgb(239, 78, 62);
    transition: all 0.5s ease 0s;
  }
`;

export const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  list-style-type: none;
  padding: 0;
  margin: 0;
  min-width: 100%;
  z-index: 1;
  overflow-y: scroll;
  max-height: 150px;

  li {
    padding: 10px;
    cursor: pointer;
  }

  li:hover {
    background-color: #eee;
  }
`;
