import styled from 'styled-components';

export const Wrap = styled.div`
  margin: 0 auto;
  position: relative;
  padding: 0 24px 60px;

  @media screen and (max-width: 400px) {
    padding: 0 20px;
  }

  > div:not(:first-child) {
    margin-bottom: 16px;
  }
`;
