import styled from 'styled-components';

export const Wrap = styled.div`
  padding: 20px 24px 60px;

  @media screen and (max-width: 400px) {
    padding: 20px;
  }
`;

export const Block = styled.div`
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  padding: 24px 20px;
  margin-bottom: 12px;
  cursor: pointer;

  :hover {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    transition: all 0.5s ease;
  }
`;

export const WriterInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;

  > img {
    width: 36px;
    height: 36px;
    border-radius: 70%;
  }
`;

export const DetailInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Textarea = styled.textarea`
  resize: none;
  width: 96%;
  padding: 1.5%;
  min-height: 320px;
  border-radius: 20px;
  border: 2px solid #ef4e3e30;
  background-color: #ffffff;

  :hover,
  :focus-visible {
    border: 2px solid #ef4e3e70;
    outline: none;
    transition: 0.2s ease;
  }
`;

export const Comment = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;

  > div {
    display: flex;
    gap: 4px;
    padding: 8px;
  }
  input {
    all: unset;
    flex: auto;
    padding: 8px 12px;
    border: 2px solid rgb(224, 224, 224);
    border-radius: 30px;
  }
  button {
    all: unset;
    cursor: pointer;
    flex: 0 1 40px;
    text-align: center;
  }
`;
