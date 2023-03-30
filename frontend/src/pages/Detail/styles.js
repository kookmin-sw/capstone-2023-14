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

  > div:first-child {
    text-align: center;
    padding-bottom: 16px;
    margin-bottom: 16px;
    border-bottom: 1px solid #ebebeb;
  }
  > div:last-child {
    display: flex;

    > div {
      flex: 25%;
      text-align: center;
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

  > img {
    width: 40px;
    height: 40px;
    margin-right: 4px;
  }
`;
