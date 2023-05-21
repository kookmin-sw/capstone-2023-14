import styled from 'styled-components';

export const Wrap = styled.div`
  margin: 0 auto;
  position: relative;
  padding: 0 24px 60px;

  @media screen and (max-width: 400px) {
    padding: 0 20px 60px;
  }
`;

export const InfoWrap = styled.div`
  margin: 20px 0;
  padding: 20px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  font-family: 'SEBANG-Gothic', serif;

  > div:first-child {
    text-align: center;
    padding-bottom: 16px;
    margin-bottom: 16px;
    font-size: 14px;
    border-bottom: 1px solid #ebebeb;
  }
  > div:last-child {
    display: flex;

    > div {
      flex: 25%;
      text-align: center;
      font-size: 12px;
      line-height: 1.2em;
    }
  }
`;

export const UserWrap = styled.div`
  display: flex;
  align-items: center;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  margin-bottom: 12px;
  padding: 12px;
  gap: 4px;
  cursor: pointer;

  > img {
    width: 40px;
    height: 40px;
    margin-right: 4px;
  }
`;

export const UserInfoDetail = styled.div`
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

  button {
    all: unset;
    float: right;
    cursor: pointer;
  }
  img {
    max-width: 60px;
    max-height: 60px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 70%;
    margin-bottom: 12px;
  }

  > div {
    background-color: #ffffff;
    margin: auto;
    padding: 20px;
    border-radius: 12px;
    overflow-y: scroll;
    min-width: 60%;

    > div {
      margin-bottom: 8px;
    }
  }
`;
