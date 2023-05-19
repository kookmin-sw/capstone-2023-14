import styled from 'styled-components';

export const Wrap = styled.div`
  height: 100%;
  position: relative;

  > div:nth-child(2) {
    padding: 0 24px 60px;
    position: relative;
    overflow-y: scroll;
  }
`;
