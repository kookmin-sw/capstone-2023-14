import styled from 'styled-components';

export const Wrap = styled.div`
  padding: 20px 24px 60px;

  @media screen and (max-width: 400px) {
    padding: 20px;
  }

  > div:last-child {
    padding-bottom: 50px;
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

  > div:last-child {
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
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

export const SearchWrap = styled.div`
  input {
    border-radius: 30px;
    border: 2px solid rgba(239, 78, 62, 0.19);
    padding: 4px 8px;
    width: -webkit-fill-available;
    height: 24px;
    font-family: 'SEBANG-Gothic', serif;
  }
  margin-bottom: 20px;
`;

export const CommentsWrap = styled.div`
  border-top: 2px solid #ebebeb;
  margin-top: 24px;
  padding: 20px 0;
  font-family: 'SEBANG-Gothic', serif;
  letter-spacing: 0.05em;

  > div {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
  }
  > div img {
    border-radius: 70%;
    width: 24px;
    height: 24px;
    background-color: #ebebeb;
    flex: 0 0 24px;
  }
  > div > div {
    flex: 0 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  span {
    margin: 0 4px;
    font-size: 12px;
    font-weight: bold;
  }
  > div > div > div {
    border-radius: 30px;
    border: 2px solid #ef4e3e30;
    padding: 4px 8px;
    margin-top: 2px;
    font-size: 12px;
  }
`;
export const Textarea = styled.textarea`
  resize: none;
  width: 96%;
  padding: 1.5%;
  min-height: 320px;
  border-radius: 20px;
  border: 2px solid #ef4e3e30;
  background-color: #ffffff;
  font-family: 'SEBANG-Gothic', serif;
  letter-spacing: 0.1em;

  ${(props) =>
    props.disabled
      ? null
      : ':hover, :focus-visible { border: 2px solid #ef4e3e70; outline: none; transition: 0.2s ease;'}}
  
`;

export const Comment = styled.div`
  position: fixed;
  bottom: 0;
  max-width: 480px;
  width: 100%;
  padding: 12px 0;
  background-color: #ffffff;
  font-family: 'SEBANG-Gothic', serif;

  > div {
    display: flex;
    gap: 4px;
  }
  input {
    all: unset;
    flex: auto;
    padding: 8px 12px;
    border: 2px solid rgb(224, 224, 224);
    border-radius: 30px;
    font-size: 14px;
  }
  button {
    all: unset;
    cursor: pointer;
    flex: 0 1 40px;
    text-align: center;
  }
`;
