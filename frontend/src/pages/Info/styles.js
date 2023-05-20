import styled from 'styled-components';

export const Wrap = styled.div`
  padding: 20px 24px 60px;
  @media screen and (max-width: 400px) {
    padding: 0 20px;
  }
`;

export const TodayWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 2px solid #ebebeb;
  padding-bottom: 20px;
  margin-bottom: 20px;

  > div {
    flex: 50%;
    text-align: center;
  }
`;

export const RateWrap = styled.div`
  > table {
    font-family: 'SEBANG-Gothic', serif;
    font-size: 14px;
  }
`;
